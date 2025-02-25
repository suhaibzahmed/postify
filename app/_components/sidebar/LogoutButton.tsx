import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SignOutButton } from '@clerk/nextjs'

function LogoutButton() {
  return (
    <div className="w-full">
      <Separator className="my-4" />
      <SignOutButton redirectUrl="/">
        <Button className="w-full">logout</Button>
      </SignOutButton>
    </div>
  )
}
export default LogoutButton
