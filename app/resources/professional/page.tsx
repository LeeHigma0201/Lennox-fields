'use client'

import Link from 'next/link'
import { ArrowRight, FileText, BarChart3, Clipboard, DollarSign, Brain, BookOpen, Users, CheckCircle, Clock, TrendingUp, Mail } from 'lucide-react'
import { useState } from 'react'

const tools = [
  {
    id: 'supervision-tracker',
    icon: BarChart3,
    title: 'Clinical Supervision Tracker',
    description: 'Monitor supervision hours, track supervisee progress, and document clinical development. Essential for LPCA requirements and supervisee accountability.',
    forWho: 'Supervisors, Licensed Clinicians',
    href: '#',
    badge: 'Premium',
    badgeColor: 'bg-accent-gold text-text-dark',
    category: 'Practice Management',
  },
  {
    id: 'treatment-planner',
    icon: Clipboard,
    title: 'Treatment Planning Tools',
    description: 'Generate comprehensive, evidence-based treatment plans aligned with diagnosis. Save time on documentation while ensuring clinical quality.',
    forWho: 'Clinicians, Supervisees, Students',
    href: '#',
    badge: 'Free',
    badgeColor: 'bg-success-green text-white',
    category: 'Clinical Tools',
  },
  {
    id: 'notes-templates',
    icon: FileText,
    title: 'Notes Templates',
    description: 'Pre-formatted SOAP, DAP, and BIRP note templates. Standardized documentation that supports thorough record-keeping and reduces time spent on paperwork.',
    forWho: 'All Clinicians',
    href: '#',
    badge: 'Free',
    badgeColor: 'bg-success-green text-white',
    category: 'Clinical Tools',
  },
  {
    id: 'billing-tracker',
    icon: DollarSign,
    title: 'Billing & Invoice Tracker',
    description: 'Professional invoice templates, client billing history, and payment tracking. Streamline your practice administration and financial management.',
    forWho: 'Private Practice Clinicians',
    href: '#',
    badge: 'Premium',
    badgeColor: 'bg-accent-gold text-text-dark',
    category: 'Practice Management',
  },
  {
    id: 'orientation-tools',
    icon: Brain,
    title: 'Theoretical Orientation Tools',
    description: 'Interactive resources for exploring and deepening your therapeutic orientation. CBT, DBT, psychodynamic, and humanistic approach guides.',
    forWho: 'Students, Supervisees, Continuing Education',
    href: '#',
    badge: 'Free',
    badgeColor: 'bg-success-green text-white',
    category: 'Professional Development',
  },
  {
    id: 'licensing-guides',
    icon: BookOpen,
    title: 'Licensing Guides (NC & IN)',
    description: 'State-specific requirements, application timelines, and documentation checklists. Demystify the licensing process for your state.',
    forWho: 'Students, Recent Graduates, Career Changers',
    href: '#',
    badge: 'Free',
    badgeColor: 'bg-success-green text-white',
    category: 'Professional Development',
  },
  {
    id: 'development-resources',
    icon: TrendingUp,
    title: 'Professional Development Resources',
    description: 'Curated list of continuing education opportunities, workshops, conferences, and skill-building resources aligned with your interests.',
    forWho: 'All Clinicians',
    href: '#',
    badge: 'Free',
    badgeColor: 'bg-success-green text-white',
    category: 'Professional Development',
  },
  {
    id: 'client-management',
    icon: Users,
    title: 'Client Management Tools',
    description: 'Intake forms, consent templates, and session planning worksheets. Professional templates that streamline your client onboarding process.',
    forWho: 'All Clinicians',
    href: '#',
    badge: 'Premium',
    badgeColor: 'bg-accent-gold text-text-dark',
    category: 'Practice Management',
  },
]

const testimonials = [
  {
    quote: 'The treatment planning tool has cut my documentation time in half. It ensures I never miss important diagnostic criteria while keeping plans evidence-based.',
    author: 'Dr. Sarah M.',
    title: 'Licensed Professional Counselor',
    initials: 'SM',
  },
  {
    quote: 'As a supervisee working toward my hours, having the supervision tracker and licensing guide was invaluable. Everything I needed in one place.',
    author: 'Jessica T.',
    title: 'Supervisee (400 hours into 2000)',
    initials: 'JT',
  },
  {
    quote: 'These professional tools are what I wish existed when I was in grad school. They bridge the gap between academic knowledge and private practice realities.',
    author: 'Marcus D.',
    title: 'Clinical Supervisor',
    initials: 'MD',
  },
  {
    quote: 'The billing tracker keeps me organized without hiring an office manager. Professional templates that look polished and convey competence to clients.',
    author: 'Rebecca K.',
    title: 'Solo Private Practice Owner',
    initials: 'RK',
  },
]

