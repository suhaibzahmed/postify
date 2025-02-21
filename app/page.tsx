import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="h-screen w-full mx-auto flex flex-col items-center justify-center">
      <div className="text-center w-[800px] bg-white rounded-xl py-8 px-16 flex flex-col gap-y-4">
        <h1>Postify App</h1>
        <p className="mb-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat
          perspiciatis enim sequi neque accusantium, labore laudantium nulla
          totam aut officia ipsam commodi voluptatibus ea illo? Similique
          reprehenderit hic alias. Sapiente?
        </p>
        <div className="flex gap-x-4 w-full justify-center">
          <SignInButton>
            <Button>login</Button>
          </SignInButton>
          <SignUpButton>
            <Button variant="outline">Register</Button>
          </SignUpButton>
        </div>
      </div>
    </div>
  )
}
