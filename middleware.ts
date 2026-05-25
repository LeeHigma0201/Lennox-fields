import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// Free lead-magnet tools — open to everyone, no login or subscription.
// MUST stay in sync with the Free tier in content/pricing.ts.
const FREE_TOOL_PATHS = new Set([
  '/tools/screening-tools', // hub
  '/tools/screening-tools/phq-9',
  '/tools/screening-tools/gad-7',
  '/tools/breathing-exercises',
  '/tools/safety-planning',
])

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    if (pathname.startsWith('/tools')) {
      // Free lead magnets bypass the gate entirely.
      if (FREE_TOOL_PATHS.has(pathname)) return NextResponse.next()

      // Premium tools: must be signed in...
      if (!token) {
        const url = req.nextUrl.clone()
        url.pathname = '/auth/signin'
        url.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(url)
      }
      // ...and have an active/trialing subscription.
      const status = token?.subscriptionStatus as string | null | undefined
      const isActive = status === 'active' || status === 'trialing'
      if (!isActive) {
        const url = req.nextUrl.clone()
        url.pathname = '/pricing'
        url.searchParams.set('gate', 'tools')
        return NextResponse.redirect(url)
      }
      return NextResponse.next()
    }

    // /dashboard/* needs auth only.
    if (pathname.startsWith('/dashboard') && !token) {
      const url = req.nextUrl.clone()
      url.pathname = '/auth/signin'
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      // All gating is handled in the middleware function above so that free
      // tool paths can stay public; never auto-redirect on token absence here.
      authorized: () => true,
    },
    pages: {
      signIn: '/auth/signin',
    },
  }
)

export const config = {
  matcher: ['/tools/:path*', '/dashboard/:path*'],
}
