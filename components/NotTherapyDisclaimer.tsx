import { ShieldAlert } from 'lucide-react'

type Variant = 'banner' | 'card' | 'inline'

type Props = {
  variant?: Variant
  className?: string
}

const COPY = {
  heading: 'These tools are not a substitute for therapy.',
  body:
    'Screenings, worksheets, and resources on this site are for education and self-reflection — not diagnosis or treatment. If you are struggling, please reach out to a licensed mental health professional. In a crisis, call or text 988, or go to your nearest emergency room.',
}

export default function NotTherapyDisclaimer({ variant = 'card', className = '' }: Props) {
  if (variant === 'inline') {
    return (
      <p
        className={`text-sm text-warm-gray leading-relaxed ${className}`}
        role="note"
      >
        <strong className="text-text-dark">{COPY.heading}</strong> {COPY.body}
      </p>
    )
  }

  if (variant === 'banner') {
    return (
      <div
        className={`bg-warm-sand/10 border-y border-warm-sand/30 ${className}`}
        role="note"
      >
        <div className="container-custom py-4 flex items-start gap-3">
          <ShieldAlert
            className="w-5 h-5 text-warm-sand flex-shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="text-sm text-text-dark leading-relaxed">
            <strong>{COPY.heading}</strong> {COPY.body}
          </p>
        </div>
      </div>
    )
  }

  return (
    <aside
      className={`bg-paper border-l-4 border-warm-sand rounded-r-lg p-6 ${className}`}
      role="note"
      aria-label="Not a substitute for therapy"
    >
      <div className="flex items-start gap-3">
        <ShieldAlert
          className="w-5 h-5 text-warm-sand flex-shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div>
          <h3 className="font-heading text-lg font-semibold text-ink mb-2">
            {COPY.heading}
          </h3>
          <p className="text-sm text-text-dark leading-relaxed">{COPY.body}</p>
        </div>
      </div>
    </aside>
  )
}
