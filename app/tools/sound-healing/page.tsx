'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, Square, Volume2, VolumeX } from 'lucide-react'

// ─── Constants ───
const PHI = 1.618033988749895
const GOLDEN_ANGLE = Math.PI * 2 / (PHI * PHI)

interface HealingFrequency {
  freq: number
  name: string
  description: string
  symmetry: number
}

const SOLFEGGIO: HealingFrequency[] = [
  { freq: 174, name: 'Foundation / Pain Relief', description: 'Reduces pain. Natural anesthetic. Grounds the physical body and promotes a sense of security.', symmetry: 3 },
  { freq: 285, name: 'Tissue Repair', description: 'Cellular regeneration. Helps restructure damaged tissue and supports the body\'s natural healing process.', symmetry: 4 },
  { freq: 396, name: 'Liberation', description: 'Releases guilt and fear. Dissolves energetic blockages at the root chakra, freeing stuck emotion.', symmetry: 5 },
  { freq: 417, name: 'Facilitating Change', description: 'Undoes negative patterns. Clears traumatic experiences from the energy field and opens space for new growth.', symmetry: 5 },
  { freq: 528, name: 'Cellular Healing / Love', description: 'The "Miracle Tone." Associated with DNA repair. Produces hexagonal water clusters — the geometry of organic life itself.', symmetry: 6 },
  { freq: 639, name: 'Connection & Relationships', description: 'Harmonizes relationships. Enhances communication between cells and between people. Heart-centered frequency.', symmetry: 7 },
  { freq: 741, name: 'Expression / Detox', description: 'Cleanses cells of electromagnetic toxins. Awakens intuition and authentic self-expression.', symmetry: 8 },
  { freq: 852, name: 'Spiritual Awareness', description: 'Returns cells to spiritual order. Opens the third eye and heightens intuition and inner knowing.', symmetry: 9 },
  { freq: 963, name: 'Divine Connection', description: 'Activates the pineal gland. Associated with oneness and connection to source energy.', symmetry: 10 },
]

const GOLDEN_PRESETS = [
  { freq: 432, name: '432 Hz — Natural Tuning', symmetry: 6 },
  { freq: 699, name: '699 Hz — 432 × Phi', symmetry: 8 },
  { freq: 267, name: '267 Hz — 432 ÷ Phi', symmetry: 4 },
]

type VisMode = 'sand' | 'water' | 'particles'

// ─── Chladni Math ───
function chladniValue(x: number, y: number, n: number, m: number): number {
  return Math.cos(n * Math.PI * x) * Math.cos(m * Math.PI * y)
       - Math.cos(m * Math.PI * x) * Math.cos(n * Math.PI * y)
}

// ─── Note Detection ───
const NOTE_NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']
function freqToNote(freq: number) {
  if (freq < 16) return { name: 'Sub', cents: 0 }
  const midi = 69 + 12 * Math.log2(freq / 440)
  const rounded = Math.round(midi)
  const cents = Math.round((midi - rounded) * 100)
  const name = NOTE_NAMES[((rounded % 12) + 12) % 12]
  const octave = Math.floor(rounded / 12) - 1
  return { name: `${name}${octave}`, cents }
}

