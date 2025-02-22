import EmptyList from '@/app/_components/EmptyList'
import SinglePost from '@/app/_components/post/SinglePost'
import { getLikedPosts } from '@/utils/actions'

async function LikedPostsPage() {
  const posts = await getLikedPosts()

  return (
    <div>
      {' '}
      {posts?.length === 0 ? (
        <EmptyList title="posts" />
      ) : (
        posts?.map((post, index) => (
          <SinglePost
            key={post.id}
            post={post}
            profile={post.profile}
            isLast={index === posts.length - 1}
          />
        ))
      )}
    </div>
  )
}
export default LikedPostsPage
