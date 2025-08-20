import type { EventType } from './_types'
import { getEvents } from './_services/actions'
import { MainTitle } from '../_global/components/TitleBox'
import EventListContainer from './_containers/EventListContainer'

export default async function EventPage() {
  const events: EventType[] = await getEvents()
  return (
    <div className="layout-width">
      <MainTitle border="true">환경 행사</MainTitle>
      <EventListContainer events={events} />
    </div>
  )
}
