import EventListContainer from './_containers/EventListContainer'
import { getEvents } from './_services/actions'
import type { EventType } from './_types'

export default async function EventPage() {
  const events: EventType[] = await getEvents()
  return <EventListContainer events={events} />
}
