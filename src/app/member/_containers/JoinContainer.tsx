'use client'
import React, { useActionState, useState, useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import { useSearchParams } from 'next/navigation'
import { processJoin } from '../_services/actions'
import JoinForm from '../_components/JoinForm'

type FormType = {
  gid: string
  email: string
  password: string
  confirmPassword: string
  name: string
  mobile: string
  termsAgree: boolean
  socialChannel?: string
  socialToken?: string | number
  profileImage?: any
  code?: string
}

const JoinContainer = () => {
  const searchParams = useSearchParams()

  const [errors, action, pending] = useActionState<any, any>(processJoin, {})
  const [form, setForm] = useState<FormType>({
    gid: uuid(),
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    mobile: '',
    termsAgree: false,
    socialChannel: searchParams.get('channel')?.toString(),
    socialToken: searchParams.get('token')?.toString(),
  })

  const [verified, setVerified] = useState(false)

  const onChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  const onToggle = useCallback(() => {
    setForm((prev) => ({ ...prev, termsAgree: !prev.termsAgree }))
  }, [])

  // 이메일 인증 코드 요청
  const sendCode = useCallback(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/send-code`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email: form.email }),
      },
    )
    if (res.ok) {
      alert('인증 코드가 이메일로 발송되었습니다.')
    } else {
      alert('코드 발송 실패')
    }
  }, [form.email])

  // 이메일 코드 검증
  const verifyCode = useCallback(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-code`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email: form.email, code: form.code || '' }),
      },
    )
    if (res.ok) {
      alert('이메일 인증 완료!')
      setVerified(true)
    } else {
      alert('코드 인증 실패')
    }
  }, [form.email, form.code])

  // 프로필 이미지 업로드 후 후속 처리
  const fileUploadCallback = useCallback((items) => {
    if (items && items.length > 0) {
      setForm((prev) => ({ ...prev, profileImage: items[0] }))
    }
  }, [])

  // 프로필 이미지 삭제 후 후속 처리
  const fileDeleteCallback = useCallback(() => {
    setForm((prev) => {
      const form = { ...prev }
      delete form.profileImage
      return form
    })
  }, [])

  return (
    <JoinForm
      errors={errors}
      action={action}
      pending={pending}
      onChange={onChange}
      onToggle={onToggle}
      fileUploadCallback={fileUploadCallback}
      fileDeleteCallback={fileDeleteCallback}
      form={form}
      sendCode={sendCode}
      verifyCode={verifyCode}
      verified={verified}
    />
  )
}

export default React.memo(JoinContainer)
