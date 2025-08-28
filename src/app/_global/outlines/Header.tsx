'use client'
import React, { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Image from 'next/image'
import logo from '../assets/images/logo.png'
import { Button } from '../components/Buttons'
import { useRouter } from 'next/router'
import useUser from '../hooks/useUser'
import FileImages from '../components/FileImages'
import NoProfileImage from '../assets/images/no_profile.png'

const StyledHeader = styled.header`
  position: relative;
  background: #fff;
  border-bottom: 1px solid #ddd;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  height: auto;
  padding: 10px 20px;

  /* 왼쪽: 로고 + 환영 메시지 */
  .menu-left {
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;

    .headerLogo {
      width: 120px;
      height: auto;
      display: block;
    }

    .badge {
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
    }
  }

  .menu-link a {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 10px;
    font-weight: 500;
    font-size: 14px;
    color: #333;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
      color: #0070f3;
    }
  }

  /* 오른쪽: 메뉴 */
  .menu-right {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;

    .menu-link button,
    .mypage-btn button,
    .logout-btn button,
    .admin-btn button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
      font-size: 13px;
      background-color: #f0f0f0;
      color: #333;
      border-radius: 18px;
      padding: 0 12px;
      gap: 6px;
      white-space: nowrap;
    }

    .profile-image {
      width: 40px;
      height: 40px;
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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    .menu-left {
      flex-direction: column;
      align-items: flex-start;
    }

    .menu-right {
      width: 100%;
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    .menu-link a {
      height: 40px;
      font-size: 13px;
    }
  }
`

const StyledSubMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  min-height: 150px;

  background: rgba(0, 0, 0, 0.7);
  color: #fff;

  transition: opacity 0.3s ease-in-out;
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
    flex-wrap: wrap;
    gap: 20px;
  }

  .submenu-item {
    flex: 1;
    min-width: 150px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`

const Header = () => {
  const router = useRouter()
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
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      subMenuRef.current?.classList.remove('open')
      setOpenMenu(null)
    }, 600) // ← 딜레이 시간 변경
  }, [])

  return (
    <StyledHeader>
      <div className="menu-left">
        <div className="headerLogo">
          <Link href="/">
            <Image src={logo} alt="logo" className="headerLogo" />
          </Link>
        </div>
        <span className="badge">
          {loggedMember?.name
            ? `${loggedMember.name} (${loggedMember.email})님 환영합니다.`
            : '게스트님 환영합니다.'}
        </span>
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
                <Button type="button">마이페이지</Button>
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
                <Button type="button">회원가입</Button>
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
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* 드롭다운 영역 */}
      <StyledSubMenu ref={subMenuRef}>const router = useRouter()</StyledSubMenu>
    </StyledHeader>
  )
}

export default React.memo(Header)
