'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'

/** 에러 맵 타입을 배열로 통일 */
type FieldErrors = Record<string, string[]>

/** 백엔드 messages(문자열/배열 혼재)를 FieldErrors로 정규화 */
function normalize(
  messages?: Record<string, string | string[] | undefined>,
): FieldErrors {
  const out: FieldErrors = {}
  if (!messages) return out
  for (const [k, v] of Object.entries(messages)) {
    if (Array.isArray(v)) out[k] = v.map(String)
    else if (v != null) out[k] = [String(v)]
  }
  return out
}

/** 내 정보 조회 */
export async function getLoggedMember() {
  try {
    const token = (await cookies()).get('token')?.value
    if (!token) return

    const apiUrl = `${process.env.API_URL}/mypage`
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['loggedMember'] },
    })

    if (res.status === 200) return await res.json()
  } catch (err) {
    console.log('getLoggedMember() error:', err)
  }
}

/** 프로필 수정 */
export async function processProfile(
  prevErrors: FieldErrors,
  formData: FormData,
) {
  const errors: FieldErrors = {}

  // FormData -> params
  const params: Record<string, string | boolean> = {}
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('$ACTION_')) continue
    let v: string | boolean = value.toString()
    if (v === 'true' || v === 'false') v = v === 'true'
    params[key] = v
  }

  const addErr = (field: string, msg: string) => {
    ;(errors[field] ??= []).push(msg)
  }

  // 1) 필수값
  const requireMsgs: Record<string, string> = {
    name: '회원 이름을 입력하세요.',
    mobile: '휴대폰 번호를 입력하세요.',
  }
  for (const [field, msg] of Object.entries(requireMsgs)) {
    const val = params[field]
    if (!val || (typeof val === 'string' && !val.trim())) addErr(field, msg)
  }

  // 2) 비밀번호 확인
  const password = String(params.password ?? '').trim()
  const confirmPassword = String(params.confirmPassword ?? '').trim()
  if (password && password !== confirmPassword) {
    addErr('confirmPassword', '비밀번호가 일치하지 않습니다.')
  }

  // 클라이언트로 즉시 에러 반환
  if (Object.keys(errors).length) return errors

  try {
    const token = (await cookies()).get('token')?.value
    if (!token) return normalize({ global: '로그인이 필요합니다.' })

    // 서버에 보낼 payload 최소화
    const payload: any = {
      name: params.name,
      mobile: params.mobile,
    }
    if (password) {
      payload.password = password
      payload.confirmPassword = confirmPassword
    }

    const apiUrl = `${process.env.API_URL}/mypage/profile`
    const res = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    if (!res.ok) {
      // 백엔드 에러 포맷 정규화
      const json = await res.json().catch(() => ({} as any))
      return normalize(
        json.messages ?? { global: `프로필 수정 실패 (${res.status})` },
      )
    }
  } catch (err: any) {
    return normalize({ global: err?.message ?? '알 수 없는 오류' })
  }

  // 성공: 캐시 무효화 & 빈 에러 객체 반환
  revalidateTag('loggedMember')
  return {}
}

/** 회원 탈퇴 */
export async function deleteMe() {
  const token = (await cookies()).get('token')?.value
  if (!token) throw new Error('로그인이 필요합니다.')

  const apiUrl = `${process.env.API_URL}/mypage`
  const res = await fetch(apiUrl, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    const msg = await res.text().catch(() => '')
    throw new Error(`회원 탈퇴 실패 (${res.status}) ${msg}`)
  }

  ;(await cookies()).delete('token')
  redirect('/?logout=1')
}
