import AdminOnlyContainer from '@/app/_global/wrappers/AdminOnlyContainer'
import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import CrawlerContainer from './_containers/CrawlerContainer'
import { getCrawlerConfigs, getCrawlerScheduler } from './_services/actions'

export default async function AdminCrawlerPage() {
  const configs = await getCrawlerConfigs()
  const scheduler = await getCrawlerScheduler()

  return (
    <AdminOnlyContainer>
      <ContentBox>
        <MainTitle border="true">크롤링 관리</MainTitle>
        <CrawlerContainer
          initialConfigs={configs}
          initialScheduler={scheduler}
        />
      </ContentBox>
    </AdminOnlyContainer>
  )
}
