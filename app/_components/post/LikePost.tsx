import { getLikesCount, isPostLiked } from '@/utils/actions'
import LikePostButton from './LikePostButton'

async function LikePost({ postId }: { postId: string }) {
  const likedPostId = await isPostLiked(postId)
  const likedCount = await getLikesCount(postId)

  return (
    <div className="flex items-center ">
      <LikePostButton postId={postId} likedPostId={likedPostId} />
      <p>{likedCount}</p>
    </div>
  )
}
export default LikePost
