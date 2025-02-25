'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface iAppLinks {
  title: string
  url: string
}

const appLinks: iAppLinks[] = [
  {
    title: 'All',
    url: '/app/all',
  },
  {
    title: 'Following',
    url: '/app/following',
  },
  {
    title: 'My Posts',
    url: '/app/my-posts',
  },
  {
    title: 'Liked',
    url: '/app/liked',
  },
  {
    title: 'Users',
    url: '/app/users',
  },
  {
    title: 'Profile',
    url: '/app/profile',
  },
]

function AppLinks() {
  const pathname = usePathname()
  return (
    <div className="flex flex-col flex-1 w-full ">
      <Separator className="my-4" />
      {appLinks.map((link) => (
        <Button
          asChild
          key={link.url}
          variant={pathname === link.url ? 'default' : 'ghost'}
        >
          <Link href={link.url}>{link.title}</Link>
        </Button>
      ))}
    </div>
  )
}
export default AppLinks
