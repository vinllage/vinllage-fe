import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Input } from '@/app/_global/components/Forms'
import { SubmitButton } from '@/app/_global/components/Buttons'
import MessageBox from '@/app/_global/components/MessageBox'
import useAlertDialog from '@/app/_global/hooks/useAlertDialog'

const StyledForm = styled.form``

const LoginForm = ({ errors, action, pending, form, onChange }) => {
  const alertDialog = useAlertDialog()

  const [emailErrors, setErrors] = useState<any>({})
  const [sendState, setSendState] = useState<'idle' | 'loading' | 'sent'>(
    'idle',
  )

  const findPassword = useCallback(async () => {
    const newErrors: any = {}

    if (!form.email || !form.email.trim()) {
      newErrors.email = '이메일을 입력하세요.'
      setErrors(newErrors)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.'
      setErrors(newErrors)
      return
    }

    // 검증 통과했으면 기존 에러 제거
    setErrors((prev: any) => {
      const copy = { ...prev }
      delete copy.email
      return copy
    })

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/send-code`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      },
    )
    if (res.ok) {
      alertDialog.success('인증 코드가 이메일로 발송되었습니다.', () =>
        setSendState('sent'),
      )
    } else {
      const data = await res.json()

      // 백엔드에서 내려온 에러 메시지를 errors에 세팅
      setErrors((prev: any) => ({ ...prev, ...data.messages }))
      setSendState('idle')
    }
  }, [])

  return (
    <StyledForm action={action} autoComplete="off">
      <input type="hidden" name="redirectUrl" value={form.redirectUrl ?? ''} />
      <Input
        type="text"
        name="email"
        placeholder="이메일을 입력하세요."
        value={form.email}
        onChange={onChange}
      />
      <MessageBox color="danger">{errors?.email}</MessageBox>

      <Input
        type="password"
        name="password"
        placeholder="비밀번호를 입력하세요."
        value={form.password}
        onChange={onChange}
      />
      <MessageBox color="danger">{errors?.password}</MessageBox>

      <a href="/member/find-password">비밀번호 찾기</a>

      <SubmitButton type="submit" disabled={pending}>
        로그인
      </SubmitButton>

      <MessageBox color="danger">{errors?.global}</MessageBox>
    </StyledForm>
  )
}

export default React.memo(LoginForm)
