import Link from 'next/link'
import { siteConfig } from '@/content/site-config'

export default function HipaaPage() {
  return (
    <div className="min-h-screen">
      <section className="gradient-warm-bg py-20">
        <div className="container-custom">
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">HIPAA Notice of Privacy Practices</h1>
          <p className="text-xl text-text-dark">
            Effective Date: March 2026
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="space-y-8 text-text-dark">
            <div className="card-clinical p-8">
              <p className="text-text-dark font-semibold">
                THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED
                AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Our Commitment to Your Privacy</h2>
              <p className="text-warm-gray">
                {siteConfig.businessFullName} is committed to protecting the privacy of your health
                information. This Notice of Privacy Practices (&ldquo;Notice&rdquo;) describes how we may use
                and disclose your Protected Health Information (PHI) and your rights regarding that information,
                as required by the Health Insurance Portability and Accountability Act of 1996 (HIPAA).
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">What is Protected Health Information?</h2>
              <p className="text-warm-gray">
                Protected Health Information (PHI) includes any individually identifiable health information
                that we create, receive, maintain, or transmit in the course of providing you with mental
                health services. This includes your clinical records, treatment plans, session notes,
                billing information, and any other information related to your care.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">How We May Use and Disclose Your PHI</h2>

              <h3 className="text-xl font-semibold text-text-dark mb-2 mt-6">For Treatment</h3>
              <p className="text-warm-gray mb-4">
                We may use your PHI to provide, coordinate, and manage your treatment. For example,
                we may share information with another healthcare provider involved in your care with
                your written authorization.
              </p>

              <h3 className="text-xl font-semibold text-text-dark mb-2">For Payment</h3>
              <p className="text-warm-gray mb-4">
                We may use and disclose your PHI to obtain payment for services. For example, we may
                provide information to your insurance company for reimbursement purposes, but only with
                your written authorization.
              </p>

              <h3 className="text-xl font-semibold text-text-dark mb-2">For Healthcare Operations</h3>
              <p className="text-warm-gray mb-4">
                We may use your PHI for activities necessary to run our practice, including quality
                assessment, training, and compliance activities.
              </p>

              <h3 className="text-xl font-semibold text-text-dark mb-2">As Required by Law</h3>
              <p className="text-warm-gray">
                We may disclose PHI when required by federal, state, or local law. Kentucky law requires
                or permits disclosure in certain circumstances, including:
              </p>
              <ul className="list-disc pl-6 text-warm-gray space-y-2 mt-3">
                <li>When there is a serious threat to your health or safety or that of others</li>
                <li>Reports of suspected child abuse or neglect</li>
                <li>Reports of suspected elder abuse</li>
                <li>Court orders or subpoenas</li>
                <li>Public health reporting requirements</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Your Rights Regarding Your PHI</h2>
              <ul className="space-y-4">
                <li>
                  <h3 className="font-semibold text-text-dark">Right to Access</h3>
                  <p className="text-warm-gray">You have the right to inspect and obtain a copy of your PHI maintained in your clinical record.</p>
                </li>
                <li>
                  <h3 className="font-semibold text-text-dark">Right to Amend</h3>
                  <p className="text-warm-gray">You may request amendments to your PHI if you believe it is incorrect or incomplete.</p>
                </li>
                <li>
                  <h3 className="font-semibold text-text-dark">Right to Restrict</h3>
                  <p className="text-warm-gray">You may request restrictions on certain uses and disclosures of your PHI.</p>
                </li>
                <li>
                  <h3 className="font-semibold text-text-dark">Right to Accounting</h3>
                  <p className="text-warm-gray">You have the right to receive an accounting of disclosures of your PHI made by us.</p>
                </li>
                <li>
                  <h3 className="font-semibold text-text-dark">Right to a Copy of This Notice</h3>
                  <p className="text-warm-gray">You have the right to obtain a paper copy of this Notice upon request.</p>
                </li>
                <li>
                  <h3 className="font-semibold text-text-dark">Right to File a Complaint</h3>
                  <p className="text-warm-gray">
                    If you believe your privacy rights have been violated, you may file a complaint with
                    us or with the U.S. Department of Health and Human Services Office for Civil Rights.
                    You will not be retaliated against for filing a complaint.
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Psychotherapy Notes</h2>
              <p className="text-warm-gray">
                Psychotherapy notes receive special protection under HIPAA. We will not use or disclose
                psychotherapy notes without your written authorization except in limited circumstances
                as permitted by law (such as to defend against a legal action or if required to prevent
                a serious threat).
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Website-Specific Information</h2>
              <p className="text-warm-gray">
                The self-assessment screening tools on our website (PHQ-9, GAD-7, PCL-5, etc.) process
                all data locally in your web browser. No PHI is transmitted to or stored on our servers
                through these tools. Your screening results are not part of any clinical record unless
                you bring them to a session and we include them in your treatment file.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Changes to This Notice</h2>
              <p className="text-warm-gray">
                We reserve the right to change this Notice and make the new provisions effective for all
                PHI we maintain. A current copy of this Notice will always be available on our website
                and upon request.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-4">Contact Information</h2>
              <p className="text-warm-gray">
                For questions about this Notice or to exercise your rights, contact:<br /><br />
                <strong>{siteConfig.owner.fullTitle}</strong><br />
                {siteConfig.businessFullName}<br />
                Phone: <a href={siteConfig.contact.phoneLink} className="text-primary-sage">{siteConfig.contact.phone}</a><br />
                Or use our <Link href="/contact" className="text-primary-sage">contact form</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
