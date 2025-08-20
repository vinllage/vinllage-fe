import EventDetailContainer from '../_containers/EventDetailContainer'
import { MainTitle } from '../../_global/components/TitleBox'
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
  return (
    <div className="layout-width">
      <MainTitle border="true">환경 행사</MainTitle>
      <EventDetailContainer event={event} />
    </div>
  )
}
