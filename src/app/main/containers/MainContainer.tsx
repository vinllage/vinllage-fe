'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import LayerPopup from '@/app/_global/components/LayerPopup'
import ContentBox from '@/app/_global/components/ContentBox'
import NoticeModal from '@/app/main/_components/NoticeModal'
import type { BoardDataType } from '@/app/board/_types/BoardType'
import useFetchCSR from '@/app/_global/hooks/useFetchCSR'
import styled from 'styled-components'
import { FaRecycle } from 'react-icons/fa'
import { motion } from 'framer-motion'

import {
  PageWrapper,
  MainSection,
  Counter,
  SubText,
  StyledButton,
} from './MainContainerStyle'
import BaseRotatingText from '@/app/_global/components/BaseRotatingText'

const TextWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  font-size: 13rem;
  font-weight: bold;

  margin-bottom: 400px;

  .fixed-text {
    margin-right: 30px;
  }
`

const RotatingTextWrapper = styled.div`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 12px;
  background-color: #000;
  overflow: hidden;
  transition: width 0.4s ease;
  white-space: nowrap;
`

const HiddenMeasure = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: nowrap;

  padding: 6px 12px;
`

const RotatingText = styled(BaseRotatingText)`
  color: #fff;

  .text-rotate {
    display: flex;
    flex-wrap: wrap;
    white-space: pre-wrap;
    position: relative;
    overflow: hidden;
  }

  .text-rotate-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .text-rotate-word {
    display: inline-flex;
  }

  .text-rotate-lines {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .text-rotate-element {
    display: inline-block;
  }

  .text-rotate-space {
    white-space: pre;
  }
`

export default function MainContainer() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [items, setItems] = useState<Array<BoardDataType>>([])
  const { fetchCSR, ready } = useFetchCSR()
  const onClick = useCallback(() => router.push('/recycle'), [router])

  const texts = [
    'Waste',
    'Environment',
    'Energy',
    'Resources',
    'Life',
    'Generations',
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  // width 계산용 ref
  const measureRef = useRef<HTMLSpanElement>(null)
  const [calculatedWidth, setCalculatedWidth] = useState(0)

  // 현재 텍스트가 바뀔 때마다 실제 width 측정
  useEffect(() => {
    if (measureRef.current) {
      setCalculatedWidth(measureRef.current.getBoundingClientRect().width + 30)
    }
  }, [currentIndex, texts])

  // 분리수거 횟수 가져오기
  useEffect(() => {
    if (!ready) return
    fetchCSR('/recycle/total-count')
      .then(async (res) => {
        if (res.ok) {
          console.log('res', res)
          return res.json()
        }
      })
      .then((data) => {
        console.log('data', data)
        setTotalCount(data ?? 0)
      })
      .catch((err) => {
        console.error(err)
        setTotalCount(0)
      })
  }, [ready])

  // 공지사항 글 최대 5개 가져오기
  useEffect(() => {
    fetchCSR('/board/list/notice?limit=5')
      .then(async (res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((data) => setItems(data.items ?? []))
      .catch((err) => {
        console.error(err)
        setItems([])
      })
  }, [])

  return (
    <PageWrapper>
      <NoticeModal items={items} />
      <LayerPopup
        isOpen={isOpen}
        title="공지사항"
        onClose={() => setIsOpen(false)}
      >
        <h3>내용</h3>
      </LayerPopup>

      <ContentBox width={720}>
        <MainSection>
          <TextWrapper>
            <div className="fixed-text dm-serif-display-regular-italic">
              Save
            </div>
            <RotatingTextWrapper
              className="caveat"
              style={{ width: calculatedWidth }}
            >
              <RotatingText
                texts={texts}
                onNext={(i: number) => setCurrentIndex(i)} // 현재 index 추적
                mainClassName="caveat"
                staggerFrom="last"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </RotatingTextWrapper>

            <HiddenMeasure className="caveat" ref={measureRef}>
              {texts[currentIndex]}
            </HiddenMeasure>
          </TextWrapper>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <SubText>촬영만으로 간편하게, 환경을 지켜보세요</SubText>
            <Counter>누적 분리수거 {totalCount}회</Counter>

            <StyledButton onClick={onClick}>
              분리수거 하기
              <div
                style={{
                  marginTop: '15px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <FaRecycle size={48} color="#28a745" />
              </div>
            </StyledButton>
          </motion.div>
        </MainSection>
      </ContentBox>
    </PageWrapper>
  )
}
