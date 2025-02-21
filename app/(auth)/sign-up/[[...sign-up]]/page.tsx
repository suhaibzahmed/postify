import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

function SignUpPage() {
  return (
    <div className="h-screen w-screen flex flex-col gap-y-2 items-center justify-center">
      <Link href="/">
        <h6>Go to home</h6>
      </Link>
      <SignUp />
    </div>
  )
}
export default SignUpPage
