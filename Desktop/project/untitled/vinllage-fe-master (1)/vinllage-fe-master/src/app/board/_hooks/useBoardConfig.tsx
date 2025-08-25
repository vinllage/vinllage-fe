'use client'
import { useEffect, useState } from 'react'
import { fetchSSR } from '@/app/_global/libs/utils'

export default function useBoardConfig(bid?: string, name?:string) {
  const [data, setData] = useState({
    mode: bid ? 'update' : 'register',
    bid: bid || '',
    name: name || '',
    rowsForPage: 20,
    pageCount: 10,
    skin: 'default',
    category: '',
    active: false,
    editor: false,
    imageUpload: false,
    attachFile: false,
    comment: false,
    afterWritingRedirect: false,
    showViewList: false,
    listAuthority: 'ALL',
    viewAuthority: 'ALL',
    writeAuthority: 'ALL',
    commentAuthority: 'ALL',
  })

  useEffect(() => {
    ;(async () => {
      try {
        let res;
        if (bid) {
          // 수정 모드: 기존 데이터 조회
          console.log("짠")
          res = await fetchSSR(`/admin/board/update/${bid}`);
          console.log("테스트",res)
          
        } else {
          // 등록 모드: 기본값 조회 (스프링부트의 /register/form 엔드포인트)
          res = await fetchSSR('/admin/board/register/form');
        }

        if (res.status !== 200) {
          return;
        }

        const responseData = await res.json();
        responseData.mode = bid ? 'update' : 'register';
        responseData.bid = bid || '';

        setData(responseData);
      } catch (err) {
        console.error('useBoardConfig error:', err);
      }
    })()
  }, [bid])

  return data
}