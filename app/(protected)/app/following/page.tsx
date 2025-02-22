import SinglePost from '@/app/_components/post/SinglePost'
import { getFollowedUsersPost } from '@/utils/actions'

async function FollowingPostsPage() {
  const posts = await getFollowedUsersPost()

  return (
    <div>
      {posts?.length === 0 ? (
        <p>no posts found</p>
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
export default FollowingPostsPage
