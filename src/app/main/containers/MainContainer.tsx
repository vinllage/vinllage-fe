'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import LayerPopup from '@/app/_global/components/LayerPopup'
import { fetchRecycleCount } from '../services/actions'
import ContentBox from '@/app/_global/components/ContentBox'
import {
  PageWrapper,
  MainSection,
  Counter,
  SubText,
  StyledButton,
} from './MainContainerStyle'

export default function MainContainer() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  const onClick = useCallback(() => router.push('/recycle'), [router])

  useEffect(() => {
    fetchRecycleCount().then(setTotalCount)
  }, [])

  return (
    <PageWrapper>
      <LayerPopup
        isOpen={isOpen}
        title="공지사항"
        onClose={() => setIsOpen(false)}
      >
        <h3>내용</h3>
      </LayerPopup>

      <ContentBox width={720}>
        <MainSection>
          <SubText>촬영만으로 간편하게, 환경을 지켜보세요</SubText>
          <Counter>누적 분리수거 {totalCount}회</Counter>
          <StyledButton onClick={onClick}>분리수거 하기</StyledButton>
          <StyledButton onClick={() => setIsOpen(true)}>공지사항 열기</StyledButton>
        </MainSection>
      </ContentBox>
    </PageWrapper>
  )
}
