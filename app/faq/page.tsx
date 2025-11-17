import Link from 'next/link'
import { ChevronDown, Phone, Mail, Calendar } from 'lucide-react'

export default function FAQPage() {
  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I schedule my first appointment?',
          a: 'You can schedule your free 15-minute consultation through our online booking system (Calendly), by calling (919) 999-9999, or by emailing tamara@lennoxfields.org. During the consultation, we\'ll discuss your needs and determine if we\'re a good fit before scheduling your first full session.',
        },
        {
          q: 'What should I expect in my first session?',
          a: 'Your first session (intake) is typically 60-90 minutes. We\'ll discuss what brings you to therapy, your goals, relevant history, and create an initial treatment plan together. This is also a great time to ask questions about the therapy process and my approach.',
        },
        {
          q: 'How do I know if we\'re a good fit?',
          a: 'The therapeutic relationship is crucial to successful outcomes. That\'s why I offer a free 15-minute consultation first. If after our initial sessions you feel we\'re not the right match, I\'m happy to provide referrals to other qualified therapists.',
        },
      ],
    },
    {
      category: 'Insurance & Payment',
      questions: [
        {
          q: 'Do you accept insurance?',
          a: 'I\'m currently working on insurance credentialing. In the meantime, I provide superbills for out-of-network reimbursement. Many clients receive 50-80% reimbursement from their insurance companies. I can help you verify your out-of-network benefits.',
        },
        {
          q: 'What are your session rates?',
          a: 'Individual therapy is $150 per session, couples therapy is $200 per session, career counseling is $125 per session, and clinical supervision is $75 per hour. I also offer sliding scale rates for qualified clients experiencing financial hardship.',
        },
        {
          q: 'What payment methods do you accept?',
          a: 'I accept credit cards, debit cards, HSA/FSA cards, and offer monthly package options. Payment is due at the time of service. I also provide superbills for insurance reimbursement.',
        },
        {
          q: 'Do you offer a sliding scale?',
          a: 'Yes, I offer sliding scale rates for clients experiencing financial hardship. Please discuss this during your consultation or reach out to discuss your situation.',
        },
      ],
    },
    {
      category: 'Sessions & Scheduling',
      questions: [
        {
          q: 'How long are sessions?',
          a: 'Standard therapy sessions are 50-60 minutes. Initial intake sessions are 60-90 minutes to allow time for comprehensive assessment and treatment planning.',
        },
        {
          q: 'How often should I attend therapy?',
          a: 'Most clients attend weekly sessions initially. As progress is made, we may adjust to biweekly or monthly sessions. The frequency depends on your goals, needs, and preferences.',
        },
        {
          q: 'What is your cancellation policy?',
          a: 'I ask for 24-hour notice for cancellations or rescheduling to avoid a cancellation fee. You can reschedule through the client portal, by calling, or emailing. Life happens—just let me know as soon as possible.',
        },
        {
          q: 'Do you offer telehealth sessions?',
          a: 'Yes! I offer secure, HIPAA-compliant telehealth sessions for clients in North Carolina and Indiana. Telehealth sessions work great for many clients and offer flexibility and convenience.',
        },
        {
          q: 'Can I see you in person?',
          a: 'Yes, I offer both in-person and telehealth sessions. In-person sessions are available for clients in my service areas. We can discuss location options during your consultation.',
        },
      ],
    },
    {
      category: 'Confidentiality & Privacy',
      questions: [
        {
          q: 'Is therapy confidential?',
          a: 'Yes, everything discussed in therapy is confidential with few exceptions: if you\'re at risk of harming yourself or others, if there\'s suspected child or elder abuse, or if records are subpoenaed by court order. I\'ll always discuss these limits clearly with you.',
        },
        {
          q: 'Are your services HIPAA compliant?',
          a: 'Yes, all services are fully HIPAA compliant. Client information is encrypted, stored securely, and never shared without your written consent (except in the legally required situations mentioned above).',
        },
        {
          q: 'Can I request my therapy records?',
          a: 'Yes, you have the right to access your therapy records. I can provide copies or a summary of your records. There may be a small fee for copying extensive records.',
        },
      ],
    },
    {
      category: 'Services & Specializations',
      questions: [
        {
          q: 'What issues do you specialize in?',
          a: 'I specialize in anxiety, depression, trauma (using EMDR), relationship issues, career transitions, substance use disorders, and life transitions. I work with individuals, couples, families, teens, and adolescents.',
        },
        {
          q: 'What therapy approaches do you use?',
          a: 'I primarily use Cognitive Behavioral Therapy (CBT), Eye Movement Desensitization and Reprocessing (EMDR), and family systems therapy. I tailor my approach to each client\'s unique needs and preferences.',
        },
        {
          q: 'Do you prescribe medication?',
          a: 'No, as a Licensed Professional Counselor Associate (LPCA), I cannot prescribe medication. However, I can coordinate care with your psychiatrist or primary care provider if medication is part of your treatment plan.',
        },
        {
          q: 'Do you offer clinical supervision?',
          a: 'Yes! I provide clinical supervision for associates and interns pursuing licensure in North Carolina and Indiana. Supervision includes case consultation, skill development, and ethical guidance.',
        },
      ],
    },
    {
      category: 'Credentials & Licensing',
      questions: [
        {
          q: 'What are your credentials?',
          a: 'I hold a Master of Education (M.Ed) in Clinical Mental Health Counseling and am a Licensed Professional Counselor Associate (LPCA) in North Carolina and Indiana. I have specialized training in CBT, EMDR, couples therapy, and career counseling.',
        },
        {
          q: 'What does LPCA mean?',
          a: 'LPCA stands for Licensed Professional Counselor Associate. This means I\'m a fully qualified licensed counselor working under clinical supervision as required by state boards. I provide the same quality care as fully licensed counselors (LPC).',
        },
        {
          q: 'In which states are you licensed?',
          a: 'I\'m licensed to practice in North Carolina and Indiana. I can only provide services (including telehealth) to clients physically located in these states.',
        },
      ],
    },
    {
      category: 'Crisis & Emergency Support',
      questions: [
        {
          q: 'What if I\'m in crisis?',
          a: 'If you\'re experiencing a mental health emergency, please call 988 (Suicide & Crisis Lifeline), text "HELLO" to 741741 (Crisis Text Line), or go to your nearest emergency room. For non-emergency urgent matters between sessions, you can leave a voicemail and I\'ll return your call within 24 business hours.',
        },
        {
          q: 'Do you offer emergency sessions?',
          a: 'I do not provide emergency or on-call services. For mental health emergencies, please call 988, text 741741, or visit your nearest emergency room. For urgent but non-emergency matters, I can often accommodate same-week appointments based on availability.',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-text-dark mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-text-dark max-w-3xl mx-auto mb-8">
            Find answers to common questions about therapy, my practice, and how to get started.
          </p>
          <p className="text-text-dark">
            Don't see your question?{' '}
            <Link href="/contact" className="text-primary-sage hover:text-earth-green font-medium underline">
              Contact us
            </Link>
            {' '}and we'll be happy to help.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          {faqs.map((section, sectionIdx) => (
            <div key={section.category} className={sectionIdx > 0 ? 'mt-16' : ''}>
              <h2 className="text-3xl font-bold text-text-dark mb-8 pb-3 border-b-2 border-primary-sage">
                {section.category}
              </h2>
              <div className="space-y-6">
                {section.questions.map((faq, faqIdx) => (
                  <details
                    key={faqIdx}
                    className="group bg-cream rounded-lg p-6 cursor-pointer hover:shadow-medium transition-shadow"
                  >
                    <summary className="flex justify-between items-start font-semibold text-lg text-text-dark list-none">
                      <span className="flex-1 pr-4">{faq.q}</span>
                      <ChevronDown
                        className="w-6 h-6 text-primary-sage flex-shrink-0 transition-transform group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="mt-4 text-warm-gray leading-relaxed">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Resources */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">
            Still Have Questions?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <Calendar className="w-12 h-12 text-primary-sage mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-bold text-text-dark mb-3">Book Consultation</h3>
              <p className="text-warm-gray mb-4 text-sm">
                Schedule a free 15-minute call to discuss your specific questions
              </p>
              <a
                href="https://calendly.com/tamara-lennoxfields"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full text-sm"
              >
                Schedule Now
              </a>
            </div>

            <div className="card text-center">
              <Phone className="w-12 h-12 text-clinical-blue mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-bold text-text-dark mb-3">Call Us</h3>
              <p className="text-warm-gray mb-4 text-sm">
                Speak with us directly Monday-Friday 9am-5pm EST
              </p>
              <a
                href="tel:+19199999999"
                className="btn btn-primary w-full text-sm"
              >
                (919) 999-9999
              </a>
            </div>

            <div className="card text-center">
              <Mail className="w-12 h-12 text-soft-rose mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-bold text-text-dark mb-3">Email Us</h3>
              <p className="text-warm-gray mb-4 text-sm">
                Send your questions and we'll respond within 24 hours
              </p>
              <a
                href="mailto:tamara@lennoxfields.org?subject=FAQ Question"
                className="btn btn-primary w-full text-sm"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-text-dark mb-6">
            Explore More Resources
          </h2>
          <p className="text-lg text-warm-gray mb-8">
            Learn more about our services, approach, and available tools
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about" className="btn btn-outline">
              About Tamara
            </Link>
            <Link href="/services" className="btn btn-outline">
              Our Services
            </Link>
            <Link href="/tools/screening-tools" className="btn btn-outline">
              Free Screening Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
