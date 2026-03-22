import Link from 'next/link'
import { siteConfig } from '@/content/site-config'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <section className="gradient-warm-bg py-20">
        <div className="container-custom">
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">Privacy Policy</h1>
          <p className="text-xl text-text-dark">
            Last updated: March 2026
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl prose prose-lg">
          <div className="space-y-8 text-text-dark">
            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Overview</h2>
              <p className="text-warm-gray">
                {siteConfig.businessFullName} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting
                the privacy and confidentiality of all individuals who visit our website or use our services.
                This Privacy Policy describes how we collect, use, and safeguard your information.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Information We Collect</h2>
              <h3 className="text-xl font-semibold text-text-dark mb-2">Website Visitors</h3>
              <p className="text-warm-gray mb-4">
                When you browse our website, we do not use cookies, analytics tracking, or any third-party
                data collection services. Your browsing activity is not tracked or stored.
              </p>

              <h3 className="text-xl font-semibold text-text-dark mb-2">Contact Form Submissions</h3>
              <p className="text-warm-gray mb-4">
                When you submit our contact form, we collect the information you provide: your name,
                email address, phone number (optional), service of interest, and message. This information
                is used solely to respond to your inquiry and schedule a consultation.
              </p>

              <h3 className="text-xl font-semibold text-text-dark mb-2">Self-Assessment Tools</h3>
              <p className="text-warm-gray">
                Our screening tools (PHQ-9, GAD-7, PCL-5, etc.) run entirely in your web browser.
                Your responses are not transmitted to any server, stored in any database, or accessible
                to us or any third party. If you choose to save results locally, they are stored only
                in your browser&apos;s local storage on your device.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-warm-gray space-y-2">
                <li>To respond to your contact form submissions and inquiries</li>
                <li>To schedule and manage appointments</li>
                <li>To provide requested mental health services</li>
                <li>To comply with legal and professional obligations</li>
              </ul>
              <p className="text-warm-gray mt-4">
                We do not sell, rent, or share your personal information with third parties for marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Data Security</h2>
              <p className="text-warm-gray">
                We implement appropriate technical and organizational measures to protect your personal
                information. Our website uses SSL/TLS encryption for all data transmission. For clinical
                information, we follow HIPAA security standards as described in our{' '}
                <Link href="/hipaa" className="text-primary-sage hover:text-earth-green">HIPAA Notice</Link>.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Your Rights</h2>
              <p className="text-warm-gray">
                You have the right to request access to, correction of, or deletion of your personal
                information. To exercise these rights, please contact us at{' '}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-primary-sage hover:text-earth-green">
                  {siteConfig.contact.email}
                </a>.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Third-Party Links</h2>
              <p className="text-warm-gray">
                Our website may contain links to third-party websites (such as Amazon for book purchases
                or Calendly for scheduling). We are not responsible for the privacy practices of these
                external sites. We encourage you to review their privacy policies before providing any
                personal information.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Changes to This Policy</h2>
              <p className="text-warm-gray">
                We may update this Privacy Policy from time to time. Any changes will be posted on this
                page with an updated revision date.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Contact Us</h2>
              <p className="text-warm-gray">
                If you have questions about this Privacy Policy, please contact us at:<br />
                <strong>{siteConfig.businessFullName}</strong><br />
                Email: <a href={`mailto:${siteConfig.contact.email}`} className="text-primary-sage">{siteConfig.contact.email}</a><br />
                Phone: <a href={siteConfig.contact.phoneLink} className="text-primary-sage">{siteConfig.contact.phone}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
