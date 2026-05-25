import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'
import Stripe from 'stripe'

// Helper to update auth user subscription fields from a Stripe Subscription object
async function updateSubscription(subscription: Stripe.Subscription) {
  const customerId = typeof subscription.customer === 'string'
    ? subscription.customer
    : subscription.customer.id

  const priceId = subscription.items.data[0]?.price.id ?? null
  const db = prisma as any // eslint-disable-line @typescript-eslint/no-explicit-any

  await db.authUser.updateMany({
    where: { stripeCustomerId: customerId },
    data: {
      subscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
      subscriptionPriceId: priceId,
      subscriptionEnds: subscription.current_period_end
        ? new Date(subscription.current_period_end * 1000)
        : null,
    },
  })
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  let event: Stripe.Event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const checkoutSession = event.data.object as Stripe.Checkout.Session
        if (checkoutSession.mode === 'subscription' && checkoutSession.subscription) {
          const stripe = getStripe()
          const subscription = await stripe.subscriptions.retrieve(
            typeof checkoutSession.subscription === 'string'
              ? checkoutSession.subscription
              : checkoutSession.subscription.id
          )
          await updateSubscription(subscription)
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await updateSubscription(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await updateSubscription(subscription)
        break
      }

      default:
        // Unhandled event type — ignore
        break
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
