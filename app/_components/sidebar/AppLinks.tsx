'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

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
    title: 'Users',
    url: '/app/users',
  },
  {
    title: 'Profile',
    url: '/app/profile',
  },
]

function AppLinks() {
  return (
    <div className="flex flex-col">
      {appLinks.map((link) => (
        <Button asChild key={link.url}>
          <Link href={link.url}>{link.title}</Link>
        </Button>
      ))}
    </div>
  )
}
export default AppLinks
