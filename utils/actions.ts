'use server'

import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import db from './db'
import { postSchema, userUpdateSchema, validateWithZodSchema } from './schemas'
import { revalidatePath } from 'next/cache'

export async function checkAuth() {
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

export async function getAllPosts() {
  try {
    const posts = await db.post.findMany({
      include: { profile: true },
      orderBy: { createdAt: 'desc' },
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
      orderBy: { createdAt: 'desc' },
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

export async function getAllUsers() {
  try {
    const user = await checkAuth()
    const users = await db.profile.findMany({
      where: { NOT: { clerkId: user.id } },
    })
    return users
  } catch (error) {
    stdErrorMsg('getting all users', error)
  }
}

export async function checkCurrentUserFollowing(profileId: string) {
  try {
    const currentUser = await checkAuth()
    const followedUser = await db.follow.findFirst({
      where: { followerId: currentUser.id, followingId: profileId },
    })
    return followedUser
  } catch (error) {
    stdErrorMsg('checking current user follows', error)
  }
}

export async function followUnfollowUser(
  prevState: unknown,
  profileId: string
): Promise<{ success: boolean; message: string }> {
  try {
    const user = await checkAuth()
    const followedUser = await checkCurrentUserFollowing(profileId)

    if (followedUser) {
      await db.follow.delete({ where: { id: followedUser.id } })
      revalidatePath('/app/users')
      return { success: true, message: 'Unfollowed user successfully' }
    } else {
      await db.follow.create({
        data: {
          followerId: user.id,
          followingId: profileId,
        },
      })
      revalidatePath('/app/users')
      return { success: true, message: 'followed user successfully' }
    }
  } catch (error) {
    return { success: false, message: 'error while following user' }
  }
}

export async function getFollowedUsersPost() {
  try {
    const user = await checkAuth()
    const followedUsers = await db.follow.findMany({
      where: {
        followerId: user.id,
      },
    })
    const userIds = followedUsers.map((user) => user.followingId)
    const posts = await db.post.findMany({
      where: {
        profileId: { in: userIds },
      },
      include: { profile: true },
      orderBy: { createdAt: 'desc' },
    })
    return posts
  } catch (error) {
    stdErrorMsg('getting followed users posts', error)
  }
}

export async function getLikedPosts() {
  try {
    const user = await checkAuth()
    const liked = await db.like.findMany({
      where: { profileId: user.id as string },
    })
    const likedIds = liked
      .map((like) => like.postId)
      .filter((id) => id !== null)

    const posts = await db.post.findMany({
      where: {
        id: { in: likedIds },
      },
      include: { profile: true },
      orderBy: { createdAt: 'desc' },
    })

    return posts
  } catch (error) {
    stdErrorMsg('getting liked posts', error)
  }
}

export async function getFollowingCount() {
  try {
    const user = await checkAuth()
    const count = await db.follow.count({ where: { followerId: user.id } })
    return count
  } catch (error) {
    stdErrorMsg('getting follower count', error)
  }
}

export async function getFollowerCount() {
  try {
    const user = await checkAuth()
    const count = await db.follow.count({ where: { followingId: user.id } })
    return count
  } catch (error) {
    stdErrorMsg('getting follower count', error)
  }
}

export async function updateProfile(
  prevState: unknown,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {
    const user = await checkAuth()
    const userDetails = await db.profile.findUnique({
      where: { clerkId: user.id },
    })

    const rawData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      username: formData.get('username') as string,
    }
    const validatedData = validateWithZodSchema(userUpdateSchema, rawData)

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        ...userDetails,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        username: validatedData.username,
      },
    })

    revalidatePath('/app/profile')
    return { success: true, message: 'user details updated successfully' }
  } catch (error) {
    return {
      success: false,
      message: 'error occurred while updating user details',
    }
  }
}

export async function getCurrentProfile() {
  try {
    const user = await checkAuth()
    const profile = await db.profile.findUnique({
      where: { clerkId: user.id },
    })
    return profile
  } catch (error) {
    stdErrorMsg('getting profile by ID', error)
  }
}
