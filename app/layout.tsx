import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Postify App',
  description: 'A social media app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className=" bg-slate-100 ">
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
