import EmailSenderForm from '@/app/member/_components/EmailSenderForm'
import { EmailCategory } from '../constants/EmailCategory'

export default function FindPasswordPage() {
  return (
    <div className="container">
      <h1>비밀번호 찾기</h1>
      <EmailSenderForm category={EmailCategory.FIND_PASSWORD} />
    </div>
  )
}
