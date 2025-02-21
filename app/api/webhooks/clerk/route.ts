import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { iUser } from '@/types/generalTypes'
import db from '@/utils/db'

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error(
      'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local'
    )
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  const { id } = evt.data
  const eventType = evt.type
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`)

  if (eventType === 'user.created') {
    const {
      first_name,
      last_name,
      username,
      email_addresses,
      image_url,
      primary_email_address_id,
    } = evt.data

    const email = email_addresses.find(
      (email) => email.id === primary_email_address_id
    )?.email_address as string

    const rawData: iUser = {
      clerkId: id as string,
      firstName: first_name as string,
      lastName: last_name as string,
      username: username as string,
      email,
      profileImage: image_url || '',
    }
    console.log('🚀 ~ POST ~ rawData:', rawData)

    try {
      const profile = await db.profile.create({ data: rawData })
      if (!profile) throw new Error('Failed to create user')
    } catch (error) {
      console.log('Error occurred while creating profile', error)
    }
  }

  if (eventType === 'user.updated') {
    const {
      first_name,
      last_name,
      username,
      email_addresses,
      image_url,
      primary_email_address_id,
    } = evt.data

    const email = email_addresses.find(
      (email) => email.id === primary_email_address_id
    )?.email_address as string

    const rawData: iUser = {
      clerkId: id as string,
      firstName: first_name as string,
      lastName: last_name as string,
      username: username as string,
      email,
      profileImage: image_url,
    }

    try {
      const updatedProfile = await db.profile.update({
        where: {
          clerkId: id,
        },
        data: rawData,
      })
      if (!updatedProfile) throw new Error('Failed to update user')
    } catch (error) {
      console.log('Error occurred while updating profile', error)
    }
  }

  if (eventType === 'user.deleted') {
    try {
      await db.profile.delete({ where: { clerkId: id } })
    } catch (error) {
      console.log('Error occurred while deleting profile', error)
    }
  }

  return new Response('Webhook received', { status: 200 })
}
