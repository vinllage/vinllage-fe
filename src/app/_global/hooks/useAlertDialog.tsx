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
}