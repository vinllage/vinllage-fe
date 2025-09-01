import DetectContainer from '../containers/DetectContainer'
import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'

export default function DetectPage() {
  return (
    <ContentBox width={660}>
      <DetectContainer />
    </ContentBox>
  )
}
