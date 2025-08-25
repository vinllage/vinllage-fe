import React from 'react'
import styled from 'styled-components'
import color from '@/app/_global/styles/color'
import fontsize from '@/app/_global/styles/fontsize'
import { DetectedRecycle } from '../components/ResultList'
import recyclePlastic from '@/app/_global/assets/images/recycle_plastic.png'
import recycleVinyl from '@/app/_global/assets/images/recycle_vinyl.png'
import recycleCan from '@/app/_global/assets/images/recycle_can.png'
import recycleGlass from '@/app/_global/assets/images/recycle_glass.png'
import recyclePaper from '@/app/_global/assets/images/recycle_paper.png'


const recycleImages: Record<string, any> = {
  plastic: recyclePlastic,
  vinyl: recycleVinyl,
  can: recycleCan,
  glass: recycleGlass,
  paper: recyclePaper,
}

/* 스타일 정리 S */
const { secondary, black } = color
const { small, extra } = fontsize

const GuideWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`

const GuideItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  border: 1px solid ${black};
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 900px; 
`

const GuideImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 12px;
`

const GuideTitle = styled.div`
  font-size: ${extra};
  font-weight: bold; 
  text-align: center;
`

const SourceText = styled.div`
  margin-top: 8px;
  font-size: ${small};
  color: ${secondary};
  text-align: center;
`
/* 스타일 정리 E */

export default function RecycleGuide({ items }: { items: DetectedRecycle[] }) {
  // 전체 카테고리 수집
  const categories: { category1: string; category2: string }[] = []
  items.forEach((item) => {
    try {
      const parsed = JSON.parse(item.data || '[]')
      categories.push(...parsed)
    } catch {}
  })

  const uniqueCategories = Array.from(
    new Map(categories.map((c) => [c.category1, c])).values(),
    )

  const filteredCategories = uniqueCategories.filter(
    (c) => c.category1 !== 'sticker' && c.category2 !== '기타',
  )  

  return (
    <GuideWrapper>
      {filteredCategories.map((c, idx) => (
        <GuideItem key={idx}>
          <GuideTitle>
            {c.category2}
          </GuideTitle>

          {recycleImages[c.category1] ? (
            <>
              <GuideImage
                src={
                  recycleImages[c.category1].src ?? recycleImages[c.category1]
                }
                alt={`${c.category1} 가이드`}
              />
              <SourceText>출처: 한국소비자원</SourceText>
            </>
          ) : null}
        </GuideItem>
      ))}
    </GuideWrapper>
  )

}
