'use server' // ssr

import { cookies } from 'next/headers'
import { headers } from 'next/headers'


/**
 * token 쿠키값 조회
 *
 */
export async function getToken() {
  const cookie = await cookies()

  return cookie.get('token')?.value
}

export async function getUseHash() {
  const cookie = await  cookies()

  return  cookie.get('Use-Hash')?.value
}

export async function fetchSSR(url, options : RequestInit ={}){
  
  const token = await getToken();
  if(token){
    options.headers = options.headers ?? {}
    options.headers['Authorization'] = `Bearer${token}`
  }
  const userHash  = getUseHash()
  if(userHash){
    options.headers = options.headers ?? {}
    options.headers['User-Hash'] = userHash;
  }
  

  return fetch(`${process.env.API_URL}${url}`, options)
}

export async function getUrl(url) {
  const _headers = await headers()
  const domain = `${process.env.NODE ! == 'production' ?'http': 'https'}"//${_headers.get('host')}`

  return `${domain}${url}`
}
