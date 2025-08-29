'use client'

import Swal from 'sweetalert2'

type AlertDialogType = {
  title?: string
  text?: string
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question'
  callback?: () => void
}

export default function useAlertDialog() {
  return ({ title, text, icon, callback }: AlertDialogType) => {
    title = title ?? '알림'
    icon = icon ?? 'warning'

    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: '확인',
    }).then((result) => {
      // 후속 처리
      if (result.isConfirmed && typeof callback === 'function') {
        callback()
      }
    })
  }
}