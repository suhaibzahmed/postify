'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { ImageKitProvider, IKImage, IKUpload } from 'imagekitio-next'
import ImageKit from 'imagekit'

interface iFormImageInput {
  name: string
  label?: string
}
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY

function PostImageInput(props: iFormImageInput) {
  const { name, label } = props
  const imgRef = useRef<HTMLInputElement | null>(null)
  const [img, setImg] = useState('')

  const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
    privateKey: process.env.PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
  })

  async function handleUploadImage() {
    imgRef.current?.abor()
  }

  async function handleImageChange(file: string) {
    try {
      const response = await fetch('/api/imageKit')

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        )
      }

      const data = await response.json()
      const { signature, expire, token } = data
      return { signature, expire, token }
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`)
    }
  }

  const authenticator = async () => {
    try {
      const response = await fetch('/api/imageKit')

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        )
      }

      const data = await response.json()
      console.log('🚀 ~ authenticator ~ data:', data)
      const { signature, expire, token } = data
      return { signature, expire, token }
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`)
    }
  }

  const onError = (err) => {
    console.log('Error', err)
  }

  const onSuccess = (res) => {
    console.log('Success', res)
  }

  function handleDeleteImg() {
    console.log('🚀 ~ handleDeleteImg ~ imagekit:', imagekit)
    console.log(img)
    imagekit.deleteFile(img, (error, res) => {
      if (error) console.log(error)
      else console.log(res)
    })
  }

  return (
    <div>
      <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        <Label>File upload</Label>
        <div className="w-full h-[200px] border border-dashed flex items-center justify-center relative">
          <IKUpload
            fileName="post-image.png"
            onError={onError}
            onSuccess={onSuccess}
            folder={'posts'}
            useUniqueFileName
            validateFile={(file) => file.size <= 3000000}
            name="postImage"
            hidden
            className="hidden"
            onChange={(e) => setImg(e.target.value)}
            ref={imgRef}
          />
          {img ? (
            <>
              <IKImage path={img} fill alt="image" className="object-contain" />
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={handleDeleteImg}
              >
                <FaRegTrashAlt />
              </Button>
            </>
          ) : (
            <Button type="button" onClick={handleUploadImage}>
              upload image
            </Button>
          )}
        </div>
      </ImageKitProvider>
    </div>
    // <div>
    //   <Label>{label}</Label>
    //   <Input
    //     type="file"
    //     hidden
    //     name={name}
    //     className="hidden"
    //     ref={imgRef}
    //     onChange={(e) => handleImageChange(e.target.value)}
    //   />
    //   <div className="h-[200px] w-full flex items-center justify-center border border-dashed relative">
    //     {!img ? (
    //       <Button type="button" onClick={handleUploadImage}>
    //         upload image
    //       </Button>
    //     ) : (
    //       <>
    //         <Image src={img} alt="post image" height={200} width={200} />
    //         <Button
    //           type="button"
    //           size="icon"
    //           variant="destructive"
    //           className="absolute top-5 right-5"
    //           onClick={() => setImg('')}
    //         >
    //           <FaRegTrashAlt />
    //         </Button>
    //       </>
    //     )}
    //   </div>
    // </div>
  )
}
export default PostImageInput
