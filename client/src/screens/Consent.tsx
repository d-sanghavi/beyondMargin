import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Toggle } from '../shared/ui'
import { IconShield } from '../shared/icons'

const ROWS = [
  { id: 'report', title: 'Generate my feasibility report', desc: 'Needed to check if your idea will work.', locked: true, default: true },
  { id: 'share', title: 'Share my report with a loan officer if I apply', desc: 'Only when you choose to apply for a loan.', default: false },
  { id: 'reminders', title: 'Send me reminders about my repayments', desc: 'Gentle nudges before each due date.', default: false },
  { id: 'mentor', title: 'Introduce me to a nearby mentor in the same business', desc: 'An experienced entrepreneur near you.', default: false },
]

export default function Consent() {
  const navigate = useNavigate()
  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(ROWS.map((r) => [r.id, r.default])),
  )

  return (
    <div className="flex h-full flex-col bg-appbg">
      <div className="px-6 pt-12 lg:pt-16">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-info text-navy">
          <IconShield size={28} />
        </div>
        <h1 className="mt-5 text-2xl">Your data, your choice.</h1>
        <p className="mt-2 text-sm text-muted">You can change any of these later in Profile.</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-6">
        <div className="flex flex-col gap-3">
          {ROWS.map((r) => (
            <div key={r.id} className="flex items-start gap-3 rounded-card border border-rule bg-white p-4 shadow-soft">
              <div className="flex-1">
                <div className="font-semibold text-ink">{r.title}</div>
                <div className="mt-0.5 text-sm text-muted">{r.desc}</div>
                {r.locked && <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">Always on</div>}
              </div>
              <Toggle
                checked={state[r.id]}
                disabled={r.locked}
                onChange={(v) => setState((s) => ({ ...s, [r.id]: v }))}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-rule bg-appbg p-4">
        <Button full onClick={() => navigate('/app/home')}>
          Continue
        </Button>
      </div>
    </div>
  )
}
