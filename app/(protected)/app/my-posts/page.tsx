import EmptyList from '@/app/_components/EmptyList'
import CreatePostButton from '@/app/_components/post/CreatePostButton'
import SinglePost from '@/app/_components/post/SinglePost'
import { getMyPosts } from '@/utils/actions'

async function MyPostsPage() {
  const posts = await getMyPosts()

  return (
    <div>
      {posts?.length === 0 ? (
        <EmptyList title="posts" />
      ) : (
        posts?.map((post, index) => (
          <SinglePost
            key={post.id}
            profile={post.profile}
            post={post}
            isLast={index === posts.length - 1}
          />
        ))
      )}
      <CreatePostButton />
    </div>
  )
}
export default MyPostsPage
