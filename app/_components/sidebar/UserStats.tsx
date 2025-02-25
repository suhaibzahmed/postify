import { getFollowerCount, getFollowingCount } from '@/utils/actions'

async function UserStats() {
  const followingCount = await getFollowingCount()
  const followerCount = await getFollowerCount()

  return (
    <div className="flex mt-4 text-center gap-x-8">
      <div>
        <p className="text-gray-500">Followers</p>
        <h4>{followerCount}</h4>
      </div>
      <div>
        <p className="text-gray-500">Following</p>
        <h4>{followingCount}</h4>
      </div>
    </div>
  )
}
export default UserStats
