'use server'

import { fetchSSR } from '@/app/_global/libs/utils'
import type { EventType } from '../_types'

export async function getEvents() {
  try {
    const res = await fetchSSR('/events')
    if (res.ok) {
      const data = await res.json()
      return data.items ?? []
    }
  } catch (err) {
    console.error(err)
  }
  return []
}

export async function getEvent(hash: string) {
  try {
    const res = await fetchSSR(`/events/${hash}`)
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.error(err)
  }
  return null
}
