'use client'

import React, { useEffect, useState } from 'react'

type FileInfo = {
  seq: number
  fileUrl: string
  thumbBaseUrl?: string
  originalFilename: string
}

export default function MyRecycleForm() {
  const [files, setFiles] = useState<FileInfo[]>([])

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch('/api/v1/mypage/recycle/files', {
          credentials: 'include',
        })
        if (!res.ok) throw new Error('리사이클 파일 조회 실패')
        const data = await res.json()
        setFiles(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchFiles()
  }, [])

  if (!files.length) {
    return <p>저장된 분리수거 이미지가 없습니다.</p>
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
      }}
    >
      {files.map((file) => (
        <div
          key={file.seq}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px',
            textAlign: 'center',
          }}
        >
          <img
            src={file.thumbBaseUrl || file.fileUrl}
            alt={file.originalFilename}
            style={{ width: '100%', borderRadius: '6px', marginBottom: '8px' }}
          />
          <p>{file.originalFilename}</p>
          <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
            원본 보기
          </a>
        </div>
      ))}
    </div>
  )
}
