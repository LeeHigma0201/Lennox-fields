import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react'
import { siteConfig } from '@/content/site-config'
import { footerQuickLinks, footerResourceLinks } from '@/content/navigation'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                className="w-10 h-10 object-contain bg-white rounded p-1"
              />
              <span className="font-heading text-lg font-bold text-white">{siteConfig.businessName}</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              {siteConfig.description}.
            </p>
            <div className="flex space-x-4">
              {siteConfig.social.linkedin && (
                <a href={siteConfig.social.linkedin} className="text-gray-300 hover:text-primary-sage transition-colors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                </a>
              )}
              {siteConfig.social.facebook && (
                <a href={siteConfig.social.facebook} className="text-gray-300 hover:text-primary-sage transition-colors" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-5 h-5" aria-hidden="true" />
                </a>
              )}
              {siteConfig.social.instagram && (
                <a href={siteConfig.social.instagram} className="text-gray-300 hover:text-primary-sage transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary-sage transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {footerResourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary-sage transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary-sage transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a href={siteConfig.contact.phoneLink} className="hover:text-primary-sage transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>{siteConfig.contact.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300">&copy; {currentYear} {siteConfig.legalName}. All rights reserved.</p>
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
            <strong className="text-white">Crisis Support:</strong> {siteConfig.crisis.message} <strong className="text-white">{siteConfig.crisis.phone}</strong> {siteConfig.crisis.suffix}
          </p>
        </div>
      </div>
    </footer>
  )
}
