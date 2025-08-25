// app/admin/board/_components/BoardList.tsx
'use client';
import React, { useState, useEffect } from 'react';
import type { Board } from '@/app/admin/board/_types.ts'

interface BoardListProps {
  boards: Board[];
}

const BoardList = ({ boards }: BoardListProps) => {
  if (boards.length === 0) {
    return (
      <div>
        <h2>게시글 목록</h2>
        <p>게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>게시판 목록</h2>
      <table>  {/* ✅ table 태그로 감싸기 */}
        <thead>
          <tr>
            <th>게시판 ID</th>
            <th>게시판 이름</th>
            <th>사용여부</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {boards.map((board) => (
            <tr key={board.bid}>
              <td>{board.bid}</td>
              <td>{board.name}</td>
              <td>{board.active ? '사용' : '미사용'}</td>
              <td>
                <a href={`/admin/board/update/${board.bid}`}>수정</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoardList;