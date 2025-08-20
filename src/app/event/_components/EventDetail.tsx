'use client'

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import type { EventType } from '../_types'

type Props = {
  event: EventType
}

const Article = styled.article`
  line-height: 1.6;

  h1 {
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: 700;
  }

  time {
    display: block;
    margin-bottom: 20px;
    color: #666;
  }

  p {
    margin-top: 20px;
  }
`

const EventDetail = ({ event }: Props) => (
  <Article className="layout-width">
    <h1>{event.title}</h1>
    <time>{event.date}</time>
    {event.content &&
      (event.html ? (
        <div dangerouslySetInnerHTML={{ __html: event.content }} />
      ) : (
        <p>{event.content}</p>
      ))}
    <p>
      <a href={event.link} target="_blank" rel="noopener noreferrer">
        원문 바로가기
      </a>
    </p>
    <p>
      <Link href="/event" target="_self">
        목록으로
      </Link>
    </p>
  </Article>
)

export default React.memo(EventDetail)
