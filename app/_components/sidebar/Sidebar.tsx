import AppLinks from './AppLinks'
import LogoutButton from './LogoutButton'
import UserAvatar from './UserAvatar'
import UserInfo from './UserInfo'
import UserStats from './UserStats'

function Sidebar() {
  return (
    <aside className="w-[250px] bg-white flex flex-col items-center py-6">
      <div className="flex flex-col items-center w-full gap-y-2 h-[250px]">
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
