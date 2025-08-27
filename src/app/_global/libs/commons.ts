// CSR, SSR 공통 라이브러리

/**
 * 비밀번호 강도 레벨 체크
 *
 * @param password
 */
export function passwordStrenthLevel(password?: string | number) {
  let strenth: number = 0
  password = password ?? ''
  password = '' + password
  password = password.trim()
  if (password) {
    // 패스워드 자리수 - 8까지 1단계 증가, 16자리 이상 2단계 증가
    if (password.length >= 8) strenth++
    if (password.length >= 16) strenth++

    // 비밀번호에 알파벳 소문자 포함 +1
    if (/[a-z]+/.test(password)) strenth++

    // 비밀번호에 알파벳 대문자가 포함 +1
    if (/[A-Z]+/.test(password)) strenth++

    // 비밀번호에 숫자가 포함된 경우 +1
    if (/\d+/.test(password)) strenth++

    // 비밀번호에 특수문자가 포함된 경우 +1
    if (/[^0-9a-zA-Zㄱ-ㅎ가-힣]+/.test(password)) strenth++
  }

  return strenth
}
