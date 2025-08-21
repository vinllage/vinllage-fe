'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getLoggedMember } from '@/app/member/_services/actions'

/**
 * 감지된 분리수거 데이터 저장 처리
 */
export async function processDetectData(formData: FormData) {
  try {
    const apiUrl = `${process.env.API_URL}/recycle`

    const res = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      // 에러 응답일 때 서버에서 오는 메시지 꺼내기
      const { messages } = await res.json().catch(() => ({}))
      return messages ?? { global: `Upload failed with ${res.status}` }
    }

    // 정상 저장된 경우
    const data = await res.json()
    return data // { gid, count, ids: [...] }
  } catch (err: any) {
    // 네트워크 에러 등
    return { global: err?.message }
  }
}

/**
 * Recycle 페이지 진입 시
 * - 회원: 항상 허용
 * - 비회원: 횟수 제한
 */
const MAX_GUEST_ATTEMPTS = 3
export async function processRecycle() {
  const cookie = await cookies()
  const member = await getLoggedMember()

  // 로그인되어 있으면 바로 리다이렉트
  if (member) {
    redirect('/recycle/detect?reload=true')
  }

  // 쿠키 옵션 (로컬 http에서는 secure=false)
  const base = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30일
  }

  // 게스트 ID 없으면 발급
  if (!cookie.get('guestId')) {
    cookie.set('guestId', crypto.randomUUID(), base)
  }

  // 현재 카운트
  const curr = cookie.get('guestCount')?.value
  const count = curr ? parseInt(curr, 10) : 0

  // 허용 횟수 넘어가면 로그인 페이지로 이동
  if (count >= MAX_GUEST_ATTEMPTS) {
    redirect('/member/login?reload=true')
  }

  // 페이지 이동
  redirect('/recycle/detect?reload=true')
}
