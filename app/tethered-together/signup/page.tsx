'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function TetherSignup() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Prototype: store in localStorage
    const user = {
      id: crypto.randomUUID(),
      displayName: name,
      email,
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem('tether_user', JSON.stringify(user))

    // Check if joining via invite
    const pendingInvite = localStorage.getItem('tether_pending_invite')
    if (pendingInvite) {
      // Join existing family
      const families = JSON.parse(localStorage.getItem('tether_families') || '[]')
      const family = families.find((f: any) => f.inviteCode === pendingInvite)
      if (family) {
        family.members.push({ id: user.id, displayName: name, role: 'PARTNER', joinedAt: new Date().toISOString() })
        localStorage.setItem('tether_families', JSON.stringify(families))
        localStorage.setItem('tether_active_family', family.id)
        localStorage.removeItem('tether_pending_invite')
        router.push('/tethered-together/dashboard')
        return
      }
    }

    router.push('/tethered-together/onboard')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4" style={{ background: 'linear-gradient(160deg, #FAF9F7 0%, #f5ede8 100%)' }}>
      <div className="w-full max-w-md">
        {/* Logo + Header */}
        <div className="text-center mb-8">
          <Link href="/tethered-together" className="inline-block">
            <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-soft ring-3 ring-white/60 mx-auto mb-4">
              <Image src="/images/LFLogo.jpeg" alt="Lennox Fields" fill className="object-cover" />
            </div>
          </Link>
          <h1 className="font-heading text-3xl font-bold text-text-dark">
            Join Tethered Together
          </h1>
          <p className="text-warm-gray mt-2">Create your account to start sharing the load</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="bg-white rounded-2xl shadow-soft p-8 space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-dark mb-1.5">
              Your First Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What should your partner see?"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent transition-all text-text-dark"
              onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #75856f40'}
              onBlur={(e) => e.target.style.boxShadow = 'none'}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent transition-all text-text-dark"
              onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #75856f40'}
              onBlur={(e) => e.target.style.boxShadow = 'none'}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-dark mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                minLength={8}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent transition-all text-text-dark pr-12"
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #75856f40'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-warm-gray hover:text-text-dark transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-medium text-base transition-all duration-300 hover:shadow-md disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #75856f 0%, #6B8E4E 100%)' }}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-center text-sm text-warm-gray pt-2">
            Already have an account?{' '}
            <Link href="/tethered-together/login" className="font-medium hover:underline" style={{ color: '#75856f' }}>
              Sign in
            </Link>
          </p>
        </form>

        <p className="text-center text-xs text-warm-gray/60 mt-6 max-w-xs mx-auto italic leading-relaxed">
          &ldquo;Rarely, if ever, are any of us healed in isolation. Healing is an act of communion.&rdquo;{' '}
          <a href="https://www.mahoganybooks.com/9780060959470" target="_blank" rel="noopener noreferrer" className="not-italic hover:underline" style={{ color: '#75856f' }}>
            &mdash; bell hooks
          </a>
        </p>
      </div>
    </div>
  )
}
