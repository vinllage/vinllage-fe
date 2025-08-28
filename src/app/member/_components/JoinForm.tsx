import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { Input } from '@/app/_global/components/Forms'
import { SubmitButton } from '@/app/_global/components/Buttons'
import MessageBox from '@/app/_global/components/MessageBox'
import FileUpload from '@/app/_global/components/FileUpload'
import FileImages from '@/app/_global/components/FileImages'
import color from '@/app/_global/styles/color'
import { passwordStrenthLevel } from '@/app/_global/libs/commons'
import { FaEye } from 'react-icons/fa'


import { launchBus } from 'pm2'

const StyledForm = styled.form`
  .message {
    margin-bottom: 10px;
  }
`
const passowrdColor= (level1: number)=>{
  if(level1 <= 2) return color.danger // 위험
  if(level1 <=4) return color.warning // 경고 
  if(level1 <=6) return color.primary// 중요한 
  return color.success
}

// 비밀 번호 강도에 맞는 색상 지정
const PasswordStrenth = styled.ul<{level: number}>`
  display: flex;
  background: #ddd;
  height: 15px;
  width: 50%;
  li {
    width: calc(100% / 6 - 2px);
    margin-right: 2px;
    transition: background 0.3s;
    background: ${({level})=> passowrdColor(level)};
  }

`
const JoinForm = ({
  errors,
  action,
  pending,
  onChange,
  onToggle,
  form,
  fileUploadCallback,
  fileDeleteCallback,
  sendCode,
  verifyCode,
  verified,
  sendState,
}) => {
  const [passwordStrenth, setPasswordStrenth] = useState(0)
  // 비밀 번호 강도 레벨 에 맞게 하는 것
  useEffect(() => {
    if (form.password) {
      setPasswordStrenth(passwordStrenthLevel(form.password))
    } else {
      setPasswordStrenth(0)
    }
  }, [form.password])

  return (
    <StyledForm action={action} autoComplete="off">
      <input type="hidden" name="gid" value={form.gid} />
      <input type="hidden" name="termsAgree" value={form.termsAgree} />

      {form.socialChannel && form.socialToken && (
        <>
          <input
            type="hidden"
            name="socialChannel"
            value={form.socialChannel}
          />

          <input type="hidden" name="socialToken" value={form.socialToken} />
          <div>{form.socialChannel} 계정 연결 회원가입</div>
        </>
      )}

      <div className="email-row">
        <Input
          type="text"
          name="email"
          placeholder="이메일을 입력하세요"
          value={form.email}
          onChange={onChange}
          disabled={verified}
        />
        {verified && <input type="hidden" name="email" value={form.email} />}
        <button
          type="button"
          onClick={sendCode}
          disabled={verified || sendState === 'loading'}
        >
          {verified
            ? '인증완료'
            : sendState === 'loading'
            ? '발송 중...'
            : sendState === 'sent'
            ? '재전송'
            : '메일 발송'}
        </button>
      </div>
      <MessageBox color="danger">{errors?.email}</MessageBox>

      {!verified && (
        <div className="email-row">
          <Input
            type="text"
            name="code"
            placeholder="인증 코드 입력"
            value={form.code || ''}
            onChange={onChange}
          />
          <button type="button" onClick={verifyCode}>
            확인
          </button>
        </div>
      )}

      {(!form?.socialChannel || !form?.socialToken) && (
        <>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요."
            value={form.password}
            onChange={onChange}
            maxLength={16}
          />
          <PasswordStrenth level={passwordStrenth}>
            {Array.from({ length: passwordStrenth }).map((_, i) => (
              <li key={'password-strenth-' + i}></li>
            ))}
          </PasswordStrenth>
          <MessageBox color="danger">{errors?.password}</MessageBox>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 확인하세요."
            value={form.confirmPassword}
            onChange={onChange}
          />

          <MessageBox color="danger">{errors?.confirmPassword}</MessageBox>
        </>
      )}
      <Input
        type="text"
        name="name"
        placeholder="회원이름을 입력하세요."
        value={form.name}
        onChange={onChange}
      />
      <MessageBox color="danger">{errors?.name}</MessageBox>

      <Input
        type="text"
        name="mobile"
        placeholder="휴대전화번호를 입력하세요."
        value={form.mobile}
        onChange={onChange}
      />
      <MessageBox color="danger">{errors?.mobile}</MessageBox>

      <h3>프로필 이미지</h3>

      <FileImages
        items={form.profileImage}
        callback={fileDeleteCallback}
        viewOrgImage={true}
      />
      <FileUpload
        gid={form.gid}
        imageOnly={true}
        single={true}
        callback={fileUploadCallback}
      />

      <h3>약관동의</h3>
      <div>약관 동의 작성...</div>
      <div className="terms-agree" onClick={onToggle}>
        {form.termsAgree ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />} 회원가입
        약관에 동의합니다.
      </div>
      <MessageBox color="danger">{errors?.termsAgree}</MessageBox>

      <SubmitButton type="submit" disabled={pending}>
        가입하기
      </SubmitButton>
      <MessageBox color="danger">{errors?.global}</MessageBox>
    </StyledForm>
  )
}

export default React.memo(JoinForm)
