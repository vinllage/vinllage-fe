
import SocialApi from './SocialApi'

export default class NaverApi implements SocialApi {
  private state?: string
  constructor(
    private apikey: string | undefined = process.env.NEXT_PUBLIC_API_KEY,
    private apiSecret : string | undefined = process.env.NEXT_PUBLIC_API_SECRET,
    private redirectUri: string = `${process.env.NEXT_PUBLIC_DOMAIN}member/social/naver/callback`,
  ) {}
  async getToken(code: string) {
    const formData = new FormData()
    formData.append('grant_type', 'authorization_code')
    formData.append('client_id', this.apikey ?? '')
    formData.append('client_secret', this.apiSecret ?? '') // 발급 토큰 
    formData.append('code', code) // 발급 필수 
    formData.append('state', this.state ?? '') // 발급 필수

    const res = await fetch('	https://nid.naver.com/oauth2.0/token', {
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
    const res = await fetch('https://openapi.naver.com/v1/nid/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.status === 200) {
      const data  = await res.json()
      if(data.resultcode === '0')
      return data.resultcode.id
    }

    return null
  }

  getUrl(redirectUrl: string = '/') {
    redirectUrl = redirectUrl ? redirectUrl : '/'
    this.state = redirectUrl
    return `https://nid.naver.com/oauth2.0/authorize?client_id=${this.apikey}&redirect_uri=${this.redirectUri}&response_type=code&state=${redirectUrl}`
  }
}
