// app/mypage-recycle-page.tsx
import { cookies } from 'next/headers'
import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import RecycleList from '../_components/RecycleList'

type FileInfo = {
  seq: number
  fileUrl: string
  thumbBaseUrl?: string
  originalFilename: string
  uploadedAt?: string
  sizeBytes?: number
}

async function fetchRecycleFiles(): Promise<FileInfo[]> {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString()

  const apiBase = process.env.API_URL?.replace(/\/$/, '')
  if (!apiBase) {
    console.error('API_URL is not set')
    return []
  }

  const url = `${apiBase}/mypage/recycle/files`

  const res = await fetch(url, {
    headers: {
      cookie: cookieHeader,
      accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    console.error('Failed to load recycle files', {
      status: res.status,
      statusText: res.statusText,
      body,
      url,
    })
    return []
  }

  const data = await res.json().catch(() => [])
  return Array.isArray(data) ? data : []
}

export default async function MyPageRecyclePage() {
  const files = await fetchRecycleFiles()

  return (
    <ContentBox width={880}>
      <MainTitle center>내 분리수거 이미지</MainTitle>

      {files.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777', margin: '36px 0' }}>
          저장된 분리수거 이미지가 없습니다.
        </p>
      ) : (
        <RecycleList files={files} />
      )}
    </ContentBox>
  )
}
