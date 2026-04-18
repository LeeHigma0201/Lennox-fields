import Link from 'next/link'
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Calendar,
  Compass,
  Download,
  Eye,
  FileText,
  Heart,
  type LucideIcon,
  MessageCircle,
  Shield,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react'
import { worksheetCounts, worksheetSections, type Worksheet } from '@/content/worksheets'

export const metadata = {
  title: 'Therapeutic Worksheets — Lennox Fields',
  description:
    'Free, downloadable therapeutic worksheets — interactive CBT and DBT tools, neurodivergent-affirming resources for autism, ADHD, AuDHD, and PDA, and worksheets for parents, co-parents, and caregivers.',
}

const iconMap: Record<string, LucideIcon> = {
  Activity,
  AlertTriangle,
  BookOpen,
  Brain,
  Calendar,
  Compass,
  Eye,
  FileText,
  Heart,
  MessageCircle,
  Shield,
  Sparkles,
  Target,
  Users,
  Zap,
}

function WorksheetCard({ worksheet }: { worksheet: Worksheet }) {
  const Icon = iconMap[worksheet.icon] ?? FileText
  const isPdf = Boolean(worksheet.pdf)
  const href = worksheet.href ?? worksheet.pdf ?? '#'
  const linkProps = isPdf
    ? { href, target: '_blank' as const, rel: 'noopener noreferrer' }
    : { href }

  return (
    <Link
      {...linkProps}
      className="card group flex h-full flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-medium focus:outline-none focus:ring-2 focus:ring-primary-sage focus:ring-offset-2"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="bg-primary-sage/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg transition-colors group-hover:bg-primary-sage/20">
          <Icon className="text-primary-sage h-6 w-6" aria-hidden="true" />
        </div>
        {worksheet.interactive ? (
          <span className="bg-primary-sage/10 text-primary-sage rounded-full px-2.5 py-1 text-xs font-medium">
            Interactive
          </span>
        ) : isPdf ? (
          <span className="text-warm-gray bg-warm-cream rounded-full px-2.5 py-1 text-xs font-medium">
            PDF
          </span>
        ) : null}
      </div>

      <p className="text-warm-gray mb-1 text-xs uppercase tracking-wide">
        {worksheet.category}
      </p>
      <h3 className="text-text-dark mb-3 text-lg font-bold leading-snug">
        {worksheet.title}
      </h3>
      <p className="text-text-dark mb-5 flex-1 text-sm leading-relaxed">
        {worksheet.description}
      </p>

      <span className="text-primary-sage group-hover:text-earth-green inline-flex items-center text-sm font-semibold transition-colors">
        {worksheet.interactive ? (
          <>
            Open worksheet
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </>
        ) : (
          <>
            Download PDF
            <Download className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          </>
        )}
      </span>
    </Link>
  )
}

export default function WorksheetsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom">
          <div className="mb-6 flex items-center space-x-2">
            <Link
              href="/resources"
              className="text-primary-sage hover:text-earth-green inline-flex items-center transition-colors"
            >
              <ArrowLeft className="mr-1 inline h-5 w-5" aria-hidden="true" />
              Resources
            </Link>
          </div>
          <h1 className="text-text-dark mb-6 text-5xl font-bold md:text-6xl">
            Therapeutic Worksheets
          </h1>
          <p className="text-text-dark mb-10 max-w-3xl text-xl leading-relaxed">
            A growing library of {worksheetCounts.total} evidence-based, neurodivergent-affirming
            worksheets you can use alongside therapy or as part of your own self-guided practice.
            All resources are free and private.
          </p>

          {/* Section Subnav */}
          <div className="flex flex-wrap gap-3">
            {worksheetSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-text-dark hover:bg-primary-sage hover:border-primary-sage focus:ring-primary-sage inline-flex items-center gap-2 rounded-full border border-text-dark/15 bg-white/70 px-4 py-2 text-sm font-medium transition-all hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                <span className={`h-2 w-2 rounded-full ${section.accent}`} aria-hidden="true" />
                {section.title}
                <span className="text-warm-gray group-hover:text-white text-xs">
                  ({section.worksheets.length})
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      {worksheetSections.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          className={`section-padding scroll-mt-24 ${idx % 2 === 0 ? 'bg-white' : 'bg-warm-cream'}`}
        >
          <div className="container-custom">
            <div className="mb-12 max-w-3xl">
              <div className="mb-4 flex items-center gap-3">
                <span className={`h-3 w-3 rounded-full ${section.accent}`} aria-hidden="true" />
                <p className="text-warm-gray text-sm font-medium uppercase tracking-wider">
                  {section.worksheets.length}{' '}
                  {section.worksheets.length === 1 ? 'worksheet' : 'worksheets'}
                </p>
              </div>
              <h2 className="text-text-dark mb-4 text-3xl font-bold md:text-4xl">
                {section.title}
              </h2>
              <p className="text-text-dark text-lg leading-relaxed">{section.intro}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {section.worksheets.map((worksheet) => (
                <WorksheetCard key={worksheet.title} worksheet={worksheet} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* How to Use */}
      <section className="section-padding bg-warm-cream border-t border-text-dark/5">
        <div className="container-custom max-w-4xl">
          <h2 className="text-text-dark mb-10 text-center text-3xl font-bold">
            Getting the Most from These Worksheets
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="bg-primary-sage mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white">
                1
              </div>
              <h3 className="text-text-dark mb-2 text-lg font-bold">Be Honest</h3>
              <p className="text-warm-gray text-sm leading-relaxed">
                Write your genuine thoughts and feelings. There are no right or wrong answers.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-sage mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white">
                2
              </div>
              <h3 className="text-text-dark mb-2 text-lg font-bold">Be Consistent</h3>
              <p className="text-warm-gray text-sm leading-relaxed">
                Regular practice builds skills. Try to complete worksheets at the same time each day.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-sage mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white">
                3
              </div>
              <h3 className="text-text-dark mb-2 text-lg font-bold">Discuss in Therapy</h3>
              <p className="text-warm-gray text-sm leading-relaxed">
                Bring completed worksheets to your sessions for deeper exploration with your therapist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-center text-white">
        <div className="container-custom max-w-3xl">
          <h2 className="mb-6 text-4xl font-bold">Want Guided Support?</h2>
          <p className="mb-8 text-xl leading-relaxed opacity-90">
            These worksheets are most effective when used alongside professional therapy. Schedule a
            free 15-minute consultation to get started.
          </p>
          <Link
            href="/contact"
            className="btn text-primary-sage hover:bg-warm-cream bg-white"
          >
            Schedule Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
