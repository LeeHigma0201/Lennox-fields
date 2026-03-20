import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { resources } from '@/content/home-page'
import { iconMap, type IconName } from '@/content/icons'

export default function ResourcesHighlight() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            Free Mental Health Tools & Resources
          </h2>
          <p className="text-xl text-warm-gray max-w-3xl mx-auto">
            Access a comprehensive library of evidence-based tools, assessments, and educational materials.
            All designed to support your mental health journey or enhance your clinical practice.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => {
            const Icon = iconMap[resource.icon as IconName]
            return (
              <div key={resource.title} className="card group hover:scale-105 transition-transform duration-200">
                <div className={`w-14 h-14 ${resource.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-3">
                  {resource.title}
                </h3>
                <p className="text-warm-gray mb-4 leading-relaxed">
                  {resource.description}
                </p>
                <Link
                  href={resource.href}
                  className="text-primary-sage hover:text-earth-green font-medium inline-flex items-center"
                >
                  Explore
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-text-dark mb-6">
            All resources are free to use. No account required for basic access.
          </p>
          <Link href="/resources" className="btn btn-primary">
            Browse All Resources
          </Link>
        </div>
      </div>
    </section>
  )
}
