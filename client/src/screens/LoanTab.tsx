import { useNavigate } from 'react-router-dom'
import { Button, Card, Badge } from '../shared/ui'
import { ScrollArea } from '../app/AppFrame'
import { IconLoan, IconChevron } from '../shared/icons'
import { useApp } from '../store/useApp'
import { inr } from '../mock/data'

export default function LoanTab() {
  const navigate = useNavigate()
  const loan = useApp((s) => s.loan)
  const kycComplete = useApp((s) => s.kycComplete())
  const reports = useApp((s) => s.reports)

  if (loan.submitted) {
    return (
      <ScrollArea className="pt-4">
        <Card className="p-5">
          <Badge tone="saffron">Application in progress</Badge>
          <div className="mt-3 font-serif text-lg text-navy">{loan.scheme}</div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Metric label="Project cost" value={inr(loan.projectCost)} />
            <Metric label="Loan amount" value={inr(loan.loanAmount)} />
          </div>
          <div className="mt-3 text-xs text-muted">ID {loan.appId}</div>
          <Button full className="mt-4" onClick={() => navigate('/tracker')}>Track application</Button>
        </Card>
      </ScrollArea>
    )
  }

  return (
    <ScrollArea className="pt-4">
      <Card className="flex flex-col items-start gap-3 p-5">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-info text-navy"><IconLoan size={24} /></div>
        <h2 className="text-xl">Apply for a loan</h2>
        <p className="text-sm text-muted">
          Turn your feasibility report into a structured loan — matched to the right scheme, with a repayment plan
          that fits your cash flow.
        </p>
        {reports.length === 0 ? (
          <>
            <p className="text-sm text-muted">Run a feasibility check first to begin.</p>
            <Button onClick={() => navigate('/intake')}>Start a feasibility check</Button>
          </>
        ) : (
          <Button onClick={() => navigate(kycComplete ? '/loan/apply' : '/kyc')}>
            {kycComplete ? 'Continue to loan application' : 'Verify identity & apply'}
          </Button>
        )}
      </Card>

      {!kycComplete && (
        <Card className="mt-4 flex items-center gap-3 p-4" onClick={() => navigate('/kyc')}>
          <div className="flex-1">
            <div className="font-semibold text-ink">Link your bank account</div>
            <div className="text-sm text-muted">Needed before a loan can be disbursed.</div>
          </div>
          <IconChevron size={20} className="text-muted" />
        </Card>
      )}
    </ScrollArea>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-info/60 p-3">
      <div className="text-xs text-muted">{label}</div>
      <div className="num text-navy">{value}</div>
    </div>
  )
}
