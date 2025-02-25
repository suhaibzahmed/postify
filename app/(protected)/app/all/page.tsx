import EmptyList from '@/app/_components/EmptyList'
import SinglePost from '@/app/_components/post/SinglePost'
import { getAllPosts } from '@/utils/actions'

async function AllPostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="flex flex-col">
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
export default AllPostsPage
