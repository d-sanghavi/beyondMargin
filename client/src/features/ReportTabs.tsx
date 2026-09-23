import { useState } from 'react'
import { motion } from 'framer-motion'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Badge, BottomSheet, Button, Card } from '../shared/ui'
import { NeedleGauge, PointerBar, ProgressRing, Sparkline } from './Gauges'
import { IconChevron, IconFlag, IconInfo, IconPlus, IconThumbUp } from '../shared/icons'
import {
  COMPETITORS,
  MARKET_REACH,
  OPPORTUNITY,
  PRICE_SERIES,
  SWOT,
  THREATS,
  VIABILITY,
  inr,
} from '../mock/data'
import { useAnimatedNumber, useReduceMotion } from '../shared/hooks'
import { staggerContainer, staggerItem } from '../shared/motion'
import { useToast } from '../shared/toast'

export function MarketReachTab({ people }: { people: number }) {
  const val = useAnimatedNumber(people, 700)
  const [src, setSrc] = useState(false)
  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5 text-center">
        <div className="num text-4xl text-navy">≈ {Math.round(val).toLocaleString('en-IN')} people</div>
        <div className="mt-1 text-sm text-muted">reachable within 6 km</div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat label="Households" value={MARKET_REACH.households.toLocaleString('en-IN')} />
          <Stat label="Non-farm workers" value={`${MARKET_REACH.nonFarmPct}%`} />
          <Stat label="Electrified homes" value={`${MARKET_REACH.electrifiedPct}%`} />
        </div>
      </Card>
      <Card className="p-5">
        <NeedleGauge position={0.55} zones={['Low', 'Moderate', 'High']} label="Estimated purchasing power for this category" />
      </Card>
      <button onClick={() => setSrc(true)} className="text-left text-[11px] text-muted underline decoration-dotted">
        {MARKET_REACH.source}
      </button>
      <BottomSheet open={src} onClose={() => setSrc(false)} title="How this was estimated">
        <p className="text-sm text-muted">
          Population reach is derived from Census 2011 settlement counts, scaled to 2024 using SHRUG growth
          proxies and the selected catchment radius. This is an estimate, not a headcount.
        </p>
      </BottomSheet>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-info/60 p-2">
      <div className="num text-navy">{value}</div>
      <div className="text-[10px] leading-tight text-muted">{label}</div>
    </div>
  )
}

export function CompetitorsTab({ onAddPin }: { onAddPin?: () => void }) {
  const toast = useToast((s) => s.show)
  const [form, setForm] = useState(false)
  const [name, setName] = useState('')
  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <h3 className="text-base">6 similar businesses found nearby</h3>
        <div className="mt-4">
          <PointerBar segments={['Room for more', 'Balanced', 'Crowded', 'Saturated']} position={0.68} colors={['#15803D', '#65A30D', '#D97706', '#B91C1C']} />
        </div>
      </Card>
      <div className="flex flex-col gap-2">
        {COMPETITORS.map((c) => (
          <Card key={c.id} className="flex items-center gap-3 p-3">
            <div className="flex-1">
              <div className="font-semibold text-ink">{c.name}</div>
              <div className="text-xs text-muted">{c.category} · {c.distanceKm} km</div>
            </div>
            <Badge tone={c.confidence === 'confirmed' ? 'success' : c.confidence === 'registry' ? 'warning' : 'muted'}>
              {c.confidence === 'confirmed' ? 'Confirmed' : c.confidence === 'registry' ? 'Registry' : 'Map data'}
            </Badge>
            <button onClick={() => toast('Thanks — this helps other applicants nearby')} className="text-success"><IconThumbUp size={18} /></button>
            <button onClick={() => toast('Thanks — this helps other applicants nearby')} className="text-danger"><IconFlag size={18} /></button>
          </Card>
        ))}
      </div>
      <Button variant="secondary" full onClick={() => setForm(true)}>
        <IconPlus size={18} /> Add a business you know that&apos;s missing
      </Button>

      <BottomSheet open={form} onClose={() => setForm(false)} title="Add a business">
        <div className="flex flex-col gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Business name" className="h-12 rounded-btn border border-rule px-3 outline-none focus:border-saffron" />
          <input placeholder="Category" className="h-12 rounded-btn border border-rule px-3 outline-none focus:border-saffron" />
          <input placeholder="Rough distance (km)" className="h-12 rounded-btn border border-rule px-3 outline-none focus:border-saffron" />
          <Button full onClick={() => { setForm(false); setName(''); onAddPin?.(); toast('Added — a new pin is on your map', 'success') }}>
            Add to map
          </Button>
        </div>
      </BottomSheet>
    </div>
  )
}

