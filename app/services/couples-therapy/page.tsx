import Link from 'next/link'
import { Users, CheckCircle, Heart, MessageCircle, Calendar } from 'lucide-react'

export default function CouplesTherapyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-soft-rose p-4 rounded-lg">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-text-dark">
                Couples Counseling
              </h1>
            </div>
            <p className="text-xl text-text-dark">
              Strengthen your relationship through improved communication, deeper connection,
              and evidence-based strategies for building a healthier partnership.
            </p>
          </div>
        </div>
      </section>

      {/* What We Address */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            What We Address in Couples Counseling
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Communication Breakdowns', description: 'Learning to express needs, listen actively, and resolve misunderstandings constructively' },
              { title: 'Trust & Infidelity', description: 'Rebuilding trust after betrayal and strengthening the foundation of your relationship' },
              { title: 'Conflict Resolution', description: 'Developing healthy strategies for navigating disagreements without escalation' },
              { title: 'Intimacy & Connection', description: 'Rekindling emotional and physical closeness that may have faded over time' },
              { title: 'Life Transitions', description: 'Navigating major changes together — new baby, career shifts, relocation, retirement' },
              { title: 'Pre-Marital Counseling', description: 'Building a strong foundation before marriage by addressing expectations and potential challenges' },
              { title: 'Blended Families', description: 'Navigating the unique dynamics of step-parenting, co-parenting, and blended households' },
              { title: 'Attachment Patterns', description: 'Understanding how your attachment styles interact and affect your relationship dynamics' },
              { title: 'Grief as a Couple', description: 'Processing shared loss — miscarriage, death of a loved one, or other significant grief' },
            ].map((item) => (
              <div key={item.title} className="card-clinical">
                <h3 className="text-xl font-bold text-text-dark mb-2">{item.title}</h3>
                <p className="text-warm-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-6 text-center">
            My Approach to Couples Work
          </h2>
          <p className="text-center text-xl text-warm-gray mb-12 max-w-3xl mx-auto">
            I create a safe, nonjudgmental space where both partners feel heard. My approach integrates
            multiple evidence-based frameworks tailored to your unique relationship.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Emotionally Focused Therapy (EFT)
              </h3>
              <p className="text-warm-gray mb-4">
                EFT helps couples identify negative interaction cycles and build secure emotional bonds.
                It focuses on the attachment needs underlying conflict.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-soft-rose mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">Identify negative cycles</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-soft-rose mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">Access underlying emotions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-soft-rose mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">Create new bonding interactions</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Gottman Method
              </h3>
              <p className="text-warm-gray mb-4">
                Based on decades of research, the Gottman Method provides practical tools for
                managing conflict, building friendship, and creating shared meaning.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-soft-rose mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">Build love maps and fondness</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-soft-rose mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">Turn toward each other</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-soft-rose mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">Manage conflict constructively</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Attachment-Based Therapy
              </h3>
              <p className="text-warm-gray mb-4">
                Understanding your attachment styles helps explain why certain patterns keep showing
                up in your relationship, and how to create healthier ones.
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Communication Skills Training
              </h3>
              <p className="text-warm-gray mb-4">
                Practical, structured exercises to improve how you listen, express needs,
                and navigate difficult conversations together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            What to Expect
          </h2>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-soft-rose text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">Free Consultation (15 minutes)</h3>
                <p className="text-warm-gray">
                  A brief call to discuss your relationship concerns, answer questions,
                  and make sure couples counseling is the right fit for your situation.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-soft-rose text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">Intake Session (75-90 minutes)</h3>
                <p className="text-warm-gray">
                  I meet with both partners together to understand your relationship history,
                  strengths, and the challenges you want to address. We create goals together.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-soft-rose text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">Ongoing Sessions (60 minutes)</h3>
                <p className="text-warm-gray">
                  Regular sessions where we work on your goals using evidence-based techniques.
                  Between sessions, you may practice new skills and communication exercises at home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & CTA */}
      <section className="section-padding gradient-sage-bg text-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Invest in Your Relationship</h2>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8 inline-block">
            <p className="text-sm opacity-90 mb-2">Couples Session</p>
            <p className="text-4xl font-bold mb-4">$200</p>
            <p className="text-sm opacity-90">60-minute session</p>
          </div>

          <p className="text-lg mb-8 opacity-90">
            Sliding scale available. HSA/FSA accepted.
            Superbills provided for insurance reimbursement. Kentucky clients only.
          </p>

          <Link href="/contact" className="btn bg-white text-primary-sage hover:bg-cream inline-flex items-center">
            <Calendar className="mr-2 w-5 h-5" aria-hidden="true" />
            Schedule Your Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
