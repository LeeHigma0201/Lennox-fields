import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getStripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = (session.user as { id: string }).id
  if (!userId) {
    return NextResponse.json({ error: 'User ID missing from session' }, { status: 401 })
  }

  const { priceId } = await req.json()
  if (!priceId) {
    return NextResponse.json({ error: 'priceId is required' }, { status: 400 })
  }

  const stripe = getStripe()
  const db = prisma as any // eslint-disable-line @typescript-eslint/no-explicit-any

  // Get or create Stripe customer
  let authUser = await db.authUser.findUnique({ where: { id: userId } })
  let customerId: string = authUser?.stripeCustomerId

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.user.email ?? undefined,
      name: session.user.name ?? undefined,
      metadata: { authUserId: userId },
    })
    customerId = customer.id
    await db.authUser.update({
      where: { id: userId },
      data: { stripeCustomerId: customerId },
    })
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/dashboard?upgraded=true`,
    cancel_url: `${baseUrl}/pricing`,
    subscription_data: {
      metadata: { authUserId: userId },
    },
  })

  return NextResponse.json({ url: checkoutSession.url })
}
