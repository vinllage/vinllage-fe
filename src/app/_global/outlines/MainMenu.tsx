'use client'
import React, { useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import color from '../styles/color'
import fontsize from '../styles/fontsize'

const { dark, light } = color
const { big } = fontsize

const StyledNav = styled.nav`
  border: 1px solid ${dark};
  border-left: 0;
  border-right: 0;
  background: ${light};
  .layout-width {
    display: flex;
    height: 55px;
    a {
      line-height: 55px;
      padding: 0 30px;
      font-size: ${big};
      color: ${dark};
    }
  }
`

const StyledSubMenu = styled.div`
  background: rgba(0, 0, 0, 0.7);
  min-height: 150px;
  transition: background 0.5s;
  position: absolute;
  width: 100%;
  left: 0;
  z-index: 2;

  &.fadeout {
    background: rgba(0, 0, 0, 0);
  }
`

const MainMenu = () => {
  const [open, setOpen] = useState<boolean>(false)
  const timeoutRef = useRef<any>(null)
  const subMenuRef = useRef<HTMLDivElement | null>(null)

  const onSubMenuOpen = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    const subMenu = subMenuRef.current
    subMenu?.classList.remove('fadeout')

    setOpen(true)
  }, [subMenuRef])

  const onSubMenuClose = useCallback(() => {
    const subMenu = subMenuRef.current
    if (subMenu) {
      subMenu.classList.remove('fadeout')
      subMenu.classList.add('fadeout')
    }
    timeoutRef.current = setTimeout(() => {
      setOpen(false)
    }, 1000)
  }, [subMenuRef])
  return (
    <>
      <StyledNav>
        <div className="layout-width">
          <Link
            href="/board/list/notice"
            onMouseEnter={onSubMenuOpen}
            onMouseLeave={onSubMenuClose}
          >
            공지사항
          </Link>
          <Link
            href="/board/list/freetalk"
            onMouseEnter={onSubMenuOpen}
            onMouseLeave={onSubMenuClose}
          >
            자유게시판
          </Link>
          <Link
            href="/event"
            onMouseEnter={onSubMenuOpen}
            onMouseLeave={onSubMenuClose}
          >
            환경 행사
          </Link>
        </div>
      </StyledNav>
      {open && (
        <StyledSubMenu
          ref={subMenuRef}
          onMouseEnter={onSubMenuOpen}
          onMouseLeave={onSubMenuClose}
        >
          <div className="layout-width">하위 메뉴</div>
        </StyledSubMenu>
      )}
    </>
  )
}

export default React.memo(MainMenu)
