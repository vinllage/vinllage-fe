'use client'

import React from 'react'
import styled from 'styled-components'
import { Input } from '@/app/_global/components/Forms'
import { SubmitButton } from '@/app/_global/components/Buttons'
import MessageBox from '@/app/_global/components/MessageBox'

const StyledForm = styled.form`
  max-width: 500px;
  margin: 0 auto;
`

type ProfileFormProps = {
  form: {
    email: string
    name: string
    mobile: string
    password: string
    confirmPassword: string
  }
  errors: any
  pending: boolean
  action: any
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const renderErr = (v: any) => (Array.isArray(v) ? v[0] : v ?? '')

const ProfileForm = ({
  form,
  errors,
  pending,
  action,
  onChange,
}: ProfileFormProps) => {
  return (
    <StyledForm action={action} autoComplete="off">
      {/* 이메일 (수정 불가, 기본값 있음) */}
      <Input
        type="email"
        name="email"
        placeholder="이메일"
        value={form.email}
        onChange={onChange}
        disabled
      />
      {errors?.email && (
        <MessageBox color="danger">{renderErr(errors.email)}</MessageBox>
      )}

      {/* 이름 (기본값 있음) */}
      <Input
        type="text"
        name="name"
        placeholder="이름"
        value={form.name}
        onChange={onChange}
      />
      {errors?.name && (
        <MessageBox color="danger">{renderErr(errors.name)}</MessageBox>
      )}

      {/* 휴대폰 */}
      <Input
        type="text"
        name="mobile"
        placeholder="휴대폰"
        inputMode="numeric"
        pattern="\d*"
        value={form.mobile}
        onChange={onChange}
      />
      {errors?.mobile && (
        <MessageBox color="danger">{renderErr(errors.mobile)}</MessageBox>
      )}

      {/* 비밀번호 */}
      <Input
        type="password"
        name="password"
        placeholder="비밀번호 (변경 시 입력)"
        value={form.password}
        onChange={onChange}
      />
      {errors?.password && (
        <MessageBox color="danger">{renderErr(errors.password)}</MessageBox>
      )}

      {/* 비밀번호 확인 */}
      <Input
        type="password"
        name="confirmPassword"
        placeholder="비밀번호 확인"
        value={form.confirmPassword}
        onChange={onChange}
      />
      {errors?.confirmPassword && (
        <MessageBox color="danger">{renderErr(errors.confirmPassword)}</MessageBox>
      )}

      {/* 글로벌 에러 */}
      {errors?.global && (
        <MessageBox color="danger">{renderErr(errors.global)}</MessageBox>
      )}

      {/* 제출 버튼 */}
      <SubmitButton type="submit" disabled={pending}>
        {pending ? '저장 중...' : '정보 수정'}
      </SubmitButton>
    </StyledForm>
  )
}

export default React.memo(ProfileForm)
