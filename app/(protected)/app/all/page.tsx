import SinglePost from '@/app/_components/post/SinglePost'
import { getAllPosts } from '@/utils/actions'

async function AllPostsPage() {
  const posts = await getAllPosts()

  return (
    <div>
      {posts?.length === 0 ? (
        <p>no posts found</p>
      ) : (
        posts?.map((post, index) => <SinglePost key={post.id} index={index} />)
      )}
    </div>
  )
}
export default AllPostsPage
