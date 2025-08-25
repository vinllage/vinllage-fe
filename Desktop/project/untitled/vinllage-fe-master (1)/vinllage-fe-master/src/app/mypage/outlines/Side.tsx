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

const StyledAside = styled.aside`
  background: #ccc;

  a {
    display: block;
    height: 55px;
    line-height: 54px;
    border-bottom: 1px solid ${dark};
    font-size: ${big};
    padding: 0 25px;
    font-weight: 500;
    color: ${dark};
    text-decoration: none;
  }

  a.on {
    background: ${dark};
    color: ${white};
  }
`

const Side = () => {
  const urlPath = usePathname()

  return (
    <StyledAside>
      <Link
        href="/mypage"
        className={classNames({ on: urlPath === '/mypage' })}
      >
        개인정보 수정
      </Link>
      <Link
        href="/mypage/delete"
        className={classNames({ on: urlPath === '/mypage/delete' })}
      >
        회원 탈퇴
      </Link>
      <Link
        href="/recycle/detect"
        className={classNames({ on: urlPath === '/recycle/detect' })}
      >
        분리수거 결과 보기
      </Link>
      <Link
        href="/mypage/statistics"
        className={classNames({ on: urlPath === '/mypage/statistics' })}
      >
        누적 통계 보기
      </Link>
    </StyledAside>
  )
}

export default React.memo(Side)
