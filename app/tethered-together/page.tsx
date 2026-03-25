import Link from 'next/link'
import { ArrowRight, Link2, Shield, Heart, BarChart2 } from 'lucide-react'

export default function TetheredTogetherPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-24 md:py-32">
        <div className="container-custom text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="h-px w-16 bg-primary-sage/40" />
            <div className="mx-4 w-10 h-10 rounded-full border-2 border-primary-sage/60 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-primary-sage/60" />
            </div>
            <div className="h-px w-16 bg-primary-sage/40" />
          </div>

          <p className="text-sm uppercase tracking-widest text-warm-sand font-medium mb-4">
            A Lennox Fields Clinical Tool
          </p>

          <h1 className="font-heading text-5xl md:text-7xl font-bold text-text-dark mb-6 leading-tight">
            Tethered Together
          </h1>

          <p className="text-xl md:text-2xl text-warm-gray max-w-2xl mx-auto mb-4 leading-relaxed">
            A shared task space where both partners are equally the brain of the relationship.
          </p>

          <p className="text-base text-warm-gray/80 max-w-xl mx-auto mb-12">
            Therapist-created lists. Partner-contributed tasks. Shared accountability.
            Progress that persists across every session.
          </p>

          <Link
            href="/tethered-together/new"
            className="btn btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <span>Begin</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="mt-6 text-sm text-warm-gray/60">
            For therapists — create a session for your couple
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-dark text-center mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                n: '1',
                color: 'bg-primary-sage/10',
                text_color: 'text-primary-sage',
                title: 'Therapist Creates',
                body: 'Set up a couple session in seconds. You get a private therapist dashboard.',
              },
              {
                n: '2',
                color: 'bg-soft-rose/15',
                text_color: 'text-soft-rose',
                title: 'Add a List',
                body: 'Create a named list — "Wednesday\'s Check-In" or "Week 3 Goals." Each list generates two private partner links.',
              },
              {
                n: '3',
                color: 'bg-accent-gold/10',
                text_color: 'text-accent-gold',
                title: 'Partners Contribute',
                body: 'Each partner gets their own link. Both can add tasks, check things off, and see each other\'s contributions.',
              },
              {
                n: '4',
                color: 'bg-success-green/10',
                text_color: 'text-success-green',
                title: 'Track Progress',
                body: 'Your dashboard shows every list, every task, and who did what. Lists accumulate — couples see their growth over time.',
              },
            ].map((step) => (
              <div key={step.n} className="text-center">
                <div
                  className={`w-14 h-14 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4`}
                >
                  <span className={`font-heading text-2xl font-bold ${step.text_color}`}>
                    {step.n}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-text-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section-padding bg-warm-cream">
        <div className="container-custom max-w-3xl">
          <div className="bg-white rounded-2xl shadow-soft p-10 md:p-14 text-center">
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-soft-rose" />
            </div>
            <blockquote className="font-heading text-2xl md:text-3xl font-medium text-text-dark leading-relaxed mb-6">
              &ldquo;The entire point is to let both people be the brain of the relationship
              and to share ownership.&rdquo;
            </blockquote>
            <cite className="text-warm-gray text-sm not-italic">
              — Tamara Walls, LPCA · Lennox Fields Clinical Mental Health Services
            </cite>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-16 bg-white border-t border-warm-gray/10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-primary-sage" />
              <span className="text-sm text-warm-gray">AI Informed Consent Required</span>
            </div>
            <div className="flex items-center space-x-3">
              <Link2 className="w-5 h-5 text-primary-sage" />
              <span className="text-sm text-warm-gray">Private Per-Partner Links</span>
            </div>
            <div className="flex items-center space-x-3">
              <BarChart2 className="w-5 h-5 text-primary-sage" />
              <span className="text-sm text-warm-gray">Persistent Progress Tracking</span>
            </div>
            <div className="flex items-center space-x-3">
              <Heart className="w-5 h-5 text-primary-sage" />
              <span className="text-sm text-warm-gray">Equal Access for Both Partners</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-sage-bg py-16">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Ready to begin?
          </h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            Create a session and share partner links with your clients.
            Built with therapist feedback — shipped while sailing.
          </p>
          <Link
            href="/tethered-together/new"
            className="btn bg-white text-primary-sage hover:bg-warm-cream inline-flex items-center space-x-2"
          >
            <span>Create a Session</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
