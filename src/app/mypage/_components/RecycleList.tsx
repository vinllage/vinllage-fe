'use client'

import React from 'react'
import styled from 'styled-components'

export type DetectedRecycle = {
  seq: number
  data: string
  imageUrl: string
}

const ListWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
`

const FileItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  background: #fff;
  width: 200px;
  text-align: center;

  img {
    max-width: 100%;
    border-radius: 6px;
  }
`

export const RecycleList = ({ items }: { items: DetectedRecycle[] }) => {
  if (!items.length) return <p>저장된 이미지가 없습니다.</p>

  return (
    <ListWrapper>
      {items.map((f) => {
        let images: { name: string; url: string; ext: string }[] = []
        try {
          images = JSON.parse(f.imageUrl)
        } catch (e) {
          console.error('imageUrl parse error', e)
        }

        // 첫 번째 이미지 url만 가져오기
        const firstImage = images.length > 0 ? images[0].url : null

        return (
          <FileItem key={f.seq}>
            {firstImage ? (
              <img src={firstImage} alt={images[0].name} />
            ) : (
              <p>이미지 없음</p>
            )}
          </FileItem>
        )
      })}
    </ListWrapper>
  )
}