const benefits = [
  {
    icon: Clock,
    title: 'Save 5+ Hours Per Week',
    description: 'Reduce administrative burden with professionally designed templates and tools. Spend more time on what matters: clinical work.',
  },
  {
    icon: CheckCircle,
    title: 'Clinical Excellence',
    description: 'Evidence-based tools ensure your documentation and treatment plans meet standards while supporting client outcomes.',
  },
  {
    icon: TrendingUp,
    title: 'Professional Growth',
    description: 'Stay current with licensing requirements, continuing education opportunities, and your theoretical orientation development.',
  },
]

const categories = [
  { name: 'Clinical Tools', color: 'bg-clinical-blue' },
  { name: 'Practice Management', color: 'bg-primary-sage' },
  { name: 'Professional Development', color: 'bg-earth-green' },
]

export default function ProfessionalToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const filteredTools = selectedCategory
    ? tools.filter((tool) => tool.category === selectedCategory)
    : tools

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send to an API or email service
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-sage-bg text-white py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Professional Tools for Busy Clinicians
              </h1>
              <p className="text-xl mb-6 opacity-95">
                Comprehensive, evidence-based tools designed specifically for mental health professionals. Save time on administration, improve clinical documentation, and stay current with your professional development.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Tools for supervisors, supervisees, and independent clinicians</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Free and premium options for every practice size</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Built on evidence-based clinical practices</span>
                </div>
              </div>
              <Link href="#tools" className="btn bg-white text-primary-sage hover:bg-cream inline-flex items-center">
                Explore All Tools
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            <div className="hidden lg:block relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-4xl font-bold text-white mb-2">8+</div>
                    <p className="text-sm opacity-90">Professional tools available</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-4xl font-bold text-white mb-2">Free</div>
                    <p className="text-sm opacity-90">Getting started options</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-4xl font-bold text-white mb-2">All Roles</div>
                    <p className="text-sm opacity-90">Supervisors to students supported</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why These Tools Matter */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            Why These Tools Matter for Busy Clinicians
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="card text-center">
                  <Icon className="w-12 h-12 text-primary-sage mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-text-dark mb-3">{benefit.title}</h3>
                  <p className="text-warm-gray">{benefit.description}</p>
                </div>
              )
            })}
          </div>

          <div className="bg-cream rounded-xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                The Reality of Modern Clinical Practice
              </h3>
              <p className="text-warm-gray mb-4 leading-relaxed">
                Whether you're a supervisor managing multiple supervisees, a solo private practice owner, or a graduate student working toward your licensure hours, time is your most valuable resource. Documentation, treatment planning, billing, and staying current with licensing requirements can consume 15-20+ hours per week.
              </p>
              <p className="text-warm-gray mb-4 leading-relaxed">
                These professionally designed tools are created specifically for mental health clinicians who want to maintain clinical excellence without drowning in administrative tasks. Each tool is based on evidence-based practices and real-world clinical workflows.
              </p>
              <p className="text-text-dark font-medium">
                Let's reclaim your time and focus on what you do best: transforming lives through clinical excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section-padding bg-cream" id="tools">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-dark mb-6">Browse Professional Tools</h2>
            <p className="text-xl text-warm-gray max-w-2xl mx-auto mb-8">
              Filter by category or explore all tools. Each tool is designed to save you time and improve your clinical practice.
            </p>

            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === null
                    ? 'bg-primary-sage text-white'
                    : 'bg-white text-text-dark border-2 border-warm-gray/30 hover:border-primary-sage'
                }`}
              >
                All Tools
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === cat.name
                      ? `${cat.color} text-white`
                      : 'bg-white text-text-dark border-2 border-warm-gray/30 hover:border-primary-sage'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => {
              const Icon = tool.icon
              return (
                <div key={tool.id} className="card flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0">
                    <span className={`${tool.badgeColor} px-3 py-1 text-xs font-bold rounded-bl-lg`}>
                      {tool.badge}
                    </span>
                  </div>

                  <div className="mb-6 pt-4">
                    <div className="bg-primary-sage/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-primary-sage" />
                    </div>
                    <h3 className="text-xl font-bold text-text-dark mb-2">{tool.title}</h3>
                    <p className="text-sm font-medium text-accent-gold mb-3">{tool.category}</p>
                  </div>

                  <p className="text-warm-gray mb-6 flex-grow">{tool.description}</p>

                  <div className="border-t border-warm-gray/20 pt-4 mb-4">
                    <p className="text-sm text-warm-gray">
                      <span className="font-semibold text-text-dark">For: </span>
                      {tool.forWho}
                    </p>
                  </div>

                  {tool.href !== '#' && (
                    <Link
                      href={tool.href}
                      className="btn btn-outline inline-flex items-center justify-center mt-auto"
                    >
                      Access Tool
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  )}

                  {tool.href === '#' && (
                    <button className="btn btn-outline cursor-not-allowed opacity-50 inline-flex items-center justify-center mt-auto">
                      Coming Soon
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            What Professional Clinicians Are Saying
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card border-l-4 border-primary-sage">
                <p className="text-warm-gray mb-6 italic leading-relaxed text-lg">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-sage/20 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-sage text-sm">{testimonial.initials}</span>
                  </div>
                  <div>
                    <p className="font-bold text-text-dark text-sm">{testimonial.author}</p>
                    <p className="text-xs text-warm-gray">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free vs Premium Section */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            Free Tools vs Premium Tools
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="bg-success-green/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-success-green" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark mb-4">Free Tools</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-success-green font-bold mt-1">✓</span>
                  <span className="text-warm-gray">Evidence-based templates</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-success-green font-bold mt-1">✓</span>
                  <span className="text-warm-gray">No subscription required</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-success-green font-bold mt-1">✓</span>
                  <span className="text-warm-gray">Perfect for students & supervisees</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-success-green font-bold mt-1">✓</span>
                  <span className="text-warm-gray">Regular updates included</span>
                </li>
              </ul>
            </div>

            <div className="card border-2 border-accent-gold">
              <div className="bg-accent-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-accent-gold" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark mb-4">Premium Tools</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-accent-gold font-bold mt-1">✓</span>
                  <span className="text-warm-gray">Advanced tracking & analytics</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-gold font-bold mt-1">✓</span>
                  <span className="text-warm-gray">Client-facing components</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-gold font-bold mt-1">✓</span>
                  <span className="text-warm-gray">Integration capabilities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-gold font-bold mt-1">✓</span>
                  <span className="text-warm-gray">Priority support & customization</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-warm-gray mb-4">
              Not sure what you need? Start with our free tools and upgrade to premium as your practice grows.
            </p>
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="section-padding bg-gradient-sage-bg text-white">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-8">
            <Mail className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-4">
              Stay Updated on New Professional Tools
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Get notified when new tools launch, early access to premium features, and clinical tips delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 border-2 border-white/30 focus:outline-none focus:border-white/60 transition-all"
              />
              <button
                type="submit"
                className="btn bg-white text-primary-sage hover:bg-cream whitespace-nowrap font-medium"
              >
                Subscribe
              </button>
            </div>
            {subscribed && (
              <p className="text-green-200 text-sm mt-4 text-center">
                ✓ Thanks for subscribing! Check your email for updates.
              </p>
            )}
            <p className="text-sm text-white/70 mt-4 text-center">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <details className="card cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-text-dark hover:text-primary-sage transition-colors">
                <span>Are these tools HIPAA compliant?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-warm-gray border-t border-warm-gray/20 pt-4">
                <p>
                  Our templates and tools are designed following HIPAA guidelines. However, how you implement and store them determines overall compliance. We recommend using encrypted storage for any client information and maintaining secure filing systems.
                </p>
              </div>
            </details>

            <details className="card cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-text-dark hover:text-primary-sage transition-colors">
                <span>Can supervisees use these tools?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-warm-gray border-t border-warm-gray/20 pt-4">
                <p>
                  Absolutely! Many of our free tools are specifically designed for supervisees working toward their licensure hours. The treatment planning templates, notes formats, and professional development resources are particularly valuable during your supervisee stage.
                </p>
              </div>
            </details>

            <details className="card cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-text-dark hover:text-primary-sage transition-colors">
                <span>When will premium tools be available?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-warm-gray border-t border-warm-gray/20 pt-4">
                <p>
                  Premium tools are coming soon! Subscribe to our email list to get early access notifications. Premium tools will include advanced tracking, client portals, and integration capabilities designed for growing practices.
                </p>
              </div>
            </details>

            <details className="card cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-text-dark hover:text-primary-sage transition-colors">
                <span>Can I customize the templates for my practice?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-warm-gray border-t border-warm-gray/20 pt-4">
                <p>
                  Yes! All templates are provided in editable formats (Word, PDF). Feel free to customize them to match your practice name, your theoretical orientation, and your specific client populations. Premium tools will include additional customization options.
                </p>
              </div>
            </details>

            <details className="card cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-text-dark hover:text-primary-sage transition-colors">
                <span>Do these tools help with CE credits?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-warm-gray border-t border-warm-gray/20 pt-4">
                <p>
                  While the tools themselves don't provide CE credits, our professional development resources section includes curated lists of approved CE opportunities, workshops, and conferences. These resources help you find quality CE that fits your clinical interests and state requirements.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding gradient-warm-bg">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-text-dark mb-6">
            Ready to Reclaim Your Time?
          </h2>
          <p className="text-xl text-warm-gray mb-8">
            Start with our free tools and experience how much time you can save on clinical documentation and practice management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#tools" className="btn btn-primary inline-flex items-center justify-center">
              Explore Free Tools
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/contact" className="btn btn-outline inline-flex items-center justify-center">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
