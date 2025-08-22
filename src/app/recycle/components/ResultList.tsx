import React from 'react'
import styled from 'styled-components'
import color from '@/app/_global/styles/color'
import fontsize from '@/app/_global/styles/fontsize';

export type DetectedRecycle = {
  seq : number
  gid : string
  data : string
  imageUrl : string
};

/* 스타일 정리 S */
const { dark } = color
const { normal, medium } = fontsize

const ResultList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`
const ResultItem = styled.div`
  width: 160px;
  min-height: 120px;
  border: 1.5px solid ${dark};
  border-radius: 12px;
  padding: 12px;

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

const CategoryItem = styled.div`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: ${medium};
  font-weight: 500;
  white-space: nowrap;
`

const Images = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ImageItem = styled.img`
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
`
/* 스타일 정리 E */

export function ResultComponents({ items }: { items: DetectedRecycle[] }) {
  if (!items?.length) {
    return <div className="noData">데이터가 없습니다.</div>
  }

  return (
    <ResultList>
      {items.map((item) => {
        // JSON 문자열 파싱
        let categories: { category1: string; category2: string }[] = []
        let images: { url: string; name: string; ext: string }[] = []

        try {
          categories = JSON.parse(item.data || '[]')
        } catch (e) {
          console.error('data JSON 파싱 오류', e)
        }

        try {
          images = JSON.parse(item.imageUrl || '[]')
        } catch (e) {
          console.error('imageUrl JSON 파싱 오류', e)
        }

    return images.map((img, idx) => (
        <ResultItem key={`${item.seq}-${idx}`}>
          <Categories>
            {categories.map((c, idx2) => (
              <CategoryItem key={idx2}>
                {c.category1} ({c.category2})
              </CategoryItem>
            ))}
          </Categories>

          <Images>
            <ImageItem src={img.url} alt={img.name} />
          </Images>
        </ResultItem>
        ))
      })}
    </ResultList>
  )
}
