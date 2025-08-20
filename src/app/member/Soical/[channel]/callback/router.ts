import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import KakaoApi from '../../_service/KaKoaApi'
import { redirect } from 'next/navigation'
import NaverApi from '../../_service/NaverApi'

export async function GET(request: NextRequest) {
  const channel = request.nextUrl.pathname.split('/')[3]
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const redirectUrl = searchParams.get('state') ?? '/'
  const api = channel == 'naver' ? new NaverApi() : new KakaoApi()
  try {
    if (!code) {
      throw new Error('인증 코드 누락 ')
    }
    const token = await api.getToken(code)
    if (!token) {
      throw new Error('Access Token 토큰 발급 실패')
    }
    const profile = await api.getProfile(token)

    return NextResponse.json({})
  } catch (err) {
    redirect(`member/login?redirectUrl=${redirectUrl}`)
  }
} // api 만들려는것
