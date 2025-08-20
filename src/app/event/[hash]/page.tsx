import EventDetailContainer from '../_containers/EventDetailContainer'
import { getEvent } from '../_services/actions'
import type { EventType } from '../_types'

export default async function EventDetailPage({
  params,
}: {
  params: { hash: string }
}) {
  const event: EventType | null = await getEvent(params.hash)
  if (!event) {
    return null
  }
  return <EventDetailContainer event={event} />
}
