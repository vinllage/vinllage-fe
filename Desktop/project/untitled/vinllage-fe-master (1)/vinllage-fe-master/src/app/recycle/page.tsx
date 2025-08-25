'use client'

import RecycleContainer from './containers/RecycleContainer'
import { CookiesProvider } from 'react-cookie'

export default function RecyclePage() {
  return (
    <CookiesProvider>
      <RecycleContainer />
    </CookiesProvider>
  )
}
