'use client'
import React from 'react'
import styled from 'styled-components'
import UserOnlyContainer from '../_global/wrappers/UserOnlyContainer'
import Side from './outlines/Side'
import MyPageContainer from './_containers/MyPageContainer'
import { MainTitle } from '../_global/components/TitleBox'

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`

const Main = styled.main`
  flex: 1;
  padding: 40px;
  background: #f9f9f9;
`

export default function Mypage() {
  return (
    <UserOnlyContainer>
      <Layout>
        <Side /> {/* 마이페이지 전용 사이드바 */}
        <Main>
          <MainTitle border="true">마이페이지</MainTitle>
          <MyPageContainer /> {/* 개인정보 수정 Form 연결 */}
        </Main>
      </Layout>
    </UserOnlyContainer>
  )
}
