'use client'
import React, { useActionState, useState, useCallback, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { processLogin } from '../_services/actions'
import LoginForm from '../_components/LoginForm'
import KakaoApi from '../Soical/_service/KaKoaApi'
import KakaoLoginButtion from '../../_global/assets/images/kakao_login.png'
import Image from 'next/image'



type FormType = {
  email: string
  password: string
  redirectUrl?: string
}

const kakaoApi = new KakaoApi() // kakao 인스턴스 화 

const LoginContainer = ({ redirectUrl }: {redirectUrl?: string}) => {
  const [errors, action, pending] = useActionState<any, any>(processLogin, {})
  const [form, setForm] = useState<FormType>({
    email: '',
    password: '',
    redirectUrl: redirectUrl ?? '',
  })
  const [KakaoLoginUrl, setKakaoLoginUrl] = useState(() =>kakaoApi.getUrl(redirectUrl));
  const searchParams = useSearchParams()

  const kakaoLoginUrl = useMemo(
    ()=> kakaoApi.getUrl(redirectUrl), // 계산 할 함수  
    [redirectUrl] // 의존성 배열 
  )

  useEffect(() => {
    const redirectUrl = searchParams.get('redirectUrl')?.toString()
    if (!redirectUrl) return

    setForm((prev) => ({ ...prev, redirectUrl }))
  }, [searchParams])

  const onChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  return (
    <>
      <LoginForm
        errors={errors}
        action={action}
        pending={pending}
        form={form}
        onChange={onChange}
      />
      <a href={KakaoLoginUrl} suppressHydrationWarning={true}>
        <Image src={KakaoLoginButtion} alt='카카오 로그인'></Image> 
      </a>
    </>
  )
}

export default React.memo(LoginContainer)
