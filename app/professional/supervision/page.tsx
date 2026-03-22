import Link from 'next/link'
import { GraduationCap, CheckCircle, ArrowLeft, Calendar } from 'lucide-react'

export default function SupervisionPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom">
          <div className="flex items-center space-x-2 mb-6">
            <Link href="/professional" className="text-primary-sage hover:text-earth-green transition-colors">
              <ArrowLeft className="w-5 h-5 inline mr-1" aria-hidden="true" />
              Professional
            </Link>
          </div>
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary-sage p-4 rounded-lg">
                <GraduationCap className="w-12 h-12 text-white" aria-hidden="true" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-text-dark">
                Clinical Supervision
              </h1>
            </div>
            <p className="text-xl text-text-dark">
              Support for counseling associates and interns working toward licensure in Kentucky.
            </p>
          </div>
        </div>
      </section>

      {/* What I Offer */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            Supervision Services
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">Individual Supervision</h3>
              <p className="text-warm-gray mb-4">
                One-on-one clinical supervision focused on case conceptualization,
                treatment planning, ethical decision-making, and professional development.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">Case conceptualization and treatment review</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">Ethical and legal consultation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">Skill development and feedback</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">Licensure hours documentation</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">Areas of Focus</h3>
              <p className="text-warm-gray mb-4">
                Supervision is tailored to your professional goals and the populations you serve.
                My areas of expertise include:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">Neurodiversity-affirming practice (ADHD, autism)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">Trauma-informed care and complex PTSD</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">DBT skills and implementation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">Substance use and co-occurring disorders</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding gradient-sage-bg text-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Supervision Investment</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-sm opacity-90 mb-2">Individual Supervision</p>
              <p className="text-4xl font-bold mb-4">$75</p>
              <p className="text-sm opacity-90">Per hour</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-sm opacity-90 mb-2">Monthly Package</p>
              <p className="text-4xl font-bold mb-4">$250</p>
              <p className="text-sm opacity-90">4 hours per month</p>
            </div>
          </div>

          <Link href="/contact" className="btn bg-white text-primary-sage hover:bg-cream inline-flex items-center">
            <Calendar className="mr-2 w-5 h-5" aria-hidden="true" />
            Inquire About Supervision
          </Link>
        </div>
      </section>
    </div>
  )
}
