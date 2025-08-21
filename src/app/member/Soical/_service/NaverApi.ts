'use client'
import SocialApi from './Social'
import { fetchSSR } from '@/app/_global/libs/utils'



export default class NaverApi implements SocialApi {
  constructor (
    private clientId: string | undefined=  process.env_
  ){}
  async getToken(code: string) {
    return null
  }
  async getProfile(token: string) {
    return null
  }
  getUrl(redirectUrl: string = '/'){
    return null
  }
}
