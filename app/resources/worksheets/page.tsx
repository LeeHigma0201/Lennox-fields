import Link from 'next/link'
import { FileText, Download, ArrowLeft, Brain, Heart, Shield, Users } from 'lucide-react'

const worksheets = [
  {
    icon: Brain,
    title: 'CBT Thought Record',
    description: 'Identify, challenge, and reframe negative automatic thoughts using this structured cognitive behavioral therapy worksheet.',
    href: '/tools/cbt-thought-record',
    category: 'Cognitive Behavioral Therapy',
    interactive: true,
  },
  {
    icon: Shield,
    title: 'Safety Plan',
    description: 'Create a personalized safety plan with warning signs, coping strategies, and emergency contacts.',
    href: '/tools/safety-planning',
    category: 'Crisis Planning',
    interactive: true,
  },
  {
    icon: Heart,
    title: 'Emotion Regulation Log',
    description: 'Track your emotions throughout the day, identify triggers, and practice DBT emotion regulation skills.',
    category: 'DBT Skills',
    interactive: false,
  },
  {
    icon: Users,
    title: 'Interpersonal Effectiveness',
    description: 'Practice DEAR MAN, GIVE, and FAST skills for assertive communication and healthy relationships.',
    category: 'DBT Skills',
    interactive: false,
  },
  {
    icon: Brain,
    title: 'Behavioral Activation Planner',
    description: 'Schedule meaningful activities to combat depression and build momentum toward your goals.',
    category: 'Behavioral Therapy',
    interactive: false,
  },
  {
    icon: Heart,
    title: 'Gratitude & Positive Data Log',
    description: 'Record positive experiences, acts of kindness, and things you are grateful for each day.',
    category: 'Positive Psychology',
    interactive: false,
  },
  {
    icon: Shield,
    title: 'Distress Tolerance Plan',
    description: 'Build your personal toolkit of coping strategies for when emotions feel overwhelming.',
    category: 'DBT Skills',
    interactive: false,
  },
  {
    icon: Brain,
    title: 'Values Clarification',
    description: 'Explore and prioritize your core values to guide decision-making and goal-setting.',
    category: 'Acceptance & Commitment',
    interactive: false,
  },
]

export default function WorksheetsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom">
          <div className="flex items-center space-x-2 mb-6">
            <Link href="/resources" className="text-primary-sage hover:text-earth-green transition-colors">
              <ArrowLeft className="w-5 h-5 inline mr-1" aria-hidden="true" />
              Resources
            </Link>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            Therapeutic Worksheets
          </h1>
          <p className="text-xl text-text-dark max-w-3xl">
            Evidence-based worksheets for CBT, DBT, and other therapeutic approaches.
            Use these alongside therapy or as part of your self-guided mental health practice.
          </p>
        </div>
      </section>

      {/* Worksheets Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {worksheets.map((worksheet) => {
              const Icon = worksheet.icon
              return (
                <div key={worksheet.title} className="card">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-sage/10 rounded-lg p-3 flex-shrink-0">
                      <Icon className="w-8 h-8 text-primary-sage" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-text-dark">{worksheet.title}</h3>
                        {worksheet.interactive && (
                          <span className="text-xs bg-primary-sage/10 text-primary-sage px-2 py-1 rounded font-medium">
                            Interactive
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-warm-gray mb-1">{worksheet.category}</p>
                      <p className="text-text-dark mb-4">{worksheet.description}</p>
                      {worksheet.href ? (
                        <Link href={worksheet.href} className="text-primary-sage hover:text-earth-green font-medium">
                          Open Worksheet &rarr;
                        </Link>
                      ) : (
                        <span className="text-warm-gray text-sm italic">Printable version available during sessions</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">
            Getting the Most from These Worksheets
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-sage text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-bold text-text-dark mb-2">Be Honest</h3>
              <p className="text-warm-gray text-sm">Write your genuine thoughts and feelings. There are no right or wrong answers.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-sage text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-bold text-text-dark mb-2">Be Consistent</h3>
              <p className="text-warm-gray text-sm">Regular practice builds skills. Try to complete worksheets at the same time each day.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-sage text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-bold text-text-dark mb-2">Discuss in Therapy</h3>
              <p className="text-warm-gray text-sm">Bring completed worksheets to your sessions for deeper exploration with your therapist.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Want Guided Support?</h2>
          <p className="text-xl mb-8 opacity-90">
            These worksheets are most effective when used alongside professional therapy.
            Schedule a free consultation to get started.
          </p>
          <Link href="/contact" className="btn bg-white text-primary-sage hover:bg-cream">
            Schedule Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
