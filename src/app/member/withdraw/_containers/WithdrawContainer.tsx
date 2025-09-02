'use client'

import WithdrawComponent from '../_components/WithdrawComponent'

export default function WithdrawContainer({
  loggedEmail,
}: {
  loggedEmail: string
}) {
  return (
    <>
      <h1>회원 탈퇴하기</h1>
      <WithdrawComponent loggedEmail={loggedEmail} />
    </>
  )
}
