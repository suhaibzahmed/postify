'use client'

import { Dispatch, SetStateAction, useActionState, useEffect } from 'react'
import FormSubmitButton from './FormSubmitButton'
import { iAction } from '@/types/generalTypes'
import { useToast } from '@/hooks/use-toast'

function FormContainer({
  action,
  children,
  btnTitle = 'submit',
  btnLoadingTitle = 'submitting',
  setOpen,
}: {
  action: iAction
  children: React.ReactNode
  btnTitle: string
  btnLoadingTitle?: string
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [state, formAction, isPending] = useActionState(action, null)
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
      <FormSubmitButton
        isPending={isPending}
        btnTitle={btnTitle}
        btnLoadingTitle={btnLoadingTitle}
      />
    </form>
  )
}
export default FormContainer
