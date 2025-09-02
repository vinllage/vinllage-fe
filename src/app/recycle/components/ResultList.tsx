import React from 'react'
import styled from 'styled-components'
import fontsize from '@/app/_global/styles/fontsize'
import color from '@/app/_global/styles/color'

/* 스타일 정리 S */
const { dark, info } = color 
const { normal, extra } = fontsize

const ResultList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`
const ResultItem = styled.div`
  width: 220px;
  min-height: 180px;
  border-radius: 12px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
`
const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  font-size: ${normal};
`

const CategoryItem = styled.button<{ disable?: boolean }>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: ${extra};
  font-weight: 500;
  background: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ disabled }) => (disabled ? '#aaa' : dark)};
  &:hover {
    color: ${({ disabled }) => (disabled ? '#aaa' : info)};
  }
`

const Images = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ImageItem = styled.img`
  width: 100%;
  height: 180px;
  border-radius: 8px;
  object-fit: cover;
`
/* 스타일 정리 E */

export type FlatImage = {
  key: string
  category: string
  categoryKey: string
  url: string
  name: string
}

export function ResultComponents({
  items,
  onSelect,
}: {
  items: FlatImage[]
  onSelect: (cat: string) => void
}) {
  if (!items?.length) {
    return <div className="noData">데이터가 없습니다.</div>
  }

  return (
    <ResultList>
      {items.map((img) => {
        const disabled = img.category === "sticker" || img.category === "기타"
        return (
        <ResultItem key={img.key}>
          <Images>
            <ImageItem src={img.url} alt={img.name} />
          </Images>
          <Categories>
            {img.category && (
              <CategoryItem 
                disabled={disabled}
                onClick={() => !disabled && onSelect(img.categoryKey)}
              >
              </CategoryItem>
            )}
          </Categories>
        </ResultItem>
      )})}
    </ResultList>
  )
}
