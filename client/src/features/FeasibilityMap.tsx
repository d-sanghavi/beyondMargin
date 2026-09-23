import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { COMPETITORS, HEAT_LAYERS, PIN_LEGEND, type Competitor, type PinConfidence } from '../mock/data'
import { useAnimatedNumber, useReduceMotion } from '../shared/hooks'
import { IconPin } from '../shared/icons'

const HEAT_STYLES: Record<string, string> = {
  'Population density': 'radial-gradient(circle at 45% 40%, rgba(37,99,235,0.55), transparent 60%), radial-gradient(circle at 65% 65%, rgba(37,99,235,0.4), transparent 55%)',
  'Purchasing power': 'radial-gradient(circle at 50% 45%, rgba(21,128,61,0.5), transparent 55%), radial-gradient(circle at 30% 65%, rgba(185,28,28,0.35), transparent 55%)',
  'Roads & infrastructure': 'repeating-linear-gradient(45deg, rgba(107,114,128,0.28) 0 6px, transparent 6px 18px)',
}

export function FeasibilityMap({ onPeopleChange }: { onPeopleChange?: (n: number) => void }) {
  const reduce = useReduceMotion()
  const [radius, setRadius] = useState(6)
  const [layer, setLayer] = useState<string>('Competitors')
  const [active, setActive] = useState<Competitor | null>(null)

  const people = Math.round(8400 * (radius / 6))
  const displayed = useAnimatedNumber(people, 400)

  // Report the reachable count up to the parent AFTER render, never during it.
  useEffect(() => {
    onPeopleChange?.(people)
  }, [people, onPeopleChange])

  // circle diameter as % of the map box (radius 3..12 → 45%..100%)
  const circlePct = 40 + ((radius - 3) / 9) * 55

  return (
    <div>
      {/* Layer chips */}
      <div className="mb-2 flex gap-2 overflow-x-auto no-scrollbar">
        {HEAT_LAYERS.map((l) => (
          <button
            key={l}
            onClick={() => setLayer(l)}
            className={`chip whitespace-nowrap ${layer === l ? 'chip-active' : ''}`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* People counter */}
      <div className="mb-2 text-center">
        <span className="num text-2xl text-navy">≈ {Math.round(displayed).toLocaleString('en-IN')}</span>
        <span className="ml-1 text-sm text-muted">people reached</span>
      </div>

      {/* Map box */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-rule">
        {/* base */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg,#eaf3e6,#f2efe3), repeating-linear-gradient(115deg, rgba(180,170,140,0.18) 0 2px, transparent 2px 26px)',
          }}
        />
        {/* road lines */}
        <div className="absolute inset-0 opacity-40" style={{ background: 'repeating-linear-gradient(60deg, rgba(120,120,120,0.25) 0 2px, transparent 2px 40px)' }} />

        {/* heat overlay */}
        <AnimatePresence mode="wait">
          {layer !== 'Competitors' && HEAT_STYLES[layer] && (
            <motion.div
              key={layer}
              className="absolute inset-0"
              style={{ background: HEAT_STYLES[layer] }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.35 }}
            />
          )}
        </AnimatePresence>

        {/* catchment circle */}
        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full border-2 border-navy/50 bg-navy/10"
          style={{ translateX: '-50%', translateY: '-50%' }}
          animate={{ width: `${circlePct}%`, height: `${circlePct}%` }}
          transition={{ duration: reduce ? 0 : 0.25 }}
        />

        {/* centre pin */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-saffron">
          <IconPin size={30} className="drop-shadow" />
        </div>

        {/* competitor pins */}
        {COMPETITORS.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c)}
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: `${c.x}%`, top: `${c.y}%`, color: PIN_LEGEND[c.confidence].color }}
            aria-label={c.name}
          >
            <IconPin size={20} />
          </button>
        ))}

        {/* legend */}
        <div className="absolute bottom-2 left-2 rounded-lg bg-white/90 p-2 text-[10px] shadow-soft">
          {(Object.keys(PIN_LEGEND) as PinConfidence[]).map((k) => (
            <div key={k} className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: PIN_LEGEND[k].color }} />
              <span className="text-muted">{PIN_LEGEND[k].label}</span>
            </div>
          ))}
        </div>

        {/* popover */}
        <AnimatePresence>
          {active && (
            <motion.div
              className="absolute inset-x-3 bottom-3 rounded-card bg-white p-3 shadow-softlg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-ink">{active.name}</div>
                  <div className="text-xs text-muted">{active.category} · {active.distanceKm} km away</div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs">
                    <span className="h-2 w-2 rounded-full" style={{ background: PIN_LEGEND[active.confidence].color }} />
                    {PIN_LEGEND[active.confidence].label}
                  </div>
                </div>
                <button onClick={() => setActive(null)} className="text-muted">✕</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* radius slider */}
      <div className="mt-3">
        <div className="mb-1 flex justify-between text-sm">
          <span className="font-medium text-navy">Catchment radius</span>
          <span className="num text-saffron">{radius} km</span>
        </div>
        <input
          type="range"
          min={3}
          max={12}
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="w-full accent-saffron"
          aria-label="Catchment radius"
        />
      </div>
    </div>
  )
}
