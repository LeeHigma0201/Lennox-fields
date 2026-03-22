'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, MessageCircle, MapPin, Send, AlertTriangle } from 'lucide-react'
import { siteConfig } from '@/content/site-config'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to send message')
      }

      setSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please email us directly at ' + siteConfig.contact.email
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Crisis Disclaimer Banner */}
      <div className="bg-soft-rose/15 border-b border-soft-rose/30">
        <div className="container-custom py-3">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-soft-rose flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-text-dark">
              <strong>Important:</strong> Please allow two business days for a response. If you are in crisis, please contact <strong>911</strong> or go to the nearest emergency room. You can also call the Suicide & Crisis Lifeline at <strong>988</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom text-center">
          <Calendar className="w-20 h-20 text-primary-sage mx-auto mb-6" aria-hidden="true" />
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-text-dark max-w-3xl mx-auto">
            Ready to take the first step? Fill out the form below to schedule a complimentary
            15-minute consultation.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-primary-sage/10 border-2 border-primary-sage/30 rounded-xl p-8 text-center">
                  <div className="bg-primary-sage text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-text-dark mb-3">Message Received!</h2>
                  <p className="text-warm-gray mb-2">
                    Thank you for reaching out. I&apos;ll review your message and get back to you within two business days.
                  </p>
                  <p className="text-sm text-warm-gray">
                    If you need immediate support, please call <strong>988</strong> (Suicide & Crisis Lifeline) or visit your nearest emergency room.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-3xl font-bold text-text-dark mb-2">Send a Message</h2>
                  <p className="text-warm-gray mb-6">
                    All fields marked with * are required. Your information is kept confidential.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="label">Full Name *</label>
                      <input
                        id="name"
                        type="text"
                        required
                        className="input"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="label">Email *</label>
                      <input
                        id="email"
                        type="email"
                        required
                        className="input"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="label">Phone Number</label>
                      <input
                        id="phone"
                        type="tel"
                        className="input"
                        placeholder="(555) 555-5555"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="label">Service of Interest</label>
                      <select
                        id="service"
                        className="input"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      >
                        <option value="">Select a service...</option>
                        <option value="individual">Individual Counseling</option>
                        <option value="couples">Couples Counseling</option>
                        <option value="family">Family Counseling</option>
                        <option value="career">Career Counseling</option>
                        <option value="substance-use">Substance Use Counseling</option>
                        <option value="other">Other / Not Sure</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="label">What brings you to counseling? *</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      className="input"
                      placeholder="Tell me a bit about what you're looking for — there's no wrong answer here."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {error && (
                    <div className="bg-alert-red/10 border border-alert-red/30 rounded-lg p-4 text-alert-red text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary w-full md:w-auto inline-flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send className="mr-2 w-5 h-5" />
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>

                  <p className="text-xs text-warm-gray mt-2">
                    By submitting this form, you consent to being contacted about counseling services.
                    Your information will never be shared and is protected under HIPAA guidelines.
                  </p>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* What to Expect */}
              <div className="bg-cream rounded-xl p-6">
                <h3 className="text-xl font-bold text-text-dark mb-4">What to Expect</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary-sage text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-dark text-sm">Response Time</h4>
                      <p className="text-warm-gray text-sm">
                        I&apos;ll respond within two business days.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-primary-sage text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-dark text-sm">Free Consultation</h4>
                      <p className="text-warm-gray text-sm">
                        A brief 15-minute call to discuss your needs and see if we&apos;re a good fit.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-primary-sage text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-dark text-sm">Location</h4>
                      <p className="text-warm-gray text-sm">
                        {siteConfig.contact.location}. Telehealth available.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Quick Ref */}
              <div className="bg-cream rounded-xl p-6">
                <h3 className="text-xl font-bold text-text-dark mb-4">Services Offered</h3>
                <ul className="space-y-2 text-sm text-text-dark">
                  <li className="flex items-center">
                    <span className="text-primary-sage mr-2">&#10003;</span>
                    Individual Counseling
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary-sage mr-2">&#10003;</span>
                    Couples Counseling
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary-sage mr-2">&#10003;</span>
                    Family Counseling
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary-sage mr-2">&#10003;</span>
                    Career Counseling
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary-sage mr-2">&#10003;</span>
                    Substance Use Counseling
                  </li>
                </ul>
                <Link href="/services" className="text-primary-sage hover:text-earth-green font-medium text-sm mt-3 inline-block">
                  View Details &rarr;
                </Link>
              </div>

              {/* Crisis Info */}
              <div className="bg-soft-rose/10 border border-soft-rose/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-text-dark mb-2">In Crisis?</h3>
                <p className="text-sm text-text-dark mb-2">
                  If you or someone you know is experiencing a mental health emergency:
                </p>
                <ul className="text-sm text-text-dark space-y-1">
                  <li><strong>Call 911</strong> or go to the nearest emergency room</li>
                  <li><strong>Call 988</strong> — Suicide & Crisis Lifeline</li>
                  <li><strong>Text &ldquo;HELLO&rdquo; to 741741</strong> — Crisis Text Line</li>
                </ul>
              </div>
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
                I&apos;m currently working on insurance credentialing. In the meantime, I provide superbills
                for out-of-network reimbursement. Many clients receive 50-80% reimbursement from their
                insurance companies.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-dark mb-3">
                Do you offer telehealth sessions?
              </h3>
              <p className="text-warm-gray">
                Yes! I offer secure, HIPAA-compliant telehealth sessions for clients in Kentucky.
                Telehealth sessions work great for many clients and offer flexibility and convenience.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-dark mb-3">
                How long does it take to hear back?
              </h3>
              <p className="text-warm-gray">
                Please allow two business days for a response. If you need immediate support,
                please call 911 or the Suicide & Crisis Lifeline at 988.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-dark mb-3">
                What if I need to cancel or reschedule?
              </h3>
              <p className="text-warm-gray">
                Life happens! I ask for 24-hour notice for cancellations or rescheduling to avoid a
                cancellation fee.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/faq" className="text-primary-sage hover:text-earth-green font-medium text-lg">
              View All FAQs &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-primary-sage to-earth-green text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Taking the first step is often the hardest. I&apos;m here to make it as easy as possible.
          </p>
          <p className="text-sm opacity-75">
            Serving Kentucky &bull; Telehealth available
          </p>
        </div>
      </section>
    </div>
  )
}
