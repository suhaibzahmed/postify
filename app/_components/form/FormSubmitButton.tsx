import { Button } from '@/components/ui/button'
import Loader from '../Loader'

interface iFormSubmitButton {
  isPending: boolean
  btnTitle: string
  btnLoadingTitle?: string
}

function FormSubmitButton(props: iFormSubmitButton) {
  const { btnTitle, isPending, btnLoadingTitle } = props

  return (
    <Button type="submit" disabled={isPending}>
      {isPending ? (
        <>
          <Loader />
          {btnLoadingTitle}
        </>
      ) : (
        btnTitle
      )}
    </Button>
  )
}
export default FormSubmitButton
