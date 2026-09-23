import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button, Card, Modal } from '../shared/ui'
import { ScrollArea } from '../app/AppFrame'
import { ProgressRing } from '../features/Gauges'
import { IconCFO, IconPlus } from '../shared/icons'
import { CFO, inr } from '../mock/data'
import { useApp } from '../store/useApp'

export default function Cfo() {
  const navigate = useNavigate()
  const submitted = useApp((s) => s.loan.submitted)
  const entries = useApp((s) => s.cfoEntries)
  const addEntry = useApp((s) => s.addCfoEntry)
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')

  if (!submitted) {
    return (
      <ScrollArea className="pt-4">
        <Card className="flex flex-col items-center gap-3 py-12 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-info text-navy"><IconCFO size={30} /></div>
          <h2 className="text-xl">Your Personal CFO</h2>
          <p className="max-w-xs text-sm text-muted">This fills up once your loan is approved — runway, break-even and daily cash tracking.</p>
          <Button variant="secondary" onClick={() => navigate('/app/loan')}>Apply for a loan</Button>
        </Card>
      </ScrollArea>
    )
  }

  return (
    <div className="relative flex h-full flex-col">
      <ScrollArea className="pt-4">
        {/* Runway */}
        <Card className="p-5">
          <h3 className="text-base">Runway</h3>
          <div className="mt-3 h-3 w-full overflow-hidden rounded-full" style={{ background: 'linear-gradient(90deg,#15803D,#D97706,#B91C1C)' }} />
          <p className="mt-3 text-sm text-ink">About <span className="num text-navy">{CFO.runwayMonths} months</span> of cash at your current pace.</p>
        </Card>

        {/* Break-even */}
        <Card className="mt-4 flex flex-col items-center p-5">
          <h3 className="mb-2 self-start text-base">Break-even</h3>
          <ProgressRing value={CFO.breakEvenPct} color="#1F3864" label="to break-even" />
          <p className="mt-2 text-sm text-muted">On track to break even in month {CFO.breakEvenMonth}.</p>
        </Card>

        {/* Calendar strip */}
        <Card className="mt-4 p-5">
          <h3 className="mb-3 text-base">The year ahead</h3>
          <div className="flex gap-1">
            {CFO.months.map((m, i) => (
              <div key={m} className="flex-1 text-center">
                <div className={`h-10 rounded ${i === CFO.leanMonthIndex ? 'bg-warning' : 'bg-info'}`} />
                <div className="mt-1 text-[9px] text-muted">{m}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-saffron">Your lean period starts in about {CFO.leanStartWeeks} weeks — aim to hold {inr(CFO.leanHold)}.</p>
        </Card>

        {/* Next instalment */}
        <Card className="mt-4 bg-navy p-5 text-white">
          <h3 className="text-base text-white">Next instalment</h3>
          <p className="mt-1 text-sm text-white/80">Pay by the 10th to keep your rebate — worth <span className="num">{inr(CFO.nextInstalmentRebate)}</span> this year.</p>
        </Card>

        {/* Entries */}
        <h3 className="mb-2 mt-6 text-base">This week&apos;s entries</h3>
        <div className="flex flex-col gap-2 pb-4">
          {entries.map((e) => (
            <Card key={e.id} className="flex items-center gap-3 p-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#E7F3EC] text-success font-bold">₹</div>
              <div className="flex-1"><div className="font-medium text-ink">{e.note}</div><div className="text-[11px] text-muted">{new Date(e.at).toLocaleDateString()}</div></div>
              <div className="num text-success">+{inr(e.amount)}</div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* FAB */}
      <motion.button
        onClick={() => setOpen(true)}
        whileTap={{ scale: 0.92 }}
        className="absolute bottom-5 right-5 grid h-14 w-14 place-items-center rounded-full bg-saffron text-white shadow-softlg"
        aria-label="Log a sale"
      >
        <IconPlus size={26} />
      </motion.button>

      <Modal open={open} onClose={() => setOpen(false)} title="Log a sale">
        <div className="flex flex-col gap-3">
          <div className="flex h-12 items-center gap-1 rounded-btn border border-rule px-3">
            <span className="text-navy">₹</span>
            <input value={amount} onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))} inputMode="numeric" placeholder="Amount" className="flex-1 bg-transparent outline-none" />
          </div>
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note (e.g. Milk sold)" className="h-12 rounded-btn border border-rule px-3 outline-none focus:border-saffron" />
          <Button full disabled={!amount} onClick={() => {
            addEntry({ id: 'e' + Date.now(), amount: Number(amount), note: note || 'Sale', at: Date.now() })
            setAmount(''); setNote(''); setOpen(false)
          }}>Add entry</Button>
        </div>
      </Modal>
    </div>
  )
}
