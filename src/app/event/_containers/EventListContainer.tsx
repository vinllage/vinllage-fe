'use client'

import React, { useMemo, useState } from 'react'
import EventList from '../_components/EventList'
import type { EventType } from '../_types'

type Props = {
  events: EventType[]
}

const EventListContainer = ({ events }: Props) => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 4

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.title.toLowerCase().includes(query.toLowerCase()),
    )
  }, [events, query])

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage)
  const paginatedEvents = useMemo(
    () => filteredEvents.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [filteredEvents, page],
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setPage(1)
  }

  const handlePageChange = (p: number) => {
    setPage(p)
  }

  return (
    <EventList
      query={query}
      onSearch={handleSearch}
      events={paginatedEvents}
      page={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  )
}

export default React.memo(EventListContainer)
