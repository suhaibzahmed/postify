import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { FiPlus } from 'react-icons/fi'

function CreatePostButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="absolute bottom-5 right-5 z-20 shadow-md">
          <FiPlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <div>
            <Input />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default CreatePostButton
