import { useNavigate } from 'react-router-dom'
import { Card, Toggle, BottomSheet } from '../shared/ui'
import { ScrollArea } from '../app/AppFrame'
import { IconChevron } from '../shared/icons'
import { useApp } from '../store/useApp'
import { useState } from 'react'

export default function Profile() {
  const navigate = useNavigate()
  const language = useApp((s) => s.language)
  const reduceMotion = useApp((s) => s.reduceMotion)
  const setReduceMotion = useApp((s) => s.setReduceMotion)
  const kycComplete = useApp((s) => s.kycComplete())
  const resetDemo = useApp((s) => s.resetDemo)
  const [consentSheet, setConsentSheet] = useState(false)

  const Row = ({ label, value, onClick }: { label: string; value?: string; onClick?: () => void }) => (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-4 text-left"
    >
      <span className="flex-1 font-medium text-ink">{label}</span>
      {value && <span className="text-sm text-muted">{value}</span>}
      {onClick && <IconChevron size={18} className="text-muted" />}
    </button>
  )

  return (
    <ScrollArea className="pt-4">
      <div className="flex items-center gap-4 px-1 pb-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-navy text-xl font-bold text-white">RP</div>
        <div>
          <div className="font-serif text-xl text-navy">Ramesh Kumar Patil</div>
          <div className="text-sm text-muted">+91 98••• ••821</div>
        </div>
      </div>

      <Card className="divide-y divide-rule">
        <Row label="Language" value={language} onClick={() => navigate('/language')} />
        <Row
          label="Linked accounts"
          value={kycComplete ? '3 linked' : 'None yet'}
          onClick={() => navigate('/app/profile/linked-accounts')}
        />
        <Row label="Consent settings" onClick={() => setConsentSheet(true)} />
      </Card>

      <Card className="mt-4 divide-y divide-rule">
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="flex-1">
            <div className="font-medium text-ink">Reduce motion</div>
            <div className="text-sm text-muted">Turn off animations across the app.</div>
          </div>
          <Toggle checked={reduceMotion} onChange={setReduceMotion} />
        </div>
      </Card>

      <div className="mt-6 mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted">Explore other views (prototype)</div>
      <Card className="divide-y divide-rule">
        <Row label="Ministry portfolio dashboard" onClick={() => navigate('/ministry')} />
        <Row label="SCA officer co-pilot" onClick={() => navigate('/officer')} />
        <Row label="Bharat Mode (offline / IVR / SMS)" onClick={() => navigate('/bharat-mode')} />
        <Row label="Learn & connect (micro-lesson + mentor)" onClick={() => navigate('/learning')} />
      </Card>

      <Card className="mt-4">
        <Row label="Reset demo" onClick={() => resetDemo()} />
      </Card>
      <Card className="mt-4">
        <Row label="Log out" onClick={() => navigate('/')} />
      </Card>

      <p className="mt-6 text-center text-[11px] text-muted">beyondMargin · SIH 2026 prototype</p>

      <BottomSheet open={consentSheet} onClose={() => setConsentSheet(false)} title="Consent settings">
        <ConsentToggles />
      </BottomSheet>
    </ScrollArea>
  )
}

function ConsentToggles() {
  const [state, setState] = useState({ report: true, share: false, reminders: true, mentor: false })
  const rows: { id: keyof typeof state; title: string; locked?: boolean }[] = [
    { id: 'report', title: 'Generate my feasibility report', locked: true },
    { id: 'share', title: 'Share my report with a loan officer if I apply' },
    { id: 'reminders', title: 'Send me reminders about my repayments' },
    { id: 'mentor', title: 'Introduce me to a nearby mentor' },
  ]
  return (
    <div className="flex flex-col gap-3">
      {rows.map((r) => (
        <div key={r.id} className="flex items-center gap-3">
          <span className="flex-1 text-sm text-ink">{r.title}</span>
          <Toggle checked={state[r.id]} disabled={r.locked} onChange={(v) => setState((s) => ({ ...s, [r.id]: v }))} />
        </div>
      ))}
    </div>
  )
}
