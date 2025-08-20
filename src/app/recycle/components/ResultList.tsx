import React from 'react'
import styled from 'styled-components'
import color from '@/app/_global/styles/color'

export type RecycleResult = {
  rid: number
  topConfidence: number
  topJson: string | null
}

const { dark } = color

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
  border: 2px solid ${dark};
  border-radius: 12px;
  padding: 12px;

  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
`

export function ResultComponents({ items }: { items: RecycleResult[] }) {
  if (!items?.length) {
    return <div className="noData">데이터가 없습니다.</div>
  }

  return (
    <ResultList>
      {items.map((item) => (
        <ResultItem key={item.rid}>
          <div className="rid">{item.rid}번</div>
          <div className="confidence">
            신뢰도 : {item.topConfidence?.toFixed(3)}
          </div>
          <div className="topJson">{item.topJson ?? '-'}</div>
        </ResultItem>
      ))}
    </ResultList>
  )
}
