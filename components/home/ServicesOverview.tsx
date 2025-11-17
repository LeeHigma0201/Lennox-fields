import Link from 'next/link'
import { Heart, Users, Sprout, Briefcase, Brain, Shield } from 'lucide-react'

const services = [
  {
    icon: Heart,
    title: 'Individual Therapy',
    description: 'One-on-one support for anxiety, depression, trauma, and life transitions. Evidence-based approaches tailored to your needs.',
    href: '/services/individual-therapy',
    color: 'text-primary-sage',
  },
  {
    icon: Users,
    title: 'Couples Therapy',
    description: 'Strengthen your relationship through improved communication, conflict resolution, and deeper connection.',
    href: '/services/couples-therapy',
    color: 'text-soft-rose',
  },
  {
    icon: Sprout,
    title: 'Teen & Adolescent',
    description: 'Specialized care for young people navigating identity, peer relationships, academic stress, and emotional challenges.',
    href: '/services/teen-adolescent',
    color: 'text-earth-green',
  },
  {
    icon: Briefcase,
    title: 'Career Counseling',
    description: 'Discover your path with career assessments, transition support, and professional development guidance.',
    href: '/services/career-counseling',
    color: 'text-accent-gold',
  },
  {
    icon: Brain,
    title: 'Substance Use Support',
    description: 'Compassionate, evidence-based treatment using ASAM criteria for appropriate level of care assessment.',
    href: '/services/substance-use',
    color: 'text-clinical-blue',
  },
  {
    icon: Shield,
    title: 'Clinical Supervision',
    description: 'Professional supervision for associates and interns pursuing licensure in North Carolina and Indiana.',
    href: '/professional/supervision',
    color: 'text-warm-gray',
  },
]

export default function ServicesOverview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            Comprehensive Mental Health Services
          </h2>
          <p className="text-xl text-warm-gray max-w-3xl mx-auto">
            Whether you're seeking individual support, couples counseling, or professional development,
            we're here to support your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.title}
                href={service.href}
                className="card group hover:scale-105 transition-transform duration-200"
              >
                <div className={`${service.color} mb-4`}>
                  <Icon className="w-12 h-12" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-text-dark mb-3 group-hover:text-primary-sage transition-colors">
                  {service.title}
                </h3>
                <p className="text-warm-gray leading-relaxed">
                  {service.description}
                </p>
                <p className="mt-4 text-primary-sage font-medium inline-flex items-center">
                  Learn more
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </p>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/services" className="btn btn-primary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}
