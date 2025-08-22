'use server'
import { redirect } from 'next/navigation'
import { fetchSSR } from '@/app/_global/libs/utils'


export async function processBoardConfig(errors, formData: FormData) {
  errors = {}
    const params: any = {}

    // 필요한 필드와 값만 추출
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('$ACTION_')) continue
      let _value: string | boolean = value.toString()
      if (['true', 'false'].includes(_value)) {
        _value = _value === 'true'
      }
  
      params[key] = _value
    }
    
    let hasErrors: boolean = false
    // 필수 항목 검증 S
    const requiredFields = {
      bid: '게시판 아이디를 입력하세요.',
      name: '게시판 이름을 입력하세요.',
    }
  
    for (const [field, message] of Object.entries(requiredFields)) {
      if (
        !params[field] ||
        (typeof params[field] === 'string' && !params[field].trim())
      ) {
        hasErrors = true
  
        errors[field] = errors[field] ?? []
        errors[field].push(message)
      }
    }

    // 필수 항목 검증 E
  
    // 검증 실패시에는 에레 메세지를 출력하기 위한 상태값을 반환
    if (hasErrors) {
      return errors
    }

    // 회원 가입 처리를 위해  API 서버에 요청
    try {
      const apiUrl = `http://localhost:4000/api/v2/admin/board/register`
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })

    if (res.status !== 201) {
      const errorData = await res.json()
      return {
        success: false,
        message: errorData.message,
        errors: errorData.errors
      }
    }

    const result = await res.json()
    console.log('Success:', result)

  } catch (err: any) {
    console.error('Error:', err);
    return { message: err?.message }
  }
  
    // 게시판 작성 완료시 리스트로 이동
    redirect('/admin/board')
}

// actions.ts에 추가
export async function fetchBoardForm(bid?: string) {
  try {
    const url = bid 
      ? `http://localhost:4000/api/v2/admin/board/update/${bid}`
      : `http://localhost:4000/api/v2/admin/board/register/form`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    throw new Error('폼 데이터 조회에 실패했습니다.');
  }
}

export async function getBoardList(search = {}) {
  console.log("getBoardList 시작");
  try {
    const res = await fetch('http://localhost:4000/api/v1/admin/board/list');
    console.log("fetch 응답:", res);
    
    if (res.ok) {
      const data = await res.json();
      console.log("데이터:", data);
      return data;
    }
  } catch (err) {
    console.log('에러:', err);
  }
  return null;
}

export async function getEvents() {
  try {
    const res = await fetchSSR('/events')
    if (res.ok) {
      const data = await res.json()
      return data.items ?? []
    }
  } catch (err) {
    console.error(err)
  }
  return []
}

export async function test() {
  console.log("1");
}