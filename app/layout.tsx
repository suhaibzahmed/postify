import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Sidebar from './_components/sidebar/Sidebar'

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
        <body className=" container bg-slate-100 ">
          <Sidebar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
