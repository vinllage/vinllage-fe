'use client'

import React from 'react'
import { MainTitle } from '@/app/_global/components/TitleBox'
import MyPageContainer from '../_containers/MyPageContainer'
import { FaOtter } from 'react-icons/fa'
import Footer from '@/app/_global/outlines/Footer'

export default function ProfileUpdatePage() {
  return (
    <>
      <MainTitle border="true">프로필 수정</MainTitle>
      <MyPageContainer />
    </>
  )
}
