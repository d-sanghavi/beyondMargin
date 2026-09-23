import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { PortalCard, PortalShell } from '../shell/PortalShell'
import { Badge } from '../shared/ui'
import { useAnimatedNumber } from '../shared/hooks'
import {
  IMPACT_LEDGER,
  INTENT_TREND,
  MINISTRY_KPIS,
  SATURATION_WATCHLIST,
  SECTOR_SPLIT,
} from '../mock/portal'

export default function Ministry() {
  return (
    <PortalShell title="MoSJE Portfolio Dashboard" subtitle="Pre-disbursement intent telemetry · cohort survival · saturation early-warning" tone="navy">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {MINISTRY_KPIS.map((k) => (
          <Kpi key={k.label} label={k.label} value={k.value} suffix={k.suffix} delta={k.delta} />
        ))}
      </div>

      {/* Saturation Early Warning (B1) */}
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <PortalCard className="lg:col-span-2">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-base">Saturation Early-Warning System</h2>
            <Badge tone="saffron">B1 · pre-NPA signal</Badge>
          </div>
          <p className="mb-3 text-xs text-muted">Blocks where intended new units exceed the estimated absorbable capacity — visible months before capital is committed.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted">
                <tr>{['Block', 'Sector', 'Intended', 'Absorbable', 'Index', 'Alert'].map((h) => <th key={h} className="py-2 pr-3 font-semibold">{h}</th>)}</tr>
              </thead>
              <tbody>
                {SATURATION_WATCHLIST.map((r) => (
                  <tr key={r.block + r.sector} className="border-t border-rule/70">
                    <td className="py-2 pr-3"><div className="font-medium text-ink">{r.block}</div><div className="text-[11px] text-muted">{r.district}</div></td>
                    <td className="py-2 pr-3">{r.sector}</td>
                    <td className="py-2 pr-3 num">{r.intended}</td>
                    <td className="py-2 pr-3 num">{r.absorbable}</td>
                    <td className="py-2 pr-3 num" style={{ color: r.index >= 130 ? '#B91C1C' : r.index >= 100 ? '#D97706' : '#15803D' }}>{r.index}%</td>
                    <td className="py-2 pr-3">
                      <Badge tone={r.alert === 'High' ? 'danger' : r.alert === 'Medium' ? 'warning' : 'success'}>{r.alert}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PortalCard>

        <PortalCard>
          <h2 className="mb-1 text-base">Intent telemetry</h2>
          <p className="mb-2 text-xs text-muted">New Dairy intent, Chikhli block (weekly)</p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={INTENT_TREND} margin={{ top: 6, right: 6, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#B45309" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#B45309" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E9F2" />
                <XAxis dataKey="w" tick={{ fontSize: 9, fill: '#6B7280' }} interval={1} />
                <YAxis tick={{ fontSize: 9, fill: '#6B7280' }} />
                <Tooltip />
                <Area type="monotone" dataKey="dairy" stroke="#B45309" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-1 text-[11px] text-saffron">Dairy intent up 3.5× in 10 weeks — approaching absorbable capacity.</p>
        </PortalCard>
      </div>

      {/* Impact ledger (B7) + sector split */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <PortalCard className="lg:col-span-2">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-base">Public Impact Ledger</h2>
            <Badge tone="info">B7</Badge>
          </div>
          <p className="mb-2 text-xs text-muted">% of units surviving — those who followed the advisory verdict vs. those who did not.</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={IMPACT_LEDGER} margin={{ top: 6, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E9F2" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} domain={[40, 100]} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="followed" name="Followed advice" stroke="#15803D" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="ignored" name="Did not" stroke="#B91C1C" strokeWidth={2.5} strokeDasharray="5 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-1 text-[11px] text-muted">+24 pt survival delta at 24 months for advisory-aligned units.</p>
        </PortalCard>

        <PortalCard>
          <h2 className="mb-2 text-base">Advised units by sector</h2>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SECTOR_SPLIT} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="sector" tick={{ fontSize: 11, fill: '#1A1A1A' }} width={70} />
                <Tooltip />
                <Bar dataKey="units" radius={[0, 6, 6, 0]}>
                  {SECTOR_SPLIT.map((_, i) => <Cell key={i} fill={['#1F3864', '#2A4A7F', '#35619A', '#4478B5', '#5A8FCB', '#7BA6D6'][i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </PortalCard>
      </div>

      <p className="mt-4 text-center text-[11px] text-muted">Aggregated, anonymised (no PII). Illustrative demo data. · M14 Portfolio Analytics · B1 Saturation EWS · B7 Impact Ledger</p>
    </PortalShell>
  )
}

function Kpi({ label, value, suffix, delta }: { label: string; value: number; suffix?: string; delta: string }) {
  const v = useAnimatedNumber(value, 900)
  return (
    <PortalCard>
      <div className="text-xs text-muted">{label}</div>
      <div className="num mt-1 text-2xl text-navy">
        {Math.round(v).toLocaleString('en-IN')}{suffix ?? ''}
      </div>
      <div className="mt-0.5 text-[11px] font-semibold text-success">{delta}</div>
    </PortalCard>
  )
}
