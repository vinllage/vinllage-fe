'use client'
import SocialApi from './Social'
import { fetchSSR } from '@/app/_global/libs/utils'

export default class KakaoApi implements SocialApi {
  constructor(
    private apikey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_API_KEY,
    private redirectUri: string = `${process.env.NEXT_PUBLITC_DOMAIN}/member/kakao/social/callback`,
  ) {}
  async getToken(code: string) {
    const formData = new FormData()
    formData.append('grant_type', 'authorization_code')
    formData.append('client_id', this.apikey ?? '')
    formData.append('code', code)
    formData.append('redirectUri', this.redirectUri)

    const res = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      body: formData,
    })

    if (res.status === 200) {
      const { access_token } = await res.json()
      return access_token
    }
    return null
  }

  async getProfile(token: string) {
    const res = await fetch('https://kapi.kakao.com/v2/user/me',{
      method: "POST",
      headers :{
        'Authorization':`Bearer${token}`
      }
    })
    if (res.status === 200) {
      const {id} = await res.json()
      return id
    }
    return null
  }

  getUrl(redirectUrl: string = '/') {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${this.apikey} & rediect_url=${this.redirectUri}&response_type=code&staste=${redirectUrl}`
  }
}
