'use client'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { likePost } from '@/utils/actions'
import { useActionState, useEffect } from 'react'
import Loader from '../Loader'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

interface iLikePostButton {
  postId: string
  likedPostId: string | undefined
}

function LikePostButton(props: iLikePostButton) {
  const { postId, likedPostId } = props
  const [state, formAction, pending] = useActionState(likePost, null)
  const { toast } = useToast()

  useEffect(() => {
    if (state?.message) {
      toast({
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      })
    }
  }, [state])

  return (
    <form action={async () => formAction(postId)}>
      <Button type="submit" disabled={pending} variant="ghost" size="sm">
        {pending ? (
          <>
            <Loader />
          </>
        ) : likedPostId ? (
          <FaHeart className="text-red-600" />
        ) : (
          <FaRegHeart />
        )}
      </Button>
    </form>
  )
}

export default LikePostButton
