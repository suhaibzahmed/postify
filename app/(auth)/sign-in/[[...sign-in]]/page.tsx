import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

function SignInPage() {
  return (
    <div className="h-screen w-screen flex flex-col gap-y-2 items-center justify-center">
      <Link href="/">
        <h6>Go to home</h6>
      </Link>
      <SignIn />
    </div>
  )
}
export default SignInPage
