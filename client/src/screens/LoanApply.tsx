import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from 'recharts'
import { Badge, Button, Card, DrawnCheck, Toggle } from '../shared/ui'
import { ScreenHeader } from '../shared/Screen'
import { PointerBar } from '../features/Gauges'
import { QrSquare } from '../features/QrSquare'
import { IconCheck, IconChevron, IconInfo } from '../shared/icons'
import { INSURANCE_COVERS, OTHER_SCHEMES, SCHEME, buildSchedule, inr } from '../mock/data'
import { DSCR_DISTRIBUTION, MONTE_CARLO } from '../mock/extras'
import { useApp } from '../store/useApp'
import { useAnimatedNumber, delay, useReduceMotion } from '../shared/hooks'
import { BottomSheet } from '../shared/ui'

export default function LoanApply() {
  const navigate = useNavigate()
  const reduce = useReduceMotion()
  const margin = useApp((s) => s.marginCapital) ?? 100000
  const setLoanState = useApp((s) => s.setLoan)
  const account = useApp((s) => s.kyc.account)

  const [flipped, setFlipped] = useState(false)
  const [insurance, setInsurance] = useState<string[]>([])
  const [seasonal, setSeasonal] = useState(false)
  const [showOther, setShowOther] = useState(false)
  const [verified, setVerified] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [tooltip, setTooltip] = useState(false)

  const insuranceTotal = insurance.reduce((sum, id) => sum + (INSURANCE_COVERS.find((c) => c.id === id)?.premium ?? 0), 0)
  const projectCost = margin * SCHEME.multiplier + insuranceTotal
  const loan = projectCost - margin

  const displayProject = useAnimatedNumber(projectCost, 900)
  const schedule = useMemo(() => buildSchedule(loan, seasonal), [loan, seasonal])
  const barData = schedule.filter((r) => !r.moratorium).map((r, i) => ({ q: `Q${i + 3}`, v: r.instalment }))

  const verify = async () => {
    setVerifying(true)
    await delay(700)
    setVerifying(false)
    setVerified(true)
  }

  const submit = () => {
    const appId = 'BM-2026-' + Math.floor(100000 + Math.random() * 900000).toString().slice(0, 6)
    setLoanState({ appId, scheme: SCHEME.name, projectCost, loanAmount: loan, submitted: true })
    navigate('/tracker')
  }

  const marginPct = (margin / projectCost) * 100

  return (
    <div className="flex h-full flex-col bg-appbg">
      <ScreenHeader title="Structuring your loan" onBack={() => navigate(-1)} />
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* STEP 1: Scheme reveal */}
        <Card className="p-5 text-center">
          <div className="text-sm text-muted">Your {inr(margin)} means a project of about</div>
          <div className="num mt-1 text-3xl text-saffron">{inr(Math.round(displayProject))}</div>
          <div className="mt-4 [perspective:1000px]">
            <motion.div
              className="relative mx-auto h-40 w-full [transform-style:preserve-3d]"
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: reduce ? 0 : 0.7 }}
            >
              <div className="absolute inset-0 grid place-items-center rounded-card bg-info [backface-visibility:hidden]">
                <Button onClick={() => setFlipped(true)}>Reveal your matched scheme</Button>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-card bg-navy p-4 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="font-serif text-lg text-white">{SCHEME.name}</div>
                <div className="flex flex-wrap justify-center gap-1.5">
                  <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs">{SCHEME.interest}% interest</span>
                  <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs">{SCHEME.tenureYears}-year tenure</span>
                  <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs">{SCHEME.moratoriumMonths}-month moratorium</span>
                </div>
              </div>
            </motion.div>
          </div>
          <p className="mt-3 text-xs text-muted">{SCHEME.reason}</p>
          {/* tier number line */}
          <div className="mt-4">
            <div className="relative h-2 rounded-full bg-rule">
              <div className="absolute left-[14%] top-1/2 h-4 w-0.5 -translate-y-1/2 bg-muted" />
              <div className="absolute left-[70%] top-1/2 h-4 w-0.5 -translate-y-1/2 bg-muted" />
              <div className="absolute left-[28%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-saffron" />
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-muted">
              <span>₹1.4L</span><span>Term Loan tier</span><span>₹50L</span>
            </div>
          </div>
        </Card>

        {/* STEP 2: Capital stack */}
        <Section title="Your capital stack">
          <div className="flex h-11 w-full overflow-hidden rounded-btn">
            <motion.div className="flex items-center justify-center bg-saffron text-xs font-semibold text-white" initial={reduce ? { width: `${marginPct}%` } : { width: 0 }} animate={{ width: `${marginPct}%` }} transition={{ duration: reduce ? 0 : 0.8 }}>
              {marginPct > 18 && `You ${inr(margin)}`}
            </motion.div>
            <motion.div className="flex items-center justify-center bg-navy text-xs font-semibold text-white" initial={reduce ? { width: `${100 - marginPct}%` } : { width: 0 }} animate={{ width: `${100 - marginPct}%` }} transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.2 }}>
              Loan {inr(loan)}
            </motion.div>
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted">
            <span>Your margin</span><span>Your loan</span>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-info/70 px-3 py-2 text-sm">
            <span className="text-navy">Blended cost of capital</span>
            <span className="num text-navy">{((loan / projectCost) * SCHEME.interest).toFixed(1)}%</span>
          </div>
          <div className="mt-1 text-[11px] text-muted">Own margin at 0% + loan at {SCHEME.interest}%, weighted by amount (F5).</div>
          <button onClick={() => setShowOther((v) => !v)} className="mt-3 flex items-center gap-1 text-sm font-semibold text-saffron">
            See other schemes you may also qualify for <IconChevron size={15} className={showOther ? 'rotate-90 transition-transform' : 'transition-transform'} />
          </button>
          {showOther && (
            <div className="mt-2 flex flex-col gap-2">
              {OTHER_SCHEMES.map((s) => (
                <div key={s.name} className="flex items-center gap-2 rounded-lg bg-white p-2 text-sm">
                  <span className={`grid h-6 w-6 place-items-center rounded-full ${s.eligible ? 'bg-[#E7F3EC] text-success' : 'bg-[#F1F2F5] text-muted'}`}>{s.eligible ? '✓' : '✕'}</span>
                  <div className="flex-1"><div className="font-medium text-ink">{s.name}</div><div className="text-[11px] text-muted">{s.reason}</div></div>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* STEP 3: Repayment schedule */}
        <Section title="Repayment schedule">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex flex-1 rounded-btn border border-rule bg-white p-1 text-sm">
              {(['flat', 'seasonal'] as const).map((m) => (
                <button key={m} onClick={() => setSeasonal(m === 'seasonal')} className={`flex-1 rounded-[9px] py-1.5 font-semibold ${(m === 'seasonal') === seasonal ? 'bg-navy text-white' : 'text-muted'}`}>
                  {m === 'flat' ? 'Flat schedule' : 'Seasonal schedule'}
                </button>
              ))}
            </div>
            <button onClick={() => setTooltip(true)} className="text-muted"><IconInfo size={20} /></button>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="q" tick={{ fontSize: 9, fill: '#6B7280' }} interval={0} />
                <Bar dataKey="v" radius={[4, 4, 0, 0]} isAnimationActive>
                  {barData.map((_, i) => (
                    <Cell key={i} fill={seasonal ? '#B45309' : '#1F3864'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {seasonal && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-2 rounded-lg bg-warm p-2 text-xs text-saffron">
              Same total interest. Same tenure. Payments simply follow your harvest cycle instead of staying flat all year.
            </motion.p>
          )}
          <div className="max-h-56 overflow-y-auto rounded-lg border border-rule">
            <table className="w-full text-[11px]">
              <thead className="sticky top-0 bg-info text-navy">
                <tr>{['Period', 'Due', 'Int.', 'Principal', 'EMI', 'Balance'].map((h) => <th key={h} className="p-1.5 text-left font-semibold">{h}</th>)}</tr>
              </thead>
              <tbody>
                {schedule.map((r, i) => (
                  <tr key={i} className={`border-t border-rule/60 ${r.moratorium ? 'bg-[#FBEAEA]/40' : ''}`}>
                    <td className="p-1.5">{r.period}</td>
                    <td className="p-1.5">{r.due}</td>
                    <td className="p-1.5 num">{r.interest.toLocaleString('en-IN')}</td>
                    <td className="p-1.5">{r.moratorium ? <Badge tone="danger" className="!px-1.5 !py-0.5 !text-[9px]">Moratorium</Badge> : <span className="num">{r.principal.toLocaleString('en-IN')}</span>}</td>
                    <td className="p-1.5 num">{r.instalment.toLocaleString('en-IN')}</td>
                    <td className="p-1.5 num">{r.balance.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* STEP 4: Working capital */}
        <Section title="Running costs before your first sale">
          <div className="h-3 w-full overflow-hidden rounded-full" style={{ background: 'linear-gradient(90deg,#15803D,#D97706,#B91C1C)' }} />
          <p className="mt-3 text-sm text-ink">You may be short by about <span className="num text-danger">{inr(25000)}</span> for day-to-day costs before revenue starts.</p>
          <Badge tone="saffron" className="mt-2">Consider a Mudra Shishu top-up</Badge>
        </Section>

        {/* STEP 5: Protect */}
        <Section title="Protect this business">
          <div className="flex flex-col gap-3">
            {INSURANCE_COVERS.map((c) => {
              const on = insurance.includes(c.id)
              return (
                <div key={c.id} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="font-semibold text-ink">{c.name}</div>
                    <div className="text-xs text-muted">{c.desc} — {inr(c.premium)}/year</div>
                  </div>
                  <Toggle checked={on} onChange={(v) => setInsurance((prev) => (v ? [...prev, c.id] : prev.filter((x) => x !== c.id)))} />
                </div>
              )
            })}
          </div>
          {insuranceTotal > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 rounded-lg bg-info p-2 text-sm text-navy">
              Added to your project cost: <span className="num">{inr(insuranceTotal)}</span>
            </motion.div>
          )}
        </Section>

        {/* STEP 6: Reality check + Monte-Carlo stress (F4) */}
        <Section title="A quick reality check">
          <PointerBar segments={['Best case', 'Likely', 'Tough quarter']} position={0.5} colors={['#15803D', '#D97706', '#B91C1C']} />
          <p className="mt-3 text-sm text-muted">In roughly 1 year out of 5, your ninth month may be tight — plan a small buffer if you can.</p>

          <div className="mt-4 rounded-lg border border-rule p-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">Stress test · 10,000 simulated years</span>
              <span className="num text-sm text-danger">{MONTE_CARLO.probBelowOne}% risk</span>
            </div>
            <div className="text-[11px] text-muted">Chance a quarter can't cover its instalment (DSCR &lt; 1). Expected first stress: month {MONTE_CARLO.firstStressMonth}.</div>
            <div className="mt-2 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DSCR_DISTRIBUTION} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="dscr" tick={{ fontSize: 9, fill: '#6B7280' }} interval={0} />
                  <Bar dataKey="paths" radius={[3, 3, 0, 0]}>
                    {DSCR_DISTRIBUTION.map((d, i) => (
                      <Cell key={i} fill={parseFloat(d.dscr) < 1 ? '#B91C1C' : '#1F3864'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-[11px] font-semibold text-muted">Most sensitive to</div>
            {MONTE_CARLO.sensitivities.map((s) => (
              <div key={s.factor} className="mt-1 flex items-center gap-2">
                <span className="w-24 shrink-0 text-[11px] text-ink">{s.factor}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-rule">
                  <div className="h-full rounded-full bg-saffron" style={{ width: `${s.impact}%` }} />
                </div>
                <span className="num w-8 text-right text-[11px] text-muted">{s.impact}%</span>
              </div>
            ))}
          </div>
        </Section>

        {/* STEP 7: Passport */}
        <Section title="Calculation passport">
          <div className="flex items-center gap-4">
            <QrSquare />
            <div className="flex-1 text-xs">
              {[['Project cost', inr(projectCost)], ['Loan', inr(loan)], ['Rate', `${SCHEME.interest}%`], ['Tenure', `${SCHEME.tenureYears} yrs`]].map(([k, v]) => (
                <div key={k} className="flex justify-between py-0.5"><span className="text-muted">{k}</span><span className="num text-navy">{v}</span></div>
              ))}
            </div>
          </div>
          {verified ? (
            <div className="mt-3 flex items-center gap-2 text-success">
              <IconCheck size={18} strokeWidth={3} />
              <div>
                <div className="text-sm font-semibold">Verified — matches the official formula</div>
                <div className="text-[10px] text-muted">Checked {new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          ) : (
            <Button variant="secondary" full className="mt-3" onClick={verify} disabled={verifying}>{verifying ? 'Verifying…' : 'Verify these numbers'}</Button>
          )}
        </Section>

        {/* STEP 8: Submit */}
        <Button full className="mt-6" onClick={submit}>Submit application</Button>
        {account && <p className="mt-2 text-center text-xs text-muted">Funds will go to {account.bank} {account.masked} on approval.</p>}
      </div>

      <BottomSheet open={tooltip} onClose={() => setTooltip(false)} title="Seasonal schedule">
        <p className="text-sm text-muted">A seasonal schedule keeps the same total interest and tenure but lets you pay more in harvest months and less in lean months.</p>
      </BottomSheet>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <h3 className="mb-2 text-base">{title}</h3>
      <Card className="p-4">{children}</Card>
    </div>
  )
}
