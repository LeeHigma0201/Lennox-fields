import Link from 'next/link'
import { Shield, Mail, Lock } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom text-center">
          <Shield className="w-20 h-20 text-primary-sage mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-text-dark max-w-3xl mx-auto">
            Your privacy and the security of your information are our top priorities.
          </p>
          <p className="text-sm text-warm-gray mt-4">
            Last Updated: November 16, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="space-y-8">
            {/* Introduction */}
            <div className="card">
              <h2 className="text-3xl font-bold text-text-dark mb-4">Introduction</h2>
              <p className="text-warm-gray leading-relaxed">
                Lennox Fields Clinical Mental Health Services LLC is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your information.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="card">
              <h2 className="text-3xl font-bold text-text-dark mb-4">1. Information We Collect</h2>
              <p className="text-warm-gray leading-relaxed mb-4">We collect:</p>
              <ul className="list-disc pl-6 text-warm-gray space-y-2">
                <li>Contact information (name, email, phone)</li>
                <li>Account information (for client portal)</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>Usage data (pages viewed, time on site)</li>
                <li>Protected Health Information (PHI) when you become a client</li>
              </ul>
            </div>

            {/* HIPAA Compliance */}
            <div className="bg-clinical-blue/10 border-l-4 border-clinical-blue p-6 rounded">
              <div className="flex items-start">
                <Lock className="w-6 h-6 text-clinical-blue mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-text-dark mb-3">HIPAA Compliance</h3>
                  <p className="text-warm-gray leading-relaxed mb-3">
                    All Protected Health Information (PHI) is handled in strict compliance with HIPAA regulations.
                  </p>
                  <Link href="/hipaa" className="text-clinical-blue hover:text-primary-sage font-medium">
                    Read our HIPAA Notice →
                  </Link>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="card">
              <h2 className="text-3xl font-bold text-text-dark mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-warm-gray space-y-2">
                <li>Providing therapy services and clinical care</li>
                <li>Processing payments and billing</li>
                <li>Scheduling appointments</li>
                <li>Improving our website and services</li>
                <li>Sending newsletters (with your consent)</li>
                <li>Legal compliance</li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="card">
              <h2 className="text-3xl font-bold text-text-dark mb-4">3. Data Security</h2>
              <p className="text-warm-gray leading-relaxed mb-3">We protect your information using:</p>
              <ul className="list-disc pl-6 text-warm-gray space-y-2">
                <li>AES-256 encryption for sensitive data</li>
                <li>TLS encryption for data in transit</li>
                <li>Secure, encrypted database storage</li>
                <li>Regular security audits</li>
                <li>HIPAA-compliant infrastructure</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div className="card">
              <h2 className="text-3xl font-bold text-text-dark mb-4">4. Your Privacy Rights</h2>
              <p className="text-warm-gray leading-relaxed mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 text-warm-gray space-y-2">
                <li>Access your personal information</li>
                <li>Request corrections to your information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="bg-cream rounded-lg p-8">
              <div className="flex items-start">
                <Mail className="w-8 h-8 text-primary-sage mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-text-dark mb-4">Questions About Privacy?</h2>
                  <p className="text-warm-gray leading-relaxed mb-4">
                    Contact our Privacy Officer: Tamara Walls, M.Ed, LPCA
                  </p>
                  <a href="mailto:privacy@lennoxfields.org" className="text-primary-sage hover:text-earth-green font-medium">
                    privacy@lennoxfields.org
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
