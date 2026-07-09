'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Users, Clock, Shield, Download, Target, ArrowRight, CheckCircle2, Leaf } from 'lucide-react'

// Rotational quotes — bell hooks + Gottman, clinically grounded
const quotes = [
  {
    text: "The word 'love' is most often defined as a noun, yet all the more astute theorists of love acknowledge that we would all love better if we used it as a verb.",
    author: 'bell hooks',
    source: 'All About Love: New Visions',
    year: '1999',
    url: 'https://www.mahoganybooks.com/9780060959470',
  },
  {
    text: "To begin by always thinking of love as an action rather than a feeling is one way in which anyone using the word in this manner automatically assumes accountability and responsibility.",
    author: 'bell hooks',
    source: 'All About Love: New Visions',
    year: '1999',
    url: 'https://www.mahoganybooks.com/9780060959470',
  },
  {
    text: "Love is a combination of care, commitment, knowledge, responsibility, respect, and trust.",
    author: 'bell hooks',
    source: 'Communion: The Female Search for Love',
    year: '2002',
    url: 'https://www.mahoganybooks.com/9780060938291',
  },
  {
    text: "Rarely, if ever, are any of us healed in isolation. Healing is an act of communion.",
    author: 'bell hooks',
    source: 'All About Love: New Visions',
    year: '1999',
    url: 'https://www.mahoganybooks.com/9780060959470',
  },
  {
    text: "Imagine living in a world where there is no domination, where females and males are not alike or even always equal, but where a vision of mutuality is the ethos shaping our interaction.",
    author: 'bell hooks',
    source: 'Feminism is for Everybody',
    year: '2000',
    url: 'https://www.mahoganybooks.com/9780060959470',
  },
  {
    text: "The one person who will never leave us, whom we will never lose, is ourself. Learning to love our female selves is where our search for love must begin.",
    author: 'bell hooks',
    source: 'Communion: The Female Search for Love',
    year: '2002',
    url: 'https://www.mahoganybooks.com/9780060938291',
  },
  {
    text: "Happy marriages are based on a deep friendship. By this I mean a mutual respect for and enjoyment of each other's company.",
    author: 'John Gottman, Ph.D.',
    source: 'The Seven Principles for Making Marriage Work',
    year: '1999',
    url: 'https://www.gottman.com/product/the-seven-principles-for-making-marriage-work/',
  },
  {
    text: "In the strongest marriages, husband and wife share a deep sense of meaning. They support each other's hopes and aspirations.",
    author: 'John Gottman, Ph.D.',
    source: 'The Seven Principles for Making Marriage Work',
    year: '1999',
    url: 'https://www.gottman.com/product/the-seven-principles-for-making-marriage-work/',
  },
]

function useRotationalQuote() {
  const [quote, setQuote] = useState(quotes[0])
  useEffect(() => {
    // Pick a random quote on each page load, weighted toward bell hooks
    const idx = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[idx])
  }, [])
  return quote
}

const features = [
  {
    icon: Users,
    title: 'Claim It or Share It',
    description: 'See a task? Claim full ownership — or mark it "both" to tackle together. No scorekeeping, no resentment. Just clarity about who\'s got what.',
  },
  {
    icon: Clock,
    title: 'Time-Bound Lists',
    description: 'Daily, weekly, or monthly lists that fit your rhythm. Set a bedtime countdown so everything gets done before the kids need tucking in.',
  },
  {
    icon: Target,
    title: 'Goals That Guide',
    description: 'Start with what matters — or skip straight to the list. Set shared goals that give your tasks meaning, or just get things done together.',
  },
  {
    icon: Shield,
    title: 'Your Data, Your Story',
    description: 'Everything is saved. Export your history anytime — for reflection, for therapy sessions, or for documentation you might need. We see you.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Create Your Space',
    description: 'Sign up and name your family or partnership. This is your shared home base.',
  },
  {
    number: '02',
    title: 'Invite Your Partner',
    description: 'Send a simple link. They join with their own account — equal access, equal ownership.',
  },
  {
    number: '03',
    title: 'Set Goals (or Don\'t)',
    description: 'Define what you\'re working toward together, or skip straight to building your lists.',
  },
  {
    number: '04',
    title: 'Share the Load',
    description: 'Add tasks, claim them, complete them. Watch the invisible become visible. Together.',
  },
]

