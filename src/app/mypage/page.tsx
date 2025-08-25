'use client'

import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import MyPageForm from './_components/MyPageForm'
import RecycleStats from './_containers/RecycleStats'
import useUser from '@/app/_global/hooks/useUser'
import { useEffect, useContext } from 'react'
import CommonContext from '@/app/_global/contexts/CommonContext'

export default function MyProfilePage() {
  const { loggedMember } = useUser()
  const { actions } = useContext(CommonContext)

  useEffect(() => {
    if (loggedMember) {
      actions.setMainTitle(`${loggedMember.name}님 환영합니다`)
    }
  }, [loggedMember, actions])

  return (
    <ContentBox width={720}>
      <MainTitle border="true">내 프로필</MainTitle>
      <MyPageForm />
      <RecycleStats />
    </ContentBox>
  )
}
