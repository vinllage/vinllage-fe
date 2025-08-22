'use client'

import React from 'react'
import styled from 'styled-components'
import color from '@/app/_global/styles/color'

interface Props {
  page: number
  totalPages: number
  onPageChange: (p: number) => void
}

const Wrapper = styled.nav`
  margin-top: 20px;
  text-align: center;

  button {
    margin-right: 5px;
    padding: 6px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: #f8f9fa;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: ${color.primary};
      color: ${color.white};
      border-color: ${color.primary};
    }

    &:disabled {
      background: #e9ecef;
      color: #adb5bd;
      cursor: not-allowed;
    }
  }

  .active {
    background: ${color.primary};
    color: ${color.white};
    font-weight: bold;
    border-color: ${color.primary};
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
          <button
            key={p}
            onClick={() => onPageChange(p)}
            disabled={p === page}
            className={p === page ? 'active' : undefined}
          >
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
