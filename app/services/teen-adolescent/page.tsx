'use client'

import Link from 'next/link'
import { Heart, CheckCircle, Calendar, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function TeenAdolescentTherapyPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const faqItems = [
    {
      question: 'Will my teen actually be open with me in the room?',
      answer:
        'Great question! Individual therapy sessions are confidential, which actually helps teens open up more. Knowing what they say stays private encourages honesty. I can include parents in certain sessions if needed, but individual time is crucial for teens.',
    },
    {
      question: 'What if my teen refuses to go to therapy?',
      answer:
        'I get it—many teens are reluctant at first. I make the first session safe and non-judgmental. I focus on what matters to them, not what parents want to change. Once teens realize I\'m not their parents\' spy, most warm up quickly.',
    },
    {
      question: 'How is teen therapy different from adult therapy?',
      answer:
        'Teen therapy is tailored to adolescent development. I address identity exploration, peer relationships, family dynamics, and the pressures teens face today. The pace is faster, language is contemporary, and I respect their growing independence while supporting healthy development.',
    },
    {
      question: 'Will you tell my parents what I say?',
      answer:
        'Confidentiality is important for trust. However, if you\'re in danger or planning to harm yourself or others, I will share this with parents or appropriate authorities. Otherwise, what you share stays between us—within legal limits.',
    },
    {
      question: 'What can therapy help with besides depression and anxiety?',
      answer:
        'Therapy can help with stress management, social relationships, school pressures, body image, identity questions, substance use, family conflict, grief, trauma, self-harm, academic motivation, and more. Every teen\'s situation is unique.',
    },
    {
      question: 'How long will my teen need therapy?',
      answer:
        'It depends on the issues and goals. Some teens benefit from short-term therapy (8-12 weeks) for specific problems. Others prefer ongoing support during challenging seasons. We\'ll discuss realistic timelines during the first session.',
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
                Teen & Adolescent Therapy
              </h1>
            </div>
            <p className="text-xl text-text-dark">
              A safe, confidential space to navigate the challenges of being a teenager. Let's work
              through anxiety, peer pressure, family conflict, identity questions, and whatever else
              is weighing on you.
            </p>
          </div>
        </div>
      </section>

      {/* What We Address */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            Common Teen Issues We Address
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Anxiety & Stress',
                description: 'Managing test anxiety, social anxiety, generalized worry, and everyday stress',
              },
              {
                title: 'Depression & Mood',
                description: 'Addressing low mood, loss of interest, hopelessness, and emotional struggles',
              },
              {
                title: 'Social & Peer Issues',
                description: 'Navigating friendships, bullying, social pressure, loneliness, and fitting in',
              },
              {
                title: 'Family Conflict',
                description: 'Understanding parent relationships, sibling conflicts, and family dynamics',
              },
              {
                title: 'School & Academic Stress',
                description: 'Managing performance pressure, motivation issues, and academic anxiety',
              },
              {
                title: 'Identity & Self-Esteem',
                description: 'Exploring who you are, body image, sexuality, and building self-confidence',
              },
              {
                title: 'Substance Use',
                description: 'Addressing alcohol, vaping, cannabis use, and developing healthier choices',
              },
              {
                title: 'Self-Harm & Suicidal Thoughts',
                description: 'Processing painful emotions and developing safer coping strategies',
              },
              {
                title: 'Trauma & Grief',
                description: 'Processing past trauma, loss of loved ones, and significant life changes',
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
            Evidence-Based Therapy Approaches for Teens
          </h2>
          <p className="text-center text-xl text-warm-gray mb-12 max-w-3xl mx-auto">
            I use approaches specifically designed for adolescent development and the unique challenges teens face.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Cognitive Behavioral Therapy (CBT)
              </h3>
              <p className="text-warm-gray mb-4">
                CBT helps you identify thought patterns that fuel anxiety or depression, and develop
                practical strategies to feel better. It's highly effective and teaches skills you'll use for life.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Identify unhelpful thinking patterns</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Challenge and reframe negative thoughts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Learn practical coping strategies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Build confidence through action</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Dialectical Behavior Therapy (DBT)
              </h3>
              <p className="text-warm-gray mb-4">
                DBT is particularly helpful for managing intense emotions, self-harm, and relationships.
                You'll learn mindfulness, emotional regulation, distress tolerance, and interpersonal skills.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Manage intense emotions effectively</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Learn crisis survival skills</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Improve relationships and communication</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Develop mindfulness practices</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Acceptance & Commitment Therapy (ACT)
              </h3>
              <p className="text-warm-gray mb-4">
                ACT helps you accept uncomfortable feelings while pursuing what matters to you.
                Great for anxiety, perfectionism, and living authentically.
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Motivational Interviewing
              </h3>
              <p className="text-warm-gray mb-4">
                This approach respects your autonomy and works with ambivalence. Helpful for
                substance use, behavioral changes, and when you're torn about making changes.
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
                <h3 className="text-xl font-bold text-text-dark mb-2">Teens Struggling Emotionally</h3>
                <p className="text-warm-gray">
                  If you're dealing with anxiety, depression, stress, or just feeling overwhelmed,
                  therapy provides tools and support to feel better.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-dark mb-2">Those Navigating Social Challenges</h3>
                <p className="text-warm-gray">
                  Friendship drama, bullying, social anxiety, or feeling like you don't fit in?
                  We can work through these challenges together.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-dark mb-2">Teens in Family Conflict</h3>
                <p className="text-warm-gray">
                  If your home situation is tense, you and parents don't understand each other,
                  or there's conflict, I can help you navigate this.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-dark mb-2">Those Exploring Identity</h3>
                <p className="text-warm-gray">
                  Questions about who you are, sexuality, gender identity, values, or future direction?
                  That's completely normal, and I'm here to support your exploration.
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
                  A brief 15-minute call to chat about what's going on, answer questions,
                  and make sure we're a good fit. This is for you to decide if you're comfortable working with me.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">First Session (60 minutes)</h3>
                <p className="text-warm-gray">
                  We'll talk about what brought you in, your background, what's on your mind,
                  and what you want to work on. This helps me understand your situation and create a plan together.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">Regular Sessions (50-60 minutes)</h3>
                <p className="text-warm-gray">
                  We'll meet weekly or bi-weekly (whatever works). Sessions are confidential, judgment-free,
                  and focused on what matters to you. We'll work at your pace.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                4
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">Skills & Practices</h3>
                <p className="text-warm-gray">
                  I'll teach you coping strategies, skills, and tools you can use in real life.
                  Between sessions, you might practice these to see what works best for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Scheduling */}
      <section className="section-padding gradient-sage-bg text-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Investment in Your Mental Health</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-sm opacity-90 mb-2">Teen Session</p>
              <p className="text-4xl font-bold mb-4">$150</p>
              <p className="text-sm opacity-90">50-60 minute session</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-sm opacity-90 mb-2">Monthly Package</p>
              <p className="text-4xl font-bold mb-4">$500</p>
              <p className="text-sm opacity-90">4 sessions per month</p>
            </div>
          </div>

          <p className="text-lg mb-8 opacity-90">
            Sliding scale available for qualified teens. HSA/FSA accepted.
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
