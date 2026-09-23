import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge, Button, Card, Modal } from '../shared/ui'
import { ScreenHeader } from '../shared/Screen'
import { FeasibilityMap } from '../features/FeasibilityMap'
import {
  CompetitorsTab,
  MarketReachTab,
  OpportunityTab,
  PriceTrendsTab,
  SwotTab,
  ThreatsTab,
  ViabilityTab,
} from '../features/ReportTabs'
import { useApp } from '../store/useApp'
import { VIABILITY } from '../mock/data'
import { useReduceMotion } from '../shared/hooks'
import { IconClose } from '../shared/icons'

const TABS = ['Market Reach', 'Competitors', 'Opportunity', 'Threats', 'Price Trends', 'SWOT', 'Viability Score']

export default function Report() {
  const navigate = useNavigate()
  const reduce = useReduceMotion()
  const location = useApp((s) => s.selectedLocation)
  const category = useApp((s) => s.businessCategory)
  const [tab, setTab] = useState(0)
  const [people, setPeople] = useState(8400)
  const [bannerOpen, setBannerOpen] = useState(true)
  const [split, setSplit] = useState(false)
  const [compiling, setCompiling] = useState(false)

  const loc = location ?? { name: 'Chikhli', district: 'Buldhana district', state: 'Maharashtra', lgd: '512340', match: 94 }

  const generate = () => {
    setCompiling(true)
    // save a report card to Home
    const add = useApp.getState().addReport
    if (useApp.getState().reports.length === 0) {
      add({ id: 'r' + Date.now(), location: `${loc.name}, ${loc.district}`, category: category ?? 'Dairy', score: VIABILITY.score, createdAt: Date.now() })
    }
    setTimeout(() => {
      setCompiling(false)
      navigate('/report/summary')
    }, 1500)
  }

  return (
    <div className="flex h-full flex-col bg-appbg">
      <ScreenHeader onBack={() => navigate('/app/home')} title="Feasibility report" />

      <div className="flex-1 overflow-y-auto px-4 pb-28">
        {/* Header card */}
        <Card className="mt-1 p-4">
          <h2 className="text-lg leading-snug">{loc.name}, {loc.district}, {loc.state}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge tone="info">LGD: {loc.lgd}</Badge>
            <Badge tone="success">High confidence match</Badge>
            <button onClick={() => navigate('/intake')} className="text-xs font-semibold text-saffron underline decoration-dotted">Not right? Fix it</button>
          </div>
        </Card>

        {/* Map */}
        <div className="mt-4">
          <FeasibilityMap onPeopleChange={setPeople} />
        </div>

        {/* Crowding banner (shows when saturation crowded) */}
        <AnimatePresence>
          {bannerOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-center gap-2 rounded-card bg-warm p-3"
            >
              <span className="flex-1 text-sm text-saffron">5 other people near you are exploring the same business.</span>
              <Button className="h-9 px-3 text-xs" onClick={() => setSplit(true)}>See a smarter way in</Button>
              <button onClick={() => setBannerOpen(false)} className="text-saffron"><IconClose size={16} /></button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab strip */}
        <div className="sticky top-0 z-10 -mx-4 mt-4 bg-appbg/95 px-4 py-2 backdrop-blur">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {TABS.map((t, i) => (
              <button
                key={t}
                onClick={() => setTab(i)}
                className={`whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                  tab === i ? 'bg-navy text-white' : 'bg-white text-muted border border-rule'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {tab === 0 && <MarketReachTab people={people} />}
              {tab === 1 && <CompetitorsTab />}
              {tab === 2 && <OpportunityTab />}
              {tab === 3 && <ThreatsTab />}
              {tab === 4 && <PriceTrendsTab />}
              {tab === 5 && <SwotTab />}
              {tab === 6 && <ViabilityTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Persistent generate button */}
      <div className="border-t border-rule bg-appbg p-4">
        <Button full onClick={generate} disabled={compiling}>
          {compiling ? 'Compiling…' : 'Generate my full report'}
        </Button>
      </div>

      {/* Value chain split modal */}
      <Modal open={split} onClose={() => setSplit(false)} title="A smarter way in">
        <ValueChainDiagram />
        <p className="mt-4 text-sm text-muted">
          Splitting the value chain means everyone can succeed instead of competing for the same customers.
        </p>
        <Button full className="mt-4" onClick={() => setSplit(false)}>Got it</Button>
      </Modal>
    </div>
  )
}

function ValueChainDiagram() {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">Today</div>
      <div className="mt-2 flex justify-between">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#FBEAEA] text-danger text-xs font-bold">🏪</div>
            <span className="text-[9px] text-muted">Dairy shop</span>
          </div>
        ))}
      </div>
      <div className="my-3 text-center text-muted">↓</div>
      <div className="text-xs font-semibold uppercase tracking-wide text-success">A better split</div>
      <div className="mt-2 flex items-center justify-between gap-1">
        {[
          { icon: '🥛', label: 'Collection point' },
          { icon: '🏪', label: 'Shop' },
          { icon: '🏪', label: 'Shop' },
          { icon: '🚚', label: 'Transport' },
        ].map((n, i, arr) => (
          <div key={i} className="flex items-center gap-1">
            <div className="flex flex-col items-center gap-1">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#E7F3EC] text-xs">{n.icon}</div>
              <span className="text-[9px] text-muted">{n.label}</span>
            </div>
            {i < arr.length - 1 && <span className="text-muted">→</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
