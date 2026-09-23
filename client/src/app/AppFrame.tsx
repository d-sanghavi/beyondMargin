import React from 'react'

/**
 * Full-bleed responsive shell.
 * - Phone: the mobile app fills the viewport (bottom-nav layout).
 * - Tablet / Desktop: a real full-width web layout (sidebar + roomy content),
 *   handled by MainLayout; onboarding/flow screens center in a readable column.
 *
 * This element is `position: relative` so bottom sheets, toasts and confetti
 * (which use `absolute inset-0`) are scoped to the app viewport.
 */
export function AppFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-appbg">
      {children}
    </div>
  )
}

/** Scrollable content region used inside screens. */
export function ScrollArea({
  children,
  className = '',
  padded = true,
}: {
  children: React.ReactNode
  className?: string
  padded?: boolean
}) {
  return (
    <div className={`flex-1 overflow-y-auto overflow-x-hidden ${padded ? 'px-4 pb-6 lg:px-6' : ''} ${className}`}>
      {children}
    </div>
  )
}
