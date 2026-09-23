import { useState } from 'react'
import { PortalCard, PortalShell } from '../shell/PortalShell'
import { Badge, Button, DrawnCheck, Modal } from '../shared/ui'
import { IconCheck, IconChevron, IconPin } from '../shared/icons'
import { OFFICER_QUEUE, OVERRIDE_REASONS, type Application } from '../mock/portal'
import { COMPETITORS, PIN_LEGEND, inr } from '../mock/data'
import { delay } from '../shared/hooks'
import { useToast } from '../shared/toast'

export default function Officer() {
  const [selected, setSelected] = useState<Application | null>(null)
  const [queue] = useState(OFFICER_QUEUE)

  return (
    <PortalShell title="SCA Co-Pilot" subtitle="Pre-scored, pre-verified application dossiers · loan-officer console" tone="saffron">
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Queue */}
        <div className="lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-base">Queue</h2>
            <Badge tone="saffron">{queue.length} pending</Badge>
          </div>
          <div className="flex flex-col gap-2">
            {queue.map((a) => (
              <PortalCard key={a.id} className={`cursor-pointer transition-colors ${selected?.id === a.id ? 'ring-2 ring-saffron' : ''}`}>
                <button onClick={() => setSelected(a)} className="flex w-full items-center gap-3 text-left">
                  <ScoreDot score={a.score} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold text-ink">{a.applicant}</div>
                    <div className="truncate text-xs text-muted">{a.village}, {a.district} · {a.category}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <SlaBadge hours={a.slaHours} />
                      <Badge tone="muted">{a.status}</Badge>
                    </div>
                  </div>
                  <IconChevron size={18} className="text-muted" />
                </button>
              </PortalCard>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          {selected ? <Dossier app={selected} /> : (
            <PortalCard className="grid h-full min-h-[300px] place-items-center text-center text-muted">
              Select an application to review its dossier.
            </PortalCard>
          )}
        </div>
      </div>
    </PortalShell>
  )
}

function Dossier({ app }: { app: Application }) {
  const toast = useToast((s) => s.show)
  const [verified, setVerified] = useState(app.passportVerified)
  const [verifying, setVerifying] = useState(false)
  const [decision, setDecision] = useState<'approved' | 'returned' | null>(null)
  const [overrideOpen, setOverrideOpen] = useState(false)

  const verify = async () => {
    setVerifying(true)
    await delay(700)
    setVerifying(false)
    setVerified(true)
    toast('Calculation passport verified — matches official formula', 'success')
  }

  if (decision) {
    return (
      <PortalCard className="flex flex-col items-center gap-3 py-10 text-center">
        <DrawnCheck color={decision === 'approved' ? '#15803D' : '#D97706'} />
        <h2 className="text-lg">Application {decision}</h2>
        <p className="text-sm text-muted">{app.id} · captured as a labelled training signal.</p>
        <Button variant="secondary" onClick={() => setDecision(null)}>Back to dossier</Button>
      </PortalCard>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <PortalCard>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg">{app.applicant}</h2>
            <div className="text-sm text-muted">{app.village}, {app.district} · {app.category}</div>
            <div className="mt-1 text-xs text-muted">{app.id}</div>
          </div>
          <div className="text-center">
            <ScoreDot score={app.score} big />
            <div className="mt-1 text-[10px] text-muted">viability</div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <Metric label="Project cost" value={inr(app.projectCost)} />
          <Metric label="Loan" value={inr(app.loan)} />
          <Metric label="Competitors" value={String(app.competitors)} />
        </div>
      </PortalCard>

      {/* Flagged weakness */}
      <PortalCard className="!bg-warm">
        <div className="text-xs font-semibold uppercase tracking-wide text-saffron">Flagged for targeted questioning</div>
        <div className="mt-1 font-semibold text-ink">Weakest dimension: {app.weakest}</div>
      </PortalCard>

      {/* Passport verify + evidence */}
      <div className="grid gap-4 sm:grid-cols-2">
        <PortalCard>
          <h3 className="mb-2 text-sm font-semibold">Calculation passport</h3>
          {verified ? (
            <div className="flex items-center gap-2 text-success"><IconCheck size={18} strokeWidth={3} /> <span className="text-sm font-semibold">Verified — matches formula</span></div>
          ) : (
            <Button variant="secondary" full onClick={verify} disabled={verifying}>{verifying ? 'Verifying…' : 'Verify in one click'}</Button>
          )}
        </PortalCard>
        <PortalCard>
          <h3 className="mb-2 text-sm font-semibold">Geospatial evidence</h3>
          <div className="relative h-24 overflow-hidden rounded-lg" style={{ background: 'linear-gradient(135deg,#eaf3e6,#f2efe3)' }}>
            <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-navy/40 bg-navy/10" />
            {COMPETITORS.slice(0, 5).map((c) => (
              <span key={c.id} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${c.x}%`, top: `${c.y}%`, color: PIN_LEGEND[c.confidence].color }}><IconPin size={14} /></span>
            ))}
          </div>
          <div className="mt-1 text-[10px] text-muted">Crowd-verified competitor map · {app.competitors} nearby</div>
        </PortalCard>
      </div>

      {/* Decision */}
      <PortalCard>
        <h3 className="mb-2 text-sm font-semibold">Decision</h3>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setDecision('approved')}>Approve</Button>
          <Button variant="secondary" onClick={() => setDecision('returned')}>Return for docs</Button>
          <Button variant="ghost" onClick={() => setOverrideOpen(true)}>Override score</Button>
        </div>
        <p className="mt-2 text-[11px] text-muted">Every override is captured as a labelled training signal.</p>
      </PortalCard>

      <Modal open={overrideOpen} onClose={() => setOverrideOpen(false)} title="Override — reason code">
        <div className="flex flex-col gap-2">
          {OVERRIDE_REASONS.map((r) => (
            <button key={r} onClick={() => { setOverrideOpen(false); toast('Override logged: ' + r) }} className="rounded-btn border border-rule px-3 py-2.5 text-left text-sm hover:bg-info">
              {r}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  )
}

function ScoreDot({ score, big }: { score: number; big?: boolean }) {
  const color = score < 40 ? '#B91C1C' : score <= 65 ? '#D97706' : '#15803D'
  return (
    <div className={`grid place-items-center rounded-full font-bold text-white ${big ? 'h-14 w-14 text-xl' : 'h-11 w-11 text-sm'}`} style={{ background: color }}>
      {score}
    </div>
  )
}

function SlaBadge({ hours }: { hours: number }) {
  const tone = hours <= 6 ? 'danger' : hours <= 24 ? 'warning' : 'success'
  return <Badge tone={tone}>SLA {hours}h</Badge>
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-info/60 p-2">
      <div className="num text-sm text-navy">{value}</div>
      <div className="text-[10px] text-muted">{label}</div>
    </div>
  )
}
