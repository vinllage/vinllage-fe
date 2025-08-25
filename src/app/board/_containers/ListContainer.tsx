'use client'
import React, { useState, useEffect } from 'react'
import BoardList from '../_components/BoardList'
import { getBoardDataList } from '../_services/actions'
import type { BoardConfigType } from '@/app/board/_types/BoardType'
import Pagination from '@/app/_global/components/Pagination'
import type { Board } from '@/app/admin/board/_types.ts'

interface ListContainerProps {
  bid: string;
  items?: Array<BoardConfigType>;
  pagination?: any;
}


const ListContainer = ({ bid, items, pagination }: ListContainerProps) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] =useState();

  console.log("실행1")

  useEffect(() => {
    ;(async () => {
      console.log("실행2")
      try {
        console.log("실행3")
        setLoading(true);
        setError(null);
        const data = await getBoardDataList(bid,{search});
        console.log("데이터",data)
        
        if (data?.items && Array.isArray(data.items)) {
          setBoards(data.items);
        } else {
          setBoards([]);
        }
      } catch (err) {
        console.error('게시판 목록 로드 실패:', err);
        setError(err instanceof Error ? err.message : '알 수 없는 오류');
        setBoards([]);
      } finally {
        setLoading(false);
      }
    })()
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  
  return (
    <>
      <BoardList boards={boards} />;
      <Pagination pagination={pagination} />
    </>
  )
};

export default React.memo(ListContainer);