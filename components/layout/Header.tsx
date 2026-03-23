'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { navigation } from '@/content/navigation'
import { siteConfig } from '@/content/site-config'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [scrollMenuOpen, setScrollMenuOpen] = useState(false)

  // Lock body scroll when any menu is open
  useEffect(() => {
    if (mobileMenuOpen || scrollMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen, scrollMenuOpen])

  // Scroll detection for sticky hamburger
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 80
      setScrolled(isScrolled)
      if (!isScrolled) setScrollMenuOpen(false)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobileMenu = () => setMobileMenuOpen(false)
  const closeScrollMenu = () => setScrollMenuOpen(false)

  return (
    <>
      {/* Main Header */}
      <header className="bg-white shadow-soft sticky top-0 z-40">
        <nav className="container-custom py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                width={48}
                height={48}
                className="object-contain rounded-full"
              />
              <div className="hidden md:block">
                <span className="font-heading text-xl font-bold text-text-dark">
                  {siteConfig.businessName}
                </span>
                <p className="text-xs text-warm-gray">{siteConfig.tagline}</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.submenu && setOpenSubmenu(item.name)}
                  onMouseLeave={() => setOpenSubmenu(null)}
                >
                  <Link
                    href={item.href}
                    className="text-text-dark hover:text-primary-sage transition-colors font-medium flex items-center"
                    onFocus={() => item.submenu && setOpenSubmenu(item.name)}
                    aria-haspopup={item.submenu ? 'true' : undefined}
                    aria-expanded={item.submenu ? openSubmenu === item.name : undefined}
                  >
                    {item.name}
                    {item.submenu && <ChevronDown className="ml-1 w-4 h-4" aria-hidden="true" />}
                  </Link>

                  {item.submenu && openSubmenu === item.name && (
                    <div
                      className="absolute top-full left-0 mt-2 w-56 bg-white shadow-medium rounded-lg py-2"
                      role="menu"
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) setOpenSubmenu(null)
                      }}
                    >
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          role="menuitem"
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
              <Link href="/contact" className="btn btn-primary">
                Schedule Consultation
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 text-text-dark"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div
              id="mobile-navigation"
              className="lg:hidden mt-4 pb-4 border-t border-warm-gray/20 pt-4"
            >
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="text-text-dark hover:text-primary-sage font-medium block"
                      onClick={closeMobileMenu}
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
                            onClick={closeMobileMenu}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link
                  href="/contact"
                  className="btn btn-primary w-full text-center"
                  onClick={closeMobileMenu}
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Scroll-activated Sticky Hamburger Bar (DoorDash-style) */}
      <div
        className={`fixed top-0 left-0 right-0 z-[60] transition-transform duration-300 ease-in-out ${
          scrolled ? 'translate-y-0' : '-translate-y-full'
        }`}
        aria-hidden={!scrolled}
      >
        <div className="bg-white shadow-medium border-b border-warm-gray/10">
          <div className="container-custom py-3 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" onClick={closeScrollMenu} className="flex items-center space-x-2">
              <Image
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                width={36}
                height={36}
                className="object-contain rounded-full"
              />
              <span className="font-heading text-base font-bold text-text-dark">
                {siteConfig.businessName}
              </span>
            </Link>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Link
                href="/contact"
                className="hidden sm:block btn btn-primary text-sm py-1.5 px-3"
                onClick={closeScrollMenu}
              >
                Schedule Consultation
              </Link>
              <button
                type="button"
                className="p-2 rounded-lg text-text-dark hover:bg-warm-cream transition-colors"
                onClick={() => setScrollMenuOpen(!scrollMenuOpen)}
                aria-label="Toggle navigation"
                aria-expanded={scrollMenuOpen}
              >
                {scrollMenuOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Nav Dropdown */}
        {scrollMenuOpen && (
          <div className="bg-white border-b border-warm-gray/10 shadow-medium">
            <div className="container-custom py-4 max-h-[70vh] overflow-y-auto">
              <div className="flex flex-col space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between py-2.5 px-3 rounded-lg text-text-dark hover:bg-warm-cream hover:text-primary-sage font-medium transition-colors"
                      onClick={closeScrollMenu}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 mb-1 space-y-0.5">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="block py-2 px-3 rounded-lg text-sm text-warm-gray hover:bg-warm-cream hover:text-primary-sage transition-colors"
                            onClick={closeScrollMenu}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-2 border-t border-warm-gray/20">
                  <Link
                    href="/contact"
                    className="btn btn-primary w-full text-center sm:hidden"
                    onClick={closeScrollMenu}
                  >
                    Schedule Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for scroll nav dropdown */}
      {scrollMenuOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black/20 backdrop-blur-sm"
          onClick={closeScrollMenu}
          aria-hidden="true"
        />
      )}
    </>
  )
}
