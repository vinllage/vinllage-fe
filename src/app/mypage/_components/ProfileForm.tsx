'use client'
import React from 'react'

type ProfileFormProps = {
  form: {
    password: string
    confirmPassword: string
    email: string
    name: string
    mobile: string
  }
  errors: any
  pending: boolean
  action: any
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ProfileForm = ({ form, errors, pending, action, onChange }: ProfileFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        action(new FormData(e.currentTarget))
      }}
      className="max-w-md mx-auto p-4 space-y-4"
    >
      <div>
        <label className="block mb-1">이메일</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          className="w-full border rounded px-2 py-1"
          disabled
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
      </div>

      <div>
        <label className="block mb-1">이름</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          className="w-full border rounded px-2 py-1"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
      </div>

      <div>
        <label className="block mb-1">휴대폰</label>
        <input
          type="text"
          name="mobile"
          value={form.mobile}
          onChange={onChange}
          className="w-full border rounded px-2 py-1"
        />
        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile[0]}</p>}
      </div>

      <div>
        <label className="block mb-1">비밀번호</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          className="w-full border rounded px-2 py-1"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
      </div>

      <div>
        <label className="block mb-1">비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={onChange}
          className="w-full border rounded px-2 py-1"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword[0]}</p>
        )}
      </div>

      {errors.global && <p className="text-red-500 text-center">{errors.global}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {pending ? '저장 중...' : '정보 수정'}
      </button>
    </form>
  )
}

export default React.memo(ProfileForm)
