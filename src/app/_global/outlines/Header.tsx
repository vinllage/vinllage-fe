'use client'
import React from 'react'
import styled from 'styled-components'
import { FiUserPlus, FiLogIn, FiLogOut } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'
import { FaCog } from 'react-icons/fa'
import logo from '../assets/images/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../components/Buttons'
import useUser from '../hooks/useUser'
import LinkLoading from '../components/LinkLoading'
import FileImages from '../components/FileImages'

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

    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      a + a {
        margin-left: 5px;
      }
    }

    .profile-image {
      li {
        border-radius: 50%;
      }
      img {
        border-radius: 50%;
      }
    }
  }
`

const Header = () => {
  const { isLogin, isAdmin, loggedMember } = useUser()
  console.log(isLogin)
  return (
    <StyledHeader>
      <div className="inner layout-width">
        <div className="left"></div>
        <div className="logo-section">
          <Link href="/">
            <Image src={logo} alt="logo" className='headerLogo'/>
          </Link>
        </div>
        <div className="right">
          {isLogin ? (
            <>                           
              <Link href="/mypage" prefetch={false}>
                <Button type="button">
                  <CgProfile />
                  마이페이지
                  <LinkLoading />
                </Button>
              </Link>
              <a href="/member/api/logout">
                <Button type="button" color="secondary">
                  <FiLogOut />
                  로그아웃
                </Button>
              </a>
              {isAdmin && (
                <a href="/admin">
                  <Button type="button" color="info">
                    <FaCog />
                    사이트 관리
                  </Button>
                </a>
              )}
              <Link href="/mypage" className='profile-image'>
                <FileImages 
                items={loggedMember.profileImage} 
                viewOnly={true} width={45} height={45} />
              </Link> 
            </>
          ) : (
            <>
              <Link href="/member/join" prefetch={false}>
                <Button type="button">
                  <FiUserPlus />
                  회원가입
                  <LinkLoading />
                </Button>
              </Link>
              <Link href="/member/login" prefetch={false}>
                <Button type="button" color="secondary">
                  <FiLogIn />
                  로그인
                  <LinkLoading />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </StyledHeader>
  )
}

export default React.memo(Header)
