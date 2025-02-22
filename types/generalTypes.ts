// use types for unions Eg: type a = b | c
// use interface for rest

import { Post, Profile } from '@prisma/client'

export interface iUser {
  clerkId: string
  firstName: string
  lastName: string
  username: string
  email: string
  profileImage?: string
}

export interface iAction {
  (prevState: unknown, formData: FormData): Promise<{
    success: boolean
    message: string
  }>
}

export interface iPost {
  profile: Profile | null
  post: Post
  isLast: boolean
}
