import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface iFormInput {
  name: string
  label?: string
}

function FormInput(props: iFormInput) {
  const { name, label } = props

  return (
    <div>
      <Label htmlFor={name}>{label || name}</Label>
      <Input name={name} id={name} />
    </div>
  )
}
export default FormInput
