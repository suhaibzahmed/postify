'use client'

import { Dispatch, SetStateAction, useActionState, useEffect } from 'react'
import { iAction } from '@/types/generalTypes'
import { useToast } from '@/hooks/use-toast'

function FormContainerDialog({
  action,
  children,
  setOpen,
}: {
  action: iAction
  children: React.ReactNode
  btnTitle?: string
  btnLoadingTitle?: string
  setOpen?: Dispatch<SetStateAction<boolean>>
}) {
  const [state, formAction] = useActionState(action, null)
  const { toast } = useToast()

  useEffect(() => {
    if (state?.success) {
      setOpen(false)
    }
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
export default FormContainerDialog
