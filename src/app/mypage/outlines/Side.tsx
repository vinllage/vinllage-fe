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
        홈
      </Link>
      <Link
        href="/mypage/profile"
        className={classNames({ on: urlPath.startsWith('/mypage/profile') })}
      >
        내 프로필
      </Link>
      <Link
        href="/mypage/recycle"
        className={classNames({ on: urlPath.startsWith('/mypage/recycle') })}
      >
        분리수거 결과 보기
      </Link>
    </StyledAside>
  )
}

export default React.memo(Side)
