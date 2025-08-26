'use client'

import React, { useEffect, useState } from 'react'
import { getLoggedMember, deleteMe } from '../_services/actions'

type Member = {
  email: string
  name: string
  mobile: string
}

export default function MyPageForm() {
  const [member, setMember] = useState<Member | null>(null)

  useEffect(() => {
    const fetchMember = async () => {
      const data = await getLoggedMember()
      if (data) setMember(data)
    }
    fetchMember()
  }, [])

  const handleDelete = async () => {
    if (confirm('정말 탈퇴하시겠습니까?')) {
      await deleteMe()
    }
  }

  if (!member) return <p>회원 정보를 불러오는 중...</p>

  return (
    <div>
      <ul>
        <li>
          <strong>이메일:</strong> {member.email}
        </li>
        <li>
          <strong>이름:</strong> {member.name}
        </li>
        <li>
          <strong>휴대폰:</strong> {member.mobile}
        </li>
      </ul>

      <button
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={handleDelete}
      >
        회원 탈퇴
      </button>
    </div>
  )
}
