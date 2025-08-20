'use client'

import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import { Button } from './_global/components/Buttons'
import Link from 'next/link'
import { useCallback } from 'react'
import { processRecycle } from './recycle/_services/actions'

export default function MainPage() {
  const onClick = useCallback(() => {
    processRecycle()
  }, [])

  return (
    <ContentBox width={500}>
      <MainTitle center="true">메인 페이지</MainTitle>
      <Button onClick={onClick}>분리수거 하기</Button>
    </ContentBox>
  )
}
