import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Phone, Mail, MessageCircle, Clock, MapPin, AlertCircle, Shield, DollarSign, Video } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact & Schedule - Book Therapy Appointment | Lennox Fields NC & Indiana',
  description: 'Schedule your free consultation with a licensed therapist in North Carolina and Indiana. Online and in-person appointments available. Book therapy today.',
  keywords: [
    'schedule therapy',
    'book therapist',
    'therapy appointment',
    'free consultation',
    'contact therapist',
    'therapy scheduling',
    'book counseling appointment',
    'schedule mental health appointment',
    'therapist North Carolina contact',
    'therapist Indiana contact',
    'online therapy booking',
    'telehealth scheduling'
  ],
  openGraph: {
    title: 'Contact & Schedule - Book Therapy Appointment',
    description: 'Schedule your free consultation with a licensed therapist in NC and Indiana. Online and in-person appointments available.',
    type: 'website',
    images: [
      {
        url: '/images/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact and Schedule Appointment'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact & Schedule - Book Therapy Appointment',
    description: 'Schedule your free consultation with a licensed therapist. Online and in-person appointments available in NC and IN.'
  }
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom text-center">
          <Calendar className="w-20 h-20 text-primary-sage mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            Get Started Today
          </h1>
          <p className="text-xl text-text-dark max-w-3xl mx-auto">
            Ready to take the first step? Fill out the form below or book a complimentary
            15-minute consultation to discuss your needs and see if we're a good fit.
          </p>
        </div>
      </section>

      {/* Crisis Resources Notice */}
      <section className="bg-alert-red/10 border-y-2 border-alert-red/30 py-6">
        <div className="container-custom">
          <div className="flex items-start max-w-4xl mx-auto">
            <AlertCircle className="w-8 h-8 text-alert-red flex-shrink-0 mr-4 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-text-dark mb-2">
                In Crisis? Get Immediate Help
              </h2>
              <p className="text-warm-gray mb-3">
                If you're experiencing a mental health emergency, please don't wait for a response
                to this form. Help is available 24/7:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <a
                  href="tel:988"
                  className="bg-alert-red text-white px-4 py-3 rounded-lg font-semibold hover:bg-alert-red/90 transition-colors flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call 988 - Suicide & Crisis Lifeline
                </a>
                <a
                  href="sms:988"
                  className="bg-alert-red text-white px-4 py-3 rounded-lg font-semibold hover:bg-alert-red/90 transition-colors flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Text 988
                </a>
              </div>
              <p className="text-sm text-warm-gray mt-3">
                Other resources: Call 911 for immediate emergencies • National Domestic Violence Hotline: 1-800-799-7233 •
                SAMHSA National Helpline: 1-800-662-4357
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Form + Sidebar */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold text-text-dark mb-6">
                Contact Form
              </h2>
              <p className="text-warm-gray mb-8 text-lg">
                Fill out the form below and I'll respond within 24 hours. Prefer a different method?
                See the options on the right.
              </p>

              <ContactForm />
            </div>

            {/* Sidebar: Contact Info & Options */}
            <div className="space-y-6">
              {/* Office Hours */}
              <div className="card">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-primary-sage mr-3" />
                  <h3 className="text-xl font-bold text-text-dark">Office Hours</h3>
                </div>
                <div className="space-y-2 text-text-dark">
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Monday - Thursday:</span>
                    <span className="font-medium">9am - 7pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Friday:</span>
                    <span className="font-medium">9am - 4pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Saturday:</span>
                    <span className="font-medium">By Appointment</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
                <p className="text-sm text-warm-gray mt-4">
                  All times are EST. Evening and weekend appointments available for established clients.
                </p>
              </div>

              {/* Quick Contact Methods */}
              <div className="card bg-primary-sage/5">
                <h3 className="text-xl font-bold text-text-dark mb-4">Other Ways to Reach Me</h3>

                <div className="space-y-3">
                  <a
                    href="https://calendly.com/tamara-lennoxfields"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                  >
                    <Calendar className="w-5 h-5 text-primary-sage mr-3 group-hover:scale-110 transition-transform" />
                    <div className="flex-1">
                      <div className="font-medium text-text-dark">Book Online</div>
                      <div className="text-xs text-warm-gray">Instant scheduling</div>
                    </div>
                  </a>

                  <a
                    href="tel:+19199999999"
                    className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                  >
                    <Phone className="w-5 h-5 text-clinical-blue mr-3 group-hover:scale-110 transition-transform" />
                    <div className="flex-1">
                      <div className="font-medium text-text-dark">(919) 999-9999</div>
                      <div className="text-xs text-warm-gray">Mon-Fri 9am-5pm</div>
                    </div>
                  </a>

                  <a
                    href="mailto:tamara@lennoxfields.org"
                    className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                  >
                    <Mail className="w-5 h-5 text-soft-rose mr-3 group-hover:scale-110 transition-transform" />
                    <div className="flex-1">
                      <div className="font-medium text-text-dark">Email Direct</div>
                      <div className="text-xs text-warm-gray">tamara@lennoxfields.org</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="card">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-primary-sage mr-3" />
                  <h3 className="text-xl font-bold text-text-dark">Serving</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium text-text-dark flex items-center">
                      <Video className="w-4 h-4 mr-2 text-clinical-blue" />
                      Telehealth (Secure Video)
                    </div>
                    <p className="text-sm text-warm-gray ml-6">
                      Available to clients in North Carolina and Indiana
                    </p>
                  </div>
                  <div>
                    <div className="font-medium text-text-dark">In-Person Sessions</div>
                    <p className="text-sm text-warm-gray">
                      Raleigh/Durham area by appointment
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-cream rounded-lg">
                  <p className="text-xs text-warm-gray">
                    Specific office address provided upon scheduling to protect client privacy.
                  </p>
                </div>
              </div>

              {/* Insurance & Payment */}
              <div className="card bg-accent-gold/5">
                <div className="flex items-center mb-4">
                  <DollarSign className="w-6 h-6 text-accent-gold mr-3" />
                  <h3 className="text-xl font-bold text-text-dark">Insurance & Payment</h3>
                </div>
                <ul className="space-y-2 text-sm text-text-dark">
                  <li className="flex items-start">
                    <span className="text-success-green mr-2">✓</span>
                    <span>Superbills for insurance reimbursement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success-green mr-2">✓</span>
                    <span>HSA/FSA accepted</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success-green mr-2">✓</span>
                    <span>Sliding scale available</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success-green mr-2">✓</span>
                    <span>Payment plans for packages</span>
                  </li>
                </ul>
                <Link
                  href="/services#pricing"
                  className="text-sm text-primary-sage hover:text-earth-green font-medium mt-3 inline-block"
                >
                  View detailed pricing →
                </Link>
              </div>

              {/* Free Consultation CTA */}
              <div className="card gradient-sage-bg text-white text-center">
                <h3 className="text-xl font-bold mb-3">Free 15-Minute Consultation</h3>
                <p className="text-sm opacity-90 mb-4">
                  Not sure if therapy is right for you? Let's talk! No commitment required.
                </p>
                <a
                  href="https://calendly.com/tamara-lennoxfields"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-white text-primary-sage hover:bg-cream w-full"
                >
                  Schedule Free Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            What to Expect in Your Free Consultation
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-text-dark mb-2">15-Minute Call</h4>
                <p className="text-warm-gray text-sm">
                  A brief, no-pressure conversation to discuss your needs and goals.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-text-dark mb-2">Share Your Story</h4>
                <p className="text-warm-gray text-sm">
                  Tell me what brings you to therapy and what you hope to achieve.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-text-dark mb-2">Discuss Options</h4>
                <p className="text-warm-gray text-sm">
                  Learn about my approach, services, and scheduling options.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-text-dark mb-2">Privacy Guaranteed</h4>
                <p className="text-warm-gray text-sm">
                  All communications are confidential and HIPAA-compliant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            Common Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-cream rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-dark mb-3">
                How quickly will you respond to my inquiry?
              </h3>
              <p className="text-warm-gray">
                I typically respond to all contact form submissions within 24 hours during business days.
                If you need immediate assistance, please call or use the online booking system for instant
                scheduling.
              </p>
            </div>

            <div className="bg-cream rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-dark mb-3">
                Do you accept insurance?
              </h3>
              <p className="text-warm-gray">
                I'm currently working on insurance credentialing. In the meantime, I provide superbills
                for out-of-network reimbursement. Many clients receive 50-80% reimbursement from their
                insurance companies.
              </p>
            </div>

            <div className="bg-cream rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-dark mb-3">
                Is this contact form secure and confidential?
              </h3>
              <p className="text-warm-gray">
                Yes! All form submissions are encrypted and handled according to HIPAA privacy standards.
                However, please don't include specific health information (PHI) in your initial message.
                We'll discuss details during your secure consultation.
              </p>
            </div>

            <div className="bg-cream rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-dark mb-3">
                Do you offer telehealth sessions?
              </h3>
              <p className="text-warm-gray">
                Yes! I offer both in-person and secure telehealth sessions for clients in North Carolina
                and Indiana. Telehealth sessions are HIPAA-compliant and work great for many clients.
              </p>
            </div>

            <div className="bg-cream rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-dark mb-3">
                What if I'm not sure which service I need?
              </h3>
              <p className="text-warm-gray">
                That's completely normal! Select "Not Sure / Need Guidance" in the form, and we'll discuss
                your needs during the free consultation. I'll help you determine the best approach for your
                situation.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/faq" className="text-primary-sage hover:text-earth-green font-medium text-lg">
              View All FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Taking the first step is often the hardest. I'm here to make it as easy as possible.
            Schedule your free 15-minute consultation today—no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/tamara-lennoxfields"
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-white text-primary-sage hover:bg-cream inline-flex items-center justify-center"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Book Free Consultation
            </a>
            <a
              href="tel:+19199999999"
              className="btn border-2 border-white hover:bg-white hover:text-primary-sage inline-flex items-center justify-center"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call (919) 999-9999
            </a>
          </div>
          <p className="mt-6 text-sm opacity-75">
            Serving North Carolina and Indiana • Telehealth and in-person options available
          </p>
        </div>
      </section>
    </div>
  )
}
