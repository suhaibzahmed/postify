'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { createPost } from '@/utils/actions'
import { FiPlus } from 'react-icons/fi'
import FormContainer from '../form/FormContainer'
import FormInput from '../form/FormInput'
import { useState } from 'react'

function CreatePostButton() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="absolute bottom-5 right-5 z-20 shadow-md">
          <FiPlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <FormContainer
            btnTitle="create post"
            btnLoadingTitle="creating post"
            action={createPost}
            setOpen={setOpen}
          >
            <FormInput name="title" label="title" />
          </FormContainer>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default CreatePostButton
