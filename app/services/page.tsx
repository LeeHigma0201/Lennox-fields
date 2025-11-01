import Link from 'next/link'
import { Heart, Users, Home, Sprout, Briefcase, Brain, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Heart,
    title: 'Individual Therapy',
    slug: 'individual-therapy',
    description: 'One-on-one support for anxiety, depression, trauma, and life transitions.',
    details: [
      'Personalized treatment plans',
      'Evidence-based approaches (CBT, EMDR)',
      'Flexible scheduling options',
      'Telehealth and in-person sessions'
    ],
    price: '$150 per session',
  },
  {
    icon: Users,
    title: 'Couples Therapy',
    slug: 'couples-therapy',
    description: 'Strengthen your relationship through improved communication and connection.',
    details: [
      'Communication skills development',
      'Conflict resolution strategies',
      'Attachment-based therapy',
      'Pre-marital counseling available'
    ],
    price: '$200 per session',
  },
  {
    icon: Home,
    title: 'Family Therapy',
    slug: 'family-therapy',
    description: 'Navigate family dynamics and build healthier relationships together.',
    details: [
      'Systems-based approach',
      'Parent-child relationship support',
      'Blended family counseling',
      'Family crisis intervention'
    ],
    price: '$200 per session',
  },
  {
    icon: Sprout,
    title: 'Teen & Adolescent Therapy',
    slug: 'teen-adolescent',
    description: 'Specialized support for young people navigating the challenges of adolescence.',
    details: [
      'Age-appropriate interventions',
      'School and academic support',
      'Identity and peer relationships',
      'Family involvement when appropriate'
    ],
    price: '$150 per session',
  },
  {
    icon: Briefcase,
    title: 'Career Counseling',
    slug: 'career-counseling',
    description: 'Discover your professional path with comprehensive career guidance.',
    details: [
      'Career assessments (Strong, MBTI)',
      'Job search and interview prep',
      'Career transition support',
      'Professional development planning'
    ],
    price: '$125 per session',
  },
  {
    icon: Brain,
    title: 'Substance Use Disorder Treatment',
    slug: 'substance-use',
    description: 'Compassionate, evidence-based treatment using ASAM criteria.',
    details: [
      'ASAM level of care assessment',
      'Harm reduction approach',
      'Relapse prevention planning',
      'Family education and support'
    ],
    price: 'Contact for pricing',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            Our Services
          </h1>
          <p className="text-xl text-text-dark max-w-3xl mx-auto">
            Comprehensive mental health services tailored to your unique needs.
            All services available via telehealth or in-person in North Carolina and Indiana.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div key={service.slug} className="card">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-primary-sage/10 p-4 rounded-lg">
                      <Icon className="w-8 h-8 text-primary-sage" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-text-dark mb-2">{service.title}</h2>
                      <p className="text-warm-gray">{service.description}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {service.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-sage mr-2">✓</span>
                        <span className="text-text-dark">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-6 border-t border-warm-gray/20">
                    <div>
                      <p className="text-sm text-warm-gray">Starting at</p>
                      <p className="text-xl font-bold text-primary-sage">{service.price}</p>
                    </div>
                    <Link
                      href={`/services/${service.slug}`}
                      className="btn btn-outline inline-flex items-center"
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Insurance & Payment Info */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">
            Insurance & Payment Information
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold text-text-dark mb-4">Payment Options</h3>
              <ul className="space-y-2 text-text-dark">
                <li>• Credit/debit cards accepted</li>
                <li>• HSA/FSA eligible</li>
                <li>• Payment plans available</li>
                <li>• Sliding scale for qualified clients</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-text-dark mb-4">Insurance</h3>
              <p className="text-text-dark mb-4">
                We are currently working on insurance credentialing. In the meantime:
              </p>
              <ul className="space-y-2 text-text-dark">
                <li>• Superbills provided for out-of-network reimbursement</li>
                <li>• Contact your insurance to verify benefits</li>
                <li>• We'll help with paperwork</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Schedule a free 15-minute consultation to discuss your needs and determine the best service for you.
          </p>
          <Link href="/contact" className="btn bg-white text-primary-sage hover:bg-cream">
            Schedule Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
