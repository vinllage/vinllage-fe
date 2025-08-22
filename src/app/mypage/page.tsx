'use client'

import React, { useEffect, useContext } from 'react'
import { MainTitle } from '@/app/_global/components/TitleBox'
import MyPageForm from './_components/MyPageForm'
import useUser from '@/app/_global/hooks/useUser'
import CommonContext from '@/app/_global/contexts/CommonContext'

export default function ProfilePage() {
  const { loggedMember } = useUser()
  const { actions } = useContext(CommonContext)

  useEffect(() => {
    if (loggedMember) {
      // mainTitle을 항상 문자열로만 넘김
      actions.setMainTitle(`${loggedMember.name}님 환영합니다`)
    }
  }, [loggedMember, actions])

  return (
    <>
      <MainTitle border="true">
        <span className="badge">
          {loggedMember.name}님, 환영합니다.
        </span>
      </MainTitle>
      <MyPageForm />
    </>
  )
}
