import { getCurrentUserInfo } from '@/utils/actions'

async function UserInfo() {
  const user = await getCurrentUserInfo()

  return (
    <div>
      <h2>{user?.firstName}</h2>
      <p>@{user?.username}</p>
    </div>
  )
}
export default UserInfo
