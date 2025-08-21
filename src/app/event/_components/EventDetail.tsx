'use client'

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import type { EventType } from '../_types'
import color from '@/app/_global/styles/color'
import fontsize from '@/app/_global/styles/fontsize'

type Props = {
  event: EventType
}

const Article = styled.article`
  background: #fff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  line-height: 1.7;
  margin: 40px auto;
  color: #333;

  h2 {
    margin-bottom: 12px;
    font-size: ${fontsize.big};
    font-weight: 700;
    color: ${color.dark};
    position: relative;
    padding-left: 20px;
  }

  h2::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 7px;
    height: 85%;
    background-color: #0c60db;
  }

  time {
    display: block;
    font-size: 14px;
    text-align: right;
    border: 1px solid #eee;
    border-left: none;
    border-right: none;
    padding: 5px;
    color: ${color.secondary};
  }

  p {
    padding: 20px;
    font-size: ${fontsize.medium};
    border-bottom: 1px solid #eee;
    background: #fafcff;
    margin: 0;
  }

  .btn-group {
    display: flex;
    gap: 12px;
    margin-top: 24px;
  }

  .btn {
    flex: 1;
    text-align: center;
    padding: 12px 18px;
    border-radius: 8px;
    font-size: ${fontsize.normal};
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
    text-decoration: none;
  }

  .btn-primary {
    background: #2b6cb0;
    color: ${color.white};

    &:hover {
      background: #1a4f80;
    }
  }

  .btn-secondary {
    background: #f1f1f1;
    color: #333;

    &:hover {
      background: #ddd;
    }
  }
`

const EventDetail = ({ event }: Props) => (
  <Article>
    <h2>{event.title}</h2>
    <time>{event.date}</time>
    {event.content &&
      (event.html ? (
        <div dangerouslySetInnerHTML={{ __html: event.content }} />
      ) : (
        <p>{event.content}</p>
      ))}

    <div className="btn-group">
      <a
        className="btn btn-primary"
        href={event.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        원문 바로가기
      </a>
      <Link className="btn btn-secondary" href="/event" target="_self">
        목록으로
      </Link>
    </div>
  </Article>
)

export default React.memo(EventDetail)
