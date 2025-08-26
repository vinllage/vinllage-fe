'use server'

import { fetchSSR } from '@/app/_global/libs/utils'
import type { EventListDataType } from '../_types'

export async function getEvents(page = 1): Promise<EventListDataType> {
  try {
    const res = await fetchSSR(`/events?page=${page}`)
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.error(err)
  }
  return {
    items: [],
    pagination: {
      pages: [],
      page: 1,
      prevRangePage: 0,
      nextRangePage: 0,
      lastPage: 1,
      baseUrl: '',
    },
  }
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