export default function TetheredTogetherLanding() {
  const quote = useRotationalQuote()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-36" style={{ background: 'linear-gradient(160deg, #FAF9F7 0%, #f5ede8 40%, #e8ded6 100%)' }}>
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-[0.07]" style={{ background: '#75856f' }} />
        <div className="absolute bottom-10 right-16 w-48 h-48 rounded-full opacity-[0.05]" style={{ background: '#C09191' }} />
        <div className="absolute top-40 right-1/4 w-32 h-32 rounded-full opacity-[0.04]" style={{ background: '#C5A87D' }} />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <div className="flex justify-center mb-10">
              <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-soft ring-4 ring-white/60">
                <Image
                  src="/images/LFLogo.jpeg"
                  alt="Lennox Fields"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12" style={{ background: '#75856f' }} />
              <span className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: '#75856f' }}>
                A Lennox Fields Tool
              </span>
              <div className="h-px w-12" style={{ background: '#75856f' }} />
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-text-dark mb-6 leading-[1.1] tracking-tight">
              Tethered
              <span className="block" style={{ color: '#75856f' }}>Together</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-warm-gray max-w-2xl mx-auto mb-4 leading-relaxed font-light">
              The mental load was never meant to be carried alone.
            </p>
            <p className="text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed" style={{ color: '#8a7362' }}>
              A shared space where both partners own the invisible work of marriage, parenthood, and life — without keeping score.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/tethered-together/signup"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium text-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #75856f 0%, #6B8E4E 100%)' }}
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-lg border-2 transition-all duration-300 hover:shadow-soft"
                style={{ borderColor: '#75856f', color: '#75856f' }}
              >
                See How It Works
              </Link>
            </div>

            {/* Trust line */}
            <p className="mt-8 text-sm" style={{ color: '#8a7362' }}>
              Rooted in the clinical work of{' '}
              <a href="https://www.mahoganybooks.com/9780060959470" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-80">bell hooks</a>
              {' '}&amp;{' '}
              <a href="https://www.gottman.com/product/the-seven-principles-for-making-marriage-work/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-80">Dr. John Gottman</a>
            </p>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V20C240 45 480 55 720 40C960 25 1200 5 1440 20V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* The Problem / Fair Play */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: '#C09191' + '15' }}>
              <Heart className="w-4 h-4" style={{ color: '#C09191' }} />
              <span className="text-sm font-medium" style={{ color: '#C09191' }}>The Invisible Work</span>
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-dark mb-6">
              Someone always carries more.
              <span className="block mt-2" style={{ color: '#75856f' }}>It doesn&apos;t have to stay invisible.</span>
            </h2>
            <p className="text-lg text-warm-gray leading-relaxed">
              &ldquo;Make the vet appointment. Remember picture day. Buy the birthday gift. Schedule the playdate. Restock the medicine cabinet.&rdquo;
              The mental load of running a household is real, relentless, and usually unequal. Tethered Together makes the invisible visible — so both partners can own it, share it, and stop keeping score.
            </p>
          </div>

          {/* Stats / emotional proof */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { stat: '66%', label: 'of couples argue about household task division', source: 'Pew Research' },
              { stat: '2x', label: 'more unpaid domestic work falls on women on average', source: 'Bureau of Labor Statistics' },
              { stat: '100%', label: 'of families deserve a tool that makes it easier', source: '' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-2xl" style={{ background: i === 2 ? '#75856f' + '08' : '#FAF9F7' }}>
                <div className="font-heading text-4xl md:text-5xl font-bold mb-2" style={{ color: i === 2 ? '#75856f' : '#3f3f3f' }}>
                  {item.stat}
                </div>
                <p className="text-warm-gray text-sm leading-relaxed">{item.label}</p>
                {item.source && <p className="text-xs mt-2 opacity-50">{item.source}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-28" style={{ background: 'linear-gradient(180deg, #FAF9F7 0%, #f0ebe6 100%)' }}>
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: '#C5A87D' + '20' }}>
              <Leaf className="w-4 h-4" style={{ color: '#C5A87D' }} />
              <span className="text-sm font-medium" style={{ color: '#8a7362' }}>Simple by Design</span>
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-dark">
              How It Works
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="group relative p-8 rounded-2xl bg-white shadow-soft hover:shadow-medium transition-all duration-300"
                >
                  <div
                    className="absolute top-6 right-6 font-heading text-5xl font-bold opacity-[0.08]"
                    style={{ color: '#75856f' }}
                  >
                    {step.number}
                  </div>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-4 text-white text-sm font-semibold"
                    style={{ background: 'linear-gradient(135deg, #75856f 0%, #6B8E4E 100%)' }}
                  >
                    {step.number}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-text-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-warm-gray leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-dark mb-4">
              Built for Real Life
            </h2>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Not another to-do app. A partnership tool designed by a therapist who gets it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, i) => {
              const colors = ['#75856f', '#C09191', '#C5A87D', '#6B8E4E']
              const bgColors = ['#75856f10', '#C0919110', '#C5A87D10', '#6B8E4E10']
              return (
                <div
                  key={i}
                  className="p-8 rounded-2xl border border-transparent hover:border-opacity-20 transition-all duration-300"
                  style={{ background: bgColors[i], borderColor: colors[i] + '30' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: colors[i] + '20' }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: colors[i] }} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-text-dark mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-warm-gray leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Safety Note — handled with care */}
      <section className="py-16 md:py-20" style={{ background: '#FAF9F7' }}>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="p-8 md:p-12 rounded-2xl border" style={{ borderColor: '#C09191' + '30', background: 'white' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: '#C09191' + '15' }}>
                  <Shield className="w-5 h-5" style={{ color: '#C09191' }} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-text-dark mb-3">
                    A note about safety
                  </h3>
                  <p className="text-warm-gray leading-relaxed mb-4">
                    We know that not every household is safe. Some people using this tool are in relationships where the imbalance isn&apos;t just unfair — it&apos;s harmful. That&apos;s why every account includes full data export. Your task history, patterns, and records belong to you, and you can take them with you.
                  </p>
                  <p className="text-warm-gray leading-relaxed text-sm">
                    If you or someone you know needs support, the National Domestic Violence Hotline is available 24/7 at{' '}
                    <span className="font-medium text-text-dark">1-800-799-7233</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rotational Quote — bell hooks / Gottman */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <svg className="w-12 h-12 mx-auto opacity-20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#75856f' }}>
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <blockquote className="font-heading text-2xl md:text-3xl font-medium text-text-dark leading-relaxed mb-6">
              &ldquo;{quote.text}&rdquo;
            </blockquote>
            <cite className="text-warm-gray not-italic">
              {quote.author},{' '}
              <a
                href={quote.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-80"
                style={{ color: '#75856f' }}
              >
                <em>{quote.source}</em>
              </a>
              {' '}({quote.year})
            </cite>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #75856f 0%, #5a6e54 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-40 h-40 rounded-full bg-white" />
          <div className="absolute bottom-10 right-1/3 w-60 h-60 rounded-full bg-white" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to share the load?
            </h2>
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              It takes two minutes to set up and a lifetime to appreciate.
              Start building your partnership dashboard today.
            </p>
            <Link
              href="/tethered-together/signup"
              className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              style={{ color: '#75856f' }}
            >
              Create Your Space
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="mt-6 text-sm text-white/60">
              Free to use. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Footer accent */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg, #75856f, #C09191, #C5A87D, #75856f)' }} />
    </div>
  )
}
