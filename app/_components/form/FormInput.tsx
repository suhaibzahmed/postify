import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface iFormInput {
  name: string
  label?: string
  defaultValue?: string | null
}

function FormInput(props: iFormInput) {
  const { name, label, defaultValue } = props

  return (
    <div>
      <Label htmlFor={name}>{label || name}</Label>
      <Input name={name} id={name} required defaultValue={defaultValue || ''} />
    </div>
  )
}
export default FormInput
