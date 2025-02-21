import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FaUser } from 'react-icons/fa'
import Loader from '../Loader'
import { getCurrentProfileImage } from '@/utils/actions'

async function UserAvatar() {
  const imgUrl = await getCurrentProfileImage()

  return (
    <div>
      <Avatar className="h-20 w-20">
        {imgUrl ? (
          <>
            <AvatarImage src={imgUrl} />
            <AvatarFallback>
              <Loader />
            </AvatarFallback>
          </>
        ) : (
          <FaUser className="h-full w-full text-primary" />
        )}
      </Avatar>
    </div>
  )
}
export default UserAvatar
