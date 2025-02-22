import CreatePostButton from '@/app/_components/post/CreatePostButton'
import NoPostsFound from '@/app/_components/post/NoPostsFound'
import SinglePost from '@/app/_components/post/SinglePost'
import { getMyPosts } from '@/utils/actions'

async function MyPostsPage() {
  const posts = await getMyPosts()

  return (
    <div>
      {posts?.length === 0 ? (
        <NoPostsFound />
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
