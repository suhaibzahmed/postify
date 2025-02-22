'use client'
import { Button } from '@/components/ui/button'
import { LucideMessageSquareText } from 'lucide-react'

function CommentPostButton() {
  return (
    <Button type="submit" variant="ghost" size="sm">
      <LucideMessageSquareText />
    </Button>
  )
}

export default CommentPostButton
