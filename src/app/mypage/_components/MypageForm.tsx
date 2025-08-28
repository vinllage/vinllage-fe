'use client'

import React from 'react'
import styled from 'styled-components'
import FileImages from '@/app/_global/components/FileImages'

const StyledProfileView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  dl {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;

    dt {
      font-weight: bold;
      font-size: 14px;
      color: #333;
    }

    dd {
      margin: 0;
      font-size: 15px;
      color: #555;
    }
  }
`

const ProfileForm = ({ form, fileDeleteCallback }) => {
  return (
    <StyledProfileView>
      {/* ✅ 프로필 사진 */}
      <dl>
        <dt>프로필 사진</dt>
        <dd>
          <FileImages
            items={form.profileImage}
            width={250}
            height={250}
            viewOrgImage={true}
            callback={fileDeleteCallback}
          />
        </dd>
      </dl>

      {/* ✅ 이메일 */}
      <dl>
        <dt>이메일</dt>
        <dd>{form.email}</dd>
      </dl>

      {/* ✅ 회원명 */}
      <dl>
        <dt>회원명</dt>
        <dd>{form.name}</dd>
      </dl>

      {/* ✅ 휴대전화번호 */}
      <dl>
        <dt>휴대전화번호</dt>
        <dd>{form.mobile}</dd>
      </dl>
    </StyledProfileView>
  )
}

export default React.memo(ProfileForm)
