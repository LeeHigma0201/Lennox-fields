import Link from 'next/link'
import { ChevronDown, Phone, Mail, Calendar } from 'lucide-react'
import { faqs, faqPageHeader } from '@/content/faq'
import { siteConfig } from '@/content/site-config'

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-text-dark mb-6">
            {faqPageHeader.title}
          </h1>
          <p className="text-xl text-text-dark max-w-3xl mx-auto mb-8">
            {faqPageHeader.subtitle}
          </p>
          <p className="text-text-dark">
            Don&apos;t see your question?{' '}
            <Link href="/contact" className="text-primary-sage hover:text-earth-green font-medium underline">
              Reach out
            </Link>
            {' '}and I&apos;ll be happy to help.
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
                href={siteConfig.contact.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full text-sm"
              >
                Schedule Now
              </a>
            </div>

            <div className="card text-center">
              <Phone className="w-12 h-12 text-clinical-blue mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-bold text-text-dark mb-3">Call</h3>
              <p className="text-warm-gray mb-4 text-sm">
                Reach me directly {siteConfig.contact.officeHours}
              </p>
              <a
                href={siteConfig.contact.phoneLink}
                className="btn btn-primary w-full text-sm"
              >
                {siteConfig.contact.phone}
              </a>
            </div>

            <div className="card text-center">
              <Mail className="w-12 h-12 text-soft-rose mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-bold text-text-dark mb-3">Email</h3>
              <p className="text-warm-gray mb-4 text-sm">
                Send your questions and I&apos;ll respond within two business days
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}?subject=FAQ Question`}
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
              About {siteConfig.owner.name}
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
