export type ProfileType ={
    id: number | string
}

export default interface SocialApi {
  /**
   * authorization code를 가지고 access token
   * code
   */
  getToken: (code: string) => string
  /**
   * 회원의 프로필 정보
   * code
   */
  getProfile: (token: string) => ProfileType

  /**
   *
   * 인증서버에서 client_id. 를 통해서 authorization code를 발급을 수 있는
   * url 생성
   * authorization code : access totken 을 발급 받기 위한 인증 코드
   *
   *
   */
}