'use client'
import React, { useState, useCallback, useActionState } from 'react'
import BoardConfigForm from '../_components/BoardConfigForm'
import useBoardConfig from '@/app/board/_hooks/useBoardConfig'
import { processBoardConfig } from '../_services/actions'

type PropType = {
  bid?: string
}

const UpdateContainer = ({ bid }: PropType) => {
  const boardConfig = useBoardConfig(bid)
  const [form, setForm] = useState(boardConfig)

  const [errors, action, pending] = useActionState<any, any>(
    processBoardConfig,
    {},
  )
 
  const onChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  const onKeyValue = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  return (
    <BoardConfigForm
      form={form}
      onChange={onChange}
      onKeyValue={onKeyValue}
      errors={errors}
      action={action}
      pending={pending}
    />
  )
}

export default React.memo(UpdateContainer)