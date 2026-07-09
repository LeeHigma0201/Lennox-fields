import Link from 'next/link'
import { ArrowRight, BookOpen, Brain } from 'lucide-react'
import HeroSection from '@/components/home/HeroSection'
import ServicesOverview from '@/components/home/ServicesOverview'
import AboutPreview from '@/components/home/AboutPreview'
import ResourcesHighlight from '@/components/home/ResourcesHighlight'
import JournalingPrompts from '@/components/home/JournalingPrompts'
import CTASection from '@/components/home/CTASection'
import { trustIndicators, booksSection, professionalSection } from '@/content/home-page'
import { iconMap, type IconName } from '@/content/icons'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Indicators */}
      <section className="bg-white py-12 border-b border-warm-gray/20">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {trustIndicators.map((item) => {
              const Icon = iconMap[item.icon as IconName]
              return (
                <div key={item.label} className="flex flex-col items-center">
                  <Icon className="w-10 h-10 text-primary-sage mb-2" aria-hidden="true" />
                  <p className="text-sm font-medium text-text-dark">{item.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <AboutPreview />

      {/* Journaling Prompts */}
      <JournalingPrompts />

      {/* Services Overview */}
      <ServicesOverview />

      {/* Children's Books Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <BookOpen className="w-16 h-16 text-soft-rose mx-auto mb-6" aria-hidden="true" />
            <h2 className="text-4xl font-bold text-text-dark mb-6">{booksSection.title}</h2>
            <p className="text-xl text-text-dark mb-8">
              {booksSection.description}
            </p>
            <Link href={booksSection.buttonHref} className="btn btn-secondary inline-flex items-center">
              {booksSection.buttonText}
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Resources Teaser */}
      <section className="section-padding gradient-sage-bg text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Brain className="w-16 h-16 mx-auto mb-6 opacity-90" aria-hidden="true" />
            <h2 className="text-4xl font-bold mb-6">{professionalSection.title}</h2>
            <p className="text-xl mb-8 opacity-90">
              {professionalSection.description}
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {professionalSection.columns.map((col) => (
                <div key={col.title} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3">{col.title}</h3>
                  <ul className="space-y-2 text-sm opacity-90">
                    {col.items.map((item) => (
                      <li key={item}>&bull; {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link href={professionalSection.buttonHref} className="btn bg-white text-primary-sage hover:bg-cream inline-flex items-center">
                {professionalSection.buttonText}
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools & Resources */}
      <ResourcesHighlight />

      {/* Call to Action */}
      <CTASection />
    </div>
  )
}
