import type { Metadata } from 'next'
import Link from 'next/link'
import { Brain, Heart, Shield, Users, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Substance Use Disorder Treatment - ASAM Criteria & Addiction Counseling | NC & IN',
  description: 'Evidence-based substance use disorder treatment using ASAM criteria. Compassionate addiction counseling with harm reduction approach in North Carolina and Indiana.',
  keywords: [
    'substance use treatment',
    'addiction counseling',
    'substance abuse therapy',
    'ASAM criteria',
    'addiction treatment',
    'drug addiction counseling',
    'alcohol addiction treatment',
    'substance use disorder',
    'harm reduction therapy',
    'relapse prevention',
    'addiction recovery',
    'substance abuse counselor',
    'addiction therapist',
    'recovery support'
  ],
  openGraph: {
    title: 'Substance Use Disorder Treatment - ASAM Criteria & Addiction Counseling',
    description: 'Evidence-based substance use disorder treatment using ASAM criteria with compassionate, harm reduction approach.',
    type: 'website',
    images: [
      {
        url: '/images/og-substance-use.jpg',
        width: 1200,
        height: 630,
        alt: 'Substance Use Disorder Treatment'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Substance Use Disorder Treatment - ASAM Criteria & Addiction Counseling',
    description: 'Evidence-based substance use disorder treatment with ASAM criteria and harm reduction approach.'
  }
}

export default function SubstanceUsePage() {
  return (
    <div className="min-h-screen">
      <section className="gradient-warm-bg py-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-clinical-blue p-4 rounded-lg">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-text-dark">
                Substance Use Disorder Treatment
              </h1>
            </div>
            <p className="text-xl text-text-dark">
              Compassionate, evidence-based treatment for substance use disorders using
              the ASAM criteria to determine the appropriate level of care.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <div className="card-clinical mb-12">
            <h2 className="text-3xl font-bold text-text-dark mb-4">ASAM Criteria Assessment</h2>
            <p className="text-warm-gray mb-4">
              The American Society of Addiction Medicine (ASAM) criteria provides a comprehensive,
              evidence-based approach to determining the appropriate level of care for individuals
              with substance use disorders.
            </p>
            <Link href="/tools/screening-tools/asam-criteria" className="text-clinical-blue hover:text-primary-sage font-medium">
              Take the ASAM Assessment →
            </Link>
          </div>

          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            Levels of Care
          </h2>

          <div className="space-y-6">
            {[
              {
                level: '0.5',
                name: 'Early Intervention',
                description: 'Brief intervention for at-risk individuals who may not meet criteria for substance use disorder.'
              },
              {
                level: '1',
                name: 'Outpatient Services',
                description: 'Less than 9 hours of services per week for individuals with stable environments and support systems.'
              },
              {
                level: '2.1',
                name: 'Intensive Outpatient',
                description: '9+ hours of structured programming per week while maintaining daily responsibilities.'
              },
              {
                level: '2.5',
                name: 'Partial Hospitalization',
                description: '20+ hours per week of highly structured services for those needing intensive support.'
              },
              {
                level: '3',
                name: 'Residential/Inpatient',
                description: '24-hour care in a structured environment with medical and clinical support.'
              },
              {
                level: '4',
                name: 'Medically Managed Intensive Inpatient',
                description: '24-hour nursing care and daily physician visits for acute medical needs.'
              },
            ].map((item) => (
              <div key={item.level} className="card">
                <div className="flex items-start space-x-4">
                  <div className="bg-clinical-blue text-white rounded-lg px-4 py-2 font-bold text-xl flex-shrink-0">
                    Level {item.level}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-dark mb-2">{item.name}</h3>
                    <p className="text-warm-gray">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            Our Treatment Approach
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <Heart className="w-12 h-12 text-soft-rose mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-dark mb-3">Harm Reduction</h3>
              <p className="text-warm-gray">
                Meeting you where you are with compassionate, non-judgmental support focused on reducing harm.
              </p>
            </div>

            <div className="card text-center">
              <Shield className="w-12 h-12 text-primary-sage mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-dark mb-3">Evidence-Based</h3>
              <p className="text-warm-gray">
                Utilizing proven interventions including CBT, motivational interviewing, and relapse prevention.
              </p>
            </div>

            <div className="card text-center">
              <Users className="w-12 h-12 text-earth-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-dark mb-3">Family Support</h3>
              <p className="text-warm-gray">
                Education and support for family members to build a strong recovery network.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Take the First Step Toward Recovery</h2>
          <p className="text-xl mb-8 opacity-90">
            Recovery is possible. Let's work together to create a personalized treatment plan
            that supports your journey to wellness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/screening-tools/asam-criteria" className="btn bg-white text-primary-sage hover:bg-cream">
              Complete ASAM Assessment
            </Link>
            <Link href="/contact" className="btn border-2 border-white hover:bg-white hover:text-primary-sage inline-flex items-center">
              <Calendar className="mr-2 w-5 h-5" />
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
