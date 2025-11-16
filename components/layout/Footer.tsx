import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Facebook } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-sage-bg rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">LF</span>
              </div>
              <span className="font-heading text-lg font-bold text-white">Lennox Fields</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Evidence-based mental health care with compassion at its core.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary-sage transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-sage transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/services" className="hover:text-primary-sage transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-sage transition-colors">
                  About Tamara
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-primary-sage transition-colors">
                  Children's Books
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary-sage transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/portal/login" className="hover:text-primary-sage transition-colors">
                  Client Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/resources/worksheets" className="hover:text-primary-sage transition-colors">
                  Worksheets
                </Link>
              </li>
              <li>
                <Link href="/resources/habit-trackers" className="hover:text-primary-sage transition-colors">
                  Habit Trackers
                </Link>
              </li>
              <li>
                <Link href="/resources/journals" className="hover:text-primary-sage transition-colors">
                  Journals
                </Link>
              </li>
              <li>
                <Link href="/tools/screening-tools" className="hover:text-primary-sage transition-colors">
                  Screening Tools
                </Link>
              </li>
              <li>
                <Link href="/tools/safety-planning" className="hover:text-primary-sage transition-colors">
                  Safety Planning
                </Link>
              </li>
            </ul>
          </div>

          {/* Professional Tools */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Professional Tools</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/resources/professional" className="hover:text-primary-sage transition-colors">
                  Professional Resources
                </Link>
              </li>
              <li>
                <Link href="/resources/professional/supervision" className="hover:text-primary-sage transition-colors">
                  Supervision Guidelines
                </Link>
              </li>
              <li>
                <Link href="/tools/treatment-planning" className="hover:text-primary-sage transition-colors">
                  Treatment Planning
                </Link>
              </li>
              <li>
                <Link href="/tools/notes-templates" className="hover:text-primary-sage transition-colors">
                  Notes Templates
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/privacy" className="hover:text-primary-sage transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-sage transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/hipaa" className="hover:text-primary-sage transition-colors">
                  HIPAA Notice
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300">&copy; {currentYear} Lennox Fields Clinical Mental Health Services LLC. All rights reserved.</p>
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:tamara@lennoxfields.org" className="hover:text-primary-sage transition-colors">
                  tamara@lennoxfields.org
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+19199999999" className="hover:text-primary-sage transition-colors">
                  (919) 999-9999
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Licensed in NC & IN</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-200 mt-4 text-center md:text-left bg-alert-red/20 border border-alert-red/30 rounded-lg p-3">
            <strong className="text-white">Crisis Support:</strong> If you or someone you know is in crisis, please call the National Suicide Prevention Lifeline at <strong className="text-white">988</strong> or visit your nearest emergency room.
          </p>
        </div>
      </div>
    </footer>
  )
}
