'use client'
import React, { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { FiUserPlus, FiLogIn, FiLogOut } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'
import { FaCog } from 'react-icons/fa'
import Image from 'next/image'
import logo from '../assets/images/logo.png'
import { Button } from '../components/Buttons'
import useUser from '../hooks/useUser'
import FileImages from '../components/FileImages'
import NoProfileImage from '../assets/images/no_profile.png'
import LinkLoading from '../components/LinkLoading'

const StyledHeader = styled.header`
  position: relative;
  background: #fff;
  border-bottom: 1px solid #ddd;

  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 120px;
    padding: 0 20px;

    .logo-section {
      flex: 0 0 auto;
      text-align: left;
      .headerLogo {
        width: 120px;
        height: auto;
        display: block;
      }
    }

    .menu-right {
      display: flex;
      align-items: center;
      gap: 10px;
      position: relative;

      .menu-link {
        position: relative;
        a {
          display: inline-block;
          padding: 0 12px;
          line-height: 120px;
          font-weight: 500;
          font-size: 14px;
          color: #333;
          text-decoration: none;
          &:hover {
            color: #0070f3;
          }
        }
      }

      .menu-link button,
      .mypage-btn button,
      .logout-btn button,
      .admin-btn button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        line-height: normal; 
        font-size: 14px;
        background-color: #f0f0f0;
        color: #333;
        border-radius: 20px;
        padding: 0 12px;
        gap: 6px;
      }

      .profile-image {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }
    }
  }
`

const StyledSubMenu = styled.div`
  position: absolute;
  top: 120px;
  left: 0;
  width: 100%;
  min-height: 150px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  transition: all 0.3s;
  pointer-events: none;
  opacity: 0;
  z-index: 10;

  &.open {
    pointer-events: auto;
    opacity: 1;
  }

  .submenu-inner {
    max-width: 1150px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    gap: 20px;
  }
`

const Header = () => {
  const { isLogin, isAdmin, loggedMember } = useUser()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const subMenuRef = useRef<HTMLDivElement | null>(null)

  const onMenuOpen = useCallback((menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenMenu(menu)
    subMenuRef.current?.classList.add('open')
  }, [])

  const onMenuClose = useCallback(() => {
    subMenuRef.current?.classList.remove('open')
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 200)
  }, [])

  return (
    <StyledHeader>
      <div className="inner">
        <div className="logo-section">
          <Link href="/">
            <Image src={logo} alt="logo" className="headerLogo" />
          </Link>
        </div>

        <div className="menu-right">
          {/* 게시판 메뉴 */}
          {['공지사항', '자유게시판', '환경 행사'].map((label, idx) => (
            <div
              className="menu-link"
              key={idx}
              onMouseEnter={() => onMenuOpen('board')}
              onMouseLeave={onMenuClose}
            >
              <Link
                href={
                  label === '공지사항'
                    ? '/board/list/notice'
                    : label === '자유게시판'
                    ? '/board/list/freetalk'
                    : '/event'
                }
              >
                {label}
              </Link>
            </div>
          ))}

          {/* 로그인/회원가입 / 마이페이지 */}
          {isLogin ? (
            <>
              <div
                className="menu-link mypage-btn"
                onMouseEnter={() => onMenuOpen('mypage')}
                onMouseLeave={onMenuClose}
              >
                <Link href="/mypage" prefetch={false}>
                  <Button type="button">
                    마이페이지
                    <LinkLoading />
                  </Button>
                </Link>
              </div>
              <a href="/member/api/logout" className="logout-btn">
                <Button type="button" color="secondary">
                  로그아웃
                </Button>
              </a>
              {isAdmin && (
                <a href="/admin" className="admin-btn">
                  <Button type="button" color="info">
                    사이트 관리
                  </Button>
                </a>
              )}
              <Link href="/mypage" className="menu-link profile-image">
                <FileImages
                  items={loggedMember.profileImage}
                  viewOnly={true}
                  width={45}
                  height={45}
                  fallbackImage={NoProfileImage}
                />
              </Link>
            </>
          ) : (
            <>
              <div
                className="menu-link"
                onMouseEnter={() => onMenuOpen('guest')}
                onMouseLeave={onMenuClose}
              >
                <Link href="/member/join" prefetch={false}>
                  <Button type="button">
                    회원가입
                    <LinkLoading />
                  </Button>
                </Link>
              </div>
              <div
                className="menu-link"
                onMouseEnter={() => onMenuOpen('guest')}
                onMouseLeave={onMenuClose}
              >
                <Link href="/member/login" prefetch={false}>
                  <Button type="button" color="secondary">
                    로그인
                    <LinkLoading />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* 드롭다운 영역 */}
        <StyledSubMenu ref={subMenuRef}>
          <div className="submenu-inner">
            {openMenu === 'board' && <div>게시판 하위 메뉴</div>}
            {openMenu === 'mypage' && <div>마이페이지 하위 메뉴</div>}
            {openMenu === 'guest' && <div>회원/로그인 안내</div>}
          </div>
        </StyledSubMenu>
      </div>
    </StyledHeader>
  )
}

export default React.memo(Header)
