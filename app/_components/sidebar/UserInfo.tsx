import { getCurrentProfile } from '@/utils/actions'

async function UserInfo() {
  const userDetails = await getCurrentProfile()

  return (
    <div className="text-center">
      <h2 className="font-medium">{userDetails?.firstName}</h2>
      <p className="text-gray-500">@{userDetails?.username}</p>
    </div>
  )
}
export default UserInfo
