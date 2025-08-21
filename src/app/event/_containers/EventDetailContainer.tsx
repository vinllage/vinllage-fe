'use client'

import React from 'react'
import EventDetail from '../_components/EventDetail'
import type { EventType } from '../_types'

type Props = {
  event: EventType
}

const EventDetailContainer = ({ event }: Props) => {
  return <EventDetail event={event} />
}

export default React.memo(EventDetailContainer)
