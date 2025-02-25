import FormContainer from '@/app/_components/form/FormContainer'
import FormInput from '@/app/_components/form/FormInput'
import FormSubmitButton from '@/app/_components/form/FormSubmitButton'
import { getCurrentProfile, updateProfile } from '@/utils/actions'

async function ProfilePage() {
  const userDetails = await getCurrentProfile()

  return (
    <div>
      <p>You Profile</p>
      <div>
        <FormContainer action={updateProfile}>
          <FormInput
            name="firstName"
            label="first name"
            defaultValue={userDetails?.firstName}
          />
          <FormInput
            name="lastName"
            label="last name"
            defaultValue={userDetails?.lastName}
          />
          <FormInput
            name="username"
            label="username"
            defaultValue={userDetails?.username}
          />
          <FormSubmitButton text="update" pendingText="updating" />
        </FormContainer>
      </div>
    </div>
  )
}
export default ProfilePage
