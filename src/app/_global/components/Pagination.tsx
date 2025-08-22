'use client'

import React from 'react'
import styled from 'styled-components'

interface Props {
  page: number
  totalPages: number
  onPageChange: (p: number) => void
}

const Wrapper = styled.nav`
  margin-top: 20px;

  button {
    margin-right: 5px;
  }
`

const Pagination = ({ page, totalPages, onPageChange }: Props) => {
  if (totalPages <= 1) return null
  return (
    <Wrapper>
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }).map((_, idx) => {
        const p = idx + 1
        return (
          <button key={p} onClick={() => onPageChange(p)} disabled={p === page}>
            {p}
          </button>
        )
      })}
      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
      >
        Next
      </button>
    </Wrapper>
  )
}

export default React.memo(Pagination)
