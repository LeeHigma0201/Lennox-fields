import Link from 'next/link'
import { Briefcase, BookOpen, ClipboardList, FileText, GraduationCap } from 'lucide-react'

const tools = [
  {
    icon: GraduationCap,
    title: 'Clinical Supervision',
    description: 'Information about clinical supervision for associates and interns pursuing licensure in Kentucky.',
    href: '/professional/supervision',
  },
  {
    icon: ClipboardList,
    title: 'Treatment Plan Generator',
    description: 'Create structured, measurable treatment plans with evidence-based goals and interventions.',
    href: '/tools/treatment-planning',
  },
  {
    icon: FileText,
    title: 'Progress Notes Templates',
    description: 'SOAP, DAP, and BIRP note templates designed for efficient clinical documentation.',
    href: '/tools/notes-templates',
  },
  {
    icon: BookOpen,
    title: 'Screening Tools',
    description: 'Free validated assessments including PHQ-9, GAD-7, and PCL-5 with instant scoring.',
    href: '/tools/screening-tools',
  },
]

export default function ProfessionalPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            For Mental Health Professionals
          </h1>
          <p className="text-xl text-text-dark max-w-3xl mx-auto">
            Clinical tools, templates, and resources developed from real practice experience.
            Built by a clinician, for clinicians.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <Link key={tool.title} href={tool.href} className="card group hover:scale-[1.02] transition-all duration-200 block">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-sage/10 rounded-lg p-3 flex-shrink-0 group-hover:bg-primary-sage/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary-sage" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-dark mb-2">{tool.title}</h3>
                      <p className="text-warm-gray">{tool.description}</p>
                      <span className="text-primary-sage font-medium mt-3 inline-block group-hover:text-earth-green transition-colors">
                        Explore &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* About the Resources */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-6 text-center">
            Why I Build These Tools
          </h2>
          <div className="card p-8">
            <p className="text-text-dark mb-4">
              As a clinician, I know how much time documentation and administrative work can take away from
              the work that matters most — being present with clients. That&apos;s why I create tools that
              streamline the clinical workflow without sacrificing quality.
            </p>
            <p className="text-text-dark mb-4">
              Every template and tool here is built from actual clinical experience and follows
              current best practices for documentation, assessment, and treatment planning.
            </p>
            <p className="text-warm-gray text-sm">
              — Tamara Walls, LPCA | Lennox Fields Clinical Mental Health Services
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Questions or Feedback?</h2>
          <p className="text-xl mb-8 opacity-90">
            I&apos;m always working on new tools and resources. If you have suggestions or
            want to connect about professional collaboration, reach out.
          </p>
          <Link href="/contact" className="btn bg-white text-primary-sage hover:bg-cream">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
