'use client'

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import type { EventType } from '../_types'
import color from '@/app/_global/styles/color'
import fontsize from '@/app/_global/styles/fontsize'
import Pagination from '@/app/_global/components/Pagination'

type Props = {
  query: string
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  events: EventType[]
  page: number
  totalPages: number
  onPageChange: (p: number) => void
}

const Wrapper = styled.div`
  margin: 40px auto;
`

const SearchBox = styled.div`
  margin-bottom: 20px;

  input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: ${fontsize.medium};
    box-sizing: border-box;
    transition: border 0.2s ease;

    &:focus {
      border-color: ${color.primary};
      outline: none;
      box-shadow: 0 0 0 3px rgba(43, 108, 176, 0.15);
    }
  }
`

const List = styled.ul`
  border-top: 2px solid ${color.secondary};
  overflow: hidden;
`

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
  transition: background 0.2s ease;

  &:hover {
    background: #f9fafc;
  }

  a {
    flex: 1;
    font-size: ${fontsize.medium};
    font-weight: 500;
    color: ${color.secondary};

    &:hover {
      color: ${color.primary};
    }
  }

  span {
    font-size: ${fontsize.normal};
    color: ${color.secondary};
    margin-left: 20px;
    white-space: nowrap;
  }
`

const PaginationWrapper = styled.nav`
  margin-top: 24px;
  text-align: center;

  button {
    margin: 0 4px;
    padding: 8px 14px;
    border: none;
    border-radius: 6px;
    background: #f1f1f1;
    font-size: ${fontsize.small};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: ${color.primary};
      color: #fff;
    }

    &:disabled {
      background: #ddd;
      cursor: not-allowed;
      color: #aaa;
    }
  }

  .active {
    background: ${color.primary};
    color: ${color.white};
    font-weight: 600;
  }
`

const EventList = ({
  query,
  onSearch,
  events,
  page,
  totalPages,
  onPageChange,
}: Props) => {
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
      <PaginationWrapper>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </PaginationWrapper>
    </Wrapper>
  )
}

export default React.memo(EventList)
