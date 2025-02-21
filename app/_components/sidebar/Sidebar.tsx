import AppLinks from './AppLinks'
import LogoutButton from './LogoutButton'
import UserAvatar from './UserAvatar'
import UserInfo from './UserInfo'
import UserStats from './UserStats'

function Sidebar() {
  return (
    <aside className="w-[250px] bg-white">
      <div>
        <UserAvatar />
        <UserInfo />
        <UserStats />
      </div>
      <AppLinks />
      <LogoutButton />
    </aside>
  )
}
export default Sidebar
