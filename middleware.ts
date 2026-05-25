import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// IMPORTANT: only PAID routes are listed in `config.matcher` below. Free
// lead-magnet tools (PHQ-9, GAD-7, breathing, safety-planning, coin-tracker)
// and everything else are NOT matched, so they keep working exactly as they do
// today — no auth, and no dependency on NEXTAUTH_SECRET. When you add a new PAID
// tool, add its path here AND reflect it in content/pricing.ts.

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // /dashboard/* only needs the user to be signed in (enforced by `authorized`).
    if (pathname.startsWith('/dashboard')) {
      return NextResponse.next()
    }

    // Premium tools also require an active/trialing subscription.
    const status = token?.subscriptionStatus as string | null | undefined
    const isActive = status === 'active' || status === 'trialing'
    if (!isActive) {
      const url = req.nextUrl.clone()
      url.pathname = '/pricing'
      url.searchParams.set('gate', 'tools')
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      // Must be signed in to reach any matched (paid/dashboard) route.
      authorized: ({ token }) => !!token,
    },
    pages: { signIn: '/auth/signin' },
  }
)

export const config = {
  matcher: [
    // PAID tools only — keep in sync with content/pricing.ts paid tiers.
    '/tools/cbt-thought-record/:path*',
    '/tools/notes-templates/:path*',
    '/tools/treatment-planning/:path*',
    '/tools/sound-healing/:path*',
    '/tools/screening-tools/pcl-5',
    '/dashboard/:path*',
  ],
}
