import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../shared/ui'
import { ScreenHeader } from '../shared/Screen'
import { IconCheck, IconMic, IconPin } from '../shared/icons'
import { BUSINESS_CATEGORIES, LOCATION_CANDIDATES, MARGIN_CHIPS, inr } from '../mock/data'
import { useApp } from '../store/useApp'
import { useToast } from '../shared/toast'
import { delay, useReduceMotion } from '../shared/hooks'
import type { SelectedLocation } from '../store/useApp'

type Step = 'location' | 'candidates' | 'category' | 'margin'

interface Bubble {
  from: 'bot' | 'user'
  text: string
}

export default function Intake() {
  const navigate = useNavigate()
  const toast = useToast((s) => s.show)
  const reduce = useReduceMotion()
  const setLocation = useApp((s) => s.setSelectedLocation)
  const setCategory = useApp((s) => s.setBusinessCategory)
  const setMargin = useApp((s) => s.setMarginCapital)

  const [bubbles, setBubbles] = useState<Bubble[]>([
    { from: 'bot', text: 'Where are you planning to start your business?' },
  ])
  const [step, setStep] = useState<Step>('location')
  const [input, setInput] = useState('')
  const [recording, setRecording] = useState(false)
  const [customMargin, setCustomMargin] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }, [bubbles, step, reduce])

  const say = (b: Bubble) => setBubbles((prev) => [...prev, b])

  const submitLocation = () => {
    const text = input.trim() || 'Chikhli, near Buldhana'
    say({ from: 'user', text })
    setInput('')
    setStep('candidates')
  }

  const mic = async () => {
    setRecording(true)
    await delay(2000)
    setRecording(false)
    setInput('Chikhli, near Buldhana')
  }

  const chooseCandidate = (c: SelectedLocation) => {
    setLocation(c)
    toast(`Location set: ${c.name}, ${c.district}`, 'success')
    say({ from: 'user', text: `${c.name}, ${c.district}` })
    say({ from: 'bot', text: 'What kind of business are you thinking about?' })
    setStep('category')
  }

  const chooseCategory = (c: string) => {
    setCategory(c)
    say({ from: 'user', text: c })
    say({ from: 'bot', text: 'How much can you invest yourself right now?' })
    setStep('margin')
  }

  const chooseMargin = (v: number) => {
    setMargin(v)
    say({ from: 'user', text: inr(v) })
    setTimeout(() => navigate('/building'), 500)
  }

  return (
    <div className="flex h-full flex-col bg-appbg">
      <ScreenHeader title="New feasibility check" onBack={() => navigate('/app/home')} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {bubbles.map((b, i) => (
            <motion.div
              key={i}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                b.from === 'bot' ? 'self-start bg-white text-ink shadow-soft' : 'self-end bg-navy text-white'
              }`}
            >
              {b.text}
            </motion.div>
          ))}

          {/* Candidate cards */}
          <AnimatePresence>
            {step === 'candidates' && (
              <motion.div className="flex flex-col gap-2 self-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {LOCATION_CANDIDATES.map((c) => (
                  <button
                    key={c.lgd}
                    onClick={() => chooseCandidate(c)}
                    className="flex items-center gap-3 rounded-card border border-rule bg-white p-3 text-left shadow-soft"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-lg bg-info text-navy">
                      <IconPin size={22} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-ink">{c.name}</div>
                      <div className="text-xs text-muted">{c.district}, {c.state}</div>
                    </div>
                    <div className="text-right">
                      <div className="num text-saffron">{c.match}%</div>
                      <div className="text-[10px] text-muted">match</div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={endRef} />
        </div>
      </div>

      {/* Input area per step */}
      <div className="border-t border-rule bg-white p-3">
        {step === 'location' && (
          <div className="flex items-center gap-2">
            <input
              value={recording ? '' : input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitLocation()}
              placeholder={recording ? 'Listening…' : 'Type a village or town'}
              className="h-12 flex-1 rounded-btn border border-rule bg-appbg px-3 text-sm outline-none focus:border-saffron"
            />
            <button
              onClick={mic}
              aria-label="Voice input"
              className={`grid h-12 w-12 place-items-center rounded-btn ${recording ? 'bg-danger text-white' : 'bg-info text-navy'}`}
            >
              {recording ? <Waveform /> : <IconMic size={22} />}
            </button>
            <Button onClick={submitLocation} className="h-12 px-4">Send</Button>
          </div>
        )}

        {step === 'category' && (
          <div className="flex flex-wrap gap-2">
            {BUSINESS_CATEGORIES.map((c) => (
              <button key={c} onClick={() => chooseCategory(c)} className="chip">{c}</button>
            ))}
          </div>
        )}

        {step === 'margin' && (
          <div>
            <div className="flex flex-wrap gap-2">
              {MARGIN_CHIPS.map((v) => (
                <button key={v} onClick={() => chooseMargin(v)} className="chip">{inr(v)}</button>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex h-11 flex-1 items-center gap-1 rounded-btn border border-rule bg-appbg px-3">
                <span className="text-navy">₹</span>
                <input
                  value={customMargin}
                  onChange={(e) => setCustomMargin(e.target.value.replace(/\D/g, ''))}
                  inputMode="numeric"
                  placeholder="Other amount"
                  className="flex-1 bg-transparent text-sm outline-none"
                />
              </div>
              <Button className="h-11" disabled={!customMargin} onClick={() => chooseMargin(Number(customMargin))}>
                <IconCheck size={18} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Waveform() {
  return (
    <div className="flex items-end gap-0.5">
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-white"
          animate={{ height: [6, 16, 6] }}
          transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.12 }}
          style={{ height: 6 }}
        />
      ))}
    </div>
  )
}
