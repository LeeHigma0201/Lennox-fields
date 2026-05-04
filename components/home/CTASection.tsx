import Link from 'next/link'
import { Calendar, Mail, Phone } from 'lucide-react'
import { ctaSection } from '@/content/home-page'
import { siteConfig } from '@/content/site-config'

export default function CTASection() {
  return (
    <section className="section-padding gradient-sage-bg text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {ctaSection.title}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {ctaSection.description}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Calendar className="w-10 h-10 mx-auto mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">Schedule online</h3>
              <p className="text-sm opacity-90">Book a free 15-minute consultation through the contact form</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Phone className="w-10 h-10 mx-auto mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">Call</h3>
              <p className="text-sm opacity-90">{siteConfig.contact.phone}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Mail className="w-10 h-10 mx-auto mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-sm opacity-90">{siteConfig.contact.email}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ctaSection.primaryButton.href} className="btn bg-white text-primary-sage hover:bg-cream text-lg px-8 py-4">
              {ctaSection.primaryButton.text}
            </Link>
            <Link href={ctaSection.secondaryButton.href} className="btn border-2 border-white text-white hover:bg-white hover:text-primary-sage text-lg px-8 py-4">
              {ctaSection.secondaryButton.text}
            </Link>
          </div>

          <p className="mt-8 text-sm opacity-75">
            {ctaSection.footnote}
          </p>
        </div>
      </div>
    </section>
  )
}
