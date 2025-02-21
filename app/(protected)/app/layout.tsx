import Sidebar from '@/app/_components/sidebar/Sidebar'

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen container flex gap-x-2">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-white relative">{children}</div>
    </div>
  )
}
export default AppLayout
