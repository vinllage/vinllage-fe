'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import styled from 'styled-components'
import color from '@/app/_global/styles/color'
import fontsize from '@/app/_global/styles/fontsize'
import Link from 'next/link'
const { dark, white } = color
const { big } = fontsize

const MyPageSide = styled.aside`
  background: #ccc;
  a {
    display: block;
    height: 55px;
    line-height: 54px;
    border-bottom: 1px solid ${dark};
    font-size: ${big};
    padding: 0 25px;
    font-weight: 500;
  }
  a.on {
    background: ${dark};
    color: ${white};
  }
`

const Side = () => {
  const urlPath = usePathname()
  return (
    <MyPageSide>
      <Link
        href="/mypage"
        className={classNames({ on: urlPath === '/mypage' })}
      >
        홈
      </Link>
      <Link
        href="/mypage/profile"
        className={classNames({ on: urlPath === '/mypage/profile' })}
      >
        개인 정보
      </Link>
      <Link
        href="/mypage/recycle"
        className={classNames({ on: urlPath === '/mypage/recycle' })}
      >
        분리수거 결과 보기
      </Link>
    </MyPageSide>
  )
}



export default React.memo(Side)
