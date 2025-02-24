import { checkAuth, getProfileById } from '@/utils/actions'

async function UserInfo() {
  const user = await checkAuth()
  const userDetails = await getProfileById(user.id)

  return (
    <div>
      <h2>{userDetails?.firstName}</h2>
      <p>@{userDetails?.username}</p>
    </div>
  )
}
export default UserInfo
