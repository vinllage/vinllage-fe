import EventDetailContainer from '../_containers/EventDetailContainer'
import { getEvent } from '../_services/actions'
import type { EventType } from '../_types'

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ hash: string }>
}) {
  const { hash } = await params 
  const event: EventType | null = await getEvent(hash)

  if (!event) {
    return null
  }
  return <EventDetailContainer event={event} />
}
