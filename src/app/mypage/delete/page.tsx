'use client'

import styled from 'styled-components'
import Link from 'next/link'
import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import { SubmitButton } from '@/app/_global/components/Buttons'
import { deleteMe } from '../_services/actions'

const DangerBox = styled.div`
  margin: 16px 0 20px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #ff6b6b;
  background: #fff5f5;
  color: #b00000;
  line-height: 1.6;
`
const Row = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
`
const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
`

export default function DeletePage() {
  return (
    <ContentBox width={520}>
      <MainTitle center="true">회원 탈퇴</MainTitle>

      <DangerBox>
        <strong>정말 탈퇴하시겠어요?</strong>
        <br />
        탈퇴 시 계정과 관련 데이터는 복구가 불가능합니다.
      </DangerBox>

      {/* 서버 액션을 form action으로 연결: 클라이언트 컴포넌트에서도 OK */}
      <form action={deleteMe} autoComplete="off">
        <Checkbox>
          <input type="checkbox" name="agree" required />
          <span>모든 데이터 삭제에 동의합니다.</span>
        </Checkbox>

        <Row>
          <Link href="/mypage/profile">취소</Link>
          <SubmitButton type="submit">영구 탈퇴</SubmitButton>
        </Row>
      </form>
    </ContentBox>
  )
}
