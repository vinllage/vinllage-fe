'use client'

import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import { Button } from './_global/components/Buttons'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import LayerPopup from './_global/components/LayerPopup'

export default function MainPage() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const onClick = useCallback(() => {
    router.push('/recycle')
  }, [router])

  return (
    <>
      <button type='button' onClick={() => setIsOpen(true)}>
        열기
      </button>
      <LayerPopup
        isOpen={isOpen}
        title='제목 테스트'
        onClose={() => setIsOpen(false)}
      >
        <h3>내용</h3>
      </LayerPopup>
    <ContentBox width={500}>
      <MainTitle center="true">메인 페이지</MainTitle>
      <Button onClick={onClick}>분리수거 하기</Button>
    </ContentBox>
    </>
  )
}
