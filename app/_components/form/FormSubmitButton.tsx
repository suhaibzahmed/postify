'use client'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import Loader from '../Loader'

interface iFormSubmitButton {
  text?: string
  pendingText?: string
}

function FormSubmitButton(props: iFormSubmitButton) {
  const { text, pendingText } = props
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader />
          {text}
        </>
      ) : (
        pendingText
      )}
    </Button>
  )
}

export default FormSubmitButton
