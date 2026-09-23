import { useNavigate } from 'react-router-dom'
import { Button, Card } from '../shared/ui'
import { ScrollArea } from '../app/AppFrame'
import { IconChevron, IconLock, IconMapPinDashed, IconCheck } from '../shared/icons'
import { useApp } from '../store/useApp'
import { inr } from '../mock/data'

export default function Home() {
  const navigate = useNavigate()
  const reports = useApp((s) => s.reports)
  const kycComplete = useApp((s) => s.kycComplete())
  const account = useApp((s) => s.kyc.account)

  return (
    <ScrollArea className="pt-4">
      {/* Primary CTA */}
      <Card className="overflow-hidden">
        <div className="bg-navy p-5 text-white">
          <h2 className="text-xl text-white">Start a new feasibility check</h2>
          <p className="mt-1 text-sm text-white/70">Tell us where and what — we&apos;ll do the rest.</p>
          <Button className="mt-4" onClick={() => navigate('/intake')}>
            Get started
          </Button>
        </div>
      </Card>

      {/* Your reports */}
      <div className="mt-6">
        <h3 className="mb-3 text-base">Your reports</h3>
        {reports.length === 0 ? (
          <Card className="flex flex-col items-center justify-center gap-2 py-8 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-dashed border-rule text-muted">
              <IconMapPinDashed size={26} />
            </div>
            <p className="text-sm text-muted">No reports yet.</p>
          </Card>
        ) : (
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {reports.map((r) => (
              <Card key={r.id} className="min-w-[220px] p-4" onClick={() => navigate('/report')}>
                <div className="text-xs text-muted">{r.category}</div>
                <div className="mt-1 font-serif text-lg text-navy">{r.location}</div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="num text-2xl text-saffron">{r.score}</span>
                  <span className="text-xs text-muted">/ 100 viability</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Bank status */}
      <Card className="mt-6 flex items-center gap-3 p-4" onClick={() => navigate('/kyc')}>
        <div className={`grid h-11 w-11 place-items-center rounded-full ${kycComplete ? 'bg-[#E7F3EC] text-success' : 'bg-info text-navy'}`}>
          {kycComplete ? <IconCheck size={22} /> : <IconLock size={20} />}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-ink">Bank account</div>
          <div className="text-sm text-muted">
            {kycComplete && account ? `${account.bank} ${account.masked}` : 'Not linked yet — link one to apply for a loan'}
          </div>
        </div>
        <IconChevron size={20} className="text-muted" />
      </Card>

      <p className="mt-6 text-center text-[11px] text-muted">
        Numbers in this app are illustrative. The real product computes them with a deterministic, tested engine.
      </p>
    </ScrollArea>
  )
}
