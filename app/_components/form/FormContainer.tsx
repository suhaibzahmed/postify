'use client'
import { useActionState, useEffect } from 'react'
import { iAction } from '@/types/generalTypes'
import { useToast } from '@/hooks/use-toast'

function FormContainer({
  action,
  children,
}: {
  action: iAction
  children: React.ReactNode
  btnTitle?: string
  btnLoadingTitle?: string
}) {
  const [state, formAction] = useActionState(action, null)
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
    <form action={formAction} className="flex flex-col gap-y-4">
      {children}
    </form>
  )
}
export default FormContainer
