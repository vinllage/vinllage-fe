'use client'
import useSWR from 'swr'
import useUser from './useUser'
import { useCookies } from 'react-cookie'

type FetchOptionType = RequestInit

const fetcher = (url: string, options: FetchOptionType) =>
  fetch(`${process.env.NEXT_PUBLIC_AI_URL}${url}`, options).then((res) => res.json())

export default function useFetch(url) {
  const { token } = useUser()
  const [cookies] = useCookies(['Use-Hash'])

  // token이 있다면 로그인한 회원 기반의 요청을 해야 하므로
  // 요청 헤더 Authorization: Bearer 토큰
  const options = {
    method: 'GET',
    headers: {},
  }
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`
  }
  
  //쿠키는 웹에 한정된 것이기때문에 플랫폼 상관 없이 비회원으로 사용 할려고 하는 것 
  if(cookies['Use-Hash']){
    options.headers['Use-Hash'] = cookies['Use-Hash']
  }


  return useSWR(url, (url) => fetcher(url, options))
}