export function OpportunityTab() {
  const [sheet, setSheet] = useState<string | null>(null)
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base">If this doesn&apos;t work, here&apos;s what might</h3>
      <Card className="p-4">
        <div className="mb-2 font-semibold text-navy">Try a nearby village instead</div>
        {OPPORTUNITY.villages.map((v) => (
          <Row key={v.name} title={`${v.name} — ${v.note}`} meta={`${v.uplift}% less competition`} bar={v.uplift} onWhy={() => setSheet(v.why)} tone="#15803D" />
        ))}
      </Card>
      <Card className="p-4">
        <div className="mb-2 font-semibold text-navy">Try a different business instead</div>
        {OPPORTUNITY.businesses.map((b) => (
          <Row key={b.name} title={b.name} meta="high unmet demand" bar={85} onWhy={() => setSheet(b.why)} tone="#2563EB" />
        ))}
      </Card>
      <BottomSheet open={!!sheet} onClose={() => setSheet(null)} title="See why">
        <p className="text-sm text-muted">{sheet}</p>
      </BottomSheet>
    </div>
  )
}

function Row({ title, meta, bar, onWhy, tone }: { title: string; meta: string; bar: number; onWhy: () => void; tone: string }) {
  const reduce = useReduceMotion()
  return (
    <div className="border-t border-rule/70 py-3 first:border-0">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-ink">{title}</div>
        <button onClick={onWhy} className="flex items-center gap-0.5 text-xs font-semibold text-saffron">See why <IconChevron size={14} /></button>
      </div>
      <div className="mt-1 text-xs text-muted">{meta}</div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-rule">
        <motion.div className="h-full rounded-full" style={{ background: tone }} initial={reduce ? { width: `${bar}%` } : { width: 0 }} whileInView={{ width: `${bar}%` }} viewport={{ once: true }} transition={{ duration: reduce ? 0 : 0.8 }} />
      </div>
    </div>
  )
}

export function ThreatsTab() {
  const [open, setOpen] = useState<string | null>(null)
  const sev = (s: string): 'danger' | 'warning' | 'success' =>
    s === 'High' ? 'danger' : s === 'Medium' ? 'warning' : 'success'
  return (
    <div className="flex flex-col gap-3">
      {THREATS.map((t) => (
        <Card key={t.id} className="p-4" onClick={() => setOpen(open === t.id ? null : t.id)}>
          <div className="flex items-center gap-3">
            <div className="flex-1 font-semibold text-ink">{t.name}</div>
            <Badge tone={sev(t.severity)}>{t.severity}</Badge>
          </div>
          {open === t.id && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
              <div className="mt-3 flex items-center gap-3">
                <Sparkline data={t.spark} color="#B45309" />
                <p className="flex-1 text-xs text-muted">{t.explain}</p>
              </div>
            </motion.div>
          )}
        </Card>
      ))}
    </div>
  )
}

