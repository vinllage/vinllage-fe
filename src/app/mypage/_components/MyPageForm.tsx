'use client'

import React from 'react'
import styled from 'styled-components'
import { Input } from '@/app/_global/components/Forms'
import { SubmitButton } from '@/app/_global/components/Buttons'
import MessageBox from '@/app/_global/components/MessageBox'

const StyledForm = styled.form``

type MyPageFormProps = {
  form: {
    email: string
    password: string
    confirmPassword: string
    name: string
    mobile: string
  }
  errors: any
  pending: boolean
  action: any
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const renderErr = (v: any) => (Array.isArray(v) ? v.join('\n') : v ?? '')

const MyPageForm = ({
  form,
  errors,
  pending,
  action,
  onChange,
}: MyPageFormProps) => {
  return (
    <StyledForm action={action} autoComplete="off">
      <Input
        type="text"
        name="email"
        placeholder="이메일"
        value={form.email}
        onChange={onChange}
        disabled
      />
      {errors?.email && (
        <MessageBox color="danger">{renderErr(errors.email)}</MessageBox>
      )}

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

      <Input
        type="password"
        name="password"
        placeholder="비밀번호(변경 시 입력)"
        value={form.password}
        onChange={onChange}
      />
      {errors?.password && (
        <MessageBox color="danger">{renderErr(errors.password)}</MessageBox>
      )}

      <Input
        type="password"
        name="confirmPassword"
        placeholder="비밀번호 확인"
        value={form.confirmPassword}
        onChange={onChange}
      />
      {errors?.confirmPassword && (
        <MessageBox color="danger">
          {renderErr(errors.confirmPassword)}
        </MessageBox>
      )}

      {errors?.global && (
        <MessageBox color="danger">{renderErr(errors.global)}</MessageBox>
      )}

      <SubmitButton type="submit" disabled={pending}>
        정보 수정
      </SubmitButton>
    </StyledForm>
  )
}

export default React.memo(MyPageForm)
