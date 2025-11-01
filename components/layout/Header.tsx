'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

const navigation = [
  {
    name: 'Services',
    href: '/services',
    submenu: [
      { name: 'Individual Therapy', href: '/services/individual-therapy' },
      { name: 'Couples Therapy', href: '/services/couples-therapy' },
      { name: 'Family Therapy', href: '/services/family-therapy' },
      { name: 'Teen & Adolescent', href: '/services/teen-adolescent' },
      { name: 'Career Counseling', href: '/services/career-counseling' },
      { name: 'Substance Use', href: '/services/substance-use' },
    ],
  },
  {
    name: 'Resources',
    href: '/resources',
    submenu: [
      { name: 'Screening Tools', href: '/tools/screening-tools' },
      { name: 'Worksheets', href: '/resources/worksheets' },
      { name: 'Habit Trackers', href: '/resources/habit-trackers' },
      { name: 'Journals', href: '/resources/journals' },
      { name: 'Safety Planning', href: '/tools/safety-planning' },
    ],
  },
  {
    name: 'Professional Tools',
    href: '/professional',
    submenu: [
      { name: 'Clinical Supervision', href: '/professional/supervision' },
      { name: 'Treatment Planning', href: '/tools/treatment-planning' },
      { name: 'Notes Templates', href: '/tools/notes-templates' },
      { name: 'Billing Tracker', href: '/professional/billing-tracker' },
      { name: 'Licensing Guides', href: '/professional/licensing-guides' },
    ],
  },
  { name: 'Books', href: '/books' },
  { name: 'About', href: '/about' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-sage-bg rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">LF</span>
            </div>
            <div className="hidden md:block">
              <span className="font-heading text-xl font-bold text-text-dark">
                Lennox Fields
              </span>
              <p className="text-xs text-warm-gray">Clinical Mental Health Services</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="text-text-dark hover:text-primary-sage transition-colors font-medium flex items-center"
                  onMouseEnter={() => item.submenu && setOpenSubmenu(item.name)}
                  onMouseLeave={() => setOpenSubmenu(null)}
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="ml-1 w-4 h-4" />}
                </Link>

                {/* Dropdown Menu */}
                {item.submenu && openSubmenu === item.name && (
                  <div
                    className="absolute top-full left-0 mt-2 w-56 bg-white shadow-medium rounded-lg py-2"
                    onMouseEnter={() => setOpenSubmenu(item.name)}
                    onMouseLeave={() => setOpenSubmenu(null)}
                  >
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className="block px-4 py-2 text-sm text-text-dark hover:bg-cream hover:text-primary-sage transition-colors"
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/portal/login" className="text-primary-sage hover:text-earth-green font-medium">
              Client Portal
            </Link>
            <Link href="/contact" className="btn btn-primary">
              Schedule Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-text-dark"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-warm-gray/20 pt-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="text-text-dark hover:text-primary-sage font-medium block"
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="text-sm text-warm-gray hover:text-primary-sage block"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link href="/portal/login" className="text-primary-sage font-medium">
                Client Portal
              </Link>
              <Link href="/contact" className="btn btn-primary w-full text-center">
                Schedule Consultation
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
