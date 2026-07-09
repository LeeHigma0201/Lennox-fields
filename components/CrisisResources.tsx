import { Phone, MessageCircle, Hospital } from 'lucide-react'

// ============================================================================
// CrisisResources — single source of truth for crisis contact info.
//
// Keep crisis numbers/keywords in THIS file only. They are safety-critical:
//   988          — Suicide & Crisis Lifeline (call or text), 24/7, US
//   HOME → 741741 — Crisis Text Line (verified: crisistextline.org), 24/7, US
//   911 / ER     — immediate danger
// The Crisis Text Line keyword is "HOME" (NOT "HELLO" — texting the wrong word
// does not reach a counselor).
//
// Tap-to-act links (tel:/sms:) work on phones — important for someone in distress.
// This is a server-safe component (no client hooks) so any page can use it.
// ============================================================================

interface CrisisResourcesProps {
  /** Optional heading shown above the resources. Pass null to hide. */
  heading?: string | null
  /** Optional intro sentence. */
  intro?: string
  /** Show the Veterans Crisis Line (988 then press 1). */
  showVeterans?: boolean
  className?: string
}

export default function CrisisResources({
  heading = 'Crisis support, available 24/7',
  intro = 'If you are in crisis or thinking about harming yourself, you deserve support right now. You can reach a trained counselor any time:',
  showVeterans = false,
  className = '',
}: CrisisResourcesProps) {
  return (
    <section
      aria-label="Crisis support resources"
      className={`bg-alert-red/10 border border-alert-red/30 rounded-lg p-6 ${className}`}
    >
      {heading && <h4 className="font-bold text-alert-red mb-2">{heading}</h4>}
      {intro && <p className="text-text-dark mb-4">{intro}</p>}

      <ul className="space-y-3 text-text-dark">
        <li className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-alert-red mt-0.5 flex-shrink-0" aria-hidden="true" />
          <span>
            <a href="tel:988" className="font-bold underline decoration-alert-red/40 hover:decoration-alert-red">
              Call or text 988
            </a>{' '}
            — Suicide &amp; Crisis Lifeline
          </span>
        </li>
        <li className="flex items-start gap-3">
          <MessageCircle className="w-5 h-5 text-alert-red mt-0.5 flex-shrink-0" aria-hidden="true" />
          <span>
            <a href="sms:741741" className="font-bold underline decoration-alert-red/40 hover:decoration-alert-red">
              Text HOME to 741741
            </a>{' '}
            — Crisis Text Line
          </span>
        </li>
        {showVeterans && (
          <li className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-alert-red mt-0.5 flex-shrink-0" aria-hidden="true" />
            <span>
              <a href="tel:988" className="font-bold underline decoration-alert-red/40 hover:decoration-alert-red">
                Call 988, then press 1
              </a>{' '}
              — Veterans Crisis Line
            </span>
          </li>
        )}
        <li className="flex items-start gap-3">
          <Hospital className="w-5 h-5 text-alert-red mt-0.5 flex-shrink-0" aria-hidden="true" />
          <span>
            <a href="tel:911" className="font-bold underline decoration-alert-red/40 hover:decoration-alert-red">
              Call 911
            </a>{' '}
            or go to your nearest emergency room if you are in immediate danger
          </span>
        </li>
      </ul>
    </section>
  )
}
