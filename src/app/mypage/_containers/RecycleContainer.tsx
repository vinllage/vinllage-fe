'use client'

import React, { useEffect, useState } from 'react'
import { RecycleList, DetectedRecycle } from '../_components/RecycleList'
import Pagination from '@/app/_global/components/Pagination'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

export default function RecycleContainer() {
  const [items, setItems] = useState<DetectedRecycle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /** 페이지네이션 상태 */
  const [page, setPage] = useState(1)
  const pageSize = 12 // 한 페이지당 보여줄 개수
  const totalPages = Math.ceil(items.length / pageSize)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/mypage/recycle/files`, {
          cache: 'no-store',
        })
        if (!res.ok) throw new Error('데이터 조회 실패')
        const data = await res.json()
        setItems(data.items || [])
      } catch (err: any) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <p>로딩 중...</p>
  if (error) return <p>에러: {error}</p>

  /** 현재 페이지 데이터 */
  const currentItems = items.slice((page - 1) * pageSize, page * pageSize)

  const pagination = {
    pages: Array.from({ length: totalPages }, (_, idx) => {
      const num = (idx + 1).toString()
      return [num, `?page=${num}`] as [string, string]
    }),
    page,
    prevRangePage: page > 1 ? page - 1 : 0,
    nextRangePage: page < totalPages ? page + 1 : 0,
    lastPage: totalPages,
    baseUrl: '?page=',
  }

  return (
    <>
      <RecycleList items={currentItems} />
      <Pagination pagination={pagination} onClick={setPage} />
    </>
  )
}
