'use client'
import styled from 'styled-components'
import bgImg from '@/app/_global/assets/images/main.jpg'
import { Button } from '@/app/_global/components/Buttons'

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url(${bgImg.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  border-radius: 16px;
  gap: 20px;
`

export const Counter = styled.div`
  font-size: 64px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: bold;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
`

export const SubText = styled.div`
  font-size: 32px;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 1px 1px 4px rgba(0,0,0,0.2);
`

export const StyledButton = styled(Button)`
  font-size: 24px;
  border-radius: 12px;
  width: 200px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  background-color:rgba(255,255,255,0.7);
  color: #000;
`
