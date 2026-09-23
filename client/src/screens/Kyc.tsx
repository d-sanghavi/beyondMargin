import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Badge, Button, Card, Confetti, DrawnCheck, SandboxBadge, Skeleton } from '../shared/ui'
import { ScreenHeader } from '../shared/Screen'
import { OtpInput } from '../features/OtpInput'
import { IconCheck, IconShield } from '../shared/icons'
import { AA_STEPS, BANK_ACCOUNTS, inr } from '../mock/data'
import { useApp } from '../store/useApp'
import { delay } from '../shared/hooks'
import type { BankAccount } from '../store/useApp'

type Step = 'aadhaar' | 'aadhaar-otp' | 'pan' | 'gst' | 'fetch' | 'accounts' | 'done'

export default function Kyc() {
  const navigate = useNavigate()
  const category = useApp((s) => s.businessCategory)
  const setKyc = useApp((s) => s.setKyc)
  const panName = useApp((s) => s.kyc.panName)
  const needsGst = category === 'Retail / General Store' || category === 'Handicrafts'
  const [step, setStep] = useState<Step>('aadhaar')

  return (
    <div className="flex h-full flex-col bg-appbg">
      <ScreenHeader
        title="Verify your identity"
        onBack={() => navigate(-1)}
        right={<Badge tone="muted" className="mr-2">Step {stepIndex(step)}/5</Badge>}
      />
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <SandboxBadge />
        {step === 'aadhaar' && <Aadhaar onNext={() => setStep('aadhaar-otp')} />}
        {step === 'aadhaar-otp' && (
          <AadhaarOtp
            onDone={() => {
              setKyc({ aadhaarVerified: true })
              setStep('pan')
            }}
          />
        )}
        {step === 'pan' && (
          <Pan
            onDone={() => {
              setKyc({ panVerified: true })
              setStep(needsGst ? 'gst' : 'fetch')
            }}
          />
        )}
        {step === 'gst' && (
          <Gst
            onDone={(num) => {
              setKyc({ gstProvided: !!num, gstNumber: num })
              setStep('fetch')
            }}
          />
        )}
        {step === 'fetch' && <FetchAccounts onDone={() => setStep('accounts')} />}
        {step === 'accounts' && (
          <Accounts
            onDone={(acct) => {
              setKyc({ account: acct })
              setStep('done')
            }}
          />
        )}
        {step === 'done' && <Done name={panName} onContinue={() => navigate('/loan/apply')} />}
      </div>
    </div>
  )
}

function stepIndex(s: Step): number {
  const map: Record<Step, number> = { aadhaar: 1, 'aadhaar-otp': 1, pan: 2, gst: 3, fetch: 4, accounts: 4, done: 5 }
  return map[s]
}

function Aadhaar({ onNext }: { onNext: () => void }) {
  const [val, setVal] = useState('')
  const digits = val.replace(/\s/g, '')
  const fmt = (v: string) => v.replace(/\D/g, '').slice(0, 12).replace(/(.{4})/g, '$1 ').trim()
  return (
    <div>
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-info text-navy"><IconShield size={28} /></div>
      <h2 className="mt-4 text-xl">Let&apos;s verify who you are</h2>
      <p className="mt-1 text-sm text-muted">We only check your identity — we never store your full Aadhaar number.</p>
      <input
        value={val}
        onChange={(e) => setVal(fmt(e.target.value))}
        inputMode="numeric"
        placeholder="XXXX XXXX XXXX"
        className="mt-6 h-14 w-full rounded-btn border border-rule bg-white px-4 text-lg tracking-widest outline-none focus:border-saffron"
      />
      <Button full className="mt-5" disabled={digits.length !== 12} onClick={onNext}>Send OTP</Button>
    </div>
  )
}

function AadhaarOtp({ onDone }: { onDone: () => void }) {
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  const verify = async () => {
    setVerifying(true)
    await delay(900)
    setVerifying(false)
    setVerified(true)
    await delay(800)
    onDone()
  }
  if (verified)
    return (
      <div className="flex flex-col items-center gap-3 py-10">
        <Badge tone="success"><IconCheck size={14} /> Verified</Badge>
        <div className="num text-2xl tracking-widest text-navy">•••• •••• 8823</div>
      </div>
    )
  return (
    <div>
      <h2 className="text-xl">Enter the OTP</h2>
      <p className="mt-1 text-sm text-muted">Sent to the mobile linked with your Aadhaar. (Demo: any 6 digits.)</p>
      <div className="mt-6"><OtpInput onComplete={() => {}} /></div>
      <Button full className="mt-6" onClick={verify} disabled={verifying}>{verifying ? 'Verifying…' : 'Verify'}</Button>
    </div>
  )
}

function Pan({ onDone }: { onDone: () => void }) {
  const [val, setVal] = useState('')
  const valid = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(val)
  const [loading, setLoading] = useState(false)
  const [reveal, setReveal] = useState(false)
  const verify = async () => {
    setLoading(true)
    await delay(1200)
    setLoading(false)
    setReveal(true)
  }
  if (reveal)
    return (
      <Card className="p-5">
        <Badge tone="success"><IconCheck size={14} /> Verified</Badge>
        <div className="num mt-3 text-lg text-navy">RAMESH KUMAR PATIL</div>
        <p className="mt-1 text-sm text-muted">This name will be used on your loan application.</p>
        <Button full className="mt-5" onClick={onDone}>Continue</Button>
      </Card>
    )
  return (
    <div>
      <h2 className="text-xl">Now your PAN card</h2>
      <div className="relative mt-6">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value.toUpperCase().slice(0, 10))}
          placeholder="ABCDE1234F"
          className="h-14 w-full rounded-btn border border-rule bg-white px-4 text-lg tracking-widest outline-none focus:border-saffron"
        />
        {valid && (
          <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2 text-success">
            <IconCheck size={22} strokeWidth={3} />
          </motion.span>
        )}
      </div>
      {loading ? <Skeleton className="mt-5 h-28 w-full rounded-card" /> : <Button full className="mt-5" disabled={!valid} onClick={verify}>Verify PAN</Button>}
    </div>
  )
}

