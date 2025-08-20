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

const renderErr = (v: any) => (Array.isArray(v) ? v[0] : v ?? '')

const ProfileForm = ({
  form,
  errors,
  pending,
  action,
  onChange,
}: ProfileFormProps) => {
  return (
    <form
      action={action}
      className="max-w-md mx-auto p-4 space-y-4"
      autoComplete="off"
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
        {errors?.email && (
          <p className="text-red-500 text-sm">{renderErr(errors.email)}</p>
        )}
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
        {errors?.name && (
          <p className="text-red-500 text-sm">{renderErr(errors.name)}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">휴대폰</label>
        <input
          type="text"
          name="mobile"
          inputMode="numeric"
          pattern="\d*"
          value={form.mobile}
          onChange={onChange}
          className="w-full border rounded px-2 py-1"
        />
        {errors?.mobile && (
          <p className="text-red-500 text-sm">{renderErr(errors.mobile)}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">비밀번호</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          className="w-full border rounded px-2 py-1"
          placeholder="변경 시 입력"
        />
        {errors?.password && (
          <p className="text-red-500 text-sm">{renderErr(errors.password)}</p>
        )}
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
        {errors?.confirmPassword && (
          <p className="text-red-500 text-sm">
            {renderErr(errors.confirmPassword)}
          </p>
        )}
      </div>

      {errors?.global && (
        <p className="text-red-500 text-center">{renderErr(errors.global)}</p>
      )}

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
