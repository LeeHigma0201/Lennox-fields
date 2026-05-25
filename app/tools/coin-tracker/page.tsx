'use client'

import { useState, useEffect } from 'react'
import { Coins, Plus, Gift, Trash2, RotateCcw, Printer, Star, Award, X } from 'lucide-react'

// Kids Coin Tracker — a token-economy / reward-chart tool.
// Clinically grounded: token economies are strengths-based and work best when coins
// are EARNED, not taken away as punishment (response cost can shame neurodivergent kids).
// Data persists in the browser only (localStorage) until accounts ship.

interface Kid {
  id: string
  name: string
  color: string
  balance: number
}
interface EarnAction {
  id: string
  label: string
  value: number
}
interface Reward {
  id: string
  label: string
  cost: number
}
interface LogEntry {
  id: string
  kidId: string
  kidName: string
  type: 'earn' | 'redeem'
  label: string
  amount: number
  ts: number
}
interface CoinState {
  kids: Kid[]
  earnActions: EarnAction[]
  rewards: Reward[]
  log: LogEntry[]
  activeKidId: string | null
}

const KID_COLORS = ['#75856f', '#C09191', '#C5A87D', '#6B8E4E', '#8a7362', '#5a6e54']
const STORAGE_KEY = 'lf_coin_tracker_v1'
const uid = () => Math.random().toString(36).slice(2, 10)

function defaultState(): CoinState {
  const kidId = uid()
  return {
    kids: [{ id: kidId, name: 'My kiddo', color: KID_COLORS[0], balance: 0 }],
    activeKidId: kidId,
    earnActions: [
      { id: uid(), label: 'Got myself started on a hard task', value: 2 },
      { id: uid(), label: 'Took a calm-down break when I needed it', value: 3 },
      { id: uid(), label: 'Named a big feeling out loud', value: 3 },
      { id: uid(), label: 'Helped someone without being asked', value: 2 },
      { id: uid(), label: 'Finished something that felt tough', value: 5 },
      { id: uid(), label: 'Got ready on time', value: 2 },
    ],
    rewards: [
      { id: uid(), label: 'Pick the music', cost: 5 },
      { id: uid(), label: '15 min extra screen time', cost: 10 },
      { id: uid(), label: 'Small treat', cost: 12 },
      { id: uid(), label: 'Choose dinner', cost: 15 },
      { id: uid(), label: 'Special one-on-one time', cost: 20 },
    ],
    log: [],
  }
}

