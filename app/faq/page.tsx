'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, MessageCircle, HelpCircle, Clock, DollarSign, Users, Lock, AlertCircle, FileText, Calendar } from 'lucide-react'

interface FAQ {
  id: string
  question: string
  answer: string | React.ReactNode
}

interface FAQCategory {
  id: string
  title: string
  icon: typeof HelpCircle
  description: string
  faqs: FAQ[]
  color: string
}

const faqCategories: FAQCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: HelpCircle,
    description: 'New to therapy? Learn about what to expect and how to begin.',
    color: 'bg-clinical-blue',
    faqs: [
      {
        id: 'what-to-expect',
        question: 'What should I expect in my first therapy session?',
        answer: 'Your first session is about building connection and understanding your needs. We\'ll spend time getting to know each other, discussing what brought you to therapy, and exploring your goals. I\'ll ask questions about your background, current challenges, and what you hope to achieve. There\'s no pressure to share everything at once—therapy is a gradual process of building trust. We\'ll also discuss logistics like scheduling, fees, and how we\'ll work together. By the end of our first session, you should have a clearer sense of how therapy works and whether we\'re a good fit.'
      },
      {
        id: 'how-to-schedule',
        question: 'How do I schedule my first appointment?',
        answer: 'Scheduling is simple! You can reach out through the contact form on our website, call, or email. I\'ll get back to you within 24 business hours to discuss your needs and find a time that works for your schedule. If you\'d prefer, we can start with a brief phone call to see if we\'re a good match before committing to a full session. Most clients find scheduling appointments easy and straightforward.'
      },
      {
        id: 'insurance-coverage',
        question: 'Do you accept insurance?',
        answer: 'I\'m actively working on insurance credentialing and will be in-network with major providers soon. In the meantime, I provide superbills that you can submit to your insurance for out-of-network reimbursement. Many insurance plans will reimburse a portion of therapy costs even when seeing an out-of-network provider. I recommend contacting your insurance directly to understand your coverage and benefits. I\'m happy to help with any paperwork or questions about the reimbursement process.'
      },
      {
        id: 'pricing-transparency',
        question: 'What are your fees, and is there a sliding scale?',
        answer: 'Individual therapy sessions are $150/hour, couples therapy is $200/hour, and career counseling is $125/hour. Specialized services like substance use treatment are available—contact me for pricing. I believe therapy should be accessible, so I offer a sliding scale for clients with financial hardship. Payment methods include credit/debit cards, and HSA/FSA accounts are eligible. I\'m also happy to discuss payment plans if that would help. No one is turned away due to inability to pay.'
      },
      {
        id: 'cancellation-policy-intro',
        question: 'What is your cancellation policy?',
        answer: 'I require at least 24 hours notice for cancellations to avoid a cancellation fee. Life happens, and I understand that unexpected situations arise. If you need to reschedule, simply let me know as soon as possible. No-shows without notice will be billed at the full session rate. This policy helps me reserve time for clients who are committed to their therapeutic work.'
      }
    ]
  },
  {
    id: 'about-therapy',
    title: 'About Therapy',
    icon: MessageCircle,
    description: 'Questions about the therapy process, what therapy is, and how it can help.',
    color: 'bg-soft-rose',
    faqs: [
      {
        id: 'what-is-therapy',
        question: 'What exactly is therapy, and how does it work?',
        answer: 'Therapy is a collaborative process where we work together to understand your challenges, develop coping strategies, and create meaningful change. Rather than me telling you what to do, I help you gain insight into your patterns, explore what\'s keeping you stuck, and build skills for moving forward. I use evidence-based approaches like Cognitive Behavioral Therapy (CBT), Eye Movement Desensitization and Reprocessing (EMDR), and mindfulness-based techniques. The specific approach depends on your needs and what you\'re working with. Therapy is a partnership—you\'re the expert on your own life, and I\'m here to provide tools, perspective, and support.'
      },
      {
        id: 'how-long-therapy',
        question: 'How long does therapy typically take?',
        answer: 'Therapy duration varies greatly and depends on your specific situation. Some people see progress in 6-8 sessions, while others benefit from longer-term work. We establish clear goals early on and regularly assess progress. If you\'re working through past trauma or complex patterns, you might benefit from ongoing support. Some clients prefer monthly "tune-up" sessions once they\'ve addressed their primary concerns. I\'ll always be honest about what I\'m seeing clinically and help you make informed decisions about your treatment. The goal is to work efficiently while giving you the support you truly need.'
      },
      {
        id: 'confidentiality',
        question: 'Is what I share in therapy confidential?',
        answer: 'Yes, absolutely. Confidentiality is foundational to therapy. Everything you share is protected by therapist-client privilege and North Carolina/Indiana privacy laws. I won\'t share information without your written consent, with a few important exceptions: if you pose an imminent danger to yourself or others, if there\'s abuse of a child or vulnerable adult, or if legally subpoenaed by a court. I\'ll always be clear with you about these limits upfront. Your privacy and trust are paramount to creating the safe space therapy requires.'
      },
      {
        id: 'hipaa-compliance',
        question: 'Are you HIPAA compliant?',
        answer: 'Yes, my practice is fully HIPAA compliant. Your health information is protected according to federal standards, and all records are stored securely. Electronic communications are encrypted, and paper records are kept in a locked file. You have the right to access your records and request amendments. I take data security seriously because I understand how important your privacy is. If you have questions about how your information is stored or used, please ask—I\'m always happy to explain our security practices.'
      }
    ]
  },
  {
    id: 'services',
    title: 'Services',
    icon: Users,
    description: 'Learn about the different types of therapy and services offered.',
    color: 'bg-primary-sage',
    faqs: [
      {
        id: 'individual-vs-couples',
        question: 'What\'s the difference between individual and couples therapy?',
        answer: 'Individual therapy focuses on your personal concerns, patterns, and goals. It\'s a space entirely for you to explore your challenges without worrying about someone else\'s perspective. Couples therapy involves both partners working together to improve communication, resolve conflicts, and strengthen the relationship. Both are valuable, and some couples benefit from a combination of both individual and couples sessions. Individual therapy can help you understand your contributions to relationship dynamics, while couples therapy creates space for joint problem-solving. I\'m trained in both approaches and will help you determine what\'s best for your situation.'
      },
      {
        id: 'online-vs-inperson',
        question: 'What\'s the difference between online and in-person therapy?',
        answer: 'Both formats offer excellent therapeutic outcomes. In-person therapy provides face-to-face connection and allows me to observe body language more fully. Online therapy (via secure video) offers convenience, flexibility, and works well if you have transportation challenges or prefer a home setting. I offer both options, and you can even switch between them depending on your needs. Some clients prefer online for busy weeks and in-person when they want more intensive work. The most important factor is the therapeutic relationship, which can be strong in either format. We\'ll discuss which option feels right for you.'
      },
      {
        id: 'specific-issues',
        question: 'What issues and problems do you specialize in treating?',
        answer: 'I work with a wide range of concerns including anxiety, depression, trauma, PTSD, relationship issues, life transitions, grief, identity exploration, and substance use concerns. I\'m trained in trauma-focused treatment (EMDR), CBT for anxiety and depression, couples and family therapy, and career counseling. I also work with individuals in career transitions, those seeking professional development, and people facing major life changes. If you\'re unsure whether I can help with your specific concern, I encourage you to reach out and ask. I\'m honest about my scope of practice and happy to refer you elsewhere if needed.'
      },
      {
        id: 'telehealth-availability',
        question: 'Where can I receive telehealth services?',
        answer: 'I currently offer telehealth services to clients in North Carolina and Indiana, where I am licensed. This allows you flexibility and convenience, especially if you live far from my office or prefer the comfort of your home. For telehealth sessions, you\'ll use a secure, encrypted video platform. Make sure you have a private space, reliable internet, and a device with a camera and microphone. Telehealth sessions are just as effective as in-person sessions—the quality of our therapeutic relationship is what matters most.'
      }
    ]
  },
  {
    id: 'practical-matters',
    title: 'Practical Matters',
    icon: Clock,
    description: 'Information about scheduling, payments, and session logistics.',
    color: 'bg-accent-gold',
    faqs: [
      {
        id: 'session-length',
        question: 'How long are therapy sessions?',
        answer: 'Standard therapy sessions are 50-60 minutes. This length allows us to have meaningful work while accounting for administrative time between sessions. I block out full hour slots for each client, so you always have the full time. If you need extended sessions for deeper work, we can discuss that possibility. Some clients occasionally request 90-minute sessions for intensive processing, which can be arranged. The standard session length has proven effective for most therapeutic work, but we\'ll adjust based on your specific needs and goals.'
      },
      {
        id: 'payment-methods',
        question: 'What payment methods do you accept?',
        answer: 'I accept credit and debit cards (Visa, Mastercard, American Express, Discover). Payments typically process immediately. If you have an HSA or FSA account, therapy is eligible for those funds. I also offer monthly payment plans if needed, and as mentioned, sliding scale fees are available for qualified clients. I keep billing simple and transparent—you\'ll know exactly what to expect before we begin work together.'
      },
      {
        id: 'missed-sessions',
        question: 'What happens if I miss an appointment?',
        answer: 'Life happens, and occasionally sessions are missed unexpectedly. If you need to cancel or reschedule, please provide at least 24 hours notice to avoid a cancellation fee. For emergencies, I understand that sometimes you can\'t provide advance notice—just communicate as soon as you\'re able. No-shows without any notice will be billed at the full session rate. This policy respects both your commitment to therapy and my ability to hold time for other clients. If you\'re struggling with attending sessions regularly, that\'s actually important to discuss in therapy—attendance patterns often reflect something meaningful about what we\'re working on.'
      }
    ]
  },
  {
    id: 'specific-populations',
    title: 'For Specific Populations',
    icon: Users,
    description: 'Information tailored to teens, couples, and career counseling clients.',
    color: 'bg-earth-green',
    faqs: [
      {
        id: 'teen-therapy',
        question: 'How do you work with teens and adolescents?',
        answer: 'Teen therapy requires a different approach than adult therapy, and I specialize in meeting adolescents where they are. I create a non-judgmental space where teens feel heard and respected, even when they\'re navigating complex feelings. I address academic pressures, peer relationships, identity development, family dynamics, and mental health challenges like anxiety and depression. I also involve parents appropriately—not by sharing everything discussed in sessions, but by helping the whole family improve communication. I use evidence-based approaches adapted for adolescent development. The goal is to help teens build confidence, coping skills, and a stronger sense of self during a critical developmental period.'
      },
      {
        id: 'couples-therapy-focus',
        question: 'What should couples expect from therapy together?',
        answer: 'Couples therapy isn\'t about deciding who\'s "right" or "wrong"—it\'s about helping both of you understand each other better and build a stronger relationship. We work on communication skills, resolving recurring conflicts, rebuilding trust if it\'s been damaged, and reconnecting emotionally. I create a safe space where both partners feel heard. We might explore attachment patterns, early relationship experiences, and how those influence your current dynamics. Some couples come in at a crisis point; others come preventatively to strengthen their relationship. Couples therapy can be deeply rewarding because you\'re investing in something you both value.'
      },
      {
        id: 'career-counseling-services',
        question: 'How does career counseling work, and who is it for?',
        answer: 'Career counseling is for anyone navigating career decisions, transitions, or professional development. This includes people changing careers, students exploring options, professionals seeking advancement, and anyone feeling stuck or unfulfilled in their work. We use assessments like the Strong Interest Inventory and Myers-Briggs to clarify your strengths and values. I help with job search strategies, interview preparation, resume development, negotiation skills, and processing the emotional side of career transitions. Career counseling is practical and goal-oriented, with concrete outcomes like a job search plan or clarity about your next steps.'
      },
      {
        id: 'substance-use-treatment',
        question: 'Do you treat substance use concerns?',
        answer: 'Yes, I offer evidence-based treatment for substance use concerns using the ASAM (American Society of Addiction Medicine) criteria to assess level of care. I use a harm reduction approach that meets people where they are, whether they\'re in active use, early recovery, or long-term sobriety. Treatment includes relapse prevention planning, addressing co-occurring mental health concerns like depression or anxiety, and family education and support. Substance use treatment is compassionate, non-judgmental, and focuses on sustainable recovery. I\'ll be honest if someone needs a higher level of care than I can provide and help with appropriate referrals.'
      }
    ]
  },
  {
    id: 'resources',
    title: 'Resources',
    icon: FileText,
    description: 'Information about free tools, worksheets, and when to use them.',
    color: 'bg-clinical-blue',
    faqs: [
      {
        id: 'free-resources',
        question: 'What free resources and tools are available?',
        answer: 'I\'ve created over 50 free resources including therapy worksheets (for CBT, DBT, emotion regulation), habit trackers (mood, sleep, medication, symptoms), therapeutic journal prompts, and validated screening tools for anxiety (GAD-7), depression (PHQ-9), and PTSD (PCL-5). All resources are evidence-based, printable, and designed by a mental health professional. Many can be used independently for self-care or as homework assignments in therapy. You don\'t need to sign up or pay—just download what you need. These resources reflect my belief that quality mental health tools should be accessible to everyone.'
      },
      {
        id: 'when-to-use-resources',
        question: 'When should I use worksheets and tools vs. professional therapy?',
        answer: 'Worksheets and tools are wonderful for self-awareness, skill-building, and supporting your mental wellness—whether or not you\'re in formal therapy. They\'re particularly helpful for processing emotions between sessions, building new habits, and practicing coping skills. However, they\'re not a substitute for professional therapy if you\'re struggling significantly with mental health challenges. If you\'re experiencing severe depression, anxiety, trauma, suicidal thoughts, or struggling to manage daily functioning, professional therapy is important. Think of tools as supportive companions to therapy or as stepping stones if you\'re not yet ready for professional help. Many people benefit from both—using tools to track progress and worksheets to deepen session work.'
      }
    ]
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleFAQ = (id: string) => {
    const newOpen = new Set(openItems)
    if (newOpen.has(id)) {
      newOpen.delete(id)
    } else {
      newOpen.add(id)
    }
    setOpenItems(newOpen)
  }

  const toggleCategory = (categoryId: string) => {
    const categoryFAQs = faqCategories.find(c => c.id === categoryId)?.faqs || []
    const allFAQsOpen = categoryFAQs.every(faq => openItems.has(faq.id))
    const newOpen = new Set(openItems)

    if (allFAQsOpen) {
      categoryFAQs.forEach(faq => newOpen.delete(faq.id))
    } else {
      categoryFAQs.forEach(faq => newOpen.add(faq.id))
    }
    setOpenItems(newOpen)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom text-center">
          <HelpCircle className="w-20 h-20 text-primary-sage mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-text-dark max-w-3xl mx-auto">
            Questions about therapy, how we work together, and what to expect. Can't find your answer?
            Reach out to me directly—I'm always happy to help.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="space-y-8">
            {faqCategories.map((category) => {
              const Icon = category.icon
              const categoryFAQs = category.faqs
              const allOpen = categoryFAQs.every(faq => openItems.has(faq.id))

              return (
                <div key={category.id} className="border border-warm-gray/20 rounded-lg overflow-hidden">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full px-6 py-6 bg-gradient-to-r from-cream to-white hover:from-warm-gray/10 hover:to-warm-gray/5 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-4 text-left">
                      <div className={`${category.color} p-3 rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-text-dark group-hover:text-primary-sage transition-colors">
                          {category.title}
                        </h2>
                        <p className="text-sm text-warm-gray mt-1">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-primary-sage transition-transform duration-300 flex-shrink-0 ${
                        allOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* FAQs */}
                  <div className="divide-y divide-warm-gray/20">
                    {categoryFAQs.map((faq) => {
                      const isOpen = openItems.has(faq.id)

                      return (
                        <div key={faq.id}>
                          <button
                            onClick={() => toggleFAQ(faq.id)}
                            className="w-full px-6 py-4 text-left hover:bg-cream/50 transition-colors flex items-start justify-between group"
                          >
                            <div className="flex-1 pr-4">
                              <h3 className="text-lg font-semibold text-text-dark group-hover:text-primary-sage transition-colors">
                                {faq.question}
                              </h3>
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 text-primary-sage transition-transform duration-300 flex-shrink-0 mt-1 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {/* Answer */}
                          {isOpen && (
                            <div className="px-6 py-4 bg-cream/30 text-warm-gray leading-relaxed">
                              {typeof faq.answer === 'string' ? (
                                <p>{faq.answer}</p>
                              ) : (
                                faq.answer
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <div className="card border-2 border-primary-sage/20">
            <div className="flex items-start space-x-4 mb-4">
              <AlertCircle className="w-8 h-8 text-primary-sage flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-4">
                  Didn't find your answer?
                </h3>
                <p className="text-warm-gray leading-relaxed mb-6">
                  These FAQs cover the most common questions I receive, but I know everyone's situation is unique.
                  If you have a question that wasn't answered here, I'd love to hear from you. Reach out directly
                  through the contact form, and I'll get back to you within 24 business hours. There are no silly
                  questions in therapy—only genuine curiosity and the desire to understand what you're getting into.
                </p>
                <p className="text-warm-gray mb-6">
                  You can also schedule a brief 15-minute phone call at no charge to discuss your specific questions
                  and determine if we're a good fit for working together.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="btn bg-primary-sage text-white hover:bg-earth-green inline-flex items-center justify-center"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Send a Message
              </Link>
              <Link
                href="/contact"
                className="btn btn-outline inline-flex items-center justify-center"
              >
                <Calendar className="mr-2 w-5 h-5" />
                Schedule a Free Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you have more questions or you're ready to start therapy, I'm here to support you.
            Let's work together to create the change you're seeking.
          </p>
          <Link href="/contact" className="btn bg-white text-primary-sage hover:bg-cream inline-flex items-center">
            <Calendar className="mr-2 w-5 h-5" />
            Schedule Your Free Consultation
          </Link>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h3 className="text-2xl font-bold text-text-dark mb-8 text-center">
            Your Trust Matters
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Lock className="w-12 h-12 text-primary-sage mx-auto mb-4" />
              <h4 className="font-bold text-text-dark mb-2">Confidentiality Guaranteed</h4>
              <p className="text-sm text-warm-gray">
                Everything you share is protected by therapist-client privilege and HIPAA regulations.
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-primary-sage mx-auto mb-4" />
              <h4 className="font-bold text-text-dark mb-2">Licensed Professional</h4>
              <p className="text-sm text-warm-gray">
                M.Ed, LPCA licensed in North Carolina and Indiana with ongoing professional development.
              </p>
            </div>
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-primary-sage mx-auto mb-4" />
              <h4 className="font-bold text-text-dark mb-2">Person-Centered Care</h4>
              <p className="text-sm text-warm-gray">
                Your goals guide our work. You're not just a diagnosis—you're a whole person with unique strengths.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