export default function SoundHealingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiCanvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const timeRef = useRef(0)
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number }>>([])

  // Audio refs
  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const oscRRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const gainRRef = useRef<GainNode | null>(null)
  const pulseGainRef = useRef<GainNode | null>(null)
  const lfoRef = useRef<OscillatorNode | null>(null)

  const [mode, setMode] = useState<VisMode>('sand')
  const [frequency, setFrequencyState] = useState(528)
  const [amplitude, setAmplitude] = useState(0.7)
  const [symmetry, setSymmetryState] = useState(6)
  const [damping, setDamping] = useState(0.5)
  const [tempo, setTempo] = useState(60)
  const [playing, setPlaying] = useState(false)
  const [showPhi, setShowPhi] = useState(false)
  const [healingPulse, setHealingPulse] = useState(false)
  const [binaural, setBinaural] = useState(false)
  const [activePreset, setActivePreset] = useState<number | null>(528)

  const CW = 440 // canvas width
  const CH = 440
  const CX = CW / 2
  const CY = CH / 2
  const RAD = CW / 2 - 10

  // ─── Particle Init ───
  const initParticles = useCallback(() => {
    const p = []
    for (let i = 0; i < 2500; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = Math.random() * RAD
      p.push({ x: CX + Math.cos(angle) * r, y: CY + Math.sin(angle) * r, vx: 0, vy: 0, size: 1 + Math.random() * 1.5 })
    }
    particlesRef.current = p
  }, [CX, CY, RAD])

  // ─── Audio ───
  const ensureAudio = useCallback(() => {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext()
    return audioCtxRef.current
  }, [])

  const stopAudio = useCallback(() => {
    try { oscRef.current?.stop() } catch {}
    try { oscRRef.current?.stop() } catch {}
    try { lfoRef.current?.stop() } catch {}
    oscRef.current = null
    oscRRef.current = null
    lfoRef.current = null
    setPlaying(false)
  }, [])

  const startAudio = useCallback(() => {
    const ac = ensureAudio()
    stopAudio()

    const osc = ac.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = frequency

    const gain = ac.createGain()
    gain.gain.value = amplitude * 0.12

    const pulse = ac.createGain()
    pulse.gain.value = 1

    oscRef.current = osc
    gainRef.current = gain
    pulseGainRef.current = pulse

    if (binaural) {
      const panL = ac.createStereoPanner()
      panL.pan.value = -1
      osc.connect(gain).connect(pulse).connect(panL).connect(ac.destination)

      const oscR = ac.createOscillator()
      oscR.type = 'sine'
      oscR.frequency.value = frequency + 6
      const gainR = ac.createGain()
      gainR.gain.value = amplitude * 0.12
      const panR = ac.createStereoPanner()
      panR.pan.value = 1
      oscR.connect(gainR).connect(pulse).connect(panR).connect(ac.destination)
      oscR.start()
      oscRRef.current = oscR
      gainRRef.current = gainR
    } else {
      osc.connect(gain).connect(pulse).connect(ac.destination)
    }

    osc.start()

    if (healingPulse) {
      const lfo = ac.createOscillator()
      lfo.type = 'sine'
      lfo.frequency.value = tempo / 60
      const lfoGain = ac.createGain()
      lfoGain.gain.value = 0.3
      lfo.connect(lfoGain).connect(pulse.gain)
      lfo.start()
      lfoRef.current = lfo
    }

    setPlaying(true)
  }, [frequency, amplitude, binaural, healingPulse, tempo, ensureAudio, stopAudio])

  // ─── Drawing ───
  const drawSand = useCallback((ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.createImageData(CW, CH)
    const data = imageData.data
    let n = Math.max(1, Math.floor(frequency / 80))
    const m = symmetry
    if (n === m) n = m + 1
    const t = timeRef.current * 0.015
    const threshold = 0.06 + (1 - amplitude) * 0.12

    let pulseI = 1
    if (healingPulse) {
      const bps = tempo / 60
      pulseI = 0.7 + 0.3 * Math.abs(Math.sin(t * bps * Math.PI))
    }

    for (let px = 0; px < CW; px++) {
      for (let py = 0; py < CH; py++) {
        const dx = px - CX, dy = py - CY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > RAD) continue
        const x = dx / RAD, y = dy / RAD
        let val = chladniValue(x, y, n, m) + 0.25 * chladniValue(x, y, n + 2, m + 1)
        const absVal = Math.abs(val)
        const idx = (py * CW + px) * 4

        if (absVal < threshold) {
          const intensity = Math.pow(1 - absVal / threshold, 1.5) * pulseI
          const grain = (Math.random() - 0.5) * 0.2
          // Use Lennox Fields warm-sand palette
          data[idx] = Math.floor((195 + grain * 35) * intensity)
          data[idx + 1] = Math.floor((170 + grain * 30) * intensity)
          data[idx + 2] = Math.floor((130 + grain * 25) * intensity)
          data[idx + 3] = Math.floor(255 * (0.6 + 0.4 * intensity) * (1 - dist / RAD * 0.2))
        } else {
          const shimmer = Math.abs(Math.sin(absVal * 15 + t * 2)) * 0.3 * pulseI
          data[idx] = Math.floor(25 + shimmer * 15)
          data[idx + 1] = Math.floor(28 + shimmer * 18)
          data[idx + 2] = Math.floor(24 + shimmer * 12)
          data[idx + 3] = Math.floor(255 * (1 - dist / RAD * 0.15))
        }
      }
    }
    ctx.putImageData(imageData, 0, 0)
    ctx.globalCompositeOperation = 'screen'
    ctx.filter = 'blur(3px)'
    ctx.globalAlpha = 0.1
    ctx.drawImage(ctx.canvas, 0, 0)
    ctx.filter = 'none'
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
  }, [frequency, symmetry, amplitude, healingPulse, tempo, CW, CH, CX, CY, RAD])

  const drawWater = useCallback((ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.createImageData(CW, CH)
    const data = imageData.data
    const t = timeRef.current * 0.03
    const waveNum = frequency / 80

    for (let px = 0; px < CW; px++) {
      for (let py = 0; py < CH; py++) {
        const dx = px - CX, dy = py - CY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > RAD) continue
        const x = dx / RAD, y = dy / RAD
        const angle = Math.atan2(y, x)
        const r = Math.sqrt(x * x + y * y)

        let wave = 0
        for (let s = 1; s <= symmetry; s++) {
          wave += Math.sin(waveNum * r * Math.PI - t * 2 + s * angle) / s
          wave += Math.cos(waveNum * x * Math.PI + t) * Math.cos(waveNum * y * Math.PI - t) * 0.5
        }
        wave *= amplitude * (1 - r * damping)
        const height = wave * 0.5 + 0.5
        const idx = (py * CW + px) * 4
        const caustic = Math.abs(Math.sin(wave * 8 + t))

        // Sage-tinted water
        data[idx] = Math.floor(20 + height * 30 + caustic * 25)
        data[idx + 1] = Math.floor(40 + height * 70 + caustic * 50)
        data[idx + 2] = Math.floor(35 + height * 55 + caustic * 35)
        data[idx + 3] = Math.floor(255 * (1 - dist / RAD * 0.15))

        if (height > 0.75) {
          const hl = (height - 0.75) * 4
          data[idx] += Math.floor(hl * 80)
          data[idx + 1] += Math.floor(hl * 100)
          data[idx + 2] += Math.floor(hl * 70)
        }
      }
    }
    ctx.putImageData(imageData, 0, 0)
  }, [frequency, symmetry, amplitude, damping, CW, CH, CX, CY, RAD])

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'rgba(30, 32, 28, 0.15)'
    ctx.fillRect(0, 0, CW, CH)

    const t = timeRef.current * 0.02
    let n = Math.max(1, Math.floor(frequency / 80))
    const m = symmetry
    if (n === m) n = m + 1

    particlesRef.current.forEach(p => {
      const x = (p.x - CX) / RAD, y = (p.y - CY) / RAD
      const dist = Math.sqrt((p.x - CX) ** 2 + (p.y - CY) ** 2)
      if (dist > RAD) {
        const angle = Math.random() * Math.PI * 2
        const r = Math.random() * RAD * 0.5
        p.x = CX + Math.cos(angle) * r
        p.y = CY + Math.sin(angle) * r
        p.vx = 0; p.vy = 0
        return
      }
      const eps = 0.01
      const val = chladniValue(x, y, n, m)
      const gradX = (chladniValue(x + eps, y, n, m) - val) / eps
      const gradY = (chladniValue(x, y + eps, n, m) - val) / eps
      const force = amplitude * 0.4
      const sign = val > 0 ? 1 : -1
      p.vx += -gradX * force * sign * Math.abs(Math.sin(t * frequency * 0.01))
      p.vy += -gradY * force * sign * Math.abs(Math.sin(t * frequency * 0.01))
      p.vx *= (1 - damping * 0.08)
      p.vy *= (1 - damping * 0.08)
      if (Math.abs(val) > 0.1) {
        p.vx += (Math.random() - 0.5) * amplitude * 0.8
        p.vy += (Math.random() - 0.5) * amplitude * 0.8
      }
      p.x += p.vx
      p.y += p.vy

      const absVal = Math.abs(val)
      const atNode = absVal < 0.15
      const r1 = atNode ? 185 : 100 + Math.min(1, Math.abs(p.vx) + Math.abs(p.vy)) * 85
      const g = atNode ? 165 : 130 + Math.min(1, Math.abs(p.vx) + Math.abs(p.vy)) * 40
      const b = atNode ? 125 : 110
      const alpha = atNode ? 0.9 : 0.4 + Math.min(1, Math.abs(p.vx) + Math.abs(p.vy)) * 0.4
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${Math.floor(r1)},${Math.floor(g)},${Math.floor(b)},${alpha})`
      ctx.fill()
    })

    ctx.beginPath()
    ctx.arc(CX, CY, RAD, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(117,133,111,0.2)'
    ctx.lineWidth = 1
    ctx.stroke()
  }, [frequency, symmetry, amplitude, damping, CW, CH, CX, CY, RAD])

  const drawPhiOverlay = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, CW, CH)
    if (!showPhi) return
    const t = timeRef.current * 0.005
    const breathe = 0.8 + 0.2 * Math.sin(t * 2)

    // Golden spiral
    ctx.beginPath()
    ctx.strokeStyle = `rgba(192,145,145,${0.35 * breathe})`
    ctx.lineWidth = 1.5
    for (let i = 0; i < 6 * 360; i++) {
      const theta = (i * Math.PI) / 180
      const r = 4 * Math.pow(PHI, theta / (Math.PI / 2))
      if (r > RAD) break
      const x = CX + r * Math.cos(theta + t)
      const y = CY + r * Math.sin(theta + t)
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
    }
    ctx.stroke()

    // Counter spiral
    ctx.beginPath()
    ctx.strokeStyle = `rgba(117,133,111,${0.25 * breathe})`
    ctx.lineWidth = 1
    for (let i = 0; i < 6 * 360; i++) {
      const theta = (i * Math.PI) / 180
      const r = 4 * Math.pow(PHI, theta / (Math.PI / 2))
      if (r > RAD) break
      const x = CX + r * Math.cos(-theta + t + Math.PI)
      const y = CY + r * Math.sin(-theta + t + Math.PI)
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
    }
    ctx.stroke()

    // Fibonacci dots
    ctx.fillStyle = `rgba(250,249,247,${0.15 * breathe})`
    for (let i = 0; i < 89; i++) {
      const angle = i * GOLDEN_ANGLE + t
      const r = Math.sqrt(i / 89) * RAD * 0.85
      ctx.beginPath()
      ctx.arc(CX + r * Math.cos(angle), CY + r * Math.sin(angle), 1 + (i / 89) * 2, 0, Math.PI * 2)
      ctx.fill()
    }

    // Phi ring
    ctx.beginPath()
    ctx.arc(CX, CY, RAD / PHI, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(192,145,145,${0.2 * breathe})`
    ctx.setLineDash([4, 8])
    ctx.stroke()
    ctx.setLineDash([])
  }, [showPhi, CW, CH, CX, CY, RAD])

  // ─── Animation Loop ───
  useEffect(() => {
    const canvas = canvasRef.current
    const phiCanvas = phiCanvasRef.current
    if (!canvas || !phiCanvas) return
    const ctx = canvas.getContext('2d')!
    const phiCtx = phiCanvas.getContext('2d')!

    if (mode === 'particles' && particlesRef.current.length === 0) initParticles()

    const animate = () => {
      timeRef.current++
      if (mode === 'sand') drawSand(ctx)
      else if (mode === 'water') drawWater(ctx)
      else drawParticles(ctx)
      drawPhiOverlay(phiCtx)
      animFrameRef.current = requestAnimationFrame(animate)
    }
    animFrameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [mode, drawSand, drawWater, drawParticles, drawPhiOverlay, initParticles])

  // ─── Cleanup audio on unmount ───
  useEffect(() => {
    return () => { stopAudio() }
  }, [stopAudio])

  // Apply frequency to live audio
  useEffect(() => {
    if (playing && oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setTargetAtTime(frequency, audioCtxRef.current.currentTime, 0.01)
      if (oscRRef.current) oscRRef.current.frequency.setTargetAtTime(frequency + 6, audioCtxRef.current.currentTime, 0.01)
    }
  }, [frequency, playing])

  // Apply amplitude to live audio
  useEffect(() => {
    if (playing && gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setTargetAtTime(amplitude * 0.12, audioCtxRef.current.currentTime, 0.01)
      if (gainRRef.current) gainRRef.current.gain.setTargetAtTime(amplitude * 0.12, audioCtxRef.current.currentTime, 0.01)
    }
  }, [amplitude, playing])

  const selectHealing = (h: HealingFrequency) => {
    setFrequencyState(h.freq)
    setSymmetryState(h.symmetry)
    setActivePreset(h.freq)
    setShowPhi(true)
    setHealingPulse(true)
    if (!playing) startAudio()
  }

  const selectGoldenPreset = (p: typeof GOLDEN_PRESETS[0]) => {
    setFrequencyState(p.freq)
    setSymmetryState(p.symmetry)
    setActivePreset(p.freq)
    setShowPhi(true)
  }

  const note = freqToNote(frequency)
  const phiHarmonic = (frequency * PHI).toFixed(1)
  const phiSub = (frequency / PHI).toFixed(1)

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-white border-b border-warm-gray/20 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href="/resources"
            className="inline-flex items-center text-primary-sage hover:text-earth-green mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Back to Resources
          </Link>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
            Sound Healing & Cymatics
          </h1>
          <p className="text-lg text-warm-gray max-w-3xl">
            Watch how sound frequencies physically shape matter into geometric patterns.
            Explore Solfeggio healing tones, golden ratio geometry, and experience
            how vibration moves through sand, water — and through your body.
          </p>
        </div>
      </section>

      {/* Visualization */}
      <section className="py-8 bg-gradient-to-b from-white to-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Mode Tabs */}
          <div className="flex justify-center gap-2 mb-6">
            {(['sand', 'water', 'particles'] as VisMode[]).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); if (m === 'particles') initParticles() }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  mode === m
                    ? 'bg-primary-sage text-white shadow-soft'
                    : 'bg-white text-warm-gray border border-warm-gray/20 hover:border-primary-sage/40'
                }`}
              >
                {m === 'sand' ? 'Sand / Chladni' : m === 'water' ? 'Water Ripples' : 'Particle Field'}
              </button>
            ))}
          </div>

          {/* Canvas */}
          <div className="flex justify-center relative">
            <canvas
              ref={canvasRef}
              width={CW}
              height={CH}
              className="rounded-full shadow-strong"
              style={{ width: 380, height: 380 }}
            />
            <canvas
              ref={phiCanvasRef}
              width={CW}
              height={CH}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
              style={{ width: 380, height: 380 }}
            />
          </div>

          {/* Note + Phi Display */}
          <div className="text-center mt-4">
            <div className="text-2xl font-heading text-text-dark">{note.name}</div>
            <div className="text-sm text-primary-sage font-medium">
              {frequency} Hz{note.cents ? ` (${note.cents > 0 ? '+' : ''}${note.cents}c)` : ''}
            </div>
            <div className="text-xs text-warm-gray mt-1">
              Golden harmonic: {phiHarmonic} Hz &nbsp;|&nbsp; Sub-harmonic: {phiSub} Hz
            </div>
          </div>

          {/* Play Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => { if (playing) stopAudio(); else startAudio() }}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all shadow-soft ${
                playing
                  ? 'bg-soft-rose text-white hover:bg-soft-rose/80'
                  : 'bg-primary-sage text-white hover:bg-earth-green'
              }`}
            >
              {playing ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {playing ? 'Stop Tone' : 'Play Tone'}
            </button>
          </div>

          {/* Toggles */}
          <div className="flex justify-center gap-6 mt-4 flex-wrap">
            <label className="flex items-center gap-2 text-sm text-warm-gray cursor-pointer">
              <input type="checkbox" checked={showPhi} onChange={e => setShowPhi(e.target.checked)} className="accent-primary-sage w-4 h-4" />
              Golden Spiral
            </label>
            <label className="flex items-center gap-2 text-sm text-warm-gray cursor-pointer">
              <input type="checkbox" checked={healingPulse} onChange={e => { setHealingPulse(e.target.checked); if (playing) { stopAudio(); setTimeout(() => startAudio(), 50) }}} className="accent-primary-sage w-4 h-4" />
              Healing Pulse
            </label>
            <label className="flex items-center gap-2 text-sm text-warm-gray cursor-pointer">
              <input type="checkbox" checked={binaural} onChange={e => { setBinaural(e.target.checked); if (playing) { stopAudio(); setTimeout(() => startAudio(), 50) }}} className="accent-primary-sage w-4 h-4" />
              <span className="flex items-center gap-1">
                Binaural Beat
                {binaural ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </span>
            </label>
          </div>

          {/* Sliders */}
          <div className="max-w-md mx-auto mt-6 space-y-4">
            <div>
              <label className="flex justify-between text-sm text-warm-gray mb-1">
                <span>Frequency</span>
                <span className="text-primary-sage font-semibold">{frequency} Hz</span>
              </label>
              <input type="range" min={20} max={2000} value={frequency} step={1}
                onChange={e => { setFrequencyState(+e.target.value); setActivePreset(null) }}
                className="w-full accent-primary-sage" />
            </div>
            <div>
              <label className="flex justify-between text-sm text-warm-gray mb-1">
                <span>Amplitude</span>
                <span className="text-primary-sage font-semibold">{amplitude.toFixed(2)}</span>
              </label>
              <input type="range" min={0} max={100} value={amplitude * 100} step={1}
                onChange={e => setAmplitude(+e.target.value / 100)}
                className="w-full accent-primary-sage" />
            </div>
            <div>
              <label className="flex justify-between text-sm text-warm-gray mb-1">
                <span>Symmetry</span>
                <span className="text-primary-sage font-semibold">{symmetry}</span>
              </label>
              <input type="range" min={1} max={12} value={symmetry} step={1}
                onChange={e => { setSymmetryState(+e.target.value); if (mode === 'particles') initParticles() }}
                className="w-full accent-primary-sage" />
            </div>
            <div>
              <label className="flex justify-between text-sm text-warm-gray mb-1">
                <span>Healing Tempo</span>
                <span className="text-primary-sage font-semibold">{tempo} BPM</span>
              </label>
              <input type="range" min={30} max={120} value={tempo} step={1}
                onChange={e => setTempo(+e.target.value)}
                className="w-full accent-primary-sage" />
            </div>
          </div>
        </div>
      </section>

      {/* Solfeggio Healing Frequencies */}
      <section className="py-10 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-heading font-bold text-text-dark text-center mb-2">
            Solfeggio Healing Frequencies
          </h2>
          <p className="text-center text-warm-gray text-sm mb-6 max-w-xl mx-auto">
            Ancient tones used for centuries in sacred music and meditation. Tap any frequency
            to hear the tone, see its cymatics pattern, and activate the golden ratio overlay.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SOLFEGGIO.map(h => (
              <button
                key={h.freq}
                onClick={() => selectHealing(h)}
                className={`text-left p-4 rounded-xl border transition-all hover:shadow-soft ${
                  activePreset === h.freq
                    ? 'border-primary-sage bg-primary-sage/5 shadow-soft'
                    : 'border-warm-gray/15 bg-white hover:border-primary-sage/30'
                }`}
              >
                <div className="text-lg font-heading font-bold text-primary-sage">{h.freq} Hz</div>
                <div className="text-sm font-medium text-text-dark mt-0.5">{h.name}</div>
                <div className="text-xs text-warm-gray mt-1 leading-relaxed">{h.description}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Golden Ratio Frequencies */}
      <section className="py-8 bg-white border-t border-warm-gray/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-heading font-bold text-text-dark text-center mb-4">
            Golden Ratio Frequencies
          </h2>
          <div className="flex justify-center gap-2 flex-wrap">
            {GOLDEN_PRESETS.map(p => (
              <button
                key={p.freq}
                onClick={() => selectGoldenPreset(p)}
                className={`px-4 py-2 rounded-full text-sm border transition-all ${
                  activePreset === p.freq
                    ? 'border-primary-sage bg-primary-sage/5 text-primary-sage'
                    : 'border-warm-gray/20 text-warm-gray hover:border-primary-sage/40'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-10 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">

          <div className="bg-white rounded-2xl p-6 border border-warm-gray/10 shadow-soft">
            <h3 className="text-lg font-heading font-bold text-text-dark mb-3">
              528 Hz — The Cellular Healing Frequency
            </h3>
            <p className="text-sm text-warm-gray leading-relaxed">
              528 Hz is called the <strong className="text-text-dark">&quot;Miracle Tone&quot;</strong> or <strong className="text-text-dark">&quot;Love Frequency.&quot;</strong> Dr. Leonard Horowitz
              documented that 528 Hz is central to the &quot;musical mathematical matrix of creation.&quot;
              Biochemist Dr. Lee Lorenzen used 528 Hz frequencies to restructure water into perfect
              hexagonal clusters — the same geometry that DNA uses. When you play 528 Hz through water
              or sand, the patterns that emerge are hexagonal — the geometry of organic life. Bees build
              honeycombs at this shape. Snowflakes crystallize into it. Chlorophyll absorbs light at
              528 nanometers. It&apos;s the shape nature chooses when it&apos;s building something alive.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-warm-gray/10 shadow-soft">
            <h3 className="text-lg font-heading font-bold text-text-dark mb-3">
              The Golden Ratio in Sound & Body
            </h3>
            <p className="text-sm text-warm-gray leading-relaxed">
              The golden ratio (Phi = 1.618...) appears in sunflower spirals, nautilus shells, galaxy arms,
              and the proportions of your DNA helix (34 angstroms long, 21 wide — 34/21 = 1.619).
              When you multiply a frequency by Phi, you get its <strong className="text-text-dark">golden harmonic</strong> — a
              frequency that resonates with the mathematical proportion governing biological growth.
              The cochlea of your inner ear is a golden spiral. You literally hear through sacred geometry.
              The spiral overlay on the visualization maps this geometry onto the vibration pattern itself.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-warm-gray/10 shadow-soft">
            <h3 className="text-lg font-heading font-bold text-text-dark mb-3">
              Healing Pulse & Brainwave Entrainment
            </h3>
            <p className="text-sm text-warm-gray leading-relaxed mb-3">
              <strong className="text-text-dark">Healing Pulse</strong> modulates the tone at your chosen tempo. At 60 BPM,
              the pulse aligns with a resting heartbeat — your nervous system entrains to it, shifting into
              parasympathetic (rest &amp; repair) mode. This is called brainwave entrainment.
            </p>
            <p className="text-sm text-warm-gray leading-relaxed">
              <strong className="text-text-dark">Binaural Beats</strong> (use headphones) play a slightly different frequency
              in each ear. Your brain creates a phantom beat at the difference — here, 6 Hz, producing
              a theta wave state associated with deep meditation, creativity, and cellular repair.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-warm-gray/10 shadow-soft">
            <h3 className="text-lg font-heading font-bold text-text-dark mb-3">
              How To Try This at Home
            </h3>
            <div className="text-sm text-warm-gray leading-relaxed space-y-2">
              <p>
                <strong className="text-text-dark">Sand on a speaker:</strong> Lay a speaker face-up, stretch a balloon
                over the opening, pour fine sand on top, and play a tone generator app. Start at 200 Hz and sweep up.
              </p>
              <p>
                <strong className="text-text-dark">Water in a bowl:</strong> Fill a metal bowl, place it on a subwoofer,
                and play tones. Watch for geometric standing wave patterns — at 528 Hz, look for hexagonal symmetry.
              </p>
              <p>
                <strong className="text-text-dark">For a healing session:</strong> Use headphones. Select a Solfeggio frequency,
                turn on Healing Pulse at 60 BPM, and enable Binaural Beat. Close your eyes and breathe. Even 10 minutes
                has measurable effects on heart rate variability and autonomic nervous system balance.
              </p>
            </div>
          </div>

          {/* Therapeutic Note */}
          <div className="bg-primary-sage/5 rounded-2xl p-6 border border-primary-sage/15">
            <h3 className="text-lg font-heading font-bold text-text-dark mb-3">
              A Note on Sound Healing in Therapy
            </h3>
            <p className="text-sm text-warm-gray leading-relaxed">
              Sound healing is used as a complementary practice alongside clinical treatment, not as a replacement
              for therapy. Research supports that specific frequencies and rhythmic entrainment can reduce
              cortisol levels, lower heart rate, and shift the nervous system toward a parasympathetic state —
              all of which support the therapeutic process. If you&apos;re interested in exploring how sound
              and somatic practices can support your mental health journey,
              <Link href="/contact" className="text-primary-sage hover:text-earth-green font-medium"> reach out to schedule a session</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
