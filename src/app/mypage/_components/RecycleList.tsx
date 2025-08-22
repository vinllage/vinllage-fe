'use client'

import React from 'react'
import styled from 'styled-components'

export type FileInfo = {
  seq: number
  fileUrl: string
  thumbBaseUrl?: string
  originalName: string
}

interface Props {
  items: FileInfo[]
}

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
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
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 6px;
  }
`

export const RecycleList = ({ items }: Props) => {
  if (!items.length) return <p>저장된 이미지가 없습니다.</p>
  return (
    <ListWrapper>
      {items.map((f) => (
        <FileItem key={f.seq}>
          <img
            src={f.thumbBaseUrl || f.fileUrl}
            alt="분리수거 결과 이미지"
            title={f.originalName}
          />
        </FileItem>
      ))}
    </ListWrapper>
  )
}
