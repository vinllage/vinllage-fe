'use server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'

/**
 * 회원 정보 수정 처리
 */
export async function processProfile(errors: any, formData: FormData) {
  errors = {}
  const params: any = {}

  // FormData를 객체로 변환
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('$ACTION_')) continue
    let _value: string | boolean = value.toString()
    if (['true', 'false'].includes(_value)) _value = _value === 'true'
    params[key] = _value
  }

  let hasErrors = false

  const requiredFields = {
    name: '회원 이름을 입력하세요.',
    mobile: '휴대폰 번호를 입력하세요.',
  }

  for (const [field, message] of Object.entries(requiredFields)) {
    if (!params[field] || (typeof params[field] === 'string' && !params[field].trim())) {
      errors[field] = errors[field] ?? []
      errors[field].push(message)
      hasErrors = true
    }
  }

  const password = params.password?.trim()
  if (password && password !== params.confirmPassword?.trim()) {
    errors.confirmPassword = errors.confirmPassword ?? []
    errors.confirmPassword.push('비밀번호가 일치하지 않습니다.')
    hasErrors = true
  }

  if (hasErrors) return errors

  try {
    const cookie = await cookies()
    const token = cookie.get('token')?.value
    if (!token) return { global: '로그인이 필요합니다.' }

    const apiUrl = `${process.env.API_URL}/member`
    const res = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    })

    if (res.status !== 200) {
      const { messages } = await res.json()
      return messages
    }
  } catch (err: any) {
    return { global: err?.message }
  }

  revalidateTag('loggedMember')
}

/**
 * 로그인한 회원 정보 조회
 */
export async function getLoggedMember() {
  try {
    const cookie = await cookies()
    const token = cookie.get('token')?.value
    if (!token) return

    const apiUrl = `${process.env.API_URL}/member`
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['loggedMember'] },
    })

    if (res.status === 200) {
      return await res.json()
    }
  } catch (err) {
    console.log('getLoggedMember() error:', err)
  }
}