import { useNavigate } from 'react-router-dom'
import { Badge, Button, Card } from '../shared/ui'
import { ScreenHeader } from '../shared/Screen'
import { IconCheck } from '../shared/icons'
import { DEMAND_ANCHORS, ONDC_CATALOGUE } from '../mock/extras'
import { useToast } from '../shared/toast'

export default function Linkage() {
  const navigate = useNavigate()
  const toast = useToast((s) => s.show)
  return (
    <div className="flex h-full flex-col bg-appbg">
      <ScreenHeader title="Find your first buyers" onBack={() => navigate(-1)} />
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <Card className="bg-info p-4">
          <div className="flex items-center gap-2">
            <Badge tone="info">M18 · Market Linkage</Badge>
          </div>
          <p className="mt-2 text-sm text-navy">Your feasibility report was turned into a ready-to-list seller catalogue and a shortlist of nearby buyers.</p>
        </Card>

        {/* ONDC catalogue draft */}
        <h3 className="mb-2 mt-5 text-base">Your ONDC seller catalogue (draft)</h3>
        <Card className="divide-y divide-rule">
          <div className="px-4 py-3 text-sm font-semibold text-navy">{ONDC_CATALOGUE.seller}</div>
          {ONDC_CATALOGUE.items.map((it) => (
            <div key={it.name} className="flex items-center gap-3 px-4 py-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-warm text-lg">🥛</div>
              <div className="flex-1">
                <div className="font-medium text-ink">{it.name}</div>
                <div className="text-xs text-muted">{it.capacity} · {it.packaging}</div>
              </div>
              <div className="num text-navy">{it.price}<span className="text-[10px] font-normal text-muted"> {it.unit}</span></div>
            </div>
          ))}
        </Card>
        <Button variant="secondary" full className="mt-3" onClick={() => toast('Catalogue exported to ONDC (demo)', 'success')}>
          Publish to ONDC
        </Button>

        {/* Demand anchors */}
        <h3 className="mb-2 mt-6 text-base">Where you can sell</h3>
        <Card className="p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">Mandis with favourable spreads</div>
          {DEMAND_ANCHORS.mandis.map((m) => (
            <div key={m.name} className="flex items-center justify-between border-b border-rule/60 py-2 last:border-0">
              <div><div className="text-sm font-medium text-ink">{m.name}</div><div className="text-[11px] text-muted">{m.distance} away</div></div>
              <Badge tone="success">{m.spread} price</Badge>
            </div>
          ))}
        </Card>
        <Card className="mt-3 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">Institutional buyers nearby</div>
          {DEMAND_ANCHORS.institutions.map((b) => (
            <div key={b.name} className="flex items-center gap-2 border-b border-rule/60 py-2 last:border-0">
              <IconCheck size={16} className="text-success" />
              <div className="flex-1"><div className="text-sm font-medium text-ink">{b.name}</div><div className="text-[11px] text-muted">{b.type}</div></div>
              <span className="num text-xs text-navy">{b.need}</span>
            </div>
          ))}
        </Card>
        <Card className="mt-3 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">GeM procurement categories</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {DEMAND_ANCHORS.gem.map((g) => <span key={g} className="chip">{g}</span>)}
          </div>
        </Card>

        <p className="mt-5 text-center text-[11px] text-muted">Illustrative. The report you already generated populated all of this automatically.</p>
      </div>
    </div>
  )
}
