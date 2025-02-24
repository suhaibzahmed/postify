import { Separator } from '@/components/ui/separator'
import { iPost } from '@/types/generalTypes'
import { formatDate } from '@/utils/formatDate'
import Image from 'next/image'
import { FaRegHeart, FaUser } from 'react-icons/fa'
import { CommentPostButton, LikePostButton } from '../form/FormSubmitButton'
import FormContainer from '../form/FormContainerDialog'
import { likePost } from '@/utils/actions'
import LikePost from './LikePost'
import CommentPost from './CommentPost'

function SinglePost(props: iPost) {
  const { post, profile, isLast } = props

  return (
    <div>
      <div className="flex">
        <div className="relative h-10 w-10 rounded-full">
          {profile?.profileImage ? (
            <Image
              src={profile.profileImage}
              alt={profile.firstName}
              fill
              className="rounded-full"
            />
          ) : (
            <FaUser className="text-primary" />
          )}
        </div>
        <div>
          <div className="flex items-center">
            <p>
              {profile?.firstName} {profile?.lastName}
            </p>
            <Separator orientation="vertical" className="h-5" />
            <p>@{profile?.username}</p>
            <Separator orientation="vertical" className="h-5" />
            {/* TODO: Add image file */}
            <p>{formatDate(profile?.createdAt)}</p>
          </div>
          <div>
            <p>{post.title}</p>
            {/* TODO: Add image file */}
          </div>

          <div className="flex items-center gap-x-8">
            <LikePost postId={post.id} />
            {/* TODO: Add comments */}
            <CommentPost postId={post.id} />
          </div>
        </div>
      </div>

      {!isLast && <Separator />}
    </div>
  )
}
export default SinglePost
