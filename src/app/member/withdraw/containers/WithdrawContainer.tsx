// app/member/withdraw/WithdrawContainer.tsx  (Client)
'use client'

import WithdrawComponent from '../_components/WithdrawComponent'
import styled from 'styled-components'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: calc(100vh - 200px);
  background: #fafafa;
`

export default function WithdrawContainer({
  loggedEmail,
}: {
  loggedEmail: string
}) {
  return (
    <PageWrapper>
      <h1>회원 탈퇴하기</h1>
      <WithdrawComponent loggedEmail={loggedEmail} />
    </PageWrapper>
  )
}
