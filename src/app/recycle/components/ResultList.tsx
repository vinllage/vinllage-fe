import React from 'react'

export type RecycleResult = {
  rid: number
  topConfidence: number
  topJson: string | null
}

export function ResultComponents({ items }: { items: RecycleResult[] }) {
  if (!items?.length) {
    return <div className="noData">데이터가 없습니다.</div>
  }

  return (
    <div className="resultList">
      {items.map((item) => (
        <div key={item.rid} className="resultItem">
          <div className="rid">{item.rid}번</div>
          <div className="confidence">
            신뢰도 : {item.topConfidence?.toFixed(3)}
          </div>
          <div className="topJson">{item.topJson ?? '-'}</div>
        </div>
      ))}
    </div>
  )
}
