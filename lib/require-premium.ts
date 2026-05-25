import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

const ACTIVE_STATUSES = new Set(['active', 'trialing'])

/**
 * Call from a server component or route to ensure the visitor is signed in.
 * Redirects to /auth/signin if not authenticated.
 * Returns the session if authenticated.
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect('/auth/signin')
  }
  return session
}

/**
 * Call from a server component or route to ensure the visitor has an active subscription.
 * Redirects to /auth/signin if not authenticated, /pricing?gate=premium if no active sub.
 * Returns the session if authorized.
 */
export async function requirePremium() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect('/auth/signin')
  }

  const status = (session.user as { subscriptionStatus?: string | null }).subscriptionStatus
  if (!status || !ACTIVE_STATUSES.has(status)) {
    redirect('/pricing?gate=premium')
  }

  return session
}
