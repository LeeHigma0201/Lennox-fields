import Link from 'next/link'
import { Shield, Lock, CheckCircle, AlertCircle, Phone, FileText, Users } from 'lucide-react'

export default function HIPAAPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-warm-bg py-16">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-6">
            <Lock className="w-10 h-10 text-earth-green" />
            <h1 className="text-5xl font-bold text-text-dark">
              HIPAA Notice of Privacy Practices
            </h1>
          </div>
          <p className="text-xl text-text-dark opacity-90 max-w-2xl">
            This notice describes how medical information about you may be used and disclosed and how you can
            get access to this information.
          </p>
          <p className="text-sm text-warm-gray mt-4">
            <strong>Last Updated & Effective:</strong> November 16, 2024
          </p>
        </div>
      </section>

      {/* Important Notice */}
      <section className="section-padding bg-soft-rose/20">
        <div className="container-custom max-w-4xl">
          <div className="flex gap-4">
            <AlertCircle className="w-8 h-8 text-soft-rose flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-text-dark mb-3">Please Review Carefully</h2>
              <p className="text-lg text-warm-gray leading-relaxed">
                This notice describes your privacy rights and how Lennox Fields Clinical Mental Health
                Services protects your health information. You have the right to receive this notice and to
                understand how your Protected Health Information (PHI) is used and protected. By accepting
                services, you acknowledge receipt of this notice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-8">Quick Navigation</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { id: 'hipaa-covered', title: 'HIPAA Coverage' },
              { id: 'your-rights', title: 'Your HIPAA Rights' },
              { id: 'uses-disclosures', title: 'Uses & Disclosures' },
              { id: 'permitted-uses', title: 'Permitted Uses' },
              { id: 'restrictions', title: 'Restrictions' },
              { id: 'consent', title: 'Consent & Authorization' },
              { id: 'security', title: 'Security Measures' },
              { id: 'breach', title: 'Breach Notification' },
              { id: 'complaints', title: 'Filing Complaints' },
              { id: 'changes', title: 'Changes to This Notice' },
              { id: 'contact', title: 'Contact Information' },
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
          {/* HIPAA Coverage */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary-sage" />
              <h2 id="hipaa-covered" className="text-3xl font-bold text-text-dark">
                1. HIPAA Coverage
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-warm-gray leading-relaxed">
                Lennox Fields Clinical Mental Health Services is a covered entity under the Health
                Insurance Portability and Accountability Act (HIPAA). This Notice of Privacy Practices
                explains the privacy practices for all services provided by Tamara Walls, M.Ed, LPCA.
              </p>

              <div className="bg-cream p-6 rounded-lg">
                <h3 className="text-xl font-bold text-text-dark mb-3">What This Notice Covers</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  This notice applies to Protected Health Information (PHI), which includes any health
                  information that can be used to identify you, including:
                </p>
                <ul className="list-disc list-inside text-warm-gray space-y-2">
                  <li>Clinical assessment and diagnosis information</li>
                  <li>Treatment plans and therapy notes</li>
                  <li>Mental and behavioral health history</li>
                  <li>Medication and substance use information</li>
                  <li>Family and relationship information disclosed in therapy</li>
                  <li>Any identifiable health information in any form or medium</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-clinical-blue rounded-lg p-6">
                <p className="text-warm-gray leading-relaxed">
                  <strong>Note:</strong> Psychotherapy notes (detailed records of individual therapy
                  sessions) receive additional protection under HIPAA and are kept separate from your
                  medical record. These are only available to the therapist who created them unless you
                  authorize otherwise.
                </p>
              </div>
            </div>
          </div>

          {/* Your HIPAA Rights */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-primary-sage" />
              <h2 id="your-rights" className="text-3xl font-bold text-text-dark">
                2. Your HIPAA Rights
              </h2>
            </div>

            <p className="text-lg text-warm-gray leading-relaxed mb-8">
              HIPAA gives you the following rights regarding your Protected Health Information:
            </p>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Right to Access Your Records</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  You have the right to inspect and obtain a copy of your health information. You may
                  request:
                </p>
                <ul className="list-disc list-inside text-warm-gray space-y-2">
                  <li>A copy of your complete medical record</li>
                  <li>Your treatment history and clinical notes</li>
                  <li>Records in electronic or paper format</li>
                  <li>Summaries of your health information</li>
                </ul>
                <p className="text-sm text-warm-gray mt-4 p-3 bg-cream rounded">
                  <strong>How to request:</strong> Submit a written request to our Privacy Officer. We
                  will provide access within 30 days or notify you of any delays.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Right to Amendment</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  You have the right to request amendments to your health information if you believe it
                  is inaccurate or incomplete.
                </p>
                <p className="text-warm-gray leading-relaxed">
                  If we deny your amendment request, we will provide a written explanation of the reason
                  and your right to appeal.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Right to Accounting of Disclosures</h3>
                <p className="text-warm-gray leading-relaxed">
                  You have the right to request a list of disclosures of your health information,
                  including who received your information and why. We will provide information about
                  disclosures made in the past 6 years, organized by date.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Right to Request Restrictions</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  You may request restrictions on how we use or disclose your health information,
                  including restrictions on:
                </p>
                <ul className="list-disc list-inside text-warm-gray space-y-2">
                  <li>Uses and disclosures for treatment, payment, and operations</li>
                  <li>Disclosures to family members or others</li>
                  <li>Emergency situations</li>
                </ul>
                <p className="text-sm text-warm-gray mt-4 p-3 bg-cream rounded">
                  <strong>Note:</strong> We are not required to agree to restrictions on treatment,
                  payment, or operations that are necessary to serve you.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">
                  Right to Request Confidential Communications
                </h3>
                <p className="text-warm-gray leading-relaxed">
                  You may request that we communicate with you about your health information in a
                  specific way or at a specific location. For example, you may request we call you at a
                  work number rather than home, or communicate via email rather than phone.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Right to Copy of This Notice</h3>
                <p className="text-warm-gray leading-relaxed">
                  You have the right to receive a paper copy of this Notice of Privacy Practices at any
                  time. You may request additional copies if needed.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Right to Breach Notification</h3>
                <p className="text-warm-gray leading-relaxed">
                  If there is a breach of your unsecured health information, you have the right to be
                  notified in writing without unreasonable delay. We will explain the breach, the risks
                  to your privacy, and steps you can take.
                </p>
              </div>
            </div>
          </div>

          {/* Uses and Disclosures */}
          <div>
            <h2 id="uses-disclosures" className="text-3xl font-bold text-text-dark mb-6">
              3. How Your Health Information Is Used & Disclosed
            </h2>

            <p className="text-lg text-warm-gray leading-relaxed mb-8">
              We use and disclose your health information for various purposes as permitted by HIPAA:
            </p>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Treatment</h3>
                <p className="text-warm-gray leading-relaxed mb-3">
                  We use your health information to provide, coordinate, and manage your mental health care,
                  including:
                </p>
                <ul className="list-disc list-inside text-warm-gray space-y-2">
                  <li>Conducting assessments and evaluations</li>
                  <li>Developing and implementing treatment plans</li>
                  <li>Providing individual and group therapy</li>
                  <li>Consulting with other healthcare providers involved in your care</li>
                  <li>Monitoring your progress and adjusting treatment</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Payment</h3>
                <p className="text-warm-gray leading-relaxed mb-3">
                  We use your health information for billing and payment purposes, including:
                </p>
                <ul className="list-disc list-inside text-warm-gray space-y-2">
                  <li>Processing payment from you or your insurance</li>
                  <li>Verifying insurance coverage and eligibility</li>
                  <li>Billing and collection activities</li>
                  <li>Coordinating with insurers and benefits administrators</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Healthcare Operations</h3>
                <p className="text-warm-gray leading-relaxed mb-3">
                  We use health information for operational purposes, including:
                </p>
                <ul className="list-disc list-inside text-warm-gray space-y-2">
                  <li>Scheduling and appointment reminders</li>
                  <li>Maintaining and improving clinical services</li>
                  <li>Evaluating clinician performance and quality of care</li>
                  <li>Ensuring compliance with laws and regulations</li>
                  <li>Training and supervision of clinical staff</li>
                  <li>Business planning and operations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Permitted Uses */}
          <div>
            <h2 id="permitted-uses" className="text-3xl font-bold text-text-dark mb-6">
              4. Permitted Uses & Disclosures Without Authorization
            </h2>

            <p className="text-lg text-warm-gray leading-relaxed mb-8">
              We may use and disclose your health information without your permission in the following
              situations:
            </p>

            <div className="space-y-4">
              {[
                {
                  title: 'Required by Law',
                  description: 'When required by federal, state, or local law, regulation, or court order',
                },
                {
                  title: 'Imminent Danger to Self or Others',
                  description:
                    'When there is imminent danger to your safety or the safety of others, we may disclose information to appropriate parties',
                },
                {
                  title: 'Child, Elder, or Dependent Abuse',
                  description:
                    'We are mandated reporters and must report suspected abuse, neglect, or exploitation of children, elderly individuals, or dependent adults',
                },
                {
                  title: 'Emergency Situations',
                  description:
                    'In emergency situations affecting your health or safety, we may disclose information to emergency responders',
                },
                {
                  title: 'Law Enforcement',
                  description:
                    'We may disclose information to law enforcement when required by law or legal process',
                },
                {
                  title: 'Court-Ordered Disclosure',
                  description:
                    'When we receive a subpoena, court order, or search warrant, we will disclose health information as legally required',
                },
                {
                  title: 'Professional Licensing',
                  description:
                    'We may disclose information to state licensing boards investigating complaints or discipline',
                },
                {
                  title: 'Public Health Activities',
                  description:
                    'We may report information to public health authorities for disease reporting when required by law',
                },
                {
                  title: 'Health Oversight',
                  description:
                    'We may disclose information to healthcare oversight agencies investigating compliance or fraud',
                },
                {
                  title: 'Quality & Safety',
                  description:
                    'We may disclose information to improve quality and safety in healthcare',
                },
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-primary-sage pl-6 py-3 bg-cream/50">
                  <h3 className="font-bold text-text-dark mb-1">{item.title}</h3>
                  <p className="text-warm-gray text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Restrictions */}
          <div>
            <h2 id="restrictions" className="text-3xl font-bold text-text-dark mb-6">
              5. Restrictions on Use & Disclosure
            </h2>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">No Sales of Health Information</h3>
                <p className="text-warm-gray leading-relaxed">
                  We do not sell your health information. Your health information will never be sold to
                  third parties for marketing or commercial purposes without your explicit written consent.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Limited Marketing</h3>
                <p className="text-warm-gray leading-relaxed">
                  We do not use your health information for marketing purposes without your authorization.
                  We may communicate with you about treatment alternatives, services, or health-related
                  information directly as part of our practice operations.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">No Genetic Information Sale</h3>
                <p className="text-warm-gray leading-relaxed">
                  We do not sell genetic information. Any genetic information disclosed in therapy is
                  protected as part of your health information.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Psychotherapy Notes</h3>
                <p className="text-warm-gray leading-relaxed">
                  Psychotherapy notes receive heightened protection. These detailed session notes are kept
                  separate from your medical record and require separate authorization for release beyond
                  treatment, payment, and operations purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Consent & Authorization */}
          <div>
            <h2 id="consent" className="text-3xl font-bold text-text-dark mb-6">
              6. Consent & Authorization
            </h2>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Consent for Treatment</h3>
                <p className="text-warm-gray leading-relaxed">
                  By engaging in services with Lennox Fields, you consent to our use of your health
                  information for treatment, payment, and operations as described in this notice. You have
                  the right to decline treatment.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Written Authorization Required</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  We require your written authorization (signed consent form) before:
                </p>
                <ul className="list-disc list-inside text-warm-gray space-y-2">
                  <li>Disclosing information to family members or other individuals</li>
                  <li>Coordinating care with other providers not involved in your current treatment</li>
                  <li>Releasing copies of your complete record to you or others</li>
                  <li>Using information for purposes other than treatment, payment, or operations</li>
                  <li>Marketing or promotional activities</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Revoke Authorization</h3>
                <p className="text-warm-gray leading-relaxed">
                  You may revoke any written authorization at any time by providing written notice to our
                  Privacy Officer. The revocation will apply to future disclosures but does not affect uses
                  or disclosures made before we received your revocation.
                </p>
              </div>
            </div>
          </div>

          {/* Security Measures */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary-sage" />
              <h2 id="security" className="text-3xl font-bold text-text-dark">
                7. Security Measures
              </h2>
            </div>

            <p className="text-lg text-warm-gray leading-relaxed mb-8">
              We implement comprehensive security measures to protect your health information from
              unauthorized access, use, and disclosure:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Encryption of data in transit and at rest',
                'Secure authentication and access controls',
                'Firewalls and intrusion detection systems',
                'Regular software patches and updates',
                'Secure backup and disaster recovery',
                'Staff training on privacy and security',
                'Physical security of storage areas',
                'Audit logs and monitoring systems',
                'Incident response procedures',
                'Regular security risk assessments',
                'Business associate agreements',
                'Secure disposal procedures',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-primary-sage flex-shrink-0 mt-1" />
                  <p className="text-warm-gray">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 border border-clinical-blue rounded-lg p-6">
              <p className="text-warm-gray leading-relaxed">
                While we implement comprehensive security measures, no system is completely secure. We
                cannot guarantee absolute security, but we are committed to protecting your information to
                the fullest extent possible under HIPAA.
              </p>
            </div>
          </div>

          {/* Breach Notification */}
          <div>
            <h2 id="breach" className="text-3xl font-bold text-text-dark mb-6">
              8. Breach Notification & Your Rights
            </h2>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">What Constitutes a Breach</h3>
                <p className="text-warm-gray leading-relaxed">
                  A breach is unauthorized access, acquisition, use, or disclosure of your unsecured health
                  information that compromises the security or privacy of the information. Accidental
                  access by authorized personnel does not constitute a breach.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Breach Notification Process</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  If we discover a breach affecting your health information, we will:
                </p>
                <ul className="list-disc list-inside text-warm-gray space-y-2">
                  <li>Investigate the breach promptly</li>
                  <li>Notify you without unreasonable delay (typically within 60 days)</li>
                  <li>Provide written notice by mail, email, or phone</li>
                  <li>Describe the nature and scope of the breach</li>
                  <li>Explain risks and steps you can take</li>
                  <li>Describe our remediation efforts</li>
                  <li>Provide contact information for questions</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Your Rights After Breach</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  If your information is breached, you have the right to:
                </p>
                <ul className="list-disc list-inside text-warm-gray space-y-2">
                  <li>Receive timely notification</li>
                  <li>File a complaint with us or the Department of Health & Human Services (HHS)</li>
                  <li>Take protective actions (credit monitoring, etc.) if recommended</li>
                  <li>Understand what information was involved</li>
                  <li>Know what steps we are taking to prevent future breaches</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Filing Complaints */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Phone className="w-6 h-6 text-primary-sage" />
              <h2 id="complaints" className="text-3xl font-bold text-text-dark">
                9. Filing Complaints
              </h2>
            </div>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Complaints to Lennox Fields</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  If you believe your privacy rights have been violated, you may file a complaint with us:
                </p>
                <div className="bg-cream p-4 rounded">
                  <p className="text-warm-gray font-bold mb-2">Privacy Officer</p>
                  <p className="text-warm-gray">Tamara Walls, M.Ed, LPCA</p>
                  <p className="text-warm-gray">Lennox Fields Clinical Mental Health Services</p>
                  <p className="text-warm-gray mt-3">
                    Contact through our office for mailing address and phone number.
                  </p>
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">Complaints to HHS</h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  You may also file a complaint with the Department of Health & Human Services (HHS), Office
                  for Civil Rights, without first complaining to us:
                </p>
                <div className="bg-cream p-4 rounded">
                  <p className="text-warm-gray font-bold mb-2">U.S. Department of Health & Human Services</p>
                  <p className="text-warm-gray">Office for Civil Rights</p>
                  <p className="text-warm-gray">200 Independence Avenue, S.W.</p>
                  <p className="text-warm-gray">Washington, D.C. 20201</p>
                  <p className="text-warm-gray mt-3">
                    Phone: 1-877-696-6775 (toll-free)
                  </p>
                  <p className="text-warm-gray">
                    <Link
                      href="https://www.hhs.gov/ocr/privacy/hipaa/complaints"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-sage hover:text-earth-green"
                    >
                      File Online
                    </Link>
                  </p>
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-text-dark mb-3">No Retaliation</h3>
                <p className="text-warm-gray leading-relaxed">
                  We will not retaliate against you for filing a complaint. You have the right to file a
                  complaint without fear of penalty, punishment, or retaliation from our practice.
                </p>
              </div>
            </div>
          </div>

          {/* Changes to Notice */}
          <div>
            <h2 id="changes" className="text-3xl font-bold text-text-dark mb-6">
              10. Changes to This Notice
            </h2>

            <div className="card">
              <p className="text-warm-gray leading-relaxed mb-4">
                We reserve the right to change our privacy practices and this notice. Changes will be
                effective immediately upon posting unless otherwise specified. For material changes, we
                will provide additional notice.
              </p>
              <p className="text-warm-gray leading-relaxed mb-4">
                Current versions of this Notice of Privacy Practices will be posted on our website and
                provided to you at each appointment. You may also request a copy at any time.
              </p>
              <p className="text-warm-gray leading-relaxed">
                Any changes will apply to health information we maintain, including information created
                before the effective date of the change. Continued use of our services after changes
                become effective constitutes your acceptance of the changes.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Users className="w-6 h-6 text-primary-sage" />
              <h2 id="contact" className="text-3xl font-bold text-text-dark">
                11. Contact Information
              </h2>
            </div>

            <p className="text-lg text-warm-gray leading-relaxed mb-8">
              For questions about this Notice of Privacy Practices, to exercise your privacy rights, or to
              report a privacy violation, please contact our Privacy Officer:
            </p>

            <div className="bg-cream p-8 rounded-lg border-l-4 border-primary-sage mb-8">
              <div className="space-y-6">
                <div>
                  <p className="font-bold text-text-dark text-lg mb-2">Privacy Officer</p>
                  <p className="text-warm-gray font-semibold">Tamara Walls, M.Ed, LPCA</p>
                  <p className="text-warm-gray">Lennox Fields Clinical Mental Health Services</p>
                </div>

                <div>
                  <p className="font-bold text-text-dark mb-3">Contact Methods</p>
                  <div className="space-y-2">
                    <p className="text-warm-gray">
                      <strong>Email:</strong>{' '}
                      <Link
                        href="mailto:privacy@lennoxfields.com"
                        className="text-primary-sage hover:text-earth-green"
                      >
                        privacy@lennoxfields.com
                      </Link>
                    </p>
                    <p className="text-warm-gray">
                      <strong>Phone:</strong> Contact through our main office
                    </p>
                    <p className="text-warm-gray">
                      <strong>Mailing Address:</strong> Contact us for current address
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

                <div>
                  <p className="font-bold text-text-dark mb-2">Response Time</p>
                  <p className="text-warm-gray">
                    We will respond to privacy requests and complaints within 30 calendar days or as
                    required by law.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-clinical-blue rounded-lg p-6">
              <p className="text-warm-gray leading-relaxed">
                <strong>HIPAA Authorization:</strong> This Notice of Privacy Practices is provided in
                compliance with HIPAA Privacy Rule (45 CFR Parts 160 and 164). If you have questions about
                HIPAA privacy regulations, visit the HHS Office for Civil Rights website at{' '}
                <Link
                  href="https://www.hhs.gov/ocr/hipaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-sage hover:text-earth-green"
                >
                  www.hhs.gov/ocr/hipaa
                </Link>
              </p>
            </div>
          </div>

          {/* Acknowledgment */}
          <div className="mt-12 bg-soft-rose/10 border border-soft-rose rounded-lg p-8">
            <h3 className="text-2xl font-bold text-text-dark mb-4">Acknowledgment of Receipt</h3>
            <p className="text-warm-gray leading-relaxed mb-4">
              By engaging in services with Lennox Fields, you acknowledge that you have received and
              reviewed this Notice of Privacy Practices. Your signature on the intake form or acceptance of
              services confirms your receipt and understanding of this notice.
            </p>
            <p className="text-warm-gray leading-relaxed">
              If you have questions or did not receive a copy, please contact us immediately. We are happy
              to provide additional copies at any time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">
            Your Privacy Is Our Priority
          </h2>
          <p className="text-lg mb-8 opacity-90">
            We are committed to protecting your health information and respecting your privacy rights
            under HIPAA. If you have any questions or concerns, please don't hesitate to reach out.
          </p>
          <Link
            href="/privacy"
            className="btn bg-white text-primary-sage hover:bg-cream inline-flex items-center"
          >
            <Shield className="mr-2 w-5 h-5" />
            View Privacy Policy
          </Link>
        </div>
      </section>
    </div>
  )
}
