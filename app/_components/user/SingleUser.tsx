import { Profile } from '@prisma/client'
import Image from 'next/image'
import { FaUser } from 'react-icons/fa'
import FollowButton from './FollowButton'
import { checkCurrentUserFollowing } from '@/utils/actions'

interface iSingleUser {
  user: Profile
}
async function SingleUser(props: iSingleUser) {
  const { user } = props
  const followingUser = await checkCurrentUserFollowing(user.clerkId)

  return (
    <div className="flex items-center justify-between border rounded-md h-24">
      <div>
        <div className="h-8 w-8 rounded-full relative">
          {user.profileImage ? (
            <Image
              src={user.profileImage}
              alt={user.firstName}
              fill
              className="rounded-full"
            />
          ) : (
            <FaUser />
          )}
        </div>
        <div>
          <p>
            {user.firstName} {user.lastName}
          </p>
          <p>@{user.username}</p>
        </div>
      </div>
      <FollowButton
        profileId={user.clerkId}
        isFollowingId={followingUser?.id}
      />
    </div>
  )
}
export default SingleUser
