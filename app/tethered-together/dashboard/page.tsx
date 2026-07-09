'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Plus, Check, Clock, Users, Target, Download, Settings,
  ChevronDown, Trash2, Timer, Sun, Calendar, CalendarDays,
  Mic, MicOff, X, MoreHorizontal, LogOut, User, BookOpen
} from 'lucide-react'

// Rotational bell hooks quotes for the dashboard — clinically purposeful, not decorative
const dashboardQuotes = [
  {
    text: "Love is a combination of care, commitment, knowledge, responsibility, respect, and trust.",
    author: 'bell hooks',
    source: 'Communion',
    url: 'https://www.mahoganybooks.com/9780060938291',
  },
  {
    text: "Rarely, if ever, are any of us healed in isolation. Healing is an act of communion.",
    author: 'bell hooks',
    source: 'All About Love',
    url: 'https://www.mahoganybooks.com/9780060959470',
  },
  {
    text: "To begin by always thinking of love as an action rather than a feeling is one way in which anyone using the word in this manner automatically assumes accountability and responsibility.",
    author: 'bell hooks',
    source: 'All About Love',
    url: 'https://www.mahoganybooks.com/9780060959470',
  },
  {
    text: "Happy marriages are based on a deep friendship. By this I mean a mutual respect for and enjoyment of each other's company.",
    author: 'John Gottman, Ph.D.',
    source: 'Seven Principles',
    url: 'https://www.gottman.com/product/the-seven-principles-for-making-marriage-work/',
  },
  {
    text: "Imagine living in a world where there is no domination, where females and males are not alike or even always equal, but where a vision of mutuality is the ethos shaping our interaction.",
    author: 'bell hooks',
    source: 'Feminism is for Everybody',
    url: 'https://www.mahoganybooks.com/9780060959470',
  },
]

interface Task {
  id: string
  title: string
  description?: string
  ownership: 'UNCLAIMED' | 'INDIVIDUAL' | 'BOTH'
  claimedBy?: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
  createdAt: string
  completedAt?: string
}

interface TaskList {
  id: string
  name: string
  listType: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM'
  bedtimeTarget?: string
  tasks: Task[]
  createdAt: string
}

interface Family {
  id: string
  name: string
  inviteCode: string
  members: { id: string; displayName: string; role: string }[]
  goals: { id: string; title: string; status: string }[]
  lists: TaskList[]
}

const listTypeLabels: Record<string, { label: string; icon: any; color: string }> = {
  DAILY: { label: 'Today', icon: Sun, color: '#C5A87D' },
  WEEKLY: { label: 'This Week', icon: Calendar, color: '#75856f' },
  MONTHLY: { label: 'This Month', icon: CalendarDays, color: '#C09191' },
  CUSTOM: { label: 'Custom', icon: Clock, color: '#6B8E4E' },
}