export default function CoinTrackerPage() {
  const [state, setState] = useState<CoinState>(defaultState)
  const [mounted, setMounted] = useState(false)
  const [newEarn, setNewEarn] = useState({ label: '', value: '' })
  const [newReward, setNewReward] = useState({ label: '', cost: '' })
  const [newKid, setNewKid] = useState('')

  // Load from localStorage after mount (avoids hydration mismatch).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setState(JSON.parse(saved))
    } catch {
      /* ignore corrupt storage */
    }
    setMounted(true)
  }, [])

  // Persist on change (after first load).
  useEffect(() => {
    if (mounted) localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state, mounted])

  const activeKid = state.kids.find((k) => k.id === state.activeKidId) ?? state.kids[0]

  function award(action: EarnAction) {
    if (!activeKid) return
    setState((s) => ({
      ...s,
      kids: s.kids.map((k) =>
        k.id === activeKid.id ? { ...k, balance: k.balance + action.value } : k
      ),
      log: [
        { id: uid(), kidId: activeKid.id, kidName: activeKid.name, type: 'earn' as const, label: action.label, amount: action.value, ts: Date.now() },
        ...s.log,
      ].slice(0, 100),
    }))
  }

  function redeem(reward: Reward) {
    if (!activeKid || activeKid.balance < reward.cost) return
    setState((s) => ({
      ...s,
      kids: s.kids.map((k) =>
        k.id === activeKid.id ? { ...k, balance: k.balance - reward.cost } : k
      ),
      log: [
        { id: uid(), kidId: activeKid.id, kidName: activeKid.name, type: 'redeem' as const, label: reward.label, amount: reward.cost, ts: Date.now() },
        ...s.log,
      ].slice(0, 100),
    }))
  }

  function addKid() {
    const name = newKid.trim()
    if (!name) return
    const id = uid()
    setState((s) => ({
      ...s,
      kids: [...s.kids, { id, name, color: KID_COLORS[s.kids.length % KID_COLORS.length], balance: 0 }],
      activeKidId: id,
    }))
    setNewKid('')
  }

  function removeKid(id: string) {
    setState((s) => {
      const kids = s.kids.filter((k) => k.id !== id)
      return { ...s, kids, activeKidId: s.activeKidId === id ? kids[0]?.id ?? null : s.activeKidId }
    })
  }

  function addEarn() {
    const label = newEarn.label.trim()
    const value = parseInt(newEarn.value, 10)
    if (!label || !Number.isFinite(value) || value <= 0) return
    setState((s) => ({ ...s, earnActions: [...s.earnActions, { id: uid(), label, value }] }))
    setNewEarn({ label: '', value: '' })
  }

  function addRewardItem() {
    const label = newReward.label.trim()
    const cost = parseInt(newReward.cost, 10)
    if (!label || !Number.isFinite(cost) || cost <= 0) return
    setState((s) => ({ ...s, rewards: [...s.rewards, { id: uid(), label, cost }] }))
    setNewReward({ label: '', cost: '' })
  }

  function resetAll() {
    if (typeof window !== 'undefined' && window.confirm('Reset everyone back to 0 coins and clear the activity log? Your earn actions and rewards stay.')) {
      setState((s) => ({
        ...s,
        kids: s.kids.map((k) => ({ ...k, balance: 0 })),
        log: [],
      }))
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #FAF9F7 0%, #f5ede8 100%)' }}>
      <div className="container-custom py-12 md:py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5" style={{ background: '#75856f15' }}>
            <Coins className="w-8 h-8" style={{ color: '#75856f' }} />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-dark mb-4">Coin Tracker</h1>
          <p className="text-lg text-warm-gray leading-relaxed">
            A gentle reward system that celebrates what your kid is already doing well. Catch the good,
            hand out coins, trade them for rewards you choose together.
          </p>
          <div className="mt-5 inline-flex items-start gap-2 text-left px-4 py-3 rounded-xl text-sm" style={{ background: '#C5A87D20', color: '#8a7362' }}>
            <Star className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#C5A87D' }} />
            <span>Coins are only ever <strong>earned</strong>, never taken away. Token systems work best
            when they build a kid up, not when they are used as punishment.</span>
          </div>
        </div>

        {/* Kid selector */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap items-center gap-2 justify-center">
            {state.kids.map((kid) => (
              <button
                key={kid.id}
                onClick={() => setState((s) => ({ ...s, activeKidId: kid.id }))}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all"
                style={{
                  background: activeKid?.id === kid.id ? kid.color : 'white',
                  color: activeKid?.id === kid.id ? 'white' : '#3f3f3f',
                  boxShadow: activeKid?.id === kid.id ? '0 4px 12px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.05)',
                }}
              >
                <span>{kid.name}</span>
                <span className="text-xs opacity-80">{kid.balance}</span>
                {state.kids.length > 1 && (
                  <X
                    className="w-3.5 h-3.5 opacity-0 group-hover:opacity-70 hover:!opacity-100"
                    onClick={(e) => { e.stopPropagation(); removeKid(kid.id) }}
                  />
                )}
              </button>
            ))}
            <div className="inline-flex items-center gap-1">
              <input
                value={newKid}
                onChange={(e) => setNewKid(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addKid()}
                placeholder="Add a kid"
                className="w-28 px-3 py-2 rounded-full border text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: '#75856f40' }}
              />
              <button onClick={addKid} className="w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ background: '#75856f' }} aria-label="Add kid">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Balance */}
        {activeKid && (
          <div className="max-w-4xl mx-auto mb-10 text-center">
            <div className="inline-flex flex-col items-center px-10 py-6 rounded-3xl bg-white shadow-soft">
              <span className="text-sm uppercase tracking-wider text-warm-gray mb-1">{activeKid.name} has</span>
              <span className="font-heading text-6xl font-bold flex items-center gap-3" style={{ color: activeKid.color }}>
                <Coins className="w-10 h-10" />
                {activeKid.balance}
              </span>
              <span className="text-sm text-warm-gray mt-1">coins</span>
            </div>
          </div>
        )}

        {/* Earn + Redeem columns */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Earn */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5" style={{ color: '#6B8E4E' }} />
              <h2 className="font-heading text-xl font-semibold text-text-dark">Ways to earn coins</h2>
            </div>
            <div className="space-y-2">
              {state.earnActions.map((a) => (
                <button
                  key={a.id}
                  onClick={() => award(a)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-left transition-all hover:shadow-soft"
                  style={{ background: '#6B8E4E10' }}
                >
                  <span className="text-text-dark">{a.label}</span>
                  <span className="inline-flex items-center gap-1 font-semibold whitespace-nowrap" style={{ color: '#6B8E4E' }}>
                    <Plus className="w-4 h-4" />{a.value}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input
                value={newEarn.label}
                onChange={(e) => setNewEarn({ ...newEarn, label: e.target.value })}
                placeholder="Add your own (e.g. brushed teeth)"
                className="flex-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: '#75856f40' }}
              />
              <input
                value={newEarn.value}
                onChange={(e) => setNewEarn({ ...newEarn, value: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && addEarn()}
                placeholder="+"
                inputMode="numeric"
                className="w-14 px-2 py-2 rounded-lg border text-sm text-center focus:outline-none focus:ring-2"
                style={{ borderColor: '#75856f40' }}
              />
              <button onClick={addEarn} className="w-9 h-9 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ background: '#6B8E4E' }} aria-label="Add earn action">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Redeem */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-5 h-5" style={{ color: '#C09191' }} />
              <h2 className="font-heading text-xl font-semibold text-text-dark">Rewards to trade for</h2>
            </div>
            <div className="space-y-2">
              {state.rewards.map((r) => {
                const canAfford = !!activeKid && activeKid.balance >= r.cost
                return (
                  <button
                    key={r.id}
                    onClick={() => redeem(r)}
                    disabled={!canAfford}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:shadow-soft"
                    style={{ background: '#C0919110' }}
                  >
                    <span className="text-text-dark">{r.label}</span>
                    <span className="inline-flex items-center gap-1 font-semibold whitespace-nowrap" style={{ color: '#C09191' }}>
                      <Coins className="w-4 h-4" />{r.cost}
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input
                value={newReward.label}
                onChange={(e) => setNewReward({ ...newReward, label: e.target.value })}
                placeholder="Add a reward (e.g. movie night)"
                className="flex-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: '#75856f40' }}
              />
              <input
                value={newReward.cost}
                onChange={(e) => setNewReward({ ...newReward, cost: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && addRewardItem()}
                placeholder="#"
                inputMode="numeric"
                className="w-14 px-2 py-2 rounded-lg border text-sm text-center focus:outline-none focus:ring-2"
                style={{ borderColor: '#75856f40' }}
              />
              <button onClick={addRewardItem} className="w-9 h-9 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ background: '#C09191' }} aria-label="Add reward">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Activity log */}
        {state.log.length > 0 && (
          <div className="max-w-5xl mx-auto mt-8 bg-white rounded-2xl shadow-soft p-6">
            <h2 className="font-heading text-xl font-semibold text-text-dark mb-4">Recent activity</h2>
            <ul className="space-y-1.5 max-h-64 overflow-y-auto">
              {state.log.map((e) => (
                <li key={e.id} className="flex items-center justify-between text-sm py-1.5 border-b last:border-0" style={{ borderColor: '#00000008' }}>
                  <span className="text-warm-gray">
                    <span className="font-medium text-text-dark">{e.kidName}</span>{' '}
                    {e.type === 'earn' ? 'earned' : 'traded for'} {e.label}
                  </span>
                  <span className="font-semibold whitespace-nowrap" style={{ color: e.type === 'earn' ? '#6B8E4E' : '#C09191' }}>
                    {e.type === 'earn' ? '+' : '-'}{e.amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer actions */}
        <div className="max-w-5xl mx-auto mt-8 flex flex-wrap items-center justify-center gap-3">
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border font-medium text-sm transition-all hover:shadow-soft" style={{ borderColor: '#75856f60', color: '#75856f' }}>
            <Printer className="w-4 h-4" /> Print chart
          </button>
          <button onClick={resetAll} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border font-medium text-sm transition-all hover:shadow-soft" style={{ borderColor: '#C0919160', color: '#C09191' }}>
            <RotateCcw className="w-4 h-4" /> Reset coins
          </button>
        </div>

        <p className="max-w-2xl mx-auto mt-8 text-center text-xs text-warm-gray">
          Everything here is saved on this device only. Nothing is sent anywhere. Built by Tamara Walls, LPCA.
        </p>
      </div>
    </div>
  )
}
