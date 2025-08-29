import React, { useState } from 'react'
import styled from 'styled-components'
import { Input } from '@/app/_global/components/Forms'
import { SubmitButton } from '@/app/_global/components/Buttons'
import MessageBox from '@/app/_global/components/MessageBox'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const StyledForm = styled.form``

const LoginForm = ({ errors, action, pending, form, onChange }) => {
  const [showpassword, setShowPasword] = useState(false)
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
      <div>
        <Input
          type={showpassword ? 'text' : 'password'}
          name="password"
          placeholder="비밀번호를 입력하세요."
          value={form.password}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={() => setShowPasword((prve) => !prve)}
          aria-label={showpassword ? '비밀 버호 숨기기' : '비밀 번호 보기 '}
        >
          {showpassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
        </button>
      </div>
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
