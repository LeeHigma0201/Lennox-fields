'use client'

import Link from 'next/link'
import { Heart, CheckCircle, Calendar, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function FamilyTherapyPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const faqItems = [
    {
      question: 'Do all family members have to attend every session?',
      answer:
        'Ideally, yes—family therapy is most effective when all involved members participate. However, I can work flexibly based on your situation. Sometimes individual sessions complement family sessions, or certain family members may join specific sessions to address their role.',
    },
    {
      question: 'Will therapy require major changes to our family?',
      answer:
        'Not necessarily. Therapy helps families communicate better and understand each other more deeply. Small shifts in how you interact often create meaningful improvements. Change happens at a pace that works for your family.',
    },
    {
      question: 'What if one family member refuses to come?',
      answer:
        'While family therapy works best with all members present, I can work with those who do attend. Often, one person\'s changes positively influence the whole family dynamic. I can also help you address reluctance or resistance.',
    },
    {
      question: 'How long does family therapy typically take?',
      answer:
        'It varies based on the issues and family circumstances. Many families notice improvement within 4-6 sessions. More complex situations may benefit from longer-term work. We\'ll establish realistic goals and timelines together.',
    },
    {
      question: 'Is family therapy only for crisis situations?',
      answer:
        'No! Many families use therapy for prevention, strengthening relationships, improving communication, or navigating major transitions like divorce, blended families, or moving. It\'s valuable at any stage.',
    },
    {
      question: 'What about confidentiality with teenagers in the family?',
      answer:
        'I balance confidentiality with safety. If a teen shares something concerning (like abuse or substance use), I\'ll discuss with them how to address it. For general disclosures, I support their privacy while keeping family communication honest.',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary-sage p-4 rounded-lg">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-text-dark">
                Family Therapy
              </h1>
            </div>
            <p className="text-xl text-text-dark">
              Heal family relationships and build stronger bonds. Learn to communicate effectively,
              resolve conflicts with respect, and create a more supportive, connected family unit.
            </p>
          </div>
        </div>
      </section>

      {/* What We Address */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            Common Family Issues We Address
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Parent-Child Conflict',
                description: 'Navigate disagreements, rebellion, boundaries, and generational differences',
              },
              {
                title: 'Sibling Relationships',
                description: 'Reduce rivalry, improve cooperation, and strengthen brother/sister bonds',
              },
              {
                title: 'Communication Breakdown',
                description: 'Develop healthy dialogue where everyone feels heard and understood',
              },
              {
                title: 'Behavioral Issues',
                description: 'Address acting out, defiance, school problems, or other behavioral concerns',
              },
              {
                title: 'Blended Family Challenges',
                description: 'Navigate complex dynamics when families merge after divorce or remarriage',
              },
              {
                title: 'Parenting Disagreements',
                description: 'Resolve conflicts between co-parents about discipline, rules, and values',
              },
              {
                title: 'Divorce & Separation',
                description: 'Support children through divorce transition and improve co-parenting',
              },
              {
                title: 'Teen Mental Health',
                description: 'Address depression, anxiety, substance use, or other adolescent concerns',
              },
              {
                title: 'Grief & Loss',
                description: 'Process loss of a family member together and support each other through grief',
              },
            ].map((item) => (
              <div key={item.title} className="card-clinical">
                <h3 className="text-xl font-bold text-text-dark mb-2">{item.title}</h3>
                <p className="text-warm-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Approaches */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-6 text-center">
            Evidence-Based Family Therapy Approaches
          </h2>
          <p className="text-center text-xl text-warm-gray mb-12 max-w-3xl mx-auto">
            I use proven methods that strengthen family bonds and improve communication patterns.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Structural Family Therapy
              </h3>
              <p className="text-warm-gray mb-4">
                This approach focuses on how family members interact and the patterns that develop.
                We restructure these patterns to create healthier roles, boundaries, and relationships.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Identify unhealthy family patterns</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Clarify roles and boundaries</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Create more effective interactions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Strengthen family cohesion</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Emotionally Focused Family Therapy
              </h3>
              <p className="text-warm-gray mb-4">
                This approach helps family members express their underlying emotions and needs,
                creating safer, more secure attachments within the family system.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Express vulnerable emotions safely</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Increase empathy and understanding</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Build emotional safety and trust</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Strengthen family bonds</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Parent-Child Interaction Therapy (PCIT)
              </h3>
              <p className="text-warm-gray mb-4">
                Particularly effective with younger children and behavioral issues. I coach parents
                in real-time to use more effective parenting strategies that improve child behavior.
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Multisystemic Therapy Principles
              </h3>
              <p className="text-warm-gray mb-4">
                This approach considers the broader context—school, friends, community. We address
                family dynamics while recognizing other influences on each family member.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            Who It's For
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-dark mb-2">Families in Conflict</h3>
                <p className="text-warm-gray">
                  If your family is experiencing chronic fighting, tension, or disconnect, therapy
                  can help you understand and resolve underlying issues.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-dark mb-2">Parents Seeking Guidance</h3>
                <p className="text-warm-gray">
                  Parenting is complex. I help you develop strategies to address behavioral issues,
                  improve communication, and build stronger parent-child relationships.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-dark mb-2">Transitioning Families</h3>
                <p className="text-warm-gray">
                  Divorce, remarriage, blended families, moves, or other major changes can stress
                  family relationships. Therapy helps everyone adjust and reconnect.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-dark mb-2">Families Supporting a Struggling Member</h3>
                <p className="text-warm-gray">
                  When one family member faces depression, anxiety, substance use, or other challenges,
                  family therapy helps everyone support recovery while taking care of themselves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            What to Expect
          </h2>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">Initial Consultation (Free)</h3>
                <p className="text-warm-gray">
                  We'll discuss your family concerns, what brought you to therapy, and whether family
                  therapy is the right fit. I'll answer questions and explain how I work.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">First Family Session (60-90 minutes)</h3>
                <p className="text-warm-gray">
                  All family members join (or whoever is available). We'll discuss family history,
                  relationships, and goals. I'll observe how you interact to better understand dynamics.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">Ongoing Sessions (60 minutes)</h3>
                <p className="text-warm-gray">
                  We'll meet regularly (typically weekly or bi-weekly) to work on communication,
                  resolve conflicts, and build healthier patterns. Sessions are safe, structured, and constructive.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                4
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">Home Practices & Growth</h3>
                <p className="text-warm-gray">
                  Between sessions, I'll suggest practices to strengthen your family—like communication
                  exercises or activities. Small changes at home compound into meaningful progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Scheduling */}
      <section className="section-padding gradient-sage-bg text-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Investment in Your Family's Future</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-sm opacity-90 mb-2">Family Session</p>
              <p className="text-4xl font-bold mb-4">$180</p>
              <p className="text-sm opacity-90">60 minute session (3-5 family members)</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-sm opacity-90 mb-2">Monthly Package</p>
              <p className="text-4xl font-bold mb-4">$650</p>
              <p className="text-sm opacity-90">4 sessions per month</p>
            </div>
          </div>

          <p className="text-lg mb-8 opacity-90">
            Sliding scale available for qualified families. HSA/FSA accepted.
            Superbills provided for insurance reimbursement.
          </p>

          <Link href="/contact" className="btn bg-white text-primary-sage hover:bg-cream inline-flex items-center">
            <Calendar className="mr-2 w-5 h-5" />
            Schedule Your Free Consultation
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-warm-gray/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 bg-white hover:bg-cream transition-colors flex items-center justify-between text-left"
                >
                  <span className="text-lg font-semibold text-text-dark">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary-sage transition-transform ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 py-4 bg-cream border-t border-warm-gray/20">
                    <p className="text-warm-gray">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
