'use client'

import Swal from 'sweetalert2'

type AlertDialogType = {
  title?: string
  text?: string
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question'
  callback?: () => void
}

export default function useAlertDialog() {
  const show = ({ title, text, icon, callback }: AlertDialogType) => {
    title = title ?? '알림'
    icon = icon ?? 'warning'
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: '확인',
    }).then(() => {
      // 후속 처리
      if (typeof callback === 'function') {
        callback()
      }
    })
  }

  const success = (text: string, callback?: () => void) =>
    show({ title: '성공', text, icon: 'success', callback })

  const error = (text: string, callback?: () => void) =>
    show({ title: '오류', text, icon: 'error', callback })

  const warning = (text: string, callback?: () => void) =>
    show({ title: '경고', text, icon: 'warning', callback })

  return Object.assign(show, { success, error, warning })
}
