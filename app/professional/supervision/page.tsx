'use client'

import Link from 'next/link'
import {
  GraduationCap,
  CheckCircle,
  ArrowLeft,
  Calendar,
  ExternalLink,
  Printer,
  Sparkles,
  AlertTriangle,
  ShieldAlert,
} from 'lucide-react'
import NotTherapyDisclaimer from '@/components/NotTherapyDisclaimer'

type LicenseBoard = {
  code: string
  name: string
  board: string
  description: string
  links: { label: string; href: string }[]
}

const LICENSES: LicenseBoard[] = [
  {
    code: 'LPCC',
    name: 'Licensed Professional Clinical Counselor',
    board: 'KY Board of Licensed Professional Counselors',
    description:
      'Independent clinical counseling licensure. Requires post-graduate supervised experience documented through the LPC Board.',
    links: [
      { label: 'Board website', href: 'https://lpc.ky.gov/' },
      {
        label: 'Code of ethics (201 KAR 36:040)',
        href: 'https://lpc.ky.gov/documents/201%20KAR%2036.040%20Code%20of%20ethics%20FINAL.pdf',
      },
    ],
  },
  {
    code: 'LCADC',
    name: 'Licensed Clinical Alcohol & Drug Counselor',
    board: 'KY Board of Alcohol and Drug Counselors',
    description:
      'Master’s-level clinical licensure for substance use disorder treatment. Highest ADC credential in Kentucky.',
    links: [
      { label: 'Board website', href: 'https://adc.ky.gov/' },
      {
        label: 'Laws & regulations',
        href: 'https://adc.ky.gov/Documents/adc_lawsandregulations2018.pdf',
      },
    ],
  },
  {
    code: 'CADC',
    name: 'Certified Alcohol & Drug Counselor',
    board: 'KY Board of Alcohol and Drug Counselors',
    description:
      'Bachelor’s-level certification for substance use counseling under supervision.',
    links: [
      { label: 'Board website', href: 'https://adc.ky.gov/' },
      {
        label: 'CADC application packet',
        href: 'https://adc.ky.gov/Documents/ADC_CertifiedAlcoholandDrugCounselorApplicationPacket(CADC).pdf',
      },
    ],
  },
  {
    code: 'TCM',
    name: 'Targeted Case Manager',
    board: 'KY DBHDID — overseen via 908 KAR 2:260',
    description:
      'Behavioral health case management for SMI, SED, SUD, or BHPH populations. CEs tracked in TRIS. Requires monthly individual face-to-face supervision for the first year and ongoing group supervision.',
    links: [
      { label: 'TCM curriculum process (DBHDID)', href: 'https://dbhdid.ky.gov/dbh/tcm.aspx' },
      { label: 'TRIS (training records system)', href: 'https://tris.dbhdid.ky.gov/' },
      {
        label: '908 KAR 2:260 (full regulation)',
        href: 'https://apps.legislature.ky.gov/law/kar/titles/908/002/260/',
      },
    ],
  },
  {
    code: 'PSS',
    name: 'Peer Support Specialist',
    board: 'KY DBHDID — Adult, Family, Youth tracks',
    description:
      'Lived-experience credential. 30 hours of approved training plus 6 CE hours per year. APSS, FPSS, and YPSS tracks each governed by 908 KAR 2:220, 2:230, and 2:240.',
    links: [
      { label: 'PSS curriculum process (DBHDID)', href: 'https://dbhdid.ky.gov/dbh/pss.aspx' },
      { label: 'TRIS (training records system)', href: 'https://tris.dbhdid.ky.gov/' },
    ],
  },
]

