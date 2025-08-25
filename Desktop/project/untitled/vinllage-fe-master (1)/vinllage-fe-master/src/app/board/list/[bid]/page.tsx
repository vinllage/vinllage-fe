import ListContainer from '../../_containers/ListContainer'

export default async function BoardPage({ params }: { params: { bid: string } }) {
  const { bid } = await params;
  
  return (
    <div>
      <h1>{bid} 게시판</h1>
      <ListContainer bid={bid} />
    </div>
  );
}