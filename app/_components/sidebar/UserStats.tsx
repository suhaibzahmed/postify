import { getFollowerCount, getFollowingCount } from '@/utils/actions'

async function UserStats() {
  const followingCount = await getFollowingCount()
  const followerCount = await getFollowerCount()

  return (
    <div className="flex">
      <div>
        <h6>Followers</h6>
        <h4>{followerCount}</h4>
      </div>
      <div>
        <h6>Following</h6>
        <h4>{followingCount}</h4>
      </div>
    </div>
  )
}
export default UserStats