export default function SupervisionPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20 no-print">
        <div className="container-custom">
          <div className="flex items-center space-x-2 mb-6">
            <Link
              href="/professional"
              className="text-primary-sage hover:text-earth-green transition-colors"
            >
              <ArrowLeft className="w-5 h-5 inline mr-1" aria-hidden="true" />
              Professional
            </Link>
          </div>
          <div className="max-w-4xl">
            <span className="lf-eyebrow">For supervisees</span>
            <div className="flex items-center space-x-4 mb-6 mt-3">
              <div className="bg-primary-sage p-4 rounded-lg">
                <GraduationCap
                  className="w-12 h-12 text-warm-cream"
                  aria-hidden="true"
                />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-ink">
                Clinical Supervision
              </h1>
            </div>
            <p className="text-xl text-text-dark mb-6">
              Support for counselors and case managers working toward licensure
              in Kentucky.
            </p>

            {/* Coming-soon notice */}
            <aside
              className="bg-paper border-l-4 border-accent-gold rounded-r-lg p-5 flex items-start gap-3"
              role="note"
            >
              <Sparkles
                className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-ink mb-1">
                  More tools are on the way.
                </p>
                <p className="text-sm text-text-dark leading-relaxed">
                  Below you&rsquo;ll find Kentucky board references, a printable
                  hours log, and a quick guide for reporting ethics concerns.
                  Full supervision toolkit (case-conceptualization templates,
                  group supervision agendas, and document review checklists)
                  ships soon.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-warm-cream pt-12 no-print">
        <div className="container-custom max-w-5xl">
          <NotTherapyDisclaimer variant="card" />
        </div>
      </section>

      {/* License boards */}
      <section className="section-padding bg-warm-cream no-print">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <span className="lf-eyebrow">Licensure references</span>
            <h2 className="text-4xl font-bold text-ink mt-3 mb-4">
              Kentucky boards & regulations
            </h2>
            <div className="accent-bar mx-auto" />
            <p className="text-warm-gray mt-6 max-w-2xl mx-auto">
              The boards below govern the credentials we most often supervise
              toward. Always check the official source for current rules.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {LICENSES.map((lic) => (
              <article key={lic.code} className="card flex flex-col">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-heading text-2xl font-bold text-primary-sage">
                    {lic.code}
                  </span>
                  <span className="text-sm text-warm-gray">{lic.name}</span>
                </div>
                <p className="text-sm font-medium text-ink mb-3">
                  {lic.board}
                </p>
                <p className="text-text-dark text-sm leading-relaxed mb-4 flex-grow">
                  {lic.description}
                </p>
                <ul className="space-y-2">
                  {lic.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-sage hover:text-earth-green transition-colors text-sm font-medium inline-flex items-center gap-1"
                      >
                        {link.label}
                        <ExternalLink
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Hours logs */}
      <section className="section-padding bg-paper" id="hours-log">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-10 no-print">
            <span className="lf-eyebrow">Generic templates</span>
            <h2 className="text-4xl font-bold text-ink mt-3 mb-4">
              Hours log forms
            </h2>
            <div className="accent-bar mx-auto" />
            <p className="text-warm-gray mt-6 max-w-2xl mx-auto">
              Generic supervision logs you can print, fill in, and save. Always
              cross-check against your board&rsquo;s current requirements before
              submitting for licensure.
            </p>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') window.print()
              }}
              className="btn btn-primary inline-flex items-center mt-6"
            >
              <Printer className="w-4 h-4 mr-2" aria-hidden="true" />
              Print or save as PDF
            </button>
          </div>

          {/* Form A — LPCC / LCADC / CADC */}
          <div className="card mb-8 print-break">
            <div className="border-b border-rule pb-4 mb-6">
              <p className="lf-eyebrow">Form A</p>
              <h3 className="text-2xl font-bold text-ink mt-2">
                Supervision hours log — LPCC, LCADC, CADC
              </h3>
              <p className="text-sm text-warm-gray mt-2">
                Tracks direct client contact, indirect work, and supervision
                hours. One row per session.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
              <FormField label="Supervisee name" />
              <FormField label="Credential pursued (LPCC / LCADC / CADC)" />
              <FormField label="Supervisor name & credential" />
              <FormField label="Reporting period (from / to)" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-linen text-ink">
                    <Th>Date</Th>
                    <Th>Direct hrs</Th>
                    <Th>Indirect hrs</Th>
                    <Th>Supervision hrs</Th>
                    <Th>Activity / case ID</Th>
                    <Th>Initials</Th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <tr key={i} className="border-b border-rule/50">
                      <Td />
                      <Td />
                      <Td />
                      <Td />
                      <Td />
                      <Td />
                    </tr>
                  ))}
                  <tr className="bg-warm-cream font-semibold">
                    <Td>Totals</Td>
                    <Td />
                    <Td />
                    <Td />
                    <Td />
                    <Td />
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <SignatureBlock label="Supervisee signature / date" />
              <SignatureBlock label="Supervisor signature / date" />
            </div>
          </div>

          {/* Form B — TCM / PSS */}
          <div className="card">
            <div className="border-b border-rule pb-4 mb-6">
              <p className="lf-eyebrow">Form B</p>
              <h3 className="text-2xl font-bold text-ink mt-2">
                Supervision log — TCM & PSS
              </h3>
              <p className="text-sm text-warm-gray mt-2">
                Topic-based supervision tracking aligned with DBHDID
                expectations. Use one row per supervision contact.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
              <FormField label="Supervisee name" />
              <FormField label="Credential (TCM / APSS / FPSS / YPSS)" />
              <FormField label="Supervisor name & credential" />
              <FormField label="Agency" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-linen text-ink">
                    <Th>Date</Th>
                    <Th>Supervisor name</Th>
                    <Th>Topic discussed</Th>
                    <Th>Supervisee signature</Th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 14 }).map((_, i) => (
                    <tr key={i} className="border-b border-rule/50">
                      <Td />
                      <Td />
                      <Td />
                      <Td />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <SignatureBlock label="Supervisee signature / date" />
              <SignatureBlock label="Supervisor signature / date" />
            </div>
          </div>

          <p className="text-xs text-warm-gray mt-6 text-center no-print">
            These templates are generic and provided for convenience. They do
            not replace board-issued forms where required.
          </p>
        </div>
      </section>

      {/* Ethics reporting mind map */}
      <section className="section-padding bg-warm-cream no-print" id="ethics-map">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <span className="lf-eyebrow">When something feels off</span>
            <h2 className="text-4xl font-bold text-ink mt-3 mb-4">
              Reporting an ethics concern
            </h2>
            <div className="accent-bar mx-auto" />
            <p className="text-warm-gray mt-6 max-w-2xl mx-auto">
              You don&rsquo;t have to figure this out alone. Match the
              clinician&rsquo;s credential to the right board.
            </p>
          </div>

          <div className="card-clinical mb-8">
            <h3 className="font-heading text-lg font-semibold text-ink mb-2 flex items-center gap-2">
              <AlertTriangle
                className="w-5 h-5 text-crisis-clay"
                aria-hidden="true"
              />
              If anyone is in immediate danger
            </h3>
            <p className="text-text-dark text-sm leading-relaxed">
              Call <strong>911</strong>. Then call or text <strong>988</strong>{' '}
              (Suicide & Crisis Lifeline). Reporting comes after safety.
            </p>
          </div>

          {/* Mind map: trunk + branches */}
          <div className="relative">
            {/* Trunk */}
            <div className="bg-primary-sage text-warm-cream rounded-lg p-6 text-center mb-6 max-w-xl mx-auto shadow-medium">
              <p className="text-xs uppercase tracking-[0.22em] opacity-90">
                Start here
              </p>
              <p className="font-heading text-xl font-semibold mt-2">
                What credential does the clinician hold?
              </p>
            </div>

            {/* Branches */}
            <div className="grid md:grid-cols-2 gap-6">
              <Branch
                title="LPCC, LPCA, or counseling associate"
                board="KY Board of Licensed Professional Counselors"
                phone="502-782-8803"
                email="LPC@KY.GOV"
                links={[
                  { label: 'lpc.ky.gov', href: 'https://lpc.ky.gov/' },
                  {
                    label: 'Complaint form (PDF)',
                    href: 'https://lpc.ky.gov/Documents/DPL-LPC-11-%20Complaint%20with%20instructions_Final_6.18.2025%20(002)%20-%20fillable.pdf',
                  },
                ]}
              />
              <Branch
                title="LCADC, LADC, or CADC"
                board="KY Board of Alcohol and Drug Counselors"
                links={[
                  { label: 'adc.ky.gov', href: 'https://adc.ky.gov/' },
                  {
                    label: 'Laws & complaint procedures',
                    href: 'https://adc.ky.gov/Documents/adc_lawsandregulations2018.pdf',
                  },
                ]}
              />
              <Branch
                title="TCM (targeted case manager)"
                board="KY DBHDID — Behavioral Health"
                links={[
                  {
                    label: 'TCM oversight (DBHDID)',
                    href: 'https://dbhdid.ky.gov/dbh/tcm.aspx',
                  },
                  {
                    label: 'TRIS (training records)',
                    href: 'https://tris.dbhdid.ky.gov/',
                  },
                ]}
              />
              <Branch
                title="Peer Support Specialist (APSS / FPSS / YPSS)"
                board="KY DBHDID — Behavioral Health"
                links={[
                  {
                    label: 'PSS oversight (DBHDID)',
                    href: 'https://dbhdid.ky.gov/dbh/pss.aspx',
                  },
                  {
                    label: 'TRIS (training records)',
                    href: 'https://tris.dbhdid.ky.gov/',
                  },
                ]}
              />
            </div>

            {/* Cross-cutting branches */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Branch
                title="Facility, billing, or licensure-level concern"
                board="Cabinet for Health & Family Services — Office of Inspector General"
                description="Use for facility licensing issues, Medicaid fraud, or abuse/neglect inside a licensed program."
                links={[
                  {
                    label: 'CHFS OIG',
                    href: 'https://www.chfs.ky.gov/agencies/os/oig/Pages/default.aspx',
                  },
                ]}
              />
              <Branch
                title="Not sure which credential applies"
                board="Start with the agency that employed them"
                description="HR or the clinical director can confirm the clinician’s license type. If there’s no agency (private practice), use the board listed on their disclosure form."
                links={[]}
              />
            </div>
          </div>

          {/* Footer note */}
          <aside
            className="bg-paper border-l-4 border-warm-sand rounded-r-lg p-6 mt-10 flex items-start gap-3"
            role="note"
          >
            <ShieldAlert
              className="w-5 h-5 text-warm-sand flex-shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-semibold text-ink mb-1">
                Document before you escalate.
              </p>
              <p className="text-sm text-text-dark leading-relaxed">
                Boards investigate written complaints. Save dates, names,
                contemporaneous notes, and any records you&rsquo;re entitled
                to. Your supervisor or a peer consult group can help you decide
                whether mandatory reporting applies before you file.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Existing supervision services */}
      <section className="section-padding bg-white no-print">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <span className="lf-eyebrow">Working with Tamara</span>
            <h2 className="text-4xl font-bold text-ink mt-3 mb-4">
              Supervision services
            </h2>
            <div className="accent-bar mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-2xl font-bold text-ink mb-4">
                Individual supervision
              </h3>
              <p className="text-warm-gray mb-4">
                One-on-one clinical supervision focused on case
                conceptualization, treatment planning, ethical decision-making,
                and professional development.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle
                    className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-text-dark">
                    Case conceptualization and treatment review
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-text-dark">
                    Ethical and legal consultation
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-text-dark">
                    Skill development and feedback
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-text-dark">
                    Licensure hours documentation
                  </span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-ink mb-4">
                Areas of focus
              </h3>
              <p className="text-warm-gray mb-4">
                Supervision is tailored to your professional goals and the
                populations you serve. Areas of expertise include:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle
                    className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-text-dark">
                    Neurodiversity-affirming practice (ADHD, autism)
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-text-dark">
                    Trauma-informed care and complex PTSD
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-text-dark">
                    Somatics, parts work, and ACT
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-text-dark">
                    Substance use and co-occurring disorders
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="section-padding gradient-sage-bg text-warm-cream no-print">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">When you&rsquo;re ready</h2>
          <p className="text-xl mb-8 opacity-95">
            Reach out and we can talk through fit, cadence, and what would
            actually move your practice forward.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-sm opacity-90 mb-2">Individual supervision</p>
              <p className="text-4xl font-bold mb-4">$75</p>
              <p className="text-sm opacity-90">Per hour</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-sm opacity-90 mb-2">Monthly package</p>
              <p className="text-4xl font-bold mb-4">$250</p>
              <p className="text-sm opacity-90">4 hours per month</p>
            </div>
          </div>

          <Link
            href="/contact"
            className="btn bg-warm-cream text-primary-sage hover:bg-paper inline-flex items-center"
          >
            <Calendar className="mr-2 w-5 h-5" aria-hidden="true" />
            Inquire about supervision
          </Link>
        </div>
      </section>
    </div>
  )
}

