import Link from 'next/link'
import { ArrowRight, Heart, Brain, Users, BookOpen, Stethoscope, Shield } from 'lucide-react'
import HeroSection from '@/components/home/HeroSection'
import ServicesOverview from '@/components/home/ServicesOverview'
import AboutPreview from '@/components/home/AboutPreview'
import ResourcesHighlight from '@/components/home/ResourcesHighlight'
import CTASection from '@/components/home/CTASection'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Indicators */}
      <section className="bg-white py-12 border-b border-warm-gray/20">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-10 h-10 text-primary-sage mb-2" aria-hidden="true" />
              <p className="text-sm font-medium text-text-dark">HIPAA Compliant</p>
            </div>
            <div className="flex flex-col items-center">
              <Stethoscope className="w-10 h-10 text-primary-sage mb-2" aria-hidden="true" />
              <p className="text-sm font-medium text-text-dark">Licensed LPCA</p>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="w-10 h-10 text-primary-sage mb-2" aria-hidden="true" />
              <p className="text-sm font-medium text-text-dark">Evidence-Based</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-10 h-10 text-primary-sage mb-2" aria-hidden="true" />
              <p className="text-sm font-medium text-text-dark">Client-Centered</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <AboutPreview />

      {/* Services Overview */}
      <ServicesOverview />

      {/* Children's Books Section - Revenue Generator */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <BookOpen className="w-16 h-16 text-soft-rose mx-auto mb-6" aria-hidden="true" />
            <h2 className="text-4xl font-bold text-text-dark mb-6">Children's Mental Health Books</h2>
            <p className="text-xl text-text-dark mb-8">
              Engaging, therapeutic books that help children understand and cope with tough topics.
              Perfect for parents, therapists, and educators.
            </p>
            <Link href="/books" className="btn btn-secondary inline-flex items-center">
              Browse Book Collection
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Resources Teaser */}
      <section className="section-padding bg-gradient-sage-bg text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Brain className="w-16 h-16 mx-auto mb-6 opacity-90" aria-hidden="true" />
            <h2 className="text-4xl font-bold mb-6">For Mental Health Professionals</h2>
            <p className="text-xl mb-8 opacity-90">
              Access comprehensive professional tools including supervision tracking, billing management,
              treatment plan generators, and state-specific licensing guides.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Clinical Tools</h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Treatment plan generator</li>
                  <li>• Progress notes templates</li>
                  <li>• Assessment scoring</li>
                  <li>• Safety planning tools</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Practice Management</h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Supervision hours tracker</li>
                  <li>• Billing and invoicing</li>
                  <li>• Client portal access</li>
                  <li>• Document storage</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Development</h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Licensing guides (NC, IN)</li>
                  <li>• Theoretical orientation tools</li>
                  <li>• Community resources</li>
                  <li>• Continuing education</li>
                </ul>
              </div>
            </div>
            <div className="mt-10">
              <Link href="/professional/supervision" className="btn bg-white text-primary-sage hover:bg-cream inline-flex items-center">
                Explore Professional Tools
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools & Resources - After Revenue Sections */}
      <ResourcesHighlight />

      {/* Call to Action */}
      <CTASection />
    </div>
  )
}
