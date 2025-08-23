
import SocialApi from './SocialApi'

export default class NaverApi implements SocialApi {
  private state?: string

  constructor(
    private apiKey: string | undefined = process.env.NEXT_PUBLIC_NAVER_API_KEY,
    private apiSecret: string | undefined = process.env
      .NEXT_PUBLIC_NAVER_API_SECRET,
    private redirectUri: string = `${process.env.NEXT_PUBLIC_DOMAIN}/member/social/naver/callback`,
  ) {}


  async getToken(code: string) {
    // FormData 대신 URLSearchParams 사용
    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('client_id', this.apiKey ?? '')
    params.append('client_secret', this.apiSecret ?? '')
    params.append('code', code)
    params.append("redirect_uri", this.redirectUri)
    params.append('state', this.state ?? '')
    const res = await fetch('https://nid.naver.com/oauth2.0/token', {
        method: 'GET',
        body: params, // URLSearchParams 객체로 변경
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      
    })

    if (res.status === 200) {
        const { access_token } = await res.json()
        return access_token
    }
    console.log("확안", res)

    // 에러를 좀 더 자세히 확인하기 위한 로직 추가
    const errorData = await res.json();
    console.error('Token 발급 실패:', res.status, errorData);

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
      const data = await res.json()
      if (data.resultcode === '00') {
        return data.response.id
      }
    }

    return null
  }

getUrl(redirectUrl: string = '/') {
    this.state = redirectUrl
    return `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${this.apiKey}&state=${redirectUrl}&redirect_uri=${this.redirectUri}`
}
}
