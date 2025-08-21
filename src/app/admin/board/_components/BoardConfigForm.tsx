import React from 'react'
import styled from 'styled-components'
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from 'react-icons/md'
import MessageBox from '@/app/_global/components/MessageBox'
import { SubmitButton } from '@/app/_global/components/Buttons'
import { Input } from '@/app/_global/components/Forms'

const StyledForm = styled.form`
  .message {
    margin-bottom: 10px;
  }
`

interface FormProps {
  form: any;
  errors: any;
  pending: boolean;
  action: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const BoardConfigForm = ({ form, errors, pending, action, onChange }: FormProps) => {
  return (
    <StyledForm action={action} autoComplete="off">
      <tbody>
        <tr>
          <th>게시판 아이디</th>
          <td>
              {form.mode === 'update' ? (
                <>
                  <input type="hidden" name="bid" value={form.bid} />
                  {form.bid}
                </>
              ) : (
                <Input
                  type="text"
                  name="bid"
                  value={form.bid}
                  onChange={onChange}
                  placeholder="게시판 아이디를 입력하세요"
                />
              )}
          </td>
        </tr>

        <tr>
          <th>게시판 이름</th>
          <td>
            <Input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="게시판 이름을 입력하세요"
              />
          <MessageBox color="danger">{errors?.name}</MessageBox>
          </td>
        </tr>
            
          <tr>
            <th>보기 권한</th>
            <td>
              <select name="viewAuthority" value={form.viewAuthority} onChange={onChange}>
                <option value="ALL">전체</option>
                <option value="MEMBER">회원</option>
                <option value="ADMIN">관리자</option>
              </select>
            </td>
          </tr>

          <tr>
            <th>쓰기 권한</th>
            <td>
              <select name="writeAuthority" value={form.writeAuthority} onChange={onChange}>
                <option value="ALL">전체</option>
                <option value="MEMBER">회원</option>
                <option value="ADMIN">관리자</option>
              </select>
            </td>
          </tr>

          <tr>
            <th>댓글 권한</th>
            <td>
              <select name="commentAuthority" value={form.commentAuthority} onChange={onChange}>
                <option value="ALL">전체</option>
                <option value="MEMBER">회원</option>
                <option value="ADMIN">관리자</option>
              </select>
            </td>
          </tr>
            
    
          <tr>
            <th>페이지당 글 수</th>
            <td>
              <Input
                type="number"
                name="rowsForPage"
                value={form.rowsForPage}
                onChange={onChange}
                min="1"
                max="100"
              />
            </td>
          </tr>

          <tr>
            <th>페이지 개수</th>
            <td>
              <Input
                type="number"
                name="pageCount"
                value={form.pageCount}
                onChange={onChange}
                min="1"
                max="20"
              />
            </td>
          </tr>
        </tbody>

      <div style={{ marginTop: '20px' }}>
        <button type="submit" disabled={pending}>
          {pending ? '처리중...' : (form.mode === 'update' ? '수정' : '등록')}
        </button>
      </div>

      {errors?.message && (
        <MessageBox color="danger">{errors.message}</MessageBox>
      )}
    </StyledForm>
  )
}

export default React.memo(BoardConfigForm)