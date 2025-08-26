'use client'
import React, { useActionState, useCallback, useState } from 'react'
import ProfileForm from '../_components/ProfileForm'
import useUser from '@/app/_global/hooks/useUser'
import { processProfile } from '../_services/actions'

const ProfileContainer = () => {
    const { loggedMember } = useUser()
    const [form, setForm] = useState(loggedMember)
    const [errors, action, pending] = useActionState<any, any>(processProfile, {})

    const onChange = useCallback((e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }, [])

    const fileUploadCallback = useCallback((items) => {
        setForm((prev) => ({ ...prev, profileImage: items[0] }))
    }, [])

    const fileDeleteCallback = useCallback(() => {
        setForm(prev => {
            const data = { ...prev }
            delete data.profileImage
            return data
        })
    }, [])

    return (
        <ProfileForm 
            form={form} 
            errors={errors} 
            action={action} 
            pending={pending} 
            onChange={onChange}
            fileUploadCallback={fileUploadCallback}
            fileDeleteCallback={fileDeleteCallback}
        />
    )
}

export default React.memo(ProfileContainer)