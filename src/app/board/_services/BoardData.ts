import type { BoardDataType } from '../_types/BoardType'
import { v4 as uuid } from 'uuid'
import { fetchSSR } from '@/app/_global/libs/utils'

export async function get(seq?: number): Promise<BoardDataType> {
  'use server'
  let data: BoardDataType = {
    mode: 'write',
    bid: '',
    gid: uuid(),
    category: '',
    poster: '',
    guestPw: '',
    subject: '',
    content: '',
    notice: false,
    secret: false,
    guest: false,
    editorImages: [],
    attachFiles: [],
  }
  if (seq) {
    // 게시글 조회
    const res = await fetchSSR(`/board/update/${seq}`)

    if (res.status === 200) {
      const res2 = await res.json()
      data=res2.form
      data.mode = 'update'
      data.bid = data.board?.bid;

      console.log("데이터",data)
      console.log("피카츄")

      
      return data
    }
    
    data.mode = 'update'
  }

  return data
}