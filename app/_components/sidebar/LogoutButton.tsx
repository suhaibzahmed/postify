import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SignOutButton } from '@clerk/nextjs'

function LogoutButton() {
  return (
    <div>
      <Separator />
      <SignOutButton redirectUrl="/">
        <Button>logout</Button>
      </SignOutButton>
    </div>
  )
}
export default LogoutButton
