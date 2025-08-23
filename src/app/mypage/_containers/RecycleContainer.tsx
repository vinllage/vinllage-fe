'use client'

import React, { useEffect, useState } from 'react'
import { RecycleList, DetectedRecycle } from '../_components/RecycleList'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

export default function RecycleContainer() {
  const [items, setItems] = useState<DetectedRecycle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  return <RecycleList items={items} />
}