export function PriceTrendsTab() {
  const [state, setState] = useState<'block' | 'state'>('block')
  const data = PRICE_SERIES.months.map((m, i) => ({ m, v: PRICE_SERIES[state][i] }))
  return (
    <div className="flex flex-col gap-4">
      <div className="flex rounded-btn border border-rule bg-white p-1 text-sm">
        {(['block', 'state'] as const).map((s) => (
          <button key={s} onClick={() => setState(s)} className={`flex-1 rounded-[9px] py-2 font-semibold ${state === s ? 'bg-navy text-white' : 'text-muted'}`}>
            {s === 'block' ? 'This block' : 'State average'}
          </button>
        ))}
      </div>
      <Card className="p-3">
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E9F2" />
              <XAxis dataKey="m" tick={{ fontSize: 10, fill: '#6B7280' }} interval={1} />
              <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} domain={[35, 50]} />
              <Tooltip formatter={(v) => [`₹${v}/L`, 'Price']} />
              <Line type="monotone" dataKey="v" stroke="#B45309" strokeWidth={2.5} dot={false} isAnimationActive />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card className="bg-warm p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-saffron">Recommended price band</div>
        <div className="num mt-1 text-xl text-navy">{PRICE_SERIES.band}</div>
      </Card>
    </div>
  )
}

export function SwotTab() {
  const reduce = useReduceMotion()
  const quad = (title: string, items: { text: string; observed: boolean }[], bg: string) => (
    <motion.div className={`rounded-card p-3 ${bg}`} variants={staggerItem(reduce)}>
      <div className="mb-2 text-sm font-bold text-navy">{title}</div>
      <ul className="flex flex-col gap-1.5">
        {items.map((it) => (
          <li key={it.text} className="flex items-start gap-1.5 text-xs text-ink">
            <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${it.observed ? 'bg-navy' : 'bg-muted'}`} />
            {it.text}
          </li>
        ))}
      </ul>
    </motion.div>
  )
  return (
    <motion.div className="grid grid-cols-2 gap-3" variants={staggerContainer(reduce)} initial="hidden" animate="show">
      {quad('Strengths', SWOT.strengths, 'bg-[#E7F3EC]')}
      {quad('Weaknesses', SWOT.weaknesses, 'bg-[#FEF1E1]')}
      {quad('Opportunities', SWOT.opportunities, 'bg-[#E7EEFB]')}
      {quad('Threats', SWOT.threats, 'bg-[#FBEAEA]')}
      <div className="col-span-2 flex items-center gap-4 text-[10px] text-muted">
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-navy" /> Observed data</span>
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-muted" /> Estimated</span>
      </div>
    </motion.div>
  )
}

export function ViabilityTab() {
  const reduce = useReduceMotion()
  return (
    <div className="flex flex-col items-center gap-4">
      <Card className="flex w-full flex-col items-center p-5">
        <ProgressRing value={VIABILITY.score} label="out of 100" />
        <div className="mt-3 rounded-full bg-warm px-4 py-1.5 text-sm font-semibold text-saffron">{VIABILITY.verdict}</div>
        <p className="mt-3 text-center text-[11px] text-muted">
          No credit history needed — you're scored on the <span className="font-semibold text-navy">opportunity</span>, and every
          point decomposes into a reason below.
        </p>
      </Card>
      <div className="w-full">
        {VIABILITY.factors.map((f) => {
          const positive = f.effect > 0
          return (
            <div key={f.label} className="py-2">
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-ink">{f.label}</span>
                <span className={`num ${positive ? 'text-success' : 'text-danger'}`}>{positive ? '+' : ''}{f.effect}</span>
              </div>
              <div className="relative h-2 w-full rounded-full bg-rule">
                <motion.div
                  className={`absolute h-full rounded-full ${positive ? 'bg-success' : 'bg-danger'}`}
                  style={positive ? { left: '50%' } : { right: '50%' }}
                  initial={reduce ? { width: `${Math.abs(f.effect) * 2.2}%` } : { width: 0 }}
                  whileInView={{ width: `${Math.abs(f.effect) * 2.2}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: reduce ? 0 : 0.8 }}
                />
                <div className="absolute left-1/2 top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-muted/50" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
