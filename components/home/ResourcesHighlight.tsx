import Link from 'next/link'
import { FileText, CheckSquare, BookOpen, Shield, Brain, ArrowRight } from 'lucide-react'

const resources = [
  {
    icon: Brain,
    title: 'Free Screening Tools',
    description: 'Self-assessments for depression, anxiety, ADHD, autism, and PTSD with instant scoring and interpretation.',
    href: '/tools/screening-tools',
    color: 'bg-clinical-blue',
  },
  {
    icon: FileText,
    title: 'Therapeutic Worksheets',
    description: 'Downloadable worksheets for CBT, DBT, mindfulness, and more. Perfect for clients and therapists.',
    href: '/resources/worksheets',
    color: 'bg-primary-sage',
  },
  {
    icon: CheckSquare,
    title: 'Habit Trackers',
    description: 'Customizable trackers for mood, sleep, exercise, and self-care routines.',
    href: '/resources/habit-trackers',
    color: 'bg-earth-green',
  },
  {
    icon: BookOpen,
    title: 'Journal Prompts',
    description: 'Guided journaling for gratitude, self-discovery, trauma processing, and personal growth.',
    href: '/resources/journals',
    color: 'bg-soft-rose',
  },
  {
    icon: Shield,
    title: 'Safety Planning',
    description: 'Comprehensive crisis and safety planning tools for mental health emergencies.',
    href: '/tools/safety-planning',
    color: 'bg-alert-red',
  },
  {
    icon: Brain,
    title: 'Treatment Planning',
    description: 'Professional-grade treatment plan generator with measurable goals and evidence-based interventions.',
    href: '/tools/treatment-planning',
    color: 'bg-accent-gold',
  },
]

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
            const Icon = resource.icon
            return (
              <div key={resource.title} className="card group hover:scale-105 transition-transform duration-200">
                <div className={`w-14 h-14 ${resource.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
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
                  <ArrowRight className="ml-2 w-4 h-4" />
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
