'use server'

import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import db from './db'
import { postSchema, validateWithZodSchema } from './schemas'

async function checkAuth() {
  const user = await currentUser()
  if (!user) return redirect('/')
  return user
}

function stdErrorMsg(title: string, error: unknown) {
  return console.log(`error occurred while ${title}`, error)
}

export async function getCurrentProfileImage() {
  try {
    const user = await checkAuth()
    return user.imageUrl
  } catch (error) {
    stdErrorMsg('getting user image', error)
  }
}

export async function getCurrentUserInfo() {
  try {
    const user = await checkAuth()
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    }
  } catch (error) {
    stdErrorMsg('getting user info', error)
  }
}

export async function getAllPosts() {
  try {
    const posts = await db.post.findMany({
      include: { profile: true },
    })
    return posts
  } catch (error) {
    stdErrorMsg('getting all posts', error)
  }
}

export async function createPost(
  prevState: unknown,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {
    const user = await checkAuth()

    const rawData = {
      title: formData.get('title') as string,
    }

    const validatedData = validateWithZodSchema(postSchema, rawData)

    await db.post.create({ data: { profileId: user.id, ...validatedData } })

    return { success: true, message: 'Post created' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export async function getMyPosts() {}
