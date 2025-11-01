import Link from 'next/link'
import { Briefcase, Target, TrendingUp, Users, FileText, Calendar } from 'lucide-react'

export default function CareerCounselingPage() {
  return (
    <div className="min-h-screen">
      <section className="gradient-warm-bg py-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-accent-gold p-4 rounded-lg">
                <Briefcase className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-text-dark">
                Career Counseling
              </h1>
            </div>
            <p className="text-xl text-text-dark">
              Discover your professional path, navigate transitions, and build a fulfilling career
              aligned with your values, interests, and strengths.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            Career Counseling Services
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <Target className="w-12 h-12 text-accent-gold mb-4" />
              <h3 className="text-2xl font-bold text-text-dark mb-4">Career Exploration</h3>
              <ul className="space-y-2 text-text-dark">
                <li>• Strong Interest Inventory</li>
                <li>• Myers-Briggs Type Indicator (MBTI)</li>
                <li>• Holland Code Career Test</li>
                <li>• Values & Skills Assessment</li>
                <li>• Personality-career fit analysis</li>
              </ul>
            </div>

            <div className="card">
              <TrendingUp className="w-12 h-12 text-accent-gold mb-4" />
              <h3 className="text-2xl font-bold text-text-dark mb-4">Career Transition</h3>
              <ul className="space-y-2 text-text-dark">
                <li>• Career change planning</li>
                <li>• Industry exploration</li>
                <li>• Skills gap analysis</li>
                <li>• Personal branding</li>
                <li>• Transition timeline development</li>
              </ul>
            </div>

            <div className="card">
              <Users className="w-12 h-12 text-accent-gold mb-4" />
              <h3 className="text-2xl font-bold text-text-dark mb-4">Job Search Support</h3>
              <ul className="space-y-2 text-text-dark">
                <li>• Resume & cover letter review</li>
                <li>• LinkedIn profile optimization</li>
                <li>• Interview preparation & practice</li>
                <li>• Networking strategies</li>
                <li>• Salary negotiation coaching</li>
              </ul>
            </div>

            <div className="card">
              <FileText className="w-12 h-12 text-accent-gold mb-4" />
              <h3 className="text-2xl font-bold text-text-dark mb-4">Professional Development</h3>
              <ul className="space-y-2 text-text-dark">
                <li>• Leadership skills development</li>
                <li>• Work-life balance strategies</li>
                <li>• Workplace conflict resolution</li>
                <li>• Career advancement planning</li>
                <li>• Burnout prevention</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Invest in Your Professional Future</h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8 inline-block">
            <p className="text-sm opacity-90 mb-2">Career Counseling Session</p>
            <p className="text-5xl font-bold mb-4">$125</p>
            <p className="opacity-90">60-minute session</p>
          </div>
          <p className="text-lg mb-8 opacity-90">
            Package discounts available for multiple sessions
          </p>
          <Link href="/contact" className="btn bg-white text-primary-sage hover:bg-cream inline-flex items-center">
            <Calendar className="mr-2 w-5 h-5" />
            Schedule Your Career Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
