'use client'

import React from 'react'
import styled from 'styled-components'
import UserOnlyContainer from '@/app/_global/wrappers/UserOnlyContainer'
import Side from './outlines/Side'
import color from '@/app/_global/styles/color'

const { light } = color

/** 전체 레이아웃 */
const Layout = styled.div`
  display: flex;
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

/** 사이드바 영역 */
const SideWrapper = styled.aside`
  width: 240px;
  background: ${light};

  @media (max-width: 768px) {
    width: 100%;
  }
`

/** 본문 영역 */
const Main = styled.main`
  flex: 1;
  padding: 40px;
  background: ${light};

  @media (max-width: 768px) {
    padding: 20px;
  }
`

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserOnlyContainer>
      <Layout>
        <SideWrapper>
          <Side />
        </SideWrapper>
        <Main>{children}</Main>
      </Layout>
    </UserOnlyContainer>
  )
}
