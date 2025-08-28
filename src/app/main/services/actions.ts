'use server'

import { cookies } from 'next/headers'

export const fetchRecycleCount = async (): Promise<number> => {
  try {
    const apiUrl = `${process.env.API_URL}/recycle/my-data`

    // 쿠키에서 JWT 토큰 추출
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    // API 요청
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })

    if (!res.ok) throw new Error('데이터 조회 실패')

    const data = await res.json() // { items, pagination }
    return data.items?.length || 0
  } catch (err) {
    console.error(err)
    return 0
  }
}
