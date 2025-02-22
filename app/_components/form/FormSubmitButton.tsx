'use client'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import Loader from '../Loader'

interface iFormSubmitButton {
  text?: string
  pendingText?: string
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined
}

function FormSubmitButton(props: iFormSubmitButton) {
  const { text, pendingText, variant } = props
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} variant={variant || 'default'}>
      {pending ? (
        <>
          <Loader />
          {pendingText}
        </>
      ) : (
        text
      )}
    </Button>
  )
}

export default FormSubmitButton
