import ListContainer from './_containers/ListContainer'
import { MainTitle } from '@/app/_global/components/TitleBox'

export default function BoardListPage() {
  return (<div>
      <MainTitle border="true">게시판 설정 등록</MainTitle>
            <ListContainer />
    </div>)
}
