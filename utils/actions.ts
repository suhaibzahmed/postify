'use server'

import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import db from './db'
import { postSchema, validateWithZodSchema } from './schemas'
import { revalidatePath } from 'next/cache'

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

    revalidatePath('/app/my-posts')
    return { success: true, message: 'Post created' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export async function getMyPosts() {
  try {
    const user = await checkAuth()
    const posts = await db.post.findMany({
      where: {
        profileId: user.id,
      },
      include: {
        profile: true,
      },
    })

    return posts
  } catch (error) {
    stdErrorMsg('fetching my posts', error)
  }
}

export async function isPostLiked(postId: string) {
  try {
    const user = await checkAuth()
    const likedPostId = await db.like.findFirst({
      where: {
        postId,
        profileId: user.id,
      },
    })

    return likedPostId?.id
  } catch (error) {
    stdErrorMsg('liking/unliking post', error)
  }
}

export async function likePost(
  prevState: unknown,
  postId: string
): Promise<{ success: boolean; message: string }> {
  try {
    const user = await checkAuth()
    const likedPostId = await isPostLiked(postId)

    if (likedPostId) {
      await db.like.delete({ where: { id: likedPostId } })
      revalidatePath('/app(.*)')
      return { success: true, message: 'post unliked successfully' }
    } else {
      await db.like.create({ data: { postId, profileId: user.id } })
      revalidatePath('/app(.*)')
      return { success: true, message: 'post liked successfully' }
    }
  } catch (error) {
    return { success: false, message: 'failed to like post' }
  }
}

export async function getLikesCount(postId: string) {
  const count = await db.like.count({ where: { postId } })
  return count
}
