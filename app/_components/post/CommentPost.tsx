import CommentPostButton from './CommentPostButton'

function CommentPost({ postId }: { postId: string }) {
  return (
    <div className="flex items-center ">
      <CommentPostButton />
      <p>5</p>
    </div>
  )
}
export default CommentPost
