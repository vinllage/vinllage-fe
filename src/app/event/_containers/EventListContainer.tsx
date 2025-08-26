'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import EventList from '../_components/EventList'
import type { EventType, PaginationType } from '../_types'

type Props = {
  events: EventType[]
  pagination: PaginationType
}

const EventListContainer = ({ events, pagination }: Props) => {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.title.toLowerCase().includes(query.toLowerCase()),
    )
  }, [events, query])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handlePageChange = (p: number) => {
    router.push(`/event?page=${p}`)
  }

  return (
    <EventList
      query={query}
      onSearch={handleSearch}
      events={filteredEvents}
      pagination={pagination}
      onPageChange={handlePageChange}
    />
  )
}

export default React.memo(EventListContainer)
