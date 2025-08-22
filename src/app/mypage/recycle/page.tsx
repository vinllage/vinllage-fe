'use client'

import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import RecycleContainer from '../_containers/RecycleContainer'

export default function MyPageRecyclePage() {
  return (
    <ContentBox width={720}>
      <MainTitle border="true">분리수거 결과 보기</MainTitle>
      <RecycleContainer />
    </ContentBox>
  )
}
