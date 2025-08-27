'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import sessionExpired from '../_global/assets/images/session_expired.png'
import styled from 'styled-components'

const ContentBox = styled.section`
  max-width: 400px;
  margin: 0 auto;
  padding: 40px 16px;
`

export default function SessionExpired() {
  const router = useRouter()

  useEffect(() => {
    //alert('세션이 만료되었습니다. 홈으로 이동합니다.')
    setTimeout(() => router.replace('/'), 1000)
    
  }, [router])

  return (
    <ContentBox>
      <Image
        src={sessionExpired}
        alt="세션이 만료되었습니다"
        width={400}
        height={400}
      />
      <h2>세션이 만료되었습니다. 홈으로 이동합니다.</h2>
    </ContentBox>
  )
}