function FormField({ label }: { label: string }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-warm-gray mb-1">
        {label}
      </label>
      <div className="border-b border-ink/40 h-7" />
    </div>
  )
}

function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th className="text-left text-xs uppercase tracking-wider font-semibold px-3 py-2 border border-rule">
      {children}
    </th>
  )
}

function Td({ children }: { children?: React.ReactNode }) {
  return (
    <td className="px-3 py-3 border border-rule align-top h-9">{children}</td>
  )
}

function SignatureBlock({ label }: { label: string }) {
  return (
    <div>
      <div className="border-b border-ink/60 h-9" />
      <p className="text-xs text-warm-gray mt-1">{label}</p>
    </div>
  )
}

function Branch({
  title,
  board,
  phone,
  email,
  description,
  links,
}: {
  title: string
  board: string
  phone?: string
  email?: string
  description?: string
  links: { label: string; href: string }[]
}) {
  return (
    <article className="card sage-border">
      <h3 className="font-heading text-lg font-semibold text-ink mb-1">
        {title}
      </h3>
      <p className="text-sm text-primary-sage font-medium mb-3">{board}</p>
      {description && (
        <p className="text-sm text-text-dark mb-3 leading-relaxed">
          {description}
        </p>
      )}
      {(phone || email) && (
        <p className="text-sm text-warm-gray mb-3">
          {phone && <span>{phone}</span>}
          {phone && email && <span className="mx-1">&middot;</span>}
          {email && <span>{email}</span>}
        </p>
      )}
      {links.length > 0 && (
        <ul className="space-y-1.5">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-sage hover:text-earth-green transition-colors text-sm font-medium inline-flex items-center gap-1"
              >
                {link.label}
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
