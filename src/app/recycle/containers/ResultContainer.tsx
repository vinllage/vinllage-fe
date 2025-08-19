'use client'

import React, { useEffect, useState } from 'react'
import { ResultComponents, type RecycleResult } from '../components/ResultList'
import { Button } from '@/app/_global/components/Buttons'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import color from '@/app/_global/styles/color'

const { dark, light } = color
type Pagination = { page: number; limit: number; total: number }
type ListData = { items: RecycleResult[]; pagination: Pagination }

const LIMIT = 3 // 추후에 변경 한번에 보여줄 데이터 갯수
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000'

export default function ResultContainer() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState<ListData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(
          `${BASE_URL}/api/v1/recycle/list?page=${page}&limit=${LIMIT}`,
          { cache: 'no-store' },
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json: ListData = await res.json()
        if (alive) setData(json)
      } catch (e) {
        if (alive) setError(e)
      } finally {
        if (alive) setLoading(false)
      }
    })()

    return () => {
      alive = false
    }
  }, [page])

  const canPrev = page > 1
  const canNext = data
    ? data.pagination.page * data.pagination.limit < data.pagination.total
    : false

  if (loading && !data) return <div className="loading">로딩중…</div>
  if (error)
    return <div className="error">에러: {(error as Error)?.message}</div>

  return (
    <div className="resultWrapper">
      <div className="resultNav">
        <Button
          width={40}
          height={40}
          color={light}
          fontColor={dark}
          fontSize="30px"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={!canPrev}
        >
          <BiLeftArrow />
        </Button>

        <ResultComponents items={data?.items ?? []} />

        <Button
          width={40}
          height={40}
          color={light}
          fontColor={dark}
          fontSize="30px"
          onClick={() => setPage((p) => p + 1)}
          disabled={!canNext}
        >
          <BiRightArrow />
        </Button>
      </div>
      <Button>다시 찍기</Button>
    </div>
  )
}
