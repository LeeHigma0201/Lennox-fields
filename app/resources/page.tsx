import Link from 'next/link'
import { Brain, FileText, CheckSquare, BookOpen, Shield, Wind, Coins } from 'lucide-react'

const resources = [
  {
    icon: Brain,
    title: 'Free Screening Tools',
    description: 'Validated self-assessments for depression (PHQ-9), anxiety (GAD-7), and PTSD (PCL-5) with instant scoring and interpretation.',
    href: '/tools/screening-tools',
    color: 'bg-clinical-blue',
    available: true,
  },
  {
    icon: FileText,
    title: 'Therapeutic Worksheets',
    description: '49+ free worksheets — CBT, DBT, neurodivergent-affirming tools for autism/ADHD/AuDHD, and family & parenting resources.',
    href: '/resources/worksheets',
    color: 'bg-primary-sage',
    available: true,
  },
  {
    icon: CheckSquare,
    title: 'Habit Trackers',
    description: 'Track your mood, sleep, self-care routines, and therapy goals with structured daily trackers.',
    href: '/resources/habit-trackers',
    color: 'bg-earth-green',
    available: true,
  },
  {
    icon: BookOpen,
    title: '30-Day Journaling Prompts',
    description: 'A guided 30-day journey of self-discovery with daily prompts for gratitude, growth, and reflection.',
    href: '/resources/journaling-prompts',
    color: 'bg-soft-rose',
    available: true,
  },
  {
    icon: Shield,
    title: 'Safety Planning',
    description: 'A comprehensive crisis and safety planning tool to help you prepare for difficult moments.',
    href: '/tools/safety-planning',
    color: 'bg-alert-red',
    available: true,
  },
  {
    icon: Wind,
    title: 'Breathing Exercises',
    description: 'Guided breathing exercises including box breathing, 4-7-8 technique, and more for managing anxiety.',
    href: '/tools/breathing-exercises',
    color: 'bg-accent-gold',
    available: true,
  },
  {
    icon: Coins,
    title: 'Kids Coin Tracker',
    description: 'A gentle, strengths-based reward chart for kids — earn coins for the good stuff, trade them for rewards you choose together. Built with neurodivergent families in mind.',
    href: '/tools/coin-tracker',
    color: 'bg-earth-green',
    available: true,
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            Free Mental Health Resources
          </h1>
          <p className="text-xl text-text-dark max-w-3xl mx-auto">
            Evidence-based tools and resources to support your mental health journey.
            All resources are free, private, and available without an account.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => {
              const Icon = resource.icon
              return (
                <Link
                  key={resource.title}
                  href={resource.href}
                  className="card group hover:scale-105 transition-all duration-200 block"
                >
                  <div className={`w-16 h-16 ${resource.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-10 h-10 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-text-dark mb-3">{resource.title}</h3>
                  <p className="text-warm-gray leading-relaxed">{resource.description}</p>
                  <span className="text-primary-sage font-medium mt-4 inline-block group-hover:text-earth-green transition-colors">
                    Explore &rarr;
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <div className="card-clinical">
            <h2 className="text-3xl font-bold text-text-dark mb-6">Important Information</h2>
            <div className="space-y-4 text-text-dark">
              <p>
                <span className="font-semibold">Not a Substitute for Therapy:</span> These resources are
                educational tools designed to complement — not replace — professional mental health care.
              </p>
              <p>
                <span className="font-semibold">Privacy:</span> All tools run in your browser. Your responses
                are not stored on any server or shared with anyone.
              </p>
              <p>
                <span className="font-semibold">In Crisis?</span> If you are experiencing a mental health
                emergency, please call <strong>911</strong> or the Suicide &amp; Crisis Lifeline at <strong>988</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Need More Support?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            These tools are a great starting point, but working with a therapist can help you
            go deeper. I offer free 15-minute consultations.
          </p>
          <Link href="/contact" className="btn bg-white text-primary-sage hover:bg-cream">
            Schedule Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
