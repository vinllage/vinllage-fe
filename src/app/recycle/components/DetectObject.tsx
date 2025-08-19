import React, { useRef, useEffect, useCallback } from 'react'
import { color, category } from '../libs'
import styled, { css } from 'styled-components'

const Wrapper = styled.div<{ width?: number; height?: number }>`
  position: relative;

  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}

  ${({ height }) =>
    height &&
    css`
      height: ${height}px;
    `}

  video {
    display: none;
  }

  .layer {
    position: absolute;
    top: 0;
    left: 0;
  }
`

type PropType = {
  width?: number
  height?: number
  callback: (items: any) => void
}

const DetectObject = ({ width, height, callback }: PropType) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const layerRef = useRef<HTMLCanvasElement | null>(null)

  width = width ?? 500
  height = height ?? 500

  const detect = useCallback(() => {
    const canvas = canvasRef.current
    const layer = layerRef.current
    if (!canvas || !layer) return

    const ctx = layer.getContext('2d')
    if (!ctx) return

    ctx.lineWidth = 5
    ctx.fillStyle = 'transparent'
    ctx.strokeStyle = 'red'
    ctx.font = '13px bold'
    ctx.clearRect(0, 0, width, height)

    canvas.toBlob((blob) => {
      if (!blob) return

      const formData = new FormData()
      formData.append('file', blob, 'canvas.jpg')

      fetch(`${process.env.NEXT_PUBLIC_AI_API_URL2}/detect`, {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((items) => {
          const callbackItems: Array<{
            category1: string
            category2: string
            dataUrl: string | null
            blob: Blob | null
          }> = []
          for (const [x1, y1, x2, y2, , , cls] of items) {
            const w = Math.abs(x2 - x1)
            const h = Math.abs(y2 - y1)

            ctx.strokeStyle = color[cls]
            ctx.strokeRect(x1, y1, w, h)

            ctx.fillStyle = color[cls]
            ctx.fillRect(x1, y1, w, 20)

            ctx.fillStyle = '#fff'
            ctx.fillText(category[cls], x1 + 10, y1 + 13)

            const img = new Image()
            img.src = canvas.toDataURL()

            const cropCanvas = document.createElement('canvas')
            cropCanvas.width = w
            cropCanvas.height = h
            const ctxCrop = cropCanvas.getContext('2d')

            if (ctxCrop) {
              img.onload = () => {
                ctxCrop.drawImage(img, x1, y1, w, h, 0, 0, w, h)
                const dataUrl = cropCanvas.toDataURL()
                cropCanvas.toBlob((blob) => {
                  callbackItems.push({
                    category1: cls,
                    category2: category[cls],
                    dataUrl,
                    blob,
                  })

                  // 후속처리 함수 호출
                  callback(callbackItems)
                })
              }
            }
          }
        })
    })
  }, [canvasRef, layerRef, width, height, callback])

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current

    let videoInterval, detectInterval

    navigator.mediaDevices
      .getUserMedia({
        video: { width, height },
        audio: false,
      })
      .then((stream) => {
        if (video) video.srcObject = stream

        detectInterval = setInterval(() => {
          detect()
        }, 1000)
      })
      .catch((err) => {
        // 웹캠이 설치되어 있지 않거나, 웹캠 권한을 허용하지 않은 경우..
        console.log('err', err)
      })

    const ctx = canvas?.getContext('2d')
    video?.addEventListener('play', () => {
      videoInterval = setInterval(() => {
        ctx?.drawImage(video, 0, 0, canvas?.width ?? 500, canvas?.height ?? 500)
      }, 0)
    })

    return () => {
      clearInterval(videoInterval)
      clearInterval(detectInterval)
    }
  }, [videoRef, canvasRef, detect, width, height])

  return (
    <Wrapper width={width} height={height}>
      <video ref={videoRef} width={width} height={height} autoPlay></video>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
      <canvas
        className="layer"
        ref={layerRef}
        width={width}
        height={height}
      ></canvas>
    </Wrapper>
  )
}

export default React.memo(DetectObject)
