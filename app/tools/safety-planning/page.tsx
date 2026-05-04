'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Download, Shield, AlertTriangle, Phone } from 'lucide-react'
import NotTherapyDisclaimer from '@/components/NotTherapyDisclaimer'

interface SafetyPlan {
  warningSignsInternal: string[]
  warningSignsExternal: string[]
  copingStrategies: string[]
  socialDistractions: string[]
  professionalContacts: Array<{ name: string; phone: string; role: string }>
  supportContacts: Array<{ name: string; phone: string; relationship: string }>
  environmentSafety: string[]
  reasonsForLiving: string[]
  lastUpdated: string
}

const EMPTY_PLAN: SafetyPlan = {
  warningSignsInternal: [''],
  warningSignsExternal: [''],
  copingStrategies: [''],
  socialDistractions: [''],
  professionalContacts: [],
  supportContacts: [],
  environmentSafety: [''],
  reasonsForLiving: [''],
  lastUpdated: '',
}

export default function SafetyPlanningPage() {
  const [plan, setPlan] = useState<SafetyPlan>(EMPTY_PLAN)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    // Load saved plan from localStorage
    const saved = localStorage.getItem('safetyPlan')
    if (saved) {
      setPlan(JSON.parse(saved))
    }
  }, [])

  const handleSave = () => {
    const updatedPlan = {
      ...plan,
      lastUpdated: new Date().toLocaleString(),
    }
    localStorage.setItem('safetyPlan', JSON.stringify(updatedPlan))
    setPlan(updatedPlan)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  const handleDownload = () => {
    const content = `
SAFETY PLAN
Last Updated: ${plan.lastUpdated || 'Not yet saved'}

${'='.repeat(80)}
STEP 1: WARNING SIGNS
${'='.repeat(80)}

Internal Warning Signs (thoughts, images, mood, behavior):
${plan.warningSignsInternal.filter(s => s).map((sign, i) => `${i + 1}. ${sign}`).join('\n') || 'None listed'}

External Warning Signs (situations, people, places, events):
${plan.warningSignsExternal.filter(s => s).map((sign, i) => `${i + 1}. ${sign}`).join('\n') || 'None listed'}

${'='.repeat(80)}
STEP 2: COPING STRATEGIES (Things I can do on my own)
${'='.repeat(80)}
${plan.copingStrategies.filter(s => s).map((strategy, i) => `${i + 1}. ${strategy}`).join('\n') || 'None listed'}

${'='.repeat(80)}
STEP 3: SOCIAL CONTACTS FOR DISTRACTION
${'='.repeat(80)}
${plan.socialDistractions.filter(s => s).map((contact, i) => `${i + 1}. ${contact}`).join('\n') || 'None listed'}

${'='.repeat(80)}
STEP 4: SUPPORT CONTACTS (People I can ask for help)
${'='.repeat(80)}
${plan.supportContacts.map((contact, i) => `${i + 1}. ${contact.name} (${contact.relationship}) - ${contact.phone}`).join('\n') || 'None listed'}

${'='.repeat(80)}
STEP 5: PROFESSIONAL CONTACTS
${'='.repeat(80)}
${plan.professionalContacts.map((contact, i) => `${i + 1}. ${contact.name} (${contact.role}) - ${contact.phone}`).join('\n') || 'None listed'}

24/7 CRISIS RESOURCES:
- National Suicide Prevention Lifeline: 988
- Crisis Text Line: Text "HELLO" to 741741
- Veterans Crisis Line: 1-800-273-8255 (Press 1)

${'='.repeat(80)}
STEP 6: MAKE ENVIRONMENT SAFE
${'='.repeat(80)}
${plan.environmentSafety.filter(s => s).map((item, i) => `${i + 1}. ${item}`).join('\n') || 'None listed'}

${'='.repeat(80)}
STEP 7: REASONS FOR LIVING
${'='.repeat(80)}
${plan.reasonsForLiving.filter(s => s).map((reason, i) => `${i + 1}. ${reason}`).join('\n') || 'None listed'}

${'='.repeat(80)}
    `

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `safety-plan-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const addArrayItem = (key: keyof SafetyPlan) => {
    setPlan({ ...plan, [key]: [...plan[key] as string[], ''] })
  }

  const updateArrayItem = (key: keyof SafetyPlan, index: number, value: string) => {
    const updated = [...plan[key] as string[]]
    updated[index] = value
    setPlan({ ...plan, [key]: updated })
  }

  const removeArrayItem = (key: keyof SafetyPlan, index: number) => {
    const updated = (plan[key] as string[]).filter((_, i) => i !== index)
    setPlan({ ...plan, [key]: updated.length ? updated : [''] })
  }

  const addContact = (type: 'professionalContacts' | 'supportContacts') => {
    const newContact = type === 'professionalContacts'
      ? { name: '', phone: '', role: '' }
      : { name: '', phone: '', relationship: '' }
    setPlan({ ...plan, [type]: [...plan[type], newContact] })
  }

  const updateContact = (
    type: 'professionalContacts' | 'supportContacts',
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...plan[type] as any[]]
    updated[index] = { ...updated[index], [field]: value }
    setPlan({ ...plan, [type]: updated })
  }

  const removeContact = (type: 'professionalContacts' | 'supportContacts', index: number) => {
    const updated = (plan[type] as any[]).filter((_, i) => i !== index)
    setPlan({ ...plan, [type]: updated })
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Crisis Banner */}
      <div className="bg-alert-red text-white py-4">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-4 text-sm sm:text-base">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <p className="font-medium">
              <strong>In Crisis Now?</strong> Call 988 (Suicide & Crisis Lifeline) or Text "HELLO" to 741741
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="bg-white border-b border-warm-gray/20 py-8">
        <div className="container-custom">
          <Link
            href="/resources"
            className="inline-flex items-center text-primary-sage hover:text-earth-green mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Back to Resources
          </Link>
          <div className="flex items-start gap-4">
            <Shield className="w-12 h-12 text-primary-sage flex-shrink-0 mt-2" aria-hidden="true" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
                Create Your Safety Plan
              </h1>
              <p className="text-lg text-warm-gray max-w-3xl">
                A safety plan is a prioritized written list of coping strategies and sources of support that you can use
                during a suicidal crisis. Research shows that safety planning reduces suicide attempts.
              </p>
            </div>
          </div>
          {plan.lastUpdated && (
            <div className="mt-4 text-sm text-warm-gray">
              Last updated: {plan.lastUpdated}
            </div>
          )}
        </div>
      </section>

      {/* Form */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl space-y-8">
          <NotTherapyDisclaimer />
          {/* Step 1 */}
          <div className="card">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-primary-sage text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-dark">Recognize Warning Signs</h2>
                <p className="text-warm-gray mt-1">
                  Identify thoughts, images, moods, situations, and behaviors that indicate a crisis may be developing.
                </p>
              </div>
            </div>

            <div className="space-y-4 ml-11">
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">
                  Internal Warning Signs (thoughts, feelings, behaviors)
                </label>
                {plan.warningSignsInternal.map((sign, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={sign}
                      onChange={(e) => updateArrayItem('warningSignsInternal', index, e.target.value)}
                      placeholder="e.g., Feeling hopeless, thinking 'I can't take this anymore'"
                      className="flex-1 p-3 border border-warm-gray/30 rounded-lg focus:ring-2 focus:ring-primary-sage focus:border-primary-sage"
                    />
                    {plan.warningSignsInternal.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('warningSignsInternal', index)}
                        className="text-alert-red hover:text-alert-red/80"
                        aria-label="Remove"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('warningSignsInternal')}
                  className="text-sm text-primary-sage hover:text-earth-green font-medium"
                >
                  + Add another
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">
                  External Warning Signs (situations, people, places, events)
                </label>
                {plan.warningSignsExternal.map((sign, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={sign}
                      onChange={(e) => updateArrayItem('warningSignsExternal', index, e.target.value)}
                      placeholder="e.g., Argument with partner, anniversary of loss"
                      className="flex-1 p-3 border border-warm-gray/30 rounded-lg focus:ring-2 focus:ring-primary-sage focus:border-primary-sage"
                    />
                    {plan.warningSignsExternal.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('warningSignsExternal', index)}
                        className="text-alert-red hover:text-alert-red/80"
                        aria-label="Remove"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('warningSignsExternal')}
                  className="text-sm text-primary-sage hover:text-earth-green font-medium"
                >
                  + Add another
                </button>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="card">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-primary-sage text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-dark">Internal Coping Strategies</h2>
                <p className="text-warm-gray mt-1">
                  Things you can do on your own to take your mind off problems without contacting others.
                </p>
              </div>
            </div>

            <div className="ml-11">
              {plan.copingStrategies.map((strategy, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={strategy}
                    onChange={(e) => updateArrayItem('copingStrategies', index, e.target.value)}
                    placeholder="e.g., Exercise, listen to music, take a walk, meditate"
                    className="flex-1 p-3 border border-warm-gray/30 rounded-lg focus:ring-2 focus:ring-primary-sage focus:border-primary-sage"
                  />
                  {plan.copingStrategies.length > 1 && (
                    <button
                      onClick={() => removeArrayItem('copingStrategies', index)}
                      className="text-alert-red hover:text-alert-red/80"
                      aria-label="Remove"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem('copingStrategies')}
                className="text-sm text-primary-sage hover:text-earth-green font-medium"
              >
                + Add another
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="card">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-primary-sage text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-dark">Social Contacts for Distraction</h2>
                <p className="text-warm-gray mt-1">
                  People and social settings that provide distraction (without discussing suicidal thoughts).
                </p>
              </div>
            </div>

            <div className="ml-11">
              {plan.socialDistractions.map((contact, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => updateArrayItem('socialDistractions', index, e.target.value)}
                    placeholder="e.g., Friend's name, coffee shop, gym, church"
                    className="flex-1 p-3 border border-warm-gray/30 rounded-lg focus:ring-2 focus:ring-primary-sage focus:border-primary-sage"
                  />
                  {plan.socialDistractions.length > 1 && (
                    <button
                      onClick={() => removeArrayItem('socialDistractions', index)}
                      className="text-alert-red hover:text-alert-red/80"
                      aria-label="Remove"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem('socialDistractions')}
                className="text-sm text-primary-sage hover:text-earth-green font-medium"
              >
                + Add another
              </button>
            </div>
          </div>

          {/* Step 4 */}
          <div className="card">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-primary-sage text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-dark">Support Contacts</h2>
                <p className="text-warm-gray mt-1">
                  Family members, friends, or others who can help when in crisis.
                </p>
              </div>
            </div>

            <div className="ml-11 space-y-3">
              {plan.supportContacts.map((contact, index) => (
                <div key={index} className="p-4 bg-cream rounded-lg space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) => updateContact('supportContacts', index, 'name', e.target.value)}
                      placeholder="Name"
                      className="flex-1 p-2 border border-warm-gray/30 rounded focus:ring-2 focus:ring-primary-sage focus:border-primary-sage"
                    />
                    <input
                      type="text"
                      value={contact.relationship}
                      onChange={(e) => updateContact('supportContacts', index, 'relationship', e.target.value)}
                      placeholder="Relationship"
                      className="flex-1 p-2 border border-warm-gray/30 rounded focus:ring-2 focus:ring-primary-sage focus:border-primary-sage"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => updateContact('supportContacts', index, 'phone', e.target.value)}
                      placeholder="Phone number"
                      className="flex-1 p-2 border border-warm-gray/30 rounded focus:ring-2 focus:ring-primary-sage focus:border-primary-sage"
                    />
                    <button
                      onClick={() => removeContact('supportContacts', index)}
                      className="text-alert-red hover:text-alert-red/80 px-2"
                      aria-label="Remove contact"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => addContact('supportContacts')}
                className="text-sm text-primary-sage hover:text-earth-green font-medium"
              >
                + Add support contact
              </button>
            </div>
          </div>

          {/* Step 5 */}
          <div className="card">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-primary-sage text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                5
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-dark">Professional Contacts</h2>
                <p className="text-warm-gray mt-1">
                  Mental health professionals or agencies who can be contacted during a crisis.
                </p>
              </div>
            </div>

            <div className="ml-11 space-y-3">
              {plan.professionalContacts.map((contact, index) => (
                <div key={index} className="p-4 bg-cream rounded-lg space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) => updateContact('professionalContacts', index, 'name', e.target.value)}
                      placeholder="Name or Agency"
                      className="flex-1 p-2 border border-warm-gray/30 rounded focus:ring-2 focus:ring-primary-sage focus:border-primary-sage"
                    />
                    <input
                      type="text"
                      value={contact.role}
                      onChange={(e) => updateContact('professionalContacts', index, 'role', e.target.value)}
                      placeholder="Role (e.g., Therapist, Crisis Center)"
                      className="flex-1 p-2 border border-warm-gray/30 rounded focus:ring-2 focus:ring-primary-sage focus:border-primary-sage"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => updateContact('professionalContacts', index, 'phone', e.target.value)}
                      placeholder="Phone number"
                      className="flex-1 p-2 border border-warm-gray/30 rounded focus:ring-2 focus:ring-primary-sage focus:border-primary-sage"
                    />
                    <button
                      onClick={() => removeContact('professionalContacts', index)}
                      className="text-alert-red hover:text-alert-red/80 px-2"
                      aria-label="Remove contact"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => addContact('professionalContacts')}
                className="text-sm text-primary-sage hover:text-earth-green font-medium"
              >
                + Add professional contact
              </button>

              <div className="mt-4 p-4 bg-clinical-blue/10 rounded-lg">
                <p className="font-bold text-text-dark mb-2">24/7 Crisis Resources:</p>
                <div className="space-y-1 text-sm text-text-dark">
                  <p><Phone className="w-4 h-4 inline mr-2" aria-hidden="true" /><strong>988</strong> - Suicide & Crisis Lifeline</p>
                  <p><Phone className="w-4 h-4 inline mr-2" aria-hidden="true" />Text <strong>"HELLO"</strong> to <strong>741741</strong> - Crisis Text Line</p>
                  <p><Phone className="w-4 h-4 inline mr-2" aria-hidden="true" /><strong>1-800-273-8255 (Press 1)</strong> - Veterans Crisis Line</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="card">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-primary-sage text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                6
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-dark">Make Environment Safe</h2>
                <p className="text-warm-gray mt-1">
                  Steps to limit access to lethal means during a crisis.
                </p>
              </div>
            </div>

            <div className="ml-11">
              {plan.environmentSafety.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateArrayItem('environmentSafety', index, e.target.value)}
                    placeholder="e.g., Give medications to trusted person, remove firearms from home"
                    className="flex-1 p-3 border border-warm-gray/30 rounded-lg focus:ring-2 focus:ring-primary-sage focus:border-primary-sage"
                  />
                  {plan.environmentSafety.length > 1 && (
                    <button
                      onClick={() => removeArrayItem('environmentSafety', index)}
                      className="text-alert-red hover:text-alert-red/80"
                      aria-label="Remove"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem('environmentSafety')}
                className="text-sm text-primary-sage hover:text-earth-green font-medium"
              >
                + Add another
              </button>
            </div>
          </div>

          {/* Step 7 */}
          <div className="card">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-primary-sage text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                7
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-dark">Reasons for Living</h2>
                <p className="text-warm-gray mt-1">
                  The most important people, pets, events, or values that make life worth living.
                </p>
              </div>
            </div>

            <div className="ml-11">
              {plan.reasonsForLiving.map((reason, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => updateArrayItem('reasonsForLiving', index, e.target.value)}
                    placeholder="e.g., My children, my dog, wanting to see my grandchildren grow up"
                    className="flex-1 p-3 border border-warm-gray/30 rounded-lg focus:ring-2 focus:ring-primary-sage focus:border-primary-sage"
                  />
                  {plan.reasonsForLiving.length > 1 && (
                    <button
                      onClick={() => removeArrayItem('reasonsForLiving', index)}
                      className="text-alert-red hover:text-alert-red/80"
                      aria-label="Remove"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem('reasonsForLiving')}
                className="text-sm text-primary-sage hover:text-earth-green font-medium"
              >
                + Add another
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sticky bottom-4">
            <button
              onClick={handleSave}
              className="btn btn-primary flex-1 relative"
            >
              <Save className="w-4 h-4 mr-2" aria-hidden="true" />
              {isSaved ? '✓ Saved!' : 'Save Safety Plan'}
            </button>
            <button
              onClick={handleDownload}
              className="btn btn-outline flex-1"
            >
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              Download as Text
            </button>
          </div>
        </div>
      </section>

      {/* Information */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-6 text-center">About Safety Planning</h2>
          <div className="prose max-w-none text-warm-gray">
            <p className="mb-4">
              The Safety Planning Intervention (SPI) was developed by Dr. Barbara Stanley and Dr. Gregory Brown. Research
              shows that individuals who complete a safety plan are significantly less likely to attempt suicide than those
              who do not.
            </p>
            <p className="mb-4">
              <strong className="text-text-dark">Your safety plan should be:</strong>
            </p>
            <ul className="space-y-2 mb-4 ml-6">
              <li>Written in your own words</li>
              <li>Brief and to the point</li>
              <li>Kept in a place where you can easily access it during a crisis</li>
              <li>Shared with your therapist, trusted friends, or family members</li>
              <li>Updated regularly as your situation changes</li>
            </ul>
            <div className="bg-primary-sage/10 border border-primary-sage/30 rounded-lg p-6">
              <p className="text-text-dark">
                <strong>Privacy Note:</strong> Your safety plan is saved locally on your device only. We do not have access
                to your plan. We recommend downloading a copy and sharing it with your therapist or a trusted person.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
