'use client'

import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import { Button } from './_global/components/Buttons'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

export default function MainPage() {
  const router = useRouter()

  const onClick = useCallback(() => {
    router.push('/recycle')
  }, [router])

  return (
    <ContentBox width={500}>
      <MainTitle center="true">메인 페이지</MainTitle>
      <Button onClick={onClick}>분리수거 하기</Button>
    </ContentBox>
  )
}
