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

const MyPageForm = ({ form, errors, pending, action, onChange }: MyPageFormProps) => {
  return (
    <StyledForm
      action={action}
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault()
        action(new FormData(e.currentTarget))
      }}
    >
      <Input type="text" name="email" placeholder="이메일" value={form.email} onChange={onChange} disabled />
      <MessageBox color="danger">{errors?.email}</MessageBox>

      <Input type="text" name="name" placeholder="이름" value={form.name} onChange={onChange} />
      <MessageBox color="danger">{errors?.name}</MessageBox>

      <Input type="text" name="mobile" placeholder="휴대폰" value={form.mobile} onChange={onChange} />
      <MessageBox color="danger">{errors?.mobile}</MessageBox>

      <Input type="password" name="password" placeholder="비밀번호" value={form.password} onChange={onChange} />
      <MessageBox color="danger">{errors?.password}</MessageBox>

      <Input type="password" name="confirmPassword" placeholder="비밀번호 확인" value={form.confirmPassword} onChange={onChange} />
      <MessageBox color="danger">{errors?.confirmPassword}</MessageBox>

      <MessageBox color="danger">{errors?.global}</MessageBox>

      <SubmitButton type="submit" disabled={pending}>정보 수정</SubmitButton>
    </StyledForm>
  )
}

export default React.memo(MyPageForm)
