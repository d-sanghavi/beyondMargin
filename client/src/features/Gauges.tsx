import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReduceMotion } from '../shared/hooks'

/* Circular progress ring (viability / break-even) */
export function ProgressRing({
  value,
  max = 100,
  size = 160,
  label,
  color,
}: {
  value: number
  max?: number
  size?: number
  label?: string
  color?: string
}) {
  const reduce = useReduceMotion()
  const [v, setV] = useState(reduce ? value : 0)
  useEffect(() => {
    if (reduce) return setV(value)
    const id = setTimeout(() => setV(value), 60)
    return () => clearTimeout(id)
  }, [value, reduce])

  const stroke = 12
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.min(v / max, 1)
  const ringColor = color ?? (value < 40 ? '#B91C1C' : value <= 65 ? '#D97706' : '#15803D')

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E4E9F2" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={ringColor}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={false}
          animate={{ strokeDashoffset: c * (1 - pct) }}
          transition={{ duration: reduce ? 0 : 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="num text-3xl" style={{ color: ringColor }}>
          {Math.round(v)}
        </span>
        {label && <span className="text-[11px] text-muted">{label}</span>}
      </div>
    </div>
  )
}

/* Needle gauge (purchasing power) */
export function NeedleGauge({ position, zones, label }: { position: number; zones: string[]; label: string }) {
  const reduce = useReduceMotion()
  // position 0..1
  const angle = -90 + position * 180
  const colors = ['#B91C1C', '#D97706', '#15803D']
  return (
    <div className="flex flex-col items-center">
      <svg width={200} height={116} viewBox="0 0 200 116">
        {[0, 1, 2].map((i) => {
          const a0 = Math.PI - (i / 3) * Math.PI
          const a1 = Math.PI - ((i + 1) / 3) * Math.PI
          const x0 = 100 + 84 * Math.cos(a0)
          const y0 = 100 - 84 * Math.sin(a0)
          const x1 = 100 + 84 * Math.cos(a1)
          const y1 = 100 - 84 * Math.sin(a1)
          return (
            <path
              key={i}
              d={`M ${x0} ${y0} A 84 84 0 0 1 ${x1} ${y1}`}
              fill="none"
              stroke={colors[i]}
              strokeWidth={14}
              strokeLinecap="butt"
              opacity={0.85}
            />
          )
        })}
        <motion.line
          x1={100}
          y1={100}
          x2={100}
          y2={28}
          stroke="#1F3864"
          strokeWidth={3}
          strokeLinecap="round"
          style={{ transformOrigin: '100px 100px' }}
          initial={reduce ? { rotate: angle } : { rotate: -90 }}
          animate={{ rotate: angle }}
          transition={{ duration: reduce ? 0 : 1, ease: [0.16, 1, 0.3, 1] }}
        />
        <circle cx={100} cy={100} r={6} fill="#1F3864" />
      </svg>
      <div className="mt-1 text-center">
        <div className="text-xs text-muted">{label}</div>
        <div className="font-semibold text-navy">{zones[Math.min(Math.floor(position * 3), 2)]}</div>
      </div>
    </div>
  )
}

/* Horizontal pointer bar (competitor saturation, reality check) */
export function PointerBar({
  segments,
  position,
  colors = ['#15803D', '#D97706', '#B91C1C'],
}: {
  segments: string[]
  position: number // 0..1
  colors?: string[]
}) {
  const reduce = useReduceMotion()
  return (
    <div>
      <div className="relative h-3 w-full overflow-hidden rounded-full">
        <div className="flex h-full w-full">
          {segments.map((_, i) => (
            <div key={i} className="flex-1" style={{ background: colors[i % colors.length] }} />
          ))}
        </div>
        <motion.div
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-navy shadow"
          initial={reduce ? { left: `${position * 100}%` } : { left: '0%' }}
          animate={{ left: `${position * 100}%` }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] text-muted">
        {segments.map((s) => (
          <span key={s} className="flex-1 text-center">{s}</span>
        ))}
      </div>
    </div>
  )
}

/* Sparkline */
export function Sparkline({ data, color = '#1F3864' }: { data: number[]; color?: string }) {
  const w = 120
  const h = 32
  const max = Math.max(...data)
  const min = Math.min(...data)
  const pts = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * w
      const y = h - ((d - min) / (max - min || 1)) * h
      return `${x},${y}`
    })
    .join(' ')
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
