'use server'

export async function processDetectData(formData: FormData) {
  try {
    const apiUrl = `${process.env.API_URL}/recycle`

    const res = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      // 에러 응답일 때 서버에서 오는 메시지 꺼내기
      const { messages } = await res.json().catch(() => ({}))
      return messages ?? { global: `Upload failed with ${res.status}` }
    }

    // 정상 저장된 경우
    const data = await res.json()
    return data // { gid, count, ids: [...] }
  } catch (err: any) {
    // 네트워크 에러 등
    return { global: err?.message }
  }
}
