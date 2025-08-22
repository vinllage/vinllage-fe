// app/_components/RecycleList.tsx
'use client'

import React from 'react'
import styled from 'styled-components'

type Category = {
  category1: string
  category2?: string
}

type ParsedImage = {
  url: string
  name?: string
}

type FileInfo = {
  seq: number
  fileUrl: string
  thumbBaseUrl?: string
  originalFilename: string
  uploadedAt?: string
  sizeBytes?: number
  imageUrl?: string // JSON 문자열: [{ url, name }]
  categories?: Category[] // 백엔드에서 내려주면 표시
}

const ListWrap = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const Item = styled.li`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

  & + & {
    margin-top: 10px;
  }
`

const RowTop = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

const Info = styled.div`
  flex: 1 1 auto;
  min-width: 0; /* ellipsis 용 */
`

const Name = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Meta = styled.div`
  margin-top: 4px;
  font-size: 13px;
  color: #666;
`

const Actions = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 8px;

  a {
    font-size: 13px;
    text-decoration: underline;
  }
`

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 2px;
`

const CategoryItem = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 999px;
  background: #f6f6f6;
  color: #555;
  font-size: 12px;
`

const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const ImageItem = styled.img`
  width: 112px;
  height: 78px;
  border-radius: 10px;
  object-fit: cover;
  display: block;
  background: #f6f6f6;
  border: 1px solid #eee;
`

function formatBytes(b?: number) {
  if (b == null) return ''
  if (b < 1024) return `${b} B`
  const u = ['KB', 'MB', 'GB', 'TB']
  let i = -1
  let n = b
  do {
    n = n / 1024
    i++
  } while (n >= 1024 && i < u.length - 1)
  return `${n.toFixed(1)} ${u[i]}`
}

function parseImages(jsonStr?: string): ParsedImage[] {
  if (!jsonStr) return []
  try {
    const arr = JSON.parse(jsonStr)
    if (Array.isArray(arr)) {
      // { url, name } 형태만 추림
      return arr
        .filter((v) => v && typeof v.url === 'string')
        .map((v) => ({ url: v.url, name: v.name }))
    }
  } catch (e) {
    console.error('imageUrl JSON 파싱 오류', e)
  }
  return []
}

export default function RecycleList({ files }: { files: FileInfo[] }) {
  return (
    <ListWrap>
      {files.map((item) => {
        const images = parseImages(item.imageUrl)

        // imageUrl이 비어있으면 단일 이미지로 폴백
        const fallbackImage: ParsedImage | null =
          images.length === 0
            ? {
                url: item.thumbBaseUrl || item.fileUrl,
                name: item.originalFilename,
              }
            : null

        const categories = item.categories || []

        return (
          <Item key={item.seq}>
            {/* 상단: 파일명/메타/액션 */}
            <RowTop>
              <Info>
                <Name title={item.originalFilename}>
                  {item.originalFilename}
                </Name>
                <Meta>
                  {item.uploadedAt
                    ? new Date(item.uploadedAt).toLocaleString()
                    : '—'}
                  {item.sizeBytes != null
                    ? ` · ${formatBytes(item.sizeBytes)}`
                    : ''}
                </Meta>

                {categories.length > 0 && (
                  <Categories>
                    {categories.map((c, idx) => (
                      <CategoryItem key={idx}>
                        {c.category1}
                        {c.category2 ? ` (${c.category2})` : ''}
                      </CategoryItem>
                    ))}
                  </Categories>
                )}
              </Info>

              <Actions>
                <a href={item.fileUrl} target="_blank" rel="noreferrer">
                  원본 보기
                </a>
                {/* 필요 시 확장 버튼 자리
                <button type="button">삭제</button>
                */}
              </Actions>
            </RowTop>

            {/* 하단: 이미지들 */}
            <Images>
              {images.length > 0
                ? images.map((img, idx) => (
                    <ImageItem
                      key={idx}
                      src={img.url}
                      alt={img.name || `image-${idx}`}
                    />
                  ))
                : fallbackImage && (
                    <ImageItem
                      src={fallbackImage.url}
                      alt={fallbackImage.name || 'image'}
                    />
                  )}
            </Images>
          </Item>
        )
      })}
    </ListWrap>
  )
}
