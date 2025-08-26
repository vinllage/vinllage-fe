export const fetchRecycleCount = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/mypage/recycle/files`,
      { cache: 'no-store' }
    )
    if (!res.ok) throw new Error('데이터 조회 실패')
    const data = await res.json()
    return data.items?.length || 0
  } catch (e) {
    console.error(e)
    return 0
  }
}
