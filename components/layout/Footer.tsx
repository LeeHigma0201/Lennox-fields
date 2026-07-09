import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react'
import { siteConfig } from '@/content/site-config'
import { footerQuickLinks, footerResourceLinks } from '@/content/navigation'
import BuiltWithClaude from '@/components/BuiltWithClaude'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-soft-rose/10 via-warm-cream to-primary-sage/10">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                width={40}
                height={40}
                className="object-contain rounded"
              />
              <span className="font-heading text-lg font-bold text-text-dark">{siteConfig.businessName}</span>
            </div>
            <p className="text-sm text-warm-gray mb-4">
              {siteConfig.description}.
            </p>
            <div className="flex space-x-4">
              {siteConfig.social.linkedin && (
                <a href={siteConfig.social.linkedin} className="text-warm-gray hover:text-primary-sage transition-colors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                </a>
              )}
              {siteConfig.social.facebook && (
                <a href={siteConfig.social.facebook} className="text-warm-gray hover:text-primary-sage transition-colors" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-5 h-5" aria-hidden="true" />
                </a>
              )}
              {siteConfig.social.instagram && (
                <a href={siteConfig.social.instagram} className="text-warm-gray hover:text-primary-sage transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-text-dark">Quick Links</h3>
            <ul className="space-y-2 text-sm text-warm-gray">
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
            <h3 className="font-semibold text-lg mb-4 text-text-dark">Resources</h3>
            <ul className="space-y-2 text-sm text-warm-gray">
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
            <h3 className="font-semibold text-lg mb-4 text-text-dark">Get in Touch</h3>
            <p className="text-sm text-warm-gray mb-3">
              Fill out our contact form to schedule a consultation.
            </p>
            <Link href="/contact" className="inline-block btn btn-primary text-sm mb-4">
              Contact Us
            </Link>
            <div className="flex items-start space-x-2 text-sm text-warm-gray">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>{siteConfig.contact.location}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-warm-gray/20 mt-8 pt-8 text-sm text-warm-gray">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p>&copy; {currentYear} {siteConfig.legalName}. All rights reserved.</p>
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
          <p className="text-sm text-text-dark mt-4 text-center md:text-left bg-soft-rose/15 border border-soft-rose/30 rounded-lg p-3">
            <strong className="text-text-dark">Crisis Support:</strong> {siteConfig.crisis.message}{' '}
            <a href={`tel:${siteConfig.crisis.phone}`} className="font-bold text-soft-rose underline decoration-soft-rose/40 hover:decoration-soft-rose">{siteConfig.crisis.phone}</a>, <a href="sms:741741" className="font-bold text-soft-rose underline decoration-soft-rose/40 hover:decoration-soft-rose">text HOME to 741741</a>, or go to your nearest emergency room.
          </p>
          <div className="mt-6">
            <BuiltWithClaude />
          </div>
        </div>
      </div>
    </footer>
  )
}
