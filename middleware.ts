import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

const publicRoutes = createRouteMatcher([
  '/',
  '/sign-up(.*)',
  '/sign-in(.*)',
  '/api/webhooks/clerk',
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, redirectToSignIn } = await auth()
  const appUrl = new URL('/app/all', req.url)

  if (!userId && !publicRoutes(req)) {
    return redirectToSignIn({ returnBackUrl: req.url })
  }

  if (userId && publicRoutes(req)) {
    return NextResponse.redirect(appUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
