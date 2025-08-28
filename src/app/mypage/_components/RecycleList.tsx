'use client'

import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import LayerPopup from '@/app/_global/components/LayerPopup'
import Image from 'next/image'

export type DetectedRecycle = {
  seq: number
  data: string
  imageUrl: string
}

/** 리스트 영역 **/
const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 20px;
`

/** 아이템 카드 **/
const FileItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  background: #fff;
  text-align: center;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 6px;
  }

  .name {
    margin-top: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }
`

/** 리스트 컴포넌트 **/
export const RecycleList = ({ items }: { items: DetectedRecycle[] }) => {
  const [selected, setSelected] = useState<{
    url: string
    name: string
  } | null>(null)
  const onClose = useCallback(() => setSelected(null), [])

  if (!items.length) return <p>저장된 이미지가 없습니다.</p>

  return (
    <>
      <ListWrapper>
        {items.map((f) => {
          let images: { name: string; url: string; ext: string }[] = []
          try {
            images = JSON.parse(f.imageUrl)
          } catch (e) {
            console.error('imageUrl parse error', e)
          }

          if (!images.length) return null
          const first = images[0]

          return (
            <FileItem key={f.seq} onClick={() => setSelected(first)}>
              <Image src={first.url} alt={first.name} />
              <div className="name">{first.name}</div>
            </FileItem>
          )
        })}
      </ListWrapper>

      <LayerPopup isOpen={!!selected} onClose={onClose} width={600}>
        {selected && (
          <Image
            src={selected.url}
            alt={selected.name}
            style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '8px' }}
          />
        )}
      </LayerPopup>
    </>
  )
}
