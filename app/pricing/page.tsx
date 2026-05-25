'use client'

import { useState } from 'react'
import { PRICING_TIERS } from '@/content/pricing'
import { Check } from 'lucide-react'

export default function PricingPage() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null)

  async function handleSubscribe(tierId: string, priceIdEnvKey?: string) {
    if (tierId === 'free') {
      window.location.href = '/auth/signin'
      return
    }

    // Map env key -> actual price ID from the subscription products
    const priceId = priceIdEnvKey === 'STRIPE_PRO_PRICE_ID'
      ? process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID
      : priceIdEnvKey === 'STRIPE_CONSUMER_PRICE_ID'
        ? process.env.NEXT_PUBLIC_STRIPE_CONSUMER_PRICE_ID
        : null

    setLoadingTier(tierId)

    if (!priceId) {
      // Not signed in or price not configured — redirect to signin with callbackUrl
      window.location.href = `/auth/signin?callbackUrl=${encodeURIComponent('/pricing')}`
      setLoadingTier(null)
      return
    }

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })

      if (res.status === 401) {
        // Not signed in
        window.location.href = `/auth/signin?callbackUrl=${encodeURIComponent('/pricing')}`
        return
      }

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      console.error('Checkout error')
    } finally {
      setLoadingTier(null)
    }
  }

  return (
    <div className="bg-warm-cream min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl text-stone-800 mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Access world-class mental wellness tools built by Tamara Walls, LPCA — for
            individuals, families, and therapists.
          </p>
          <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 inline-block rounded-full px-3 py-1">
            Proposed pricing — final tiers pending Tamara&apos;s review
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl border bg-white flex flex-col ${
                tier.highlighted
                  ? 'border-primary-sage shadow-medium ring-2 ring-primary-sage'
                  : 'border-stone-200 shadow-soft'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-primary-sage text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most popular
                  </span>
                </div>
              )}

              <div className="p-7 flex-1">
                <h2 className="font-heading text-xl text-stone-800 mb-1">{tier.name}</h2>
                <div className="flex items-end gap-1 mb-3">
                  <span className="text-4xl font-bold text-stone-900">{tier.price}</span>
                  <span className="text-stone-400 text-sm pb-1">{tier.priceNote}</span>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed mb-6">
                  {tier.description}
                </p>

                <ul className="space-y-2.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-stone-600">
                      <Check
                        className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-sage"
                        strokeWidth={2.5}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-7 pb-7">
                <button
                  onClick={() => handleSubscribe(tier.id, tier.priceId)}
                  disabled={loadingTier === tier.id}
                  className={`w-full rounded-xl py-2.5 font-medium transition text-sm ${
                    tier.highlighted
                      ? 'bg-primary-sage text-white hover:bg-[#5f6d5a] disabled:opacity-50'
                      : 'bg-stone-100 text-stone-800 hover:bg-stone-200 disabled:opacity-50'
                  }`}
                >
                  {loadingTier === tier.id ? 'Loading...' : tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center mt-10 text-stone-400 text-xs">
          <p>
            Questions?{' '}
            <a href="/contact" className="text-primary-sage underline hover:text-[#5f6d5a]">
              Contact Tamara
            </a>{' '}
            · Cancel anytime · Secure payments via Stripe
          </p>
        </div>
      </div>
    </div>
  )
}
