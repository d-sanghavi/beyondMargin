import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Confetti, DrawnCheck } from '../shared/ui'
import { TRACKER_STAGES } from '../mock/data'
import { useApp } from '../store/useApp'
import { IconCheck } from '../shared/icons'
import { delay } from '../shared/hooks'

export default function Tracker() {
  const navigate = useNavigate()
  const loan = useApp((s) => s.loan)
  const account = useApp((s) => s.kyc.account)
  const [phase, setPhase] = useState<'success' | 'tracking'>('success')

  useEffect(() => {
    if (phase === 'success') {
      delay(1800).then(() => setPhase('tracking'))
    }
  }, [phase])

  if (phase === 'success') {
    return (
      <div className="relative flex h-full flex-col items-center justify-center bg-appbg px-8 text-center">
        <Confetti />
        <DrawnCheck size={92} />
        <h1 className="mt-5 text-2xl">Application submitted</h1>
        <p className="mt-2 text-sm text-muted">Your application ID</p>
        <div className="num mt-1 text-xl text-saffron">{loan.appId ?? 'BM-2026-004821'}</div>
      </div>
    )
  }

  const current = 0 // Submitted is done; Under review is current-ish

  return (
    <div className="flex h-full flex-col bg-appbg">
      <div className="px-4 py-4 lg:pt-8">
        <h1 className="text-2xl">Track your application</h1>
        <p className="mt-1 text-sm text-muted">ID {loan.appId ?? 'BM-2026-004821'}</p>
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        <Card className="p-5">
          {TRACKER_STAGES.map((s, i) => {
            const done = i <= current
            const isCurrent = i === current + 1
            return (
              <div key={s} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`grid h-8 w-8 place-items-center rounded-full ${done ? 'bg-success text-white' : isCurrent ? 'bg-saffron text-white' : 'bg-rule text-muted'}`}>
                    {done ? <IconCheck size={16} strokeWidth={3} /> : <span className="text-xs">{i + 1}</span>}
                  </div>
                  {i < TRACKER_STAGES.length - 1 && <div className={`h-10 w-0.5 ${done ? 'bg-success' : 'bg-rule'}`} />}
                </div>
                <div className="pb-2 pt-1">
                  <div className={`font-semibold ${done || isCurrent ? 'text-ink' : 'text-muted'}`}>{s}</div>
                  {done && <div className="text-xs text-success">Done</div>}
                  {isCurrent && <div className="text-xs text-saffron">In progress</div>}
                </div>
              </div>
            )
          })}
        </Card>

        <Card className="mt-4 bg-info p-4">
          <p className="text-sm text-navy">
            Funds will be sent to <span className="font-semibold">{account ? `${account.bank} ${account.masked}` : 'your selected account'}</span> on approval.
          </p>
        </Card>

        <button className="mt-4 w-full text-center text-sm font-semibold text-saffron">Track on Jan Samarth</button>
      </div>
      <div className="border-t border-rule p-4">
        <Button full variant="secondary" onClick={() => navigate('/app/cfo')}>Go to my CFO dashboard</Button>
      </div>
    </div>
  )
}