function Gst({ onDone }: { onDone: (num: string | null) => void }) {
  const [val, setVal] = useState('')
  const [loading, setLoading] = useState(false)
  const verify = async () => {
    setLoading(true)
    await delay(1000)
    onDone(val)
  }
  return (
    <div>
      <h2 className="text-xl">Do you have a GST number?</h2>
      <p className="mt-1 text-sm text-muted">Most first-time entrepreneurs don&apos;t — that&apos;s completely fine.</p>
      <input
        value={val}
        onChange={(e) => setVal(e.target.value.toUpperCase().slice(0, 15))}
        placeholder="22AAAAA0000A1Z5"
        className="mt-6 h-14 w-full rounded-btn border border-rule bg-white px-4 text-base tracking-wider outline-none focus:border-saffron"
      />
      <Button full className="mt-5" disabled={val.length !== 15 || loading} onClick={verify}>{loading ? 'Verifying…' : 'Verify GSTIN'}</Button>
      <Button variant="secondary" full className="mt-3" onClick={() => onDone(null)}>I don&apos;t have one yet</Button>
    </div>
  )
}

function FetchAccounts({ onDone }: { onDone: () => void }) {
  const [done, setDone] = useState(0)
  useEffect(() => {
    if (done >= AA_STEPS.length) {
      const id = setTimeout(onDone, 600)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => setDone((d) => d + 1), 600)
    return () => clearTimeout(id)
  }, [done, onDone])
  return (
    <div>
      <h2 className="text-xl">Finding accounts linked to your PAN</h2>
      <div className="mt-6 flex flex-col gap-3">
        {AA_STEPS.map((s, i) => (
          <div key={s} className={`flex items-center gap-3 ${i > done ? 'opacity-30' : ''}`}>
            <div className={`grid h-7 w-7 place-items-center rounded-full ${i < done ? 'bg-success text-white' : 'bg-info text-navy'}`}>
              {i < done ? (
                <IconCheck size={15} strokeWidth={3} />
              ) : i === done ? (
                <motion.span className="h-3 w-3 rounded-full border-2 border-navy border-t-transparent" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }} />
              ) : (
                <span className="h-2 w-2 rounded-full bg-muted" />
              )}
            </div>
            <span className="text-sm text-ink">{s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Accounts({ onDone }: { onDone: (a: BankAccount) => void }) {
  const [sel, setSel] = useState<string | null>(null)
  return (
    <div>
      <h2 className="text-xl">Choose an account for your loan</h2>
      <div className="mt-5 flex flex-col gap-3">
        {BANK_ACCOUNTS.map((a) => {
          const active = sel === a.id
          return (
            <button
              key={a.id}
              onClick={() => setSel(a.id)}
              className={`flex items-center gap-3 overflow-hidden rounded-card border bg-white p-3 text-left shadow-soft ${active ? 'border-saffron ring-2 ring-saffron/30' : 'border-rule'}`}
            >
              <div className="h-12 w-1.5 rounded-full" style={{ background: a.color }} />
              <div className="grid h-10 w-10 place-items-center rounded-full font-bold text-white" style={{ background: a.color }}>{a.short}</div>
              <div className="flex-1">
                <div className="font-semibold text-ink">{a.bank}</div>
                <div className="text-xs text-muted">{a.type} · {a.masked}</div>
                {active && <div className="mt-1 text-[11px] font-semibold text-saffron">Selected for disbursement</div>}
              </div>
              <div className="num text-navy">{inr(a.balance)}</div>
            </button>
          )
        })}
      </div>
      <p className="mt-3 text-xs text-muted">You can change this anytime before your loan is disbursed.</p>
      <Button full className="mt-5" disabled={!sel} onClick={() => sel && onDone(BANK_ACCOUNTS.find((a) => a.id === sel)!)}>Continue</Button>
    </div>
  )
}

function Done({ name, onContinue }: { name: string; onContinue: () => void }) {
  const gst = useApp((s) => s.kyc.gstNumber)
  const account = useApp((s) => s.kyc.account)
  return (
    <div className="relative flex flex-col items-center pt-6">
      <Confetti />
      <DrawnCheck size={84} />
      <h2 className="mt-4 text-2xl">You&apos;re verified</h2>
      <Card className="mt-5 w-full p-4">
        {[
          ['Aadhaar', '•••• •••• 8823'],
          ['PAN', `•••••1234• · ${name}`],
          ['GST', gst ?? 'Not provided'],
          ['Bank account', account ? `${account.bank} ${account.masked}` : '—'],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between border-b border-rule/60 py-2 text-sm last:border-0">
            <span className="text-muted">{k}</span>
            <span className="font-medium text-navy">{v}</span>
          </div>
        ))}
      </Card>
      <Button full className="mt-5" onClick={onContinue}>Continue</Button>
    </div>
  )
}
