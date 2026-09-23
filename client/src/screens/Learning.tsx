import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Badge, Button, Card } from '../shared/ui'
import { ScreenHeader } from '../shared/Screen'
import { IconCheck } from '../shared/icons'
import { MENTOR, MICRO_LESSON } from '../mock/extras'
import { useToast } from '../shared/toast'
import { useReduceMotion } from '../shared/hooks'

export default function Learning() {
  const navigate = useNavigate()
  const toast = useToast((s) => s.show)
  const reduce = useReduceMotion()
  const [playing, setPlaying] = useState(false)
  const [requested, setRequested] = useState(false)

  return (
    <div className="flex h-full flex-col bg-appbg">
      <ScreenHeader title="Learn & connect" onBack={() => navigate(-1)} />
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Micro-lesson */}
        <Card className="p-5">
          <Badge tone="saffron">Because your weakest area is {MICRO_LESSON.triggerDimension}</Badge>
          <h2 className="mt-3 text-lg">{MICRO_LESSON.title}</h2>
          <div className="mt-1 text-xs text-muted">{MICRO_LESSON.minutes}-minute audio lesson · {MICRO_LESSON.language}</div>

          <div className="mt-4 flex items-center gap-3 rounded-btn bg-navy p-3">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-saffron text-white"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? '❚❚' : '▶'}
            </button>
            <div className="flex flex-1 items-end gap-0.5">
              {Array.from({ length: 28 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="w-full rounded-full bg-white/60"
                  animate={playing && !reduce ? { height: [4, 6 + ((i * 7) % 18), 4] } : { height: 5 }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: (i % 6) * 0.08 }}
                  style={{ height: 5 }}
                />
              ))}
            </div>
          </div>
          <p className="mt-3 rounded-lg bg-info/60 p-3 text-sm text-ink">“{MICRO_LESSON.transcript}”</p>
        </Card>

        {/* Mentor */}
        <h3 className="mb-2 mt-6 text-base">A mentor near you</h3>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-navy text-lg font-bold text-white">{MENTOR.name.charAt(0)}</div>
            <div className="flex-1">
              <div className="font-semibold text-ink">{MENTOR.name}</div>
              <div className="text-xs text-muted">{MENTOR.village} · {MENTOR.distanceKm} km · {MENTOR.category} · {MENTOR.years} yrs</div>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted">{MENTOR.note}</p>
          {requested ? (
            <div className="mt-3 flex items-center gap-2 text-success"><IconCheck size={18} strokeWidth={3} /><span className="text-sm font-semibold">Introduction requested — your SCA will connect you.</span></div>
          ) : (
            <Button full className="mt-3" onClick={() => { setRequested(true); toast('Introduction requested', 'success') }}>
              Introduce me
            </Button>
          )}
          <p className="mt-2 text-[11px] text-muted">Introductions are brokered by your SCA office — your number is never shared directly.</p>
        </Card>
      </div>
    </div>
  )
}
