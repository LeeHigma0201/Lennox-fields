import Link from 'next/link'
import { siteConfig } from '@/content/site-config'

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <section className="gradient-warm-bg py-20">
        <div className="container-custom">
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">Terms of Service</h1>
          <p className="text-xl text-text-dark">
            Last updated: March 2026
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="space-y-8 text-text-dark">
            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Agreement to Terms</h2>
              <p className="text-warm-gray">
                By accessing or using the {siteConfig.businessFullName} website (&ldquo;Site&rdquo;), you agree to
                be bound by these Terms of Service. If you do not agree to these terms, please do not
                use the Site.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Services Description</h2>
              <p className="text-warm-gray mb-4">
                This website provides information about mental health counseling services offered by
                {' '}{siteConfig.owner.fullTitle}. The Site also offers free educational resources including
                self-assessment screening tools, therapeutic worksheets, and journaling prompts.
              </p>
              <p className="text-warm-gray">
                <strong>The content on this website does not constitute medical advice, diagnosis, or treatment.</strong>{' '}
                The information and tools provided are for educational and informational purposes only
                and should not be used as a substitute for professional mental health care.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Screening Tools Disclaimer</h2>
              <p className="text-warm-gray mb-4">
                The self-assessment tools available on this Site (including but not limited to PHQ-9,
                GAD-7, and PCL-5) are validated screening instruments used for educational purposes.
                They are <strong>not diagnostic tools</strong>. Results from these screenings should be
                discussed with a qualified mental health professional for proper evaluation and diagnosis.
              </p>
              <p className="text-warm-gray">
                These tools process all data locally in your web browser. No responses are transmitted
                to or stored on our servers.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Crisis Situations</h2>
              <p className="text-warm-gray">
                This website is not equipped to handle mental health emergencies. If you are in crisis
                or experiencing a psychiatric emergency, please:
              </p>
              <ul className="list-disc pl-6 text-warm-gray space-y-2 mt-3">
                <li>Call <strong>911</strong> or go to the nearest emergency room</li>
                <li>Call the Suicide &amp; Crisis Lifeline at <strong>988</strong></li>
                <li>Text HOME to <strong>741741</strong> for the Crisis Text Line</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Professional Relationship</h2>
              <p className="text-warm-gray">
                Use of this website does not establish a therapist-client relationship. A therapeutic
                relationship is established only through a formal agreement, intake process, and
                informed consent documentation.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Intellectual Property</h2>
              <p className="text-warm-gray">
                All content on this Site — including text, graphics, logos, images, worksheets, and
                assessment tools — is the property of {siteConfig.legalName} and is protected by
                copyright law. You may use the worksheets and tools for personal or clinical use but
                may not redistribute, sell, or claim them as your own.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Limitation of Liability</h2>
              <p className="text-warm-gray">
                {siteConfig.businessFullName} is not liable for any damages arising from the use of
                this website or reliance on information provided herein. Use of screening tools and
                resources is at your own risk.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Governing Law</h2>
              <p className="text-warm-gray">
                These Terms of Service are governed by the laws of the Commonwealth of Kentucky.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Contact</h2>
              <p className="text-warm-gray">
                For questions about these Terms, contact us at{' '}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-primary-sage hover:text-earth-green">
                  {siteConfig.contact.email}
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
