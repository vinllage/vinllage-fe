import UserOnlyContainer from '../_global/wrappers/UserOnlyContainer'
import ContentBox from '../_global/components/ContentBox'
import { MainTitle } from '../_global/components/TitleBox'

export default function Mypage() {
  return (
    <UserOnlyContainer>
      <ContentBox>
        <MainTitle border="true">마이페이지</MainTitle>
      </ContentBox>
    </UserOnlyContainer>
  )
}