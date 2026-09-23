import { useNavigate } from 'react-router-dom'
import { Button, Card } from '../shared/ui'
import { ScreenHeader } from '../shared/Screen'
import { QrSquare } from '../features/QrSquare'
import { IconShare } from '../shared/icons'
import { useApp } from '../store/useApp'
import { MARKET_REACH, PRICE_SERIES, VIABILITY, inr } from '../mock/data'
import { useToast } from '../shared/toast'

export default function ReportSummary() {
  const navigate = useNavigate()
  const toast = useToast((s) => s.show)
  const loc = useApp((s) => s.selectedLocation)
  const category = useApp((s) => s.businessCategory) ?? 'Dairy'
  const kycComplete = useApp((s) => s.kycComplete())

  const location = loc ? `${loc.name}, ${loc.district}` : 'Chikhli, Buldhana district'

  const line = (k: string, v: string) => (
    <div className="flex justify-between border-b border-rule/60 py-2 text-sm last:border-0">
      <span className="text-muted">{k}</span>
      <span className="num text-navy">{v}</span>
    </div>
  )

  return (
    <div className="flex h-full flex-col bg-appbg">
      <ScreenHeader title="Your report" onBack={() => navigate('/report')} />
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <Card className="mt-1 p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-serif text-xl text-navy">beyondMargin</div>
              <div className="text-xs text-muted">Feasibility summary</div>
            </div>
            <div className="text-center">
              <QrSquare />
              <div className="mt-1 text-[9px] text-muted">Scan to verify these numbers</div>
            </div>
          </div>

          <div className="mt-4">
            {line('Location', location)}
            {line('Business', String(category))}
            {line('Viability score', `${VIABILITY.score} / 100`)}
            {line('Verdict', VIABILITY.verdict)}
            {line('People reachable (6 km)', `≈ ${MARKET_REACH.basePeople.toLocaleString('en-IN')}`)}
            {line('Households', MARKET_REACH.households.toLocaleString('en-IN'))}
            {line('Competitors nearby', '6')}
            {line('Recommended price band', PRICE_SERIES.band)}
          </div>

          <p className="mt-4 text-[11px] text-muted">
            Figures are illustrative estimates composed from open government data, generated for this demo.
          </p>
        </Card>

        {/* Delivery + next-step surfaces */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={() => toast('Shared to WhatsApp (demo)', 'success')}>
            <IconShare size={18} /> WhatsApp
          </Button>
          <Button variant="secondary" onClick={() => navigate('/bharat-mode')}>Send as SMS / voice</Button>
          <Button variant="secondary" onClick={() => navigate('/linkage')}>Find buyers</Button>
          <Button variant="secondary" onClick={() => navigate('/learning')}>Learn & connect</Button>
        </div>
        <Button full className="mt-3" onClick={() => navigate(kycComplete ? '/loan/apply' : '/kyc')}>
          Continue to loan application
        </Button>
      </div>
    </div>
  )
}
