import { getEvents } from './_services/actions'
import { MainTitle } from '../_global/components/TitleBox'
import EventListContainer from './_containers/EventListContainer'

export default async function EventPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page = Number(searchParams?.page) || 1
  const { items: events, pagination } = await getEvents(page)
  return (
    <div className="layout-width">
      <MainTitle border="true">환경 행사</MainTitle>
      <EventListContainer events={events} pagination={pagination} />
    </div>
  )
}
