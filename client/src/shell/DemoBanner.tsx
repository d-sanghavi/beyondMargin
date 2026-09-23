import { useApp } from '../store/useApp'
import { IconClose } from '../shared/icons'

export function DemoBanner() {
  const dismissed = useApp((s) => s.demoBannerDismissed)
  const dismiss = useApp((s) => s.dismissDemoBanner)
  if (dismissed) return null
  return (
    <div className="flex items-center gap-2 bg-info px-4 py-2 text-xs text-muted">
      <span className="flex-1">This is a demo prototype. All data shown is fictional.</span>
      <button onClick={dismiss} aria-label="Dismiss" className="p-1 text-muted hover:text-navy">
        <IconClose size={15} />
      </button>
    </div>
  )
}
