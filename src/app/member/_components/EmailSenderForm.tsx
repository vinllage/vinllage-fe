'use client'

import React, { useState, useCallback } from 'react'
import { Input } from '@/app/_global/components/Forms'
import { SubmitButton } from '@/app/_global/components/Buttons'
import MessageBox from '@/app/_global/components/MessageBox'
import useAlertDialog from '@/app/_global/hooks/useAlertDialog'

type EmailSenderFormProps = {
  mappingValue: '/member/find-pw' | '/auth/send-code'
  verifyCode?: (form: { email: string; code: string }) => void | Promise<void>
  loggedEmail?: string
}

const EmailSenderForm = ({
  mappingValue,
  verifyCode,
  loggedEmail,
}: EmailSenderFormProps) => {
  const alertDialog = useAlertDialog()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError(undefined)

      if (!email.trim()) {
        setError('이메일을 입력하세요.')
        return
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setError('올바른 이메일 형식이 아닙니다.')
        return
      }
      if (email != loggedEmail) {
        setError('등록된 이메일 정보와 일치하지 않습니다.')
        return
      }

      setLoading(true)

      const bodyData =
        mappingValue == '/member/find-pw'
          ? JSON.stringify({ email })
          : JSON.stringify({
              email,
              type: 'WITHDRAWAL_VERIFICATION',
            })

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${mappingValue}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },

          body: bodyData,
        },
      )

      setLoading(false)

      if (res.ok) {
        mappingValue == '/member/find-pw'
          ? alertDialog.success('임시 비밀번호가 이메일로 발송되었습니다.')
          : alertDialog.success('탈퇴 인증 번호가 이메일로 발송되었습니다.')
      } else {
        const data = await res.json()
        mappingValue == '/member/find-pw'
          ? setError(data.message ?? '비밀번호 찾기 요청에 실패했습니다.')
          : setError(data.message ?? '탈퇴 인증 번호 전송 요청에 실패했습니다.')
      }
    },
    [email, alertDialog],
  )

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="email"
        placeholder="이메일을 입력하세요."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <MessageBox color="danger">{error ?? ''}</MessageBox>

      <SubmitButton type="submit" disabled={loading}>
        {loading
          ? '처리 중...'
          : mappingValue === '/member/find-pw'
          ? '임시 비밀번호 발급'
          : '탈퇴 인증 번호 발급'}
      </SubmitButton>

      {/* 탈퇴 인증 시 코드 입력 칸 추가 */}
      {mappingValue == '/auth/send-code' ? (
        <>
          <Input
            type="text"
            name="code"
            placeholder="코드를 입력하세요"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <MessageBox color="danger">{error ?? ''}</MessageBox>

          <button type="button" onClick={() => verifyCode?.({ email, code })}>
            확인
          </button>
        </>
      ) : (
        <></>
      )}
    </form>
  )
}

export default React.memo(EmailSenderForm)
