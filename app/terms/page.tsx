import Link from 'next/link'
import { AlertCircle, FileText, Gavel, Heart, DollarSign, ExternalLink, Mail } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-warm-bg py-16">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-6">
            <Gavel className="w-10 h-10 text-earth-green" />
            <h1 className="text-5xl font-bold text-text-dark">Terms of Service</h1>
          </div>
          <p className="text-xl text-text-dark opacity-90 max-w-2xl">
            These Terms of Service govern your use of Lennox Fields' website, resources, and clinical services. Please read them carefully before using our services.
          </p>
          <p className="text-sm text-warm-gray mt-4">
            <strong>Last Updated:</strong> November 16, 2024
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-8">Quick Navigation</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { id: 'acceptance', title: 'Acceptance of Terms' },
              { id: 'use-license', title: 'License to Use' },
              { id: 'therapeutic-relationship', title: 'Therapeutic Relationship' },
              { id: 'payment', title: 'Payment & Billing' },
              { id: 'cancellation', title: 'Cancellation Policy' },
              { id: 'liability', title: 'Limitation of Liability' },
              { id: 'medical-disclaimer', title: 'Medical Disclaimer' },
              { id: 'intellectual-property', title: 'Intellectual Property' },
              { id: 'third-party-links', title: 'Third-Party Links' },
              { id: 'modifications', title: 'Modifications to Terms' },
              { id: 'governing-law', title: 'Governing Law' },
              { id: 'contact', title: 'Contact Us' },
            ].map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className="p-4 bg-white rounded-lg hover:shadow-soft transition-shadow"
              >
                <p className="text-primary-sage font-medium hover:text-earth-green">{item.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl space-y-12">
          {/* Acceptance of Terms */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary-sage" />
              <h2 id="acceptance" className="text-3xl font-bold text-text-dark">
                1. Acceptance of Terms
              </h2>
            </div>
            <p className="text-lg text-warm-gray leading-relaxed mb-6">
              By accessing and using the Lennox Fields website, resources, and clinical services, you
              agree to be bound by these Terms of Service. If you do not agree with any part of these
              terms, please do not use our services.
            </p>
            <p className="text-lg text-warm-gray leading-relaxed">
              Lennox Fields reserves the right to update or modify these terms at any time. Your
              continued use of our services after changes are posted constitutes your acceptance of the
              modified terms. We encourage you to review these terms regularly.
            </p>
          </div>

          {/* License to Use */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-primary-sage" />
              <h2 id="use-license" className="text-3xl font-bold text-text-dark">
                2. License to Use Website and Resources
              </h2>
            </div>
            <p className="text-lg text-warm-gray leading-relaxed mb-6">
              We grant you a limited, non-exclusive, non-transferable license to access and use the
              Lennox Fields website and resources for personal, non-commercial purposes only.
            </p>

            <div className="space-y-6">
              <div className="bg-cream p-6 rounded-lg">
                <h3 className="text-xl font-bold text-text-dark mb-3">You May NOT:</h3>
                <ul className="list-disc list-inside text-warm-gray space-y-2">
                  <li>Reproduce, duplicate, or copy materials for commercial use</li>
                  <li>Modify or create derivative works based on our content</li>
                  <li>Attempt to decompile, reverse engineer, or disassemble our platform</li>
                  <li>Remove or obscure any copyright, trademark, or proprietary notices</li>
                  <li>Use automated scraping or data harvesting tools</li>
                  <li>Frame or embed our website content without permission</li>
                  <li>Use our resources to compete with Lennox Fields services</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Transmit viruses, malware, or harmful code</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-clinical-blue rounded-lg p-6">
                <p className="text-warm-gray leading-relaxed">
                  Any unauthorized use of our website or resources terminates the license granted to you
                  and may subject you to legal action.
                </p>
              </div>
            </div>
          </div>

          {/* Therapeutic Relationship */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Heart className="w-6 h-6 text-primary-sage" />
              <h2 id="therapeutic-relationship" className="text-3xl font-bold text-text-dark">
                3. Therapeutic Relationship Terms
              </h2>
            </div>
            <p className="text-lg text-warm-gray leading-relaxed mb-6">
              These terms apply specifically to individuals engaged in counseling or therapy services
              with Tamara Walls, M.Ed, LPCA.
            </p>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Nature of the Relationship</h3>
                <p className="text-warm-gray leading-relaxed">
                  Therapy is a professional relationship between client and counselor. It is not a
                  friendship, and contact outside therapy is intentionally limited to preserve the
                  therapeutic boundaries. Social media connections are not appropriate while in an
                  active therapeutic relationship.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Client Responsibilities</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  As a client, you agree to:
                </p>
                <ul className="list-disc list-inside text-warm-gray space-y-2">
                  <li>Attend scheduled appointments on time and notify if you must cancel</li>
                  <li>Communicate honestly and openly about your experiences</li>
                  <li>Follow agreed-upon treatment recommendations</li>
                  <li>Pay fees as discussed and agreed upon</li>
                  <li>Inform your counselor of any medication changes or other treatments</li>
                  <li>Take responsibility for decisions made outside of therapy</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Counselor Responsibilities</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  Tamara Walls agrees to:
                </p>
                <ul className="list-disc list-inside text-warm-gray space-y-2">
                  <li>Provide competent, ethical clinical care</li>
                  <li>Maintain your confidentiality within legal and ethical limits</li>
                  <li>Respond to your needs and adjusts treatment as needed</li>
                  <li>Inform you of risks, benefits, and alternatives to treatment</li>
                  <li>Respect your autonomy and right to make decisions</li>
                  <li>Maintain professional boundaries</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Limits of Confidentiality</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  While therapy sessions are confidential, there are legal exceptions where information
                  may be disclosed without consent:
                </p>
                <ul className="list-disc list-inside text-warm-gray space-y-2">
                  <li>Imminent danger to self or others</li>
                  <li>Child, elder, or dependent adult abuse or neglect</li>
                  <li>Court orders or legal subpoenas</li>
                  <li>Professional licensing board investigations</li>
                  <li>Insurance billing and verification purposes</li>
                  <li>Emergency situations affecting your safety</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Emergency Situations</h3>
                <p className="text-warm-gray leading-relaxed">
                  If you are experiencing a mental health crisis or are at risk of harming yourself or
                  others, please contact emergency services (911), go to the nearest emergency room, or
                  call a crisis hotline. Therapy is not appropriate for acute emergencies. If your
                  counselor becomes aware of an emergency during non-business hours, they may contact
                  emergency services on your behalf.
                </p>
              </div>
            </div>
          </div>

          {/* Payment and Billing */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-primary-sage" />
              <h2 id="payment" className="text-3xl font-bold text-text-dark">
                4. Payment & Billing
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-cream p-6 rounded-lg">
                <h3 className="text-xl font-bold text-text-dark mb-3">Fee Structure</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  Session fees and any additional charges will be discussed and agreed upon before
                  services begin. You will receive a clear fee schedule and an explanation of what is
                  included in your sessions.
                </p>
                <p className="text-warm-gray leading-relaxed">
                  Fees are subject to change with 30 days' notice. Any rate increases will be
                  communicated in writing before implementation.
                </p>
              </div>

              <div className="bg-cream p-6 rounded-lg">
                <h3 className="text-xl font-bold text-text-dark mb-3">Payment Methods & Timing</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  Payment is due at the time of service unless other arrangements have been made. We
                  accept multiple payment methods. For clients with insurance, we will bill your insurance
                  when applicable. You remain responsible for your portion (copay, coinsurance,
                  deductible) regardless of insurance coverage.
                </p>
              </div>

              <div className="bg-cream p-6 rounded-lg">
                <h3 className="text-xl font-bold text-text-dark mb-3">Insurance Information</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  If you wish to use insurance, you must provide current insurance information. You are
                  responsible for:
                </p>
                <ul className="list-disc list-inside text-warm-gray space-y-2">
                  <li>Verifying your insurance coverage before services</li>
                  <li>Paying any copays, coinsurance, or deductibles</li>
                  <li>Notifying us of changes in insurance coverage</li>
                  <li>Any claims denied due to incorrect information you provided</li>
                </ul>
              </div>

              <div className="bg-cream p-6 rounded-lg">
                <h3 className="text-xl font-bold text-text-dark mb-3">Late Payments & Collection</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  Accounts more than 30 days overdue may be subject to collection efforts, including
                  collection agency referral. You will be responsible for any collection costs, court
                  fees, and attorney fees incurred to collect unpaid balances.
                </p>
              </div>
            </div>
          </div>

          {/* Cancellation & Refund Policy */}
          <div>
            <h2 id="cancellation" className="text-3xl font-bold text-text-dark mb-6">
              5. Cancellation & Refund Policies
            </h2>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Appointment Cancellation</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  Clients must provide at least 24 hours' notice to cancel or reschedule appointments.
                  Late cancellations (less than 24 hours) or no-shows are subject to a cancellation fee
                  equal to your session rate, which is your responsibility regardless of insurance
                  coverage.
                </p>
                <p className="text-warm-gray leading-relaxed">
                  Exceptions may be made for genuine emergencies at the discretion of Tamara Walls.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Refund Policy</h3>
                <p className="text-warm-gray leading-relaxed">
                  Therapy sessions are not refundable once conducted. If you wish to discuss fees or
                  have concerns about charges, please contact us immediately. Prepayment for sessions is
                  available but non-refundable. In cases of prepayment disputes, we will work with you
                  to apply credits to future sessions when clinically appropriate.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Termination of Services</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  Either you or Tamara Walls may terminate the therapeutic relationship. When possible,
                  termination should occur gradually with advance notice to allow for appropriate closure.
                </p>
                <p className="text-warm-gray leading-relaxed">
                  If you wish to terminate services, you agree to attend a final session if possible. If
                  Tamara Walls terminates services due to non-payment or breach of these terms, you will
                  receive written notice. In either case, we will provide referrals to other qualified
                  providers.
                </p>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 id="liability" className="text-3xl font-bold text-text-dark mb-6">
              6. Limitation of Liability
            </h2>

            <div className="bg-blue-50 border border-clinical-blue rounded-lg p-6 mb-6">
              <p className="text-warm-gray leading-relaxed mb-4">
                <strong>TO THE FULLEST EXTENT PERMITTED BY LAW:</strong>
              </p>
              <ul className="list-disc list-inside text-warm-gray space-y-3">
                <li>
                  Lennox Fields and Tamara Walls are not liable for any indirect, incidental, special,
                  or consequential damages arising from your use of our services or website
                </li>
                <li>
                  Our total liability for any claim shall not exceed the amount paid by you for services
                  in the 12 months preceding the claim
                </li>
                <li>
                  We are not responsible for third-party content, websites, or services linked from our
                  site
                </li>
                <li>
                  Some limitations may not apply in your jurisdiction, in which case applicable law
                  governs
                </li>
              </ul>
            </div>

            <p className="text-lg text-warm-gray leading-relaxed">
              Therapy involves inherent risks, including emotional discomfort, difficult memories being
              accessed, or temporary worsening of symptoms before improvement. You acknowledge these
              risks and accept them as part of the therapeutic process.
            </p>
          </div>

          {/* Medical Disclaimer */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-primary-sage" />
              <h2 id="medical-disclaimer" className="text-3xl font-bold text-text-dark">
                7. Medical Disclaimer
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-soft-rose/20 border border-soft-rose rounded-lg p-6">
                <p className="text-warm-gray leading-relaxed mb-4">
                  <strong>IMPORTANT:</strong> The information on the Lennox Fields website and in resources
                  is for educational and informational purposes only. It is not a substitute for
                  professional medical, psychiatric, or psychological advice, diagnosis, or treatment.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Therapy Is Not Medical Treatment</h3>
                <p className="text-warm-gray leading-relaxed">
                  Mental health counseling is a distinct service from medical or psychiatric care. While
                  therapy can support mental health and wellbeing, it does not replace psychiatric
                  medication or medical treatment. If you have a medical condition or are considering
                  medication, consult with a physician or psychiatrist.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Not a Crisis Service</h3>
                <p className="text-warm-gray leading-relaxed">
                  Therapy sessions are scheduled in advance and are not appropriate for crisis situations.
                  If you are experiencing a mental health emergency, suicidal thoughts, or are at risk of
                  harming yourself or others:
                </p>
                <div className="mt-4 space-y-2 text-warm-gray">
                  <p>• Call 911</p>
                  <p>• Go to your nearest emergency room</p>
                  <p>• Call the 988 Suicide & Crisis Lifeline (call or text 988)</p>
                  <p>• Contact the Crisis Text Line (text HOME to 741741)</p>
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">No Warranty of Results</h3>
                <p className="text-warm-gray leading-relaxed">
                  While therapy can be effective, results are not guaranteed. The outcome of therapy
                  depends on many factors, including your engagement, effort, personal circumstances, and
                  the nature of your concerns. We cannot guarantee specific outcomes or cure of mental
                  health conditions.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Self-Care Resources</h3>
                <p className="text-warm-gray leading-relaxed">
                  Our website resources, tools, and books are for education and self-care. While they may
                  be helpful, they do not constitute therapy and are not a substitute for professional
                  mental health treatment. Consult a qualified mental health professional before making
                  decisions about your health based on our resources.
                </p>
              </div>
            </div>
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 id="intellectual-property" className="text-3xl font-bold text-text-dark mb-6">
              8. Intellectual Property Rights
            </h2>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Our Content</h3>
                <p className="text-warm-gray leading-relaxed">
                  All content on the Lennox Fields website, including text, graphics, logos, images,
                  videos, and software, is the exclusive property of Lennox Fields or licensed to us by
                  third parties. This content is protected by copyright, trademark, and other intellectual
                  property laws.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Limited License for Personal Use</h3>
                <p className="text-warm-gray leading-relaxed">
                  You may download, view, and print content for personal, non-commercial use only. Any
                  other use requires our explicit written permission. This includes reproducing, modifying,
                  selling, displaying, or distributing any content.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Your User Content</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  Any information, content, or data you submit through our website or portal (excluding
                  clinical records) may be used by Lennox Fields for operational, analytical, and
                  improvement purposes. Clinical information is only used for treatment purposes as
                  described in our Privacy Policy.
                </p>
                <p className="text-warm-gray leading-relaxed">
                  You retain ownership of any original content you create, but grant us a license to use
                  it for our services.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Books and Publications</h3>
                <p className="text-warm-gray leading-relaxed">
                  Children's books and professional publications authored or published by Tamara Walls are
                  protected by copyright. Use of these materials must comply with copyright law and any
                  licensing terms accompanying the materials.
                </p>
              </div>
            </div>
          </div>

          {/* Third-Party Links */}
          <div>
            <h2 id="third-party-links" className="text-3xl font-bold text-text-dark mb-6">
              9. Links to Third-Party Sites
            </h2>

            <p className="text-lg text-warm-gray leading-relaxed mb-6">
              Our website may contain links to third-party websites and resources that are not operated
              by Lennox Fields. These links are provided for convenience and informational purposes only.
            </p>

            <div className="space-y-6">
              <div className="bg-cream p-6 rounded-lg">
                <h3 className="text-xl font-bold text-text-dark mb-3">Disclaimer</h3>
                <p className="text-warm-gray leading-relaxed">
                  We are not responsible for the content, accuracy, availability, or practices of
                  third-party sites. Access to third-party links is at your own risk. We do not endorse
                  or guarantee any third-party content, products, or services. Please review the privacy
                  policies and terms of any third-party sites before using them.
                </p>
              </div>

              <div className="bg-cream p-6 rounded-lg">
                <h3 className="text-xl font-bold text-text-dark mb-3">No Responsibility</h3>
                <p className="text-warm-gray leading-relaxed">
                  Lennox Fields is not responsible for any damages, losses, or issues arising from your
                  use of third-party websites or services. Third-party links are provided "as is" without
                  warranty of any kind.
                </p>
              </div>
            </div>
          </div>

          {/* Modifications to Terms */}
          <div>
            <h2 id="modifications" className="text-3xl font-bold text-text-dark mb-6">
              10. Modifications to Terms
            </h2>

            <div className="card">
              <p className="text-warm-gray leading-relaxed mb-4">
                We may modify these Terms of Service at any time. Changes will be effective immediately
                upon posting unless otherwise specified. For material changes, we will provide additional
                notice (such as a prominent notice on our website or via email).
              </p>
              <p className="text-warm-gray leading-relaxed mb-4">
                Your continued use of our website or services after changes are posted constitutes your
                acceptance of the modified terms. If you do not agree with changes, discontinue use of our
                services.
              </p>
              <p className="text-warm-gray leading-relaxed">
                For clinical services, significant changes will be discussed with you before implementation
                when clinically appropriate. Continued participation in therapy after changes are announced
                constitutes your agreement.
              </p>
            </div>
          </div>

          {/* Governing Law */}
          <div>
            <h2 id="governing-law" className="text-3xl font-bold text-text-dark mb-6">
              11. Governing Law & Dispute Resolution
            </h2>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Governing Law</h3>
                <p className="text-warm-gray leading-relaxed">
                  These Terms of Service and all related matters are governed by the laws of the state in
                  which services are rendered, without regard to its conflict of law provisions. You agree
                  to the jurisdiction and venue of the courts in that state.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Dispute Resolution</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  Before pursuing legal action, we encourage you to contact us to resolve disputes. We
                  will attempt to resolve complaints and disputes in good faith. If resolution is not
                  possible, either party may pursue legal remedies available under law.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Severability</h3>
                <p className="text-warm-gray leading-relaxed">
                  If any provision of these terms is found to be invalid or unenforceable, the remaining
                  provisions will continue in full force and effect. The invalid provision will be
                  modified to the minimum extent necessary to make it valid.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Mail className="w-6 h-6 text-primary-sage" />
              <h2 id="contact" className="text-3xl font-bold text-text-dark">
                12. Contact & Questions
              </h2>
            </div>

            <p className="text-lg text-warm-gray leading-relaxed mb-8">
              If you have questions about these Terms of Service or need to report a violation, please
              contact us:
            </p>

            <div className="bg-cream p-8 rounded-lg border-l-4 border-primary-sage">
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-text-dark">Lennox Fields Clinical Mental Health Services</p>
                  <p className="text-warm-gray">Tamara Walls, M.Ed, LPCA</p>
                </div>

                <div>
                  <p className="font-bold text-text-dark mb-2">Contact Methods</p>
                  <p className="text-warm-gray">
                    <strong>Email:</strong>{' '}
                    <Link
                      href="mailto:hello@lennoxfields.com"
                      className="text-primary-sage hover:text-earth-green"
                    >
                      hello@lennoxfields.com
                    </Link>
                  </p>
                  <p className="text-warm-gray">
                    <strong>Phone:</strong> Contact through our office
                  </p>
                  <p className="text-warm-gray">
                    <strong>Web:</strong>{' '}
                    <Link
                      href="/contact"
                      className="text-primary-sage hover:text-earth-green"
                    >
                      Contact Form
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div>
            <div className="mt-12 bg-blue-50 border border-clinical-blue rounded-lg p-6">
              <div className="flex gap-4">
                <AlertCircle className="w-6 h-6 text-clinical-blue flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-text-dark mb-2">Important Legal Notice</p>
                  <p className="text-warm-gray leading-relaxed">
                    These Terms of Service are provided for information purposes and should not be
                    considered legal advice. While we have made efforts to ensure accuracy, these terms
                    should be reviewed by qualified legal counsel for your specific circumstances. Laws
                    vary by jurisdiction, and specific situations may have unique legal implications. If
                    you have legal questions or concerns, please consult with an attorney.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            If you agree to these terms and would like to explore our services, we'd love to hear from you.
          </p>
          <Link
            href="/contact"
            className="btn bg-white text-primary-sage hover:bg-cream inline-flex items-center"
          >
            <Mail className="mr-2 w-5 h-5" />
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
