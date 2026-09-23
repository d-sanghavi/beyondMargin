import { useNavigate } from 'react-router-dom'
import { Button, Card } from '../shared/ui'
import { ScrollArea } from '../app/AppFrame'
import { IconChevron, IconExplore } from '../shared/icons'
import { BUSINESS_CATEGORIES } from '../mock/data'
import { useApp } from '../store/useApp'

export default function Explore() {
  const navigate = useNavigate()
  const setCategory = useApp((s) => s.setBusinessCategory)

  const start = (cat?: string) => {
    if (cat) setCategory(cat)
    navigate('/intake')
  }

  return (
    <ScrollArea className="pt-4">
      <Card className="flex flex-col items-start gap-3 p-5">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-info text-navy">
          <IconExplore size={24} />
        </div>
        <div>
          <h2 className="text-xl">Explore an idea</h2>
          <p className="mt-1 text-sm text-muted">
            Check any business in your village before you commit. Pick a starting point or begin fresh.
          </p>
        </div>
        <Button onClick={() => start()}>Start a new check</Button>
      </Card>

      <h3 className="mb-3 mt-6 text-base">Popular in rural blocks</h3>
      <div className="flex flex-col gap-3">
        {BUSINESS_CATEGORIES.map((c) => (
          <Card key={c} className="flex items-center gap-3 p-4" onClick={() => start(c)}>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-warm text-saffron font-bold">
              {c.charAt(0)}
            </div>
            <div className="flex-1 font-semibold text-ink">{c}</div>
            <IconChevron size={20} className="text-muted" />
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
