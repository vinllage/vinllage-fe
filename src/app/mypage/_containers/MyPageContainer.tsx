'use client'

import React, { useActionState, useState, useCallback, useEffect } from 'react'
import { getLoggedMember, processProfile } from '../_services/actions'
import ProfileForm from '../_components/ProfileForm'

type FormType = {
  email: string
  password: string
  confirmPassword: string
  name: string
  mobile: string
}

const MyPageContainer = () => {
  const [errors, action, pending] = useActionState<any, any>(processProfile, {})
  const [form, setForm] = useState<FormType>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    mobile: '',
  })

  useEffect(() => {
    ;(async () => {
      const member = await getLoggedMember()
      if (member) {
        setForm({
          email: member.email ?? '',
          name: member.name ?? '',
          mobile: member.mobile ?? '',
          password: '',
          confirmPassword: '',
        })
      }
    })()
  }, [])

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }, [])

  return (
    <ProfileForm
      form={form}
      errors={errors}
      pending={pending}
      action={action}
      onChange={onChange}
    />
  )
}

export default React.memo(MyPageContainer)
