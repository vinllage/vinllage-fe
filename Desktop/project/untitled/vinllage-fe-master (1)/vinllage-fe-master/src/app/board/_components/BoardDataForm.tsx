import React from 'react'
import styled from 'styled-components'
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from 'react-icons/md'
import MessageBox from '@/app/_global/components/MessageBox'
import { Input, Textarea, TableCols } from '@/app/_global/components/Forms'
import { SubmitButton } from '@/app/_global/components/Buttons'

const StyledForm = styled.form``

const BoardDataForm = ({
  form,
  errors,
  pending,
  action,
  onChange,
  onKeyValue,
}) => {
  return (
    <StyledForm action={action} autoComplete="off">
      <input type="hidden" name="bid" value={form.bid} />

      <MessageBox color="danger">{errors.global}</MessageBox>
      <TableCols thwidth={180}>
        <tbody>
          <tr>
            <th>제목</th>
            <td>
              <Input
                type="text"
                name="subject"
                value={form.subject}
                onChange={onChange}
              />
              <MessageBox color="danger">{errors.subject}</MessageBox>
            </td>
          </tr>
        <tr>
        <th>작성자</th>
            <td>
              {form.guest === true ? (
                <Input
                  type="text"
                  name=""
                  value={form.poster}
                  onChange={onChange}
                />
              ) : (
                <>
                  <input type="hidden" name="bid" value={form.poster} />
                  {form.poster}
                </>
                
              )}
              <MessageBox color="danger">{errors.poster}</MessageBox>
            </td>
        </tr>
        <tr>
            <th>내용</th>
            <td>
              <Input
                type="text"
                name="content"
                value={form.content}
                onChange={onChange}
              />
              <MessageBox color="danger">{errors.content}</MessageBox>
            </td>
        </tr>
        </tbody>
      </TableCols>
      <SubmitButton type="submit" disabled={pending} width={250} color="dark">
        {form.mode === 'update' ? '수정하기' : '등록하기'}
      </SubmitButton>
    </StyledForm>
  )
}

export default React.memo(BoardDataForm)