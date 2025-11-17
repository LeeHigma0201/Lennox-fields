import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Facebook } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <a href="#" className="text-gray-300 hover:text-primary-sage transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-sage transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" aria-hidden="true" />
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
                <Link href="/tools/screening-tools" className="hover:text-primary-sage transition-colors">
                  Free Screening Tools
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-primary-sage transition-colors">
                  Children's Books
                </Link>
              </li>
              <li>
                <Link href="/professional" className="hover:text-primary-sage transition-colors">
                  Professional Resources
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
                <Link href="/portal/login" className="hover:text-primary-sage transition-colors">
                  Client Portal
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary-sage transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:tamara@lennoxfields.org" className="hover:text-primary-sage transition-colors">
                  tamara@lennoxfields.org
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+19199999999" className="hover:text-primary-sage transition-colors">
                  (919) 999-9999
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>
                  Licensed in North Carolina & Indiana
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300">&copy; {currentYear} Lennox Fields Clinical Mental Health Services LLC. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="hover:text-primary-sage transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary-sage transition-colors">
                Terms of Service
              </Link>
              <Link href="/hipaa" className="hover:text-primary-sage transition-colors">
                HIPAA Notice
              </Link>
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
