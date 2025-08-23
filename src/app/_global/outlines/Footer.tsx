'use client'
import React from 'react'
import color from '../styles/color'
import styled from 'styled-components'
const { green, light } = color

const StyledFooter = styled.footer`
  min-height: 200px;
  background: ${green};
  color: ${light};
  margin-top: 150px;
`

const Footer = () => {
  return <StyledFooter></StyledFooter>
}

export default React.memo(Footer)
