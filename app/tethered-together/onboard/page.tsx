'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, Users, Target, SkipForward, Copy, Check } from 'lucide-react'

const onboardQuotes = [
  { text: "Rarely, if ever, are any of us healed in isolation. Healing is an act of communion.", author: 'bell hooks', url: 'https://www.mahoganybooks.com/9780060959470' },
  { text: "Love is a combination of care, commitment, knowledge, responsibility, respect, and trust.", author: 'bell hooks', url: 'https://www.mahoganybooks.com/9780060938291' },
  { text: "Happy marriages are based on a deep friendship.", author: 'John Gottman, Ph.D.', url: 'https://www.gottman.com/product/the-seven-principles-for-making-marriage-work/' },
]

type Step = 'family' | 'invite' | 'goals'

export default function TetherOnboard() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('family')
  const [familyName, setFamilyName] = useState('')
  const [partnerName, setPartnerName] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [goals, setGoals] = useState<string[]>([])
  const [goalInput, setGoalInput] = useState('')
  const [user, setUser] = useState<any>(null)
  const [onboardQuote] = useState(() => onboardQuotes[Math.floor(Math.random() * onboardQuotes.length)])

  useEffect(() => {
    const stored = localStorage.getItem('tether_user')
    if (!stored) {
      router.push('/tethered-together/signup')
      return
    }
    setUser(JSON.parse(stored))
  }, [router])

  const createFamily = () => {
    if (!familyName.trim()) return
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    const family = {
      id: crypto.randomUUID(),
      name: familyName,
      inviteCode: code,
      members: [
        { id: user.id, displayName: user.displayName, role: 'PARTNER', joinedAt: new Date().toISOString() }
      ],
      goals: [],
      lists: [],
      createdAt: new Date().toISOString(),
    }

    const families = JSON.parse(localStorage.getItem('tether_families') || '[]')
    families.push(family)
    localStorage.setItem('tether_families', JSON.stringify(families))
    localStorage.setItem('tether_active_family', family.id)
    setInviteCode(code)
    setStep('invite')
  }

  const copyInviteLink = () => {
    const link = `${window.location.origin}/tethered-together/signup?invite=${inviteCode}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const addGoal = () => {
    if (!goalInput.trim()) return
    const newGoals = [...goals, goalInput.trim()]
    setGoals(newGoals)
    setGoalInput('')

    // Save to family
    const families = JSON.parse(localStorage.getItem('tether_families') || '[]')
    const familyId = localStorage.getItem('tether_active_family')
    const family = families.find((f: any) => f.id === familyId)
    if (family) {
      family.goals = newGoals.map((g, i) => ({ id: crypto.randomUUID(), title: g, status: 'ACTIVE' }))
      localStorage.setItem('tether_families', JSON.stringify(families))
    }
  }

  const goToDashboard = () => {
    router.push('/tethered-together/dashboard')
  }

  const suggestedGoals = [
    'Divide household tasks more fairly',
    'Reduce mental load stress',
    'Better communication about responsibilities',
    'More quality time together',
    'Get the kids\' routines running smoothly',
    'Feel like a team again',
  ]

  if (!user) return null

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4" style={{ background: 'linear-gradient(160deg, #FAF9F7 0%, #f5ede8 100%)' }}>
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-soft ring-3 ring-white/60 mx-auto mb-3">
            <Image src="/images/LFLogo.jpeg" alt="Lennox Fields" fill className="object-cover" />
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {(['family', 'invite', 'goals'] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300"
                  style={{
                    background: step === s || (['family', 'invite', 'goals'].indexOf(step) > i)
                      ? '#75856f' : '#e8e4e0',
                    color: step === s || (['family', 'invite', 'goals'].indexOf(step) > i)
                      ? 'white' : '#8a7362',
                  }}
                >
                  {i + 1}
                </div>
                {i < 2 && <div className="w-8 h-px" style={{ background: '#d1ccc7' }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Create Family */}
        {step === 'family' && (
          <div className="bg-white rounded-2xl shadow-soft p-8 animate-fade-in">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: '#75856f15' }}>
              <Users className="w-6 h-6" style={{ color: '#75856f' }} />
            </div>
            <h2 className="font-heading text-2xl font-bold text-text-dark mb-2">
              Name Your Space
            </h2>
            <p className="text-warm-gray mb-6">
              This is the name both of you will see. Make it yours.
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="familyName" className="block text-sm font-medium text-text-dark mb-1.5">
                  Family / Partnership Name
                </label>
                <input
                  id="familyName"
                  type="text"
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  placeholder="e.g. The Walls Family, Team Us, Our Home"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none transition-all text-text-dark"
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #75856f40'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                  onKeyDown={(e) => e.key === 'Enter' && createFamily()}
                  autoFocus
                />
              </div>

              <button
                onClick={createFamily}
                disabled={!familyName.trim()}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-md disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, #75856f 0%, #6B8E4E 100%)' }}
              >
                Create Space
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Invite Partner */}
        {step === 'invite' && (
          <div className="bg-white rounded-2xl shadow-soft p-8 animate-fade-in">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: '#C0919115' }}>
              <Users className="w-6 h-6" style={{ color: '#C09191' }} />
            </div>
            <h2 className="font-heading text-2xl font-bold text-text-dark mb-2">
              Invite Your Partner
            </h2>
            <p className="text-warm-gray mb-6">
              Share this link so they can join with their own account. Equal access, equal ownership.
            </p>

            <div className="space-y-4">
              {/* Invite Link */}
              <div className="p-4 rounded-xl border border-dashed" style={{ borderColor: '#75856f50', background: '#75856f08' }}>
                <p className="text-xs font-medium mb-2" style={{ color: '#75856f' }}>Invite Link</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-sm text-text-dark truncate">
                    {typeof window !== 'undefined' ? `${window.location.origin}/tethered-together/signup?invite=${inviteCode}` : ''}
                  </code>
                  <button
                    onClick={copyInviteLink}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                    style={{ background: copied ? '#6B8E4E' : '#75856f', color: 'white' }}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <p className="text-xs text-warm-gray text-center">
                Your partner will create their own account and automatically join <strong>{familyName}</strong>
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('goals')}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-md"
                  style={{ background: 'linear-gradient(135deg, #75856f 0%, #6B8E4E 100%)' }}
                >
                  Next: Set Goals
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={goToDashboard}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all text-warm-gray hover:text-text-dark"
              >
                <SkipForward className="w-4 h-4" />
                Skip to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Goals */}
        {step === 'goals' && (
          <div className="bg-white rounded-2xl shadow-soft p-8 animate-fade-in">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: '#C5A87D15' }}>
              <Target className="w-6 h-6" style={{ color: '#C5A87D' }} />
            </div>
            <h2 className="font-heading text-2xl font-bold text-text-dark mb-2">
              What Are You Working Toward?
            </h2>
            <p className="text-warm-gray mb-6">
              Goals give your tasks meaning. Add a few, or skip straight to the list — no judgment.
            </p>

            <div className="space-y-4">
              {/* Added goals */}
              {goals.length > 0 && (
                <div className="space-y-2">
                  {goals.map((goal, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#75856f08' }}>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#75856f20' }}>
                        <Check className="w-3.5 h-3.5" style={{ color: '#75856f' }} />
                      </div>
                      <span className="text-text-dark text-sm">{goal}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  placeholder="Add a goal..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none transition-all text-text-dark text-sm"
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #75856f40'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                  onKeyDown={(e) => e.key === 'Enter' && addGoal()}
                />
                <button
                  onClick={addGoal}
                  disabled={!goalInput.trim()}
                  className="px-4 py-3 rounded-xl text-white font-medium text-sm transition-all disabled:opacity-40"
                  style={{ background: '#75856f' }}
                >
                  Add
                </button>
              </div>

              {/* Suggestions */}
              <div>
                <p className="text-xs font-medium text-warm-gray mb-2">Suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedGoals.filter(g => !goals.includes(g)).slice(0, 4).map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => { setGoals([...goals, suggestion]) }}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:shadow-soft"
                      style={{ borderColor: '#d1ccc7', color: '#6B6560' }}
                    >
                      + {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep('invite')}
                  className="px-4 py-3 rounded-xl font-medium text-warm-gray hover:text-text-dark transition-all"
                >
                  <ArrowLeft className="w-4 h-4 inline mr-1" />
                  Back
                </button>
                <button
                  onClick={goToDashboard}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-md"
                  style={{ background: 'linear-gradient(135deg, #75856f 0%, #6B8E4E 100%)' }}
                >
                  {goals.length > 0 ? 'Go to Dashboard' : 'Skip to Dashboard'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rotational quote */}
        <p className="text-center text-xs text-warm-gray/60 mt-8 max-w-sm mx-auto italic leading-relaxed">
          &ldquo;{onboardQuote.text}&rdquo;{' '}
          <a href={onboardQuote.url} target="_blank" rel="noopener noreferrer" className="not-italic hover:underline" style={{ color: '#75856f' }}>
            &mdash; {onboardQuote.author}
          </a>
        </p>
      </div>
    </div>
  )
}
