'use client'

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import type { EventType } from '../_types'

type Props = {
  query: string
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  events: EventType[]
  page: number
  totalPages: number
  onPageChange: (p: number) => void
}

const Wrapper = styled.div`
  margin-top: 20px;
`

const SearchBox = styled.div`
  margin-bottom: 20px;

  input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
`

const List = styled.ul`
  border-top: 2px solid #ccc;
`

const Item = styled.li`
  display: flex;
  border-bottom: 1px solid #ccc;

  span {
    width: 100px;
    margin-left: 10px;
    color: #666;
    text-align: center;
    line-height: 38px;
  }

  a {
    flex: 1;
    padding: 10px 0;
    display: inline-block;
  }
`

const Pagination = styled.nav`
  margin-top: 20px;
  text-align: center;
  button {
    margin-right: 5px;
  }
`

const EventList = ({query, onSearch, events, page, totalPages, onPageChange,}: Props) => {
  return (
    <Wrapper>
      <SearchBox>
        <input
          type="text"
          placeholder="검색"
          value={query}
          onChange={onSearch}
        />
      </SearchBox>
      <List>
        {events.map((event) => (
          <Item key={event.hash}>
            <Link href={`/event/${event.hash}`} target="_self">
              {event.title}
            </Link>
            <span>{event.date}</span>
          </Item>
        ))}
      </List>
      {totalPages > 1 && (
        <Pagination>
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
        </Pagination>
      )}
    </Wrapper>
  )
}

export default React.memo(EventList)
