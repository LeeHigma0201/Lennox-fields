import Link from 'next/link'
import { Calendar, Phone, Mail, MessageCircle, Clock, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom text-center">
          <Calendar className="w-20 h-20 text-primary-sage mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            Schedule Your Free Consultation
          </h1>
          <p className="text-xl text-text-dark max-w-3xl mx-auto">
            Ready to take the first step? Book a complimentary 15-minute consultation
            to discuss your needs and see if we're a good fit.
          </p>
        </div>
      </section>

      {/* Scheduling Options */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            How to Get Started
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Option 1: Schedule Online */}
            <div className="card text-center group hover:scale-105 transition-all">
              <div className="bg-primary-sage/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-sage transition-colors">
                <Calendar className="w-10 h-10 text-primary-sage group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark mb-4">Book Online</h3>
              <p className="text-warm-gray mb-6">
                Use our secure online scheduling system to find a time that works for you.
              </p>
              <a
                href="https://calendly.com/tamara-lennoxfields"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full"
              >
                Schedule Now
              </a>
              <p className="text-xs text-warm-gray mt-3">
                Available 24/7 • Instant confirmation
              </p>
            </div>

            {/* Option 2: Call */}
            <div className="card text-center group hover:scale-105 transition-all">
              <div className="bg-clinical-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-clinical-blue transition-colors">
                <Phone className="w-10 h-10 text-clinical-blue group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark mb-4">Call Us</h3>
              <p className="text-warm-gray mb-6">
                Speak with us directly to schedule your consultation or ask questions.
              </p>
              <a
                href="tel:+19199999999"
                className="btn btn-primary w-full"
              >
                (919) 999-9999
              </a>
              <p className="text-xs text-warm-gray mt-3">
                Mon-Fri 9am-5pm EST
              </p>
            </div>

            {/* Option 3: Email */}
            <div className="card text-center group hover:scale-105 transition-all">
              <div className="bg-soft-rose/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-soft-rose transition-colors">
                <Mail className="w-10 h-10 text-soft-rose group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark mb-4">Email Us</h3>
              <p className="text-warm-gray mb-6">
                Send us your availability and we'll coordinate a consultation time.
              </p>
              <a
                href="mailto:tamara@lennoxfields.org?subject=Free Consultation Request"
                className="btn btn-primary w-full"
              >
                Send Email
              </a>
              <p className="text-xs text-warm-gray mt-3">
                Response within 24 hours
              </p>
            </div>
          </div>

          {/* What to Expect */}
          <div className="bg-cream rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-text-dark mb-6 text-center">
              What to Expect in Your Free Consultation
            </h3>
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
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-text-dark mb-2">Next Steps</h4>
                  <p className="text-warm-gray text-sm">
                    If we're a good fit, we'll schedule your first full session.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Services & Pricing Quick Reference */}
          <div className="bg-white border-2 border-primary-sage/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-text-dark mb-6 text-center">
              Services & Investment
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-text-dark mb-3">Therapy Services</h4>
                <ul className="space-y-2 text-text-dark">
                  <li className="flex justify-between">
                    <span>Individual Therapy</span>
                    <span className="font-semibold">$150/session</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Couples Therapy</span>
                    <span className="font-semibold">$200/session</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Career Counseling</span>
                    <span className="font-semibold">$125/session</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Clinical Supervision</span>
                    <span className="font-semibold">$75/hour</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-text-dark mb-3">Payment Options</h4>
                <ul className="space-y-2 text-text-dark">
                  <li>✓ Credit/Debit cards accepted</li>
                  <li>✓ HSA/FSA eligible</li>
                  <li>✓ Monthly packages available</li>
                  <li>✓ Superbills for insurance reimbursement</li>
                  <li>✓ Sliding scale for qualified clients</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link href="/services" className="text-primary-sage hover:text-earth-green font-medium">
                View All Services & Details →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            Common Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-dark mb-3">
                Do you accept insurance?
              </h3>
              <p className="text-warm-gray">
                I'm currently working on insurance credentialing. In the meantime, I provide superbills
                for out-of-network reimbursement. Many clients receive 50-80% reimbursement from their
                insurance companies.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-dark mb-3">
                Do you offer telehealth sessions?
              </h3>
              <p className="text-warm-gray">
                Yes! I offer both in-person and secure telehealth sessions for clients in North Carolina
                and Indiana. Telehealth sessions are HIPAA-compliant and work great for many clients.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-dark mb-3">
                What if I need to cancel or reschedule?
              </h3>
              <p className="text-warm-gray">
                Life happens! I ask for 24-hour notice for cancellations or rescheduling to avoid a
                cancellation fee. You can reschedule through the client portal or by calling/emailing.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-dark mb-3">
                How long are sessions?
              </h3>
              <p className="text-warm-gray">
                Standard therapy sessions are 50-60 minutes. Initial intake sessions are typically
                60-90 minutes to allow time for comprehensive assessment and treatment planning.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-dark mb-3">
                How do I know if we're a good fit?
              </h3>
              <p className="text-warm-gray">
                That's what the free consultation is for! We'll discuss your needs, my approach, and
                whether I can effectively support your goals. The therapeutic relationship is crucial
                to successful outcomes, so fit matters.
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
