import UserOnlyContainer from "@/app/_global/wrappers/UserOnlyContainer"
import ContentBox from "@/app/_global/components/ContentBox"
import { MainTitle } from "@/app/_global/components/TitleBox"
import ProfileContainer from "../_containers/ProfileContainer"

export default function ProfilePage({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <UserOnlyContainer>
            <ContentBox width={720}>
            <MainTitle border="true">내 프로필</MainTitle>
            <ProfileContainer />
            </ContentBox>
        </UserOnlyContainer>
    )
}