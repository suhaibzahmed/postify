'use client'

import { useActionState, useEffect } from 'react'
import FormSubmitButton from '../form/FormSubmitButton'
import { followUnfollowUser } from '@/utils/actions'
import { useToast } from '@/hooks/use-toast'

interface iFollowButton {
  profileId: string
  isFollowingId: string | undefined
}

function FollowButton(props: iFollowButton) {
  const { isFollowingId, profileId } = props
  const [state, formAction] = useActionState(followUnfollowUser, null)
  const { toast } = useToast()

  useEffect(() => {
    if (state?.message) {
      toast({ description: state.message })
    }
  }, [state])

  return (
    <form action={async () => formAction(profileId)}>
      <FormSubmitButton
        variant={isFollowingId ? 'outline' : 'default'}
        text={isFollowingId ? 'unfollow' : 'follow'}
        pendingText={isFollowingId ? 'unfollowing' : 'following'}
      />
    </form>
  )
}
export default FollowButton
