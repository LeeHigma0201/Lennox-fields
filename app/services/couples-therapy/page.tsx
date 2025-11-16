'use client'

import Link from 'next/link'
import { Heart, CheckCircle, Calendar, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function CouplesTherapyPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const faqItems = [
    {
      question: 'Is couples therapy only for relationships in crisis?',
      answer:
        'No! Many couples seek therapy to prevent problems, strengthen communication, and deepen their connection. Couples therapy is beneficial at any stage—whether you\'re facing challenges or wanting to invest in your relationship.',
    },
    {
      question: 'Will the therapist take sides?',
      answer:
        'Absolutely not. I remain neutral and create a safe space for both partners. My role is to help you understand each other better and work together toward solutions, not to judge or blame.',
    },
    {
      question: 'What if my partner doesn\'t want to come?',
      answer:
        'I recommend both partners participating for maximum effectiveness. However, I can work with one partner initially if needed. Individual sessions can help you develop better communication strategies and clarify your needs.',
    },
    {
      question: 'How many sessions before we see improvement?',
      answer:
        'Many couples notice improvements within 3-4 sessions with consistent attendance and effort. More complex issues may require longer-term work. I\'ll help you establish realistic goals and timeline during our first session.',
    },
    {
      question: 'What if we decide to break up during therapy?',
      answer:
        'Couples therapy can help you make this decision with clarity and compassion. I can support you through the process, help with co-parenting plans if applicable, or transition to individual therapy.',
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
                Couples Therapy
              </h1>
            </div>
            <p className="text-xl text-text-dark">
              Strengthen your relationship with evidence-based couples therapy. Learn to communicate effectively,
              resolve conflicts with compassion, and rebuild intimacy and trust.
            </p>
          </div>
        </div>
      </section>

      {/* What We Address */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            Common Issues in Relationships We Address
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Communication Breakdown',
                description: 'Learn to listen actively and express needs clearly without defensiveness',
              },
              {
                title: 'Chronic Conflict',
                description: 'Break repetitive argument patterns and resolve disagreements constructively',
              },
              {
                title: 'Trust Issues',
                description: 'Rebuild trust after betrayal, infidelity, or breach of confidence',
              },
              {
                title: 'Infidelity & Affairs',
                description: 'Navigate the emotional aftermath and decide if reconciliation is possible',
              },
              {
                title: 'Emotional Disconnection',
                description: 'Restore intimacy and emotional closeness that may have been lost over time',
              },
              {
                title: 'Intimacy & Sexual Issues',
                description: 'Address physical and emotional intimacy concerns in a safe, non-judgmental space',
              },
              {
                title: 'Life Transitions',
                description: 'Navigate major changes like marriage, children, moves, or career changes together',
              },
              {
                title: 'Unresolved Resentment',
                description: 'Address lingering hurt, disappointment, and negative feelings between partners',
              },
              {
                title: 'Financial Stress',
                description: 'Navigate money disagreements and different spending/saving values',
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
            Evidence-Based Couples Therapy Approaches
          </h2>
          <p className="text-center text-xl text-warm-gray mb-12 max-w-3xl mx-auto">
            I use proven therapeutic methods specifically designed to strengthen relationships and improve communication.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Emotionally Focused Therapy (EFT)
              </h3>
              <p className="text-warm-gray mb-4">
                EFT is one of the most effective approaches for couples. It helps you identify and change
                negative emotional patterns, increase emotional responsiveness, and rebuild secure attachment.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Identify emotional triggers and patterns</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Deepen emotional connection and safety</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Transform criticism into vulnerability</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Build secure attachment patterns</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Gottman Method
              </h3>
              <p className="text-warm-gray mb-4">
                The Gottman Method is based on decades of research about what makes relationships thrive
                or fail. I help you build strong foundations and eliminate destructive patterns.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Eliminate the four horsemen of conflict</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Build admiration and respect</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Improve conflict resolution skills</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Create shared meaning and purpose</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Cognitive-Behavioral Couples Therapy
              </h3>
              <p className="text-warm-gray mb-4">
                This approach helps you identify unhelpful thoughts and behaviors that damage the relationship,
                develop new communication skills, and create positive interactions.
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Imago Relationship Therapy
              </h3>
              <p className="text-warm-gray mb-4">
                Imago helps you understand why you chose your partner and how childhood patterns influence
                your relationship. It emphasizes dialogue, curiosity, and connection.
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
                <h3 className="text-xl font-bold text-text-dark mb-2">Couples in Crisis</h3>
                <p className="text-warm-gray">
                  If your relationship feels broken or you're considering separation, couples therapy
                  can help you reconnect or make this decision with clarity.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-dark mb-2">Couples Wanting to Strengthen Connection</h3>
                <p className="text-warm-gray">
                  Even happy relationships benefit from deepening communication and intimacy.
                  Therapy is an investment in your partnership's future.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-dark mb-2">Partners Navigating Life Transitions</h3>
                <p className="text-warm-gray">
                  Marriage, children, relocation, or other major changes can strain relationships.
                  Therapy helps you navigate these transitions together.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-dark mb-2">LGBTQ+ Couples</h3>
                <p className="text-warm-gray">
                  I provide affirming, culturally competent therapy that celebrates your relationship
                  while addressing the unique challenges you may face.
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
                  We'll have a brief 15-minute call to discuss your relationship concerns, answer your
                  questions, and determine if we're a good fit for your needs.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">First Session (90 minutes)</h3>
                <p className="text-warm-gray">
                  Both partners attend together. We'll discuss your relationship history, current challenges,
                  and relationship goals. This helps me understand your dynamic and create a tailored treatment plan.
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
                  We'll meet regularly (usually weekly) to work on communication, resolve conflicts, and
                  strengthen your emotional connection. Sessions are safe and structured to benefit both partners.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                4
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">Home Practices & Progress</h3>
                <p className="text-warm-gray">
                  Between sessions, you'll practice new communication skills and complete exercises
                  designed to strengthen your connection and integrate changes into daily life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Scheduling */}
      <section className="section-padding gradient-sage-bg text-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Investment in Your Relationship</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-sm opacity-90 mb-2">Couples Session</p>
              <p className="text-4xl font-bold mb-4">$200</p>
              <p className="text-sm opacity-90">60 minute session (both partners)</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-sm opacity-90 mb-2">Monthly Package</p>
              <p className="text-4xl font-bold mb-4">$700</p>
              <p className="text-sm opacity-90">4 sessions per month</p>
            </div>
          </div>

          <p className="text-lg mb-8 opacity-90">
            Sliding scale available for qualified couples. HSA/FSA accepted.
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
