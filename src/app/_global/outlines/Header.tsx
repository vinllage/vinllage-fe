'use client'
import React from 'react'
import styled from 'styled-components'
import logo from '../assets/images/logo.png'
import Image from 'next/image'
import Link from 'next/link'


const StyledHeader = styled.header`
  background: #fff;

  .inner {
    display: flex;
    align-items: center;
    height: 120px;

    div {
      width: 0;
      flex-grow: 1;
    }

    .logo-section {
      text-align: center;
      
      .headerLogo {
        width: 150px;
        height: auto;
      }
    }
  }
`

const Header = () => {
  return (
    <StyledHeader>
      <div className="inner layout-width">
        <div className="left"></div>
        <div className="logo-section">
          <Link href="/">
            <Image src={logo} alt="logo" className='headerLogo' />
          </Link>
        </div>
      </div>
    </StyledHeader>
  )
}

export default React.memo(Header)