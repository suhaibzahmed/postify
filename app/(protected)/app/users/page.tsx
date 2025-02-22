import EmptyList from '@/app/_components/EmptyList'
import SingleUser from '@/app/_components/user/SingleUser'
import { getAllUsers } from '@/utils/actions'

async function UsersPage() {
  const users = await getAllUsers()

  return (
    <div className="grid grid-cols-2 gap-4">
      {users?.length === 0 ? (
        <EmptyList title="users" />
      ) : (
        users?.map((user) => <SingleUser key={user.id} user={user} />)
      )}
    </div>
  )
}
export default UsersPage