export default function TetherDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [family, setFamily] = useState<Family | null>(null)
  const [activeListId, setActiveListId] = useState<string | null>(null)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [showNewList, setShowNewList] = useState(false)
  const [newListName, setNewListName] = useState('')
  const [newListType, setNewListType] = useState<string>('DAILY')
  const [newListBedtime, setNewListBedtime] = useState('')
  const [bedtimeRemaining, setBedtimeRemaining] = useState<string | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [dashQuote, setDashQuote] = useState(dashboardQuotes[0])

  // Pick a random quote each load
  useEffect(() => {
    setDashQuote(dashboardQuotes[Math.floor(Math.random() * dashboardQuotes.length)])
  }, [])

  // Load data
  useEffect(() => {
    const storedUser = localStorage.getItem('tether_user')
    if (!storedUser) {
      router.push('/tethered-together/signup')
      return
    }
    setUser(JSON.parse(storedUser))

    const familyId = localStorage.getItem('tether_active_family')
    if (!familyId) {
      router.push('/tethered-together/onboard')
      return
    }

    const families = JSON.parse(localStorage.getItem('tether_families') || '[]')
    const found = families.find((f: Family) => f.id === familyId)
    if (found) {
      if (!found.lists) found.lists = []
      setFamily(found)
      if (found.lists.length > 0 && !activeListId) {
        setActiveListId(found.lists[0].id)
      }
    }
  }, [router, activeListId])

  // Bedtime countdown
  useEffect(() => {
    if (!family || !activeListId) return
    const activeList = family.lists.find(l => l.id === activeListId)
    if (!activeList?.bedtimeTarget) {
      setBedtimeRemaining(null)
      return
    }

    const updateCountdown = () => {
      const now = new Date()
      const [hours, minutes] = activeList.bedtimeTarget!.split(':').map(Number)
      const target = new Date()
      target.setHours(hours, minutes, 0, 0)
      if (target <= now) target.setDate(target.getDate() + 1)

      const diff = target.getTime() - now.getTime()
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)

      if (h > 0) {
        setBedtimeRemaining(`${h}h ${m}m until bedtime`)
      } else if (m > 0) {
        setBedtimeRemaining(`${m}m ${s}s until bedtime`)
      } else {
        setBedtimeRemaining(`${s}s until bedtime!`)
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [family, activeListId])

  const saveFamily = useCallback((updated: Family) => {
    setFamily({ ...updated })
    const families = JSON.parse(localStorage.getItem('tether_families') || '[]')
    const idx = families.findIndex((f: Family) => f.id === updated.id)
    if (idx >= 0) {
      families[idx] = updated
      localStorage.setItem('tether_families', JSON.stringify(families))
    }
  }, [])

  const addList = () => {
    if (!family || !newListName.trim()) return
    const newList: TaskList = {
      id: crypto.randomUUID(),
      name: newListName.trim(),
      listType: newListType as TaskList['listType'],
      bedtimeTarget: newListBedtime || undefined,
      tasks: [],
      createdAt: new Date().toISOString(),
    }
    family.lists.push(newList)
    saveFamily(family)
    setActiveListId(newList.id)
    setNewListName('')
    setNewListType('DAILY')
    setNewListBedtime('')
    setShowNewList(false)
  }

  const addTask = () => {
    if (!family || !activeListId || !newTaskTitle.trim()) return
    const list = family.lists.find(l => l.id === activeListId)
    if (!list) return

    const task: Task = {
      id: crypto.randomUUID(),
      title: newTaskTitle.trim(),
      ownership: 'UNCLAIMED',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    }
    list.tasks.push(task)
    saveFamily(family)
    setNewTaskTitle('')
  }

  const claimTask = (taskId: string, ownership: Task['ownership']) => {
    if (!family || !activeListId || !user) return
    const list = family.lists.find(l => l.id === activeListId)
    if (!list) return

    const task = list.tasks.find(t => t.id === taskId)
    if (!task) return

    task.ownership = ownership
    task.claimedBy = ownership === 'BOTH' ? 'both' : user.displayName
    saveFamily(family)
  }

  const toggleTaskStatus = (taskId: string) => {
    if (!family || !activeListId) return
    const list = family.lists.find(l => l.id === activeListId)
    if (!list) return

    const task = list.tasks.find(t => t.id === taskId)
    if (!task) return

    if (task.status === 'COMPLETED') {
      task.status = 'PENDING'
      task.completedAt = undefined
    } else {
      task.status = 'COMPLETED'
      task.completedAt = new Date().toISOString()
    }
    saveFamily(family)
  }

  const deleteTask = (taskId: string) => {
    if (!family || !activeListId) return
    const list = family.lists.find(l => l.id === activeListId)
    if (!list) return

    list.tasks = list.tasks.filter(t => t.id !== taskId)
    saveFamily(family)
  }

  const deleteList = (listId: string) => {
    if (!family) return
    family.lists = family.lists.filter(l => l.id !== listId)
    saveFamily(family)
    if (activeListId === listId) {
      setActiveListId(family.lists[0]?.id || null)
    }
  }

  // Voice input (Web Speech API)
  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in this browser. Try Chrome or Safari.')
      return
    }

    if (isListening) {
      setIsListening(false)
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => setIsListening(true)
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setNewTaskTitle(prev => prev ? `${prev} ${transcript}` : transcript)
      setIsListening(false)
    }
    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)
    recognition.start()
  }

  // Export data
  const exportData = () => {
    if (!family) return
    const data = {
      familyName: family.name,
      exportDate: new Date().toISOString(),
      members: family.members.map(m => m.displayName),
      goals: family.goals,
      lists: family.lists.map(l => ({
        name: l.name,
        type: l.listType,
        tasks: l.tasks.map(t => ({
          title: t.title,
          claimedBy: t.claimedBy || 'Unclaimed',
          ownership: t.ownership,
          status: t.status,
          createdAt: t.createdAt,
          completedAt: t.completedAt || '',
        })),
      })),
    }

    // CSV export
    let csv = `Tethered Together - ${family.name}\nExported: ${new Date().toLocaleDateString()}\n\n`
    csv += 'List,Task,Claimed By,Ownership,Status,Created,Completed\n'
    family.lists.forEach(list => {
      list.tasks.forEach(task => {
        csv += `"${list.name}","${task.title}","${task.claimedBy || 'Unclaimed'}","${task.ownership}","${task.status}","${new Date(task.createdAt).toLocaleDateString()}","${task.completedAt ? new Date(task.completedAt).toLocaleDateString() : ''}"\n`
      })
    })

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tethered-together-${family.name.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const activeList = family?.lists.find(l => l.id === activeListId)
  const completedCount = activeList?.tasks.filter(t => t.status === 'COMPLETED').length || 0
  const totalCount = activeList?.tasks.length || 0
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  if (!user || !family) return null

  return (
    <div className="min-h-screen" style={{ background: '#FAF9F7' }}>
      {/* Top Bar */}
      <div className="sticky top-0 z-40 border-b" style={{ background: 'rgba(250,249,247,0.95)', backdropFilter: 'blur(12px)', borderColor: '#e8e4e0' }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/tethered-together">
              <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
                <Image src="/images/LFLogo.jpeg" alt="Lennox Fields" fill className="object-cover" />
              </div>
            </Link>
            <div>
              <h1 className="font-heading text-lg font-semibold text-text-dark leading-tight">{family.name}</h1>
              <p className="text-xs text-warm-gray">
                {family.members.length} member{family.members.length !== 1 ? 's' : ''} &middot; Tethered Together
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportData}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Export Data"
            >
              <Download className="w-5 h-5 text-warm-gray" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: '#75856f' }}>
                  {user.displayName.charAt(0).toUpperCase()}
                </div>
                <ChevronDown className="w-4 h-4 text-warm-gray" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-medium border border-gray-100 py-1 z-50">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-text-dark">{user.displayName}</p>
                    <p className="text-xs text-warm-gray">{user.email}</p>
                  </div>
                  <Link href="/tethered-together/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-warm-gray hover:bg-gray-50">
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem('tether_user')
                      localStorage.removeItem('tether_active_family')
                      router.push('/tethered-together')
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-warm-gray hover:bg-gray-50"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar — Lists & Goals */}
          <aside className="space-y-4">
            {/* Goals */}
            {family.goals.length > 0 && (
              <div className="p-4 rounded-2xl bg-white shadow-soft">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4" style={{ color: '#C5A87D' }} />
                  <h3 className="text-sm font-semibold text-text-dark">Our Goals</h3>
                </div>
                <div className="space-y-2">
                  {family.goals.map((goal: any) => (
                    <div key={goal.id} className="flex items-start gap-2 text-sm text-warm-gray">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#C5A87D' }} />
                      {goal.title}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lists */}
            <div className="p-4 rounded-2xl bg-white shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-text-dark">Lists</h3>
                <button
                  onClick={() => setShowNewList(true)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" style={{ color: '#75856f' }} />
                </button>
              </div>

              {family.lists.length === 0 && !showNewList && (
                <p className="text-sm text-warm-gray/60 text-center py-4">
                  No lists yet. Create one to get started!
                </p>
              )}

              <div className="space-y-1">
                {family.lists.map(list => {
                  const meta = listTypeLabels[list.listType]
                  const Icon = meta.icon
                  const listCompleted = list.tasks.filter(t => t.status === 'COMPLETED').length
                  const listTotal = list.tasks.length
                  return (
                    <button
                      key={list.id}
                      onClick={() => setActiveListId(list.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                        activeListId === list.id ? 'shadow-sm' : 'hover:bg-gray-50'
                      }`}
                      style={activeListId === list.id ? { background: meta.color + '12', borderLeft: `3px solid ${meta.color}` } : {}}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" style={{ color: meta.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-dark truncate">{list.name}</p>
                        <p className="text-xs text-warm-gray">{listCompleted}/{listTotal} done</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* New list form */}
              {showNewList && (
                <div className="mt-3 p-3 rounded-xl border" style={{ borderColor: '#75856f30', background: '#75856f05' }}>
                  <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="List name..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none mb-2 text-text-dark"
                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #75856f40'}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && addList()}
                  />
                  <div className="flex gap-1 mb-2">
                    {Object.entries(listTypeLabels).map(([key, meta]) => (
                      <button
                        key={key}
                        onClick={() => setNewListType(key)}
                        className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                          newListType === key ? 'text-white' : ''
                        }`}
                        style={{
                          background: newListType === key ? meta.color : 'transparent',
                          color: newListType === key ? 'white' : meta.color,
                        }}
                      >
                        {meta.label}
                      </button>
                    ))}
                  </div>
                  <div className="mb-2">
                    <label className="text-xs text-warm-gray block mb-1">Bedtime countdown (optional)</label>
                    <input
                      type="time"
                      value={newListBedtime}
                      onChange={(e) => setNewListBedtime(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none text-text-dark"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={addList}
                      disabled={!newListName.trim()}
                      className="flex-1 px-3 py-1.5 rounded-lg text-white text-xs font-medium disabled:opacity-40"
                      style={{ background: '#75856f' }}
                    >
                      Create
                    </button>
                    <button
                      onClick={() => setShowNewList(false)}
                      className="px-3 py-1.5 rounded-lg text-xs text-warm-gray hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Members */}
            <div className="p-4 rounded-2xl bg-white shadow-soft">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4" style={{ color: '#C09191' }} />
                <h3 className="text-sm font-semibold text-text-dark">Members</h3>
              </div>
              <div className="space-y-2">
                {family.members.map((member, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                      style={{ background: i === 0 ? '#75856f' : '#C09191' }}
                    >
                      {member.displayName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-text-dark">{member.displayName}</span>
                    {member.id === user.id && <span className="text-xs text-warm-gray">(you)</span>}
                  </div>
                ))}
                {family.members.length < 2 && (
                  <p className="text-xs text-warm-gray/60 italic mt-1">
                    Invite your partner from the settings
                  </p>
                )}
              </div>
            </div>

            {/* Rotational Quote */}
            <div className="p-4 rounded-2xl" style={{ background: '#75856f08' }}>
              <div className="flex items-start gap-2 mb-2">
                <BookOpen className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#75856f' }} />
                <p className="text-xs leading-relaxed text-warm-gray italic">
                  &ldquo;{dashQuote.text}&rdquo;
                </p>
              </div>
              <a
                href={dashQuote.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs hover:underline ml-5"
                style={{ color: '#75856f' }}
              >
                &mdash; {dashQuote.author}, <em>{dashQuote.source}</em>
              </a>
            </div>
          </aside>

          {/* Main Content — Task View */}
          <main>
            {activeList ? (
              <div className="space-y-4">
                {/* List Header */}
                <div className="p-6 rounded-2xl bg-white shadow-soft">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {(() => { const Icon = listTypeLabels[activeList.listType].icon; return <Icon className="w-5 h-5" style={{ color: listTypeLabels[activeList.listType].color }} /> })()}
                        <h2 className="font-heading text-2xl font-bold text-text-dark">{activeList.name}</h2>
                      </div>
                      <p className="text-sm text-warm-gray">
                        {listTypeLabels[activeList.listType].label} &middot; {completedCount} of {totalCount} complete
                      </p>
                    </div>
                    <button
                      onClick={() => deleteList(activeList.id)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors text-warm-gray hover:text-red-400"
                      title="Delete list"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: '#e8e4e0' }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${progressPercent}%`,
                        background: `linear-gradient(90deg, ${listTypeLabels[activeList.listType].color}, ${listTypeLabels[activeList.listType].color}cc)`,
                      }}
                    />
                  </div>

                  {/* Bedtime countdown */}
                  {bedtimeRemaining && (
                    <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: '#C5A87D12' }}>
                      <Timer className="w-4 h-4" style={{ color: '#C5A87D' }} />
                      <span className="text-sm font-medium" style={{ color: '#C5A87D' }}>{bedtimeRemaining}</span>
                    </div>
                  )}
                </div>

                {/* Add Task */}
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Add a task... (e.g., Make vet appointment, Pick up dry cleaning)"
                      className="w-full px-4 py-3.5 pr-12 rounded-xl bg-white border border-gray-200 shadow-soft focus:outline-none transition-all text-text-dark"
                      onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #75856f40'}
                      onBlur={(e) => e.target.style.boxShadow = '0 2px 15px rgba(0,0,0,0.08)'}
                      onKeyDown={(e) => e.key === 'Enter' && addTask()}
                    />
                    <button
                      onClick={toggleVoiceInput}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all ${
                        isListening ? 'bg-red-100' : 'hover:bg-gray-100'
                      }`}
                      title="Voice input"
                      aria-label={isListening ? 'Stop listening' : 'Start voice input'}
                    >
                      {isListening ? (
                        <MicOff className="w-4 h-4 text-red-500" />
                      ) : (
                        <Mic className="w-4 h-4 text-warm-gray" />
                      )}
                    </button>
                  </div>
                  <button
                    onClick={addTask}
                    disabled={!newTaskTitle.trim()}
                    className="px-5 py-3.5 rounded-xl text-white font-medium transition-all hover:shadow-md disabled:opacity-40"
                    style={{ background: '#75856f' }}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {isListening && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 text-sm animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    Listening... speak your task
                  </div>
                )}

                {/* Task List */}
                <div className="space-y-2">
                  {activeList.tasks.filter(t => t.status !== 'COMPLETED').map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      userName={user.displayName}
                      members={family.members}
                      onToggle={() => toggleTaskStatus(task.id)}
                      onClaim={(ownership) => claimTask(task.id, ownership)}
                      onDelete={() => deleteTask(task.id)}
                    />
                  ))}

                  {/* Completed section */}
                  {activeList.tasks.filter(t => t.status === 'COMPLETED').length > 0 && (
                    <div className="pt-4">
                      <p className="text-xs font-medium text-warm-gray/60 uppercase tracking-wider mb-2 px-1">
                        Completed ({completedCount})
                      </p>
                      {activeList.tasks.filter(t => t.status === 'COMPLETED').map(task => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          userName={user.displayName}
                          members={family.members}
                          onToggle={() => toggleTaskStatus(task.id)}
                          onClaim={(ownership) => claimTask(task.id, ownership)}
                          onDelete={() => deleteTask(task.id)}
                        />
                      ))}
                    </div>
                  )}

                  {activeList.tasks.length === 0 && (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: '#75856f10' }}>
                        <Check className="w-8 h-8" style={{ color: '#75856f30' }} />
                      </div>
                      <p className="text-warm-gray font-medium mb-1">No tasks yet</p>
                      <p className="text-sm text-warm-gray/60">Add your first task above or use voice input</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: '#75856f10' }}>
                  <Plus className="w-10 h-10" style={{ color: '#75856f30' }} />
                </div>
                <h2 className="font-heading text-2xl font-bold text-text-dark mb-2">Create Your First List</h2>
                <p className="text-warm-gray mb-6">Start with a daily task list to share the load today.</p>
                <button
                  onClick={() => setShowNewList(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all hover:shadow-md"
                  style={{ background: 'linear-gradient(135deg, #75856f 0%, #6B8E4E 100%)' }}
                >
                  <Plus className="w-4 h-4" />
                  New List
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

// Task Card Component
function TaskCard({
  task,
  userName,
  members,
  onToggle,
  onClaim,
  onDelete,
}: {
  task: Task
  userName: string
  members: { id: string; displayName: string }[]
  onToggle: () => void
  onClaim: (ownership: Task['ownership']) => void
  onDelete: () => void
}) {
  const [showClaim, setShowClaim] = useState(false)
  const isCompleted = task.status === 'COMPLETED'

  const ownershipColors: Record<string, string> = {
    UNCLAIMED: '#d1ccc7',
    INDIVIDUAL: '#75856f',
    BOTH: '#C09191',
  }

  return (
    <div
      className={`group flex items-center gap-3 p-4 rounded-xl bg-white border transition-all ${
        isCompleted ? 'opacity-60' : 'shadow-soft hover:shadow-medium'
      }`}
      style={{ borderColor: isCompleted ? '#e8e4e0' : ownershipColors[task.ownership] + '30' }}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          isCompleted ? 'border-green-400 bg-green-400' : 'hover:border-green-300'
        }`}
        style={!isCompleted ? { borderColor: ownershipColors[task.ownership] } : {}}
        aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {isCompleted && <Check className="w-3.5 h-3.5 text-white" />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm text-text-dark ${isCompleted ? 'line-through' : ''}`}>
          {task.title}
        </p>
        {task.claimedBy && (
          <p className="text-xs mt-0.5" style={{ color: ownershipColors[task.ownership] }}>
            {task.ownership === 'BOTH' ? 'Both of you' : task.claimedBy}
          </p>
        )}
      </div>

      {/* Claim / Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isCompleted && (
          <div className="relative">
            <button
              onClick={() => setShowClaim(!showClaim)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all hover:bg-gray-100"
              style={{ color: ownershipColors[task.ownership] }}
            >
              {task.ownership === 'UNCLAIMED' ? 'Claim' : task.ownership === 'BOTH' ? 'Both' : 'Mine'}
            </button>
            {showClaim && (
              <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-medium border border-gray-100 py-1 z-50">
                <button
                  onClick={() => { onClaim('INDIVIDUAL'); setShowClaim(false) }}
                  className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5" style={{ color: '#75856f' }} />
                  <span>I&apos;ve got this</span>
                </button>
                <button
                  onClick={() => { onClaim('BOTH'); setShowClaim(false) }}
                  className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 flex items-center gap-2"
                >
                  <Users className="w-3.5 h-3.5" style={{ color: '#C09191' }} />
                  <span>We&apos;ll do it together</span>
                </button>
                <button
                  onClick={() => { onClaim('UNCLAIMED'); setShowClaim(false) }}
                  className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 flex items-center gap-2"
                >
                  <X className="w-3.5 h-3.5 text-warm-gray" />
                  <span>Unclaim</span>
                </button>
              </div>
            )}
          </div>
        )}
        <button
          onClick={onDelete}
          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
          aria-label="Delete task"
        >
          <Trash2 className="w-3.5 h-3.5 text-warm-gray hover:text-red-400" />
        </button>
      </div>
    </div>
  )
}
