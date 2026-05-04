import Link from 'next/link'
import { Brain, Heart, Focus, Users, Shield, Activity } from 'lucide-react'
import NotTherapyDisclaimer from '@/components/NotTherapyDisclaimer'

const screeningTools = [
  {
    icon: Activity,
    title: 'GAD-7 (Generalized Anxiety Disorder)',
    slug: 'gad-7',
    description: 'A brief 7-item screening tool for generalized anxiety disorder with instant scoring.',
    timeEstimate: '2-5 minutes',
    questions: 7,
    validated: true,
    available: true,
    color: 'bg-soft-rose',
  },
  {
    icon: Heart,
    title: 'PHQ-9 (Depression Screening)',
    slug: 'phq-9',
    description: 'The gold standard 9-question assessment for measuring depression severity.',
    timeEstimate: '3-5 minutes',
    questions: 9,
    validated: true,
    available: true,
    color: 'bg-clinical-blue',
  },
  {
    icon: Shield,
    title: 'PCL-5 (PTSD Checklist)',
    slug: 'pcl-5',
    description: 'A 20-item self-report measure assessing PTSD symptoms based on DSM-5 criteria.',
    timeEstimate: '5-10 minutes',
    questions: 20,
    validated: true,
    available: true,
    color: 'bg-alert-red',
  },
  {
    icon: Focus,
    title: 'Adult ADHD Self-Report Scale (ASRS)',
    slug: 'adhd-asrs',
    description: 'An 18-question screening tool for adult ADHD symptoms.',
    timeEstimate: '5-10 minutes',
    questions: 18,
    validated: true,
    available: false,
    color: 'bg-accent-gold',
  },
  {
    icon: Brain,
    title: 'Autism Spectrum Quotient (AQ)',
    slug: 'autism-aq',
    description: 'A 50-item assessment designed to measure autistic traits in adults.',
    timeEstimate: '10-15 minutes',
    questions: 50,
    validated: true,
    available: false,
    color: 'bg-earth-green',
  },
  {
    icon: Users,
    title: 'ASAM Criteria Assessment',
    slug: 'asam-criteria',
    description: 'Comprehensive assessment for determining appropriate level of care for substance use disorders.',
    timeEstimate: '15-20 minutes',
    questions: 30,
    validated: true,
    available: false,
    color: 'bg-primary-sage',
  },
]

export default function ScreeningToolsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            Free Mental Health Screening Tools
          </h1>
          <p className="text-xl text-text-dark max-w-3xl mx-auto mb-8">
            Evidence-based, validated assessments to help you understand your mental health.
            All tools provide instant scoring and interpretation.
          </p>
          <div className="max-w-3xl mx-auto text-left">
            <NotTherapyDisclaimer />
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {screeningTools.map((tool) => {
              const Icon = tool.icon
              return (
                <div key={tool.slug} className="card group hover:scale-105 transition-all duration-200">
                  <div className={`w-16 h-16 ${tool.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-text-dark mb-3">
                    {tool.title}
                  </h3>

                  <p className="text-warm-gray mb-4 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex items-center justify-between text-text-dark">
                      <span className="text-warm-gray">Questions:</span>
                      <span className="font-semibold">{tool.questions}</span>
                    </div>
                    <div className="flex items-center justify-between text-text-dark">
                      <span className="text-warm-gray">Time:</span>
                      <span className="font-semibold">{tool.timeEstimate}</span>
                    </div>
                    {tool.validated && (
                      <div className="flex items-center text-success-green text-sm">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Clinically Validated
                      </div>
                    )}
                  </div>

                  {tool.available ? (
                    <Link
                      href={`/tools/screening-tools/${tool.slug}`}
                      className="btn btn-primary w-full text-center"
                    >
                      Start Assessment
                    </Link>
                  ) : (
                    <div className="btn btn-outline w-full text-center cursor-not-allowed opacity-60">
                      Coming Soon
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            How These Tools Work
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-sage text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-text-dark mb-3">Answer Questions</h3>
              <p className="text-warm-gray">
                Respond honestly to a series of validated questions about your experiences and symptoms.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-sage text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-text-dark mb-3">Instant Results</h3>
              <p className="text-warm-gray">
                Receive your score immediately with clear interpretation and severity levels.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-sage text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-text-dark mb-3">Next Steps</h3>
              <p className="text-warm-gray">
                Get personalized recommendations and resources based on your results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Confidentiality */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="card-clinical">
            <h2 className="text-3xl font-bold text-text-dark mb-6">
              Your Privacy Matters
            </h2>
            <div className="space-y-4 text-text-dark">
              <p>
                <span className="font-semibold">Anonymous:</span> These assessments do not require
                an account and can be completed anonymously.
              </p>
              <p>
                <span className="font-semibold">Not Stored:</span> Your responses are not saved or
                transmitted unless you choose to save them to your client portal.
              </p>
              <p>
                <span className="font-semibold">Secure:</span> All data transmission is encrypted
                using industry-standard SSL/TLS protocols.
              </p>
              <p>
                <span className="font-semibold">No Diagnosis:</span> These tools are screening
                instruments only. A formal diagnosis requires evaluation by a licensed professional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Concerned About Your Results?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            If your screening results suggest you may be experiencing significant symptoms,
            please reach out for a professional evaluation. Early intervention can make a significant difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn bg-white text-primary-sage hover:bg-cream">
              Schedule Free Consultation
            </Link>
            <Link href="/resources" className="btn border-2 border-white hover:bg-white hover:text-primary-sage">
              Browse Self-Help Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
