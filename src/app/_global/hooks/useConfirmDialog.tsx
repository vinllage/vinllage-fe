'use client'

import Swal from 'sweetalert2'
type ConfirmDialogType = {
  title?: string
  text?: string
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question'
  confirmCallback?: () => void // 확인 버튼 클릭시
  cancelCallback?: () => void // 취소 버튼 클릭시
}

export default function useConfirmDialog() {
  return ({
    title,
    text,
    icon,
    confirmCallback,
    cancelCallback,
  }: ConfirmDialogType) => {
    title = title ?? '알림'
    icon = icon ?? 'warning'
    Swal.fire({
      title,
      icon,
      text,
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // 확인 버튼을 클릭한 경우
        if (typeof confirmCallback === 'function') {
          confirmCallback()
        }
      } else {
        // 취소 버튼을 클릭한 경우
        if (typeof cancelCallback === 'function') {
          cancelCallback()
        }
      }
    })
  }
}
