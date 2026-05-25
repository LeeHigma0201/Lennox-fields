import Stripe from 'stripe'

let _stripe: Stripe | null = null

/**
 * Lazily instantiate the Stripe client. Importing this module must never throw
 * at build time when STRIPE_SECRET_KEY is absent (it broke `next build` on any
 * env without the secret). It throws only when actually used without a key,
 * i.e. at request time on a real checkout/webhook call.
 */
export function getStripe(): Stripe {
  if (_stripe) return _stripe
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not defined')
  }
  _stripe = new Stripe(key, {
    apiVersion: '2024-06-20',
    typescript: true,
  })
  return _stripe
}

// Product definitions for Lennox Fields services
export const PRODUCTS = {
  INDIVIDUAL_THERAPY: {
    name: 'Individual Therapy Session',
    price: 15000, // $150.00 in cents
    currency: 'usd',
  },
  COUPLES_THERAPY: {
    name: 'Couples Therapy Session',
    price: 20000, // $200.00
    currency: 'usd',
  },
  FAMILY_THERAPY: {
    name: 'Family Therapy Session',
    price: 20000,
    currency: 'usd',
  },
  TEEN_THERAPY: {
    name: 'Teen/Adolescent Therapy Session',
    price: 15000,
    currency: 'usd',
  },
  CAREER_COUNSELING: {
    name: 'Career Counseling Session',
    price: 12500, // $125.00
    currency: 'usd',
  },
  CLINICAL_SUPERVISION: {
    name: 'Clinical Supervision Hour',
    price: 7500, // $75.00
    currency: 'usd',
  },
  MONTHLY_THERAPY_PACKAGE: {
    name: 'Monthly Therapy Package (4 sessions)',
    price: 50000, // $500.00
    currency: 'usd',
    recurring: 'month' as const,
  },
  SUPERVISION_PACKAGE: {
    name: 'Monthly Supervision Package',
    price: 25000, // $250.00
    currency: 'usd',
    recurring: 'month' as const,
  },
}

export type ProductKey = keyof typeof PRODUCTS
