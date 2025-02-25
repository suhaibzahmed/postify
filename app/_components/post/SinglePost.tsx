import { Separator } from '@/components/ui/separator'
import { iPost } from '@/types/generalTypes'
import { formatDate } from '@/utils/formatDate'
import Image from 'next/image'
import { FaUser } from 'react-icons/fa'
import LikePost from './LikePost'
import CommentPost from './CommentPost'

function SinglePost(props: iPost) {
  const { post, profile, isLast } = props

  return (
    <div>
      <div className="flex gap-x-4">
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
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center gap-x-4">
            <p className="font-bold">
              {profile?.firstName} {profile?.lastName}
            </p>
            <Separator orientation="vertical" className="h-5" />
            <p className="text-gray-400">@{profile?.username}</p>
            <Separator orientation="vertical" className="h-5" />
            {/* TODO: Add date file */}
            <p className="text-gray-400">{formatDate(profile?.createdAt)}</p>
          </div>

          <div className="mb-0">
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

      {!isLast && <Separator className="my-4" />}
    </div>
  )
}
export default SinglePost
