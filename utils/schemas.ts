import z, { ZodSchema } from 'zod'

export const postSchema = z.object({
  title: z.string().min(3, 'Post title must have at least 3 characters'),
  postImage: validateFile(),
})

function validateFile() {
  const MAX_IMAGE_UPLOAD_SIZE = 1024 * 1025 * 3
  const ACCEPTER_FILE_TYPES = ['/image']

  const image = z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_IMAGE_UPLOAD_SIZE
    }, 'File must be less than 3MB')
    .refine((file) => {
      return (
        !file || ACCEPTER_FILE_TYPES.some((type) => file.type.startsWith(type))
      )
    }, 'File must be an image file')

  return image
}

export const userUpdateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
})

export const validateWithZodSchema = (schema: ZodSchema, formData: unknown) => {
  const { success, data, error } = schema.safeParse(formData)

  if (!success) {
    const err = error.errors.map((e) => e.message)
    throw new Error(err.join(', '))
  }

  return data
}
