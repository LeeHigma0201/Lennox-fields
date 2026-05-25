import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getStripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'

export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = (session.user as { id: string }).id
  if (!userId) {
    return NextResponse.json({ error: 'User ID missing from session' }, { status: 401 })
  }

  const db = prisma as any // eslint-disable-line @typescript-eslint/no-explicit-any
  const authUser = await db.authUser.findUnique({ where: { id: userId } })

  if (!authUser?.stripeCustomerId) {
    return NextResponse.json({ error: 'No billing account found' }, { status: 400 })
  }

  const stripe = getStripe()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: authUser.stripeCustomerId,
    return_url: `${baseUrl}/dashboard`,
  })

  return NextResponse.json({ url: portalSession.url })
}
