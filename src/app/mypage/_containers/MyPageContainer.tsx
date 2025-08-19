'use client'
import React, { useActionState, useState, useCallback, useEffect } from 'react'
import { getLoggedMember, processProfile } from '../_services/actions'
import MyPageForm from '../_components/MyPageForm'

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
    const fetchMember = async () => {
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
    }
    fetchMember()
  }, [])

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  return (
    <MyPageForm
      form={form}
      errors={errors}
      pending={pending}
      action={action}
      onChange={onChange}
    />
  )
}

export default React.memo(MyPageContainer)
