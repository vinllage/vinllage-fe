'use client'

import UserOnlyContainer from '../_global/wrappers/UserOnlyContainer'
import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import './mypage.css'

export default function MyPage() {
  return (
    <UserOnlyContainer>
      <ContentBox width={720}>
        <MainTitle border="true">내 프로필</MainTitle>
      </ContentBox>
    </UserOnlyContainer>
  )
}
