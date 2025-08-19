export type ProfileType ={
    id: number | string 
}

export default interface SocialApi {
    channel: 'KAKAO' | 'NAVER'
    getToken: (code: string ) => string
    getProfile: (token: string) => ProfileType 
}