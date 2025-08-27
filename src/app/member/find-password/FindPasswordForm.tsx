'use client'

import React, { useState, useCallback } from 'react'
import { Input } from '@/app/_global/components/Forms'
import { SubmitButton } from '@/app/_global/components/Buttons'
import MessageBox from '@/app/_global/components/MessageBox'
import useAlertDialog from '@/app/_global/hooks/useAlertDialog'

const FindPasswordForm = () => {
  const alertDialog = useAlertDialog()
  const [email, setEmail] = useState('')
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

      setLoading(true)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/member/find-pw`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        },
      )
      setLoading(false)

      if (res.ok) {
        alertDialog.success('임시 비밀번호가 이메일로 발송되었습니다.')
      } else {
        const data = await res.json()
        setError(data.message ?? '비밀번호 찾기 요청에 실패했습니다.')
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
        {loading ? '처리 중...' : '임시 비밀번호 발급'}
      </SubmitButton>
    </form>
  )
}

export default React.memo(FindPasswordForm)
