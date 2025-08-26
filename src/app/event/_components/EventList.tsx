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
  pagination: any
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

const NoItem = styled.li`
  padding: 40px 16px;
  text-align: center;
  color: ${color.secondary};
`

const EventList = ({
  query,
  onSearch,
  events,
  pagination,
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
        {events.length === 0 ? (
          <NoItem>등록된 환경 행사가 없습니다.</NoItem>
        ) : (
          events.map((event) => (
            <Item key={event.hash}>
              <Link href={`/event/${event.hash}`} target="_self">
                {event.title}
              </Link>
              <span>{event.date}</span>
            </Item>
          ))
        )}
      </List>
      <Pagination pagination={pagination} onClick={onPageChange} />
    </Wrapper>
  )
}

export default React.memo(EventList)
