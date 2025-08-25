'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  ResultComponents,
  type DetectedRecycle,
} from '../components/ResultList'
import { Button } from '@/app/_global/components/Buttons'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import color from '@/app/_global/styles/color'
import styled from 'styled-components'
import RecycleGuide from '../components/RecycleGuide'

const { dark } = color

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 80px;
`

const ResultNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
`

const GuideNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
`

const ArrowButton = styled(Button)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;

  svg {
    color: ${dark};
    font-size: 100px;
  }
`

type Pagination = { page: number; limit: number; total: number }
type ListData = { items: DetectedRecycle[]; pagination: Pagination }

const LIMIT = 3 // 추후에 변경 한번에 보여줄 데이터 갯수
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1'

export default function ResultContainer() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState<ListData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const searchParams = useSearchParams()
  const gid = searchParams.get('gid')

  useEffect(() => {
    if (!gid) return

    let alive = true
    ;(async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(
          `${BASE_URL}/recycle/result?page=${page}&limit=${LIMIT}&gid=${gid}`,
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
  }, [gid, page])

  const canPrev = page > 1
  const canNext = data
    ? data.pagination.page * data.pagination.limit < data.pagination.total
    : false

  if (loading && !data) return <div className="loading">로딩중…</div>
  if (error)
    return <div className="error">에러: {(error as Error)?.message}</div>

  return (
    <>
      <ResultWrapper>
        <ResultNav>
          <ArrowButton
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={!canPrev}
          >
            <BiLeftArrow />
          </ArrowButton>

          <ResultComponents items={data?.items ?? []} />

          <ArrowButton
            onClick={() => setPage((p) => p + 1)}
            disabled={!canNext}
          >
            <BiRightArrow />
          </ArrowButton>
        </ResultNav>
        <Link href="/recycle/detect">
          <Button>다시 찍기</Button>
        </Link>
      </ResultWrapper>

      <GuideNav>
        <RecycleGuide items={data?.items ?? []} />
      </GuideNav>
    </>
  )
}
