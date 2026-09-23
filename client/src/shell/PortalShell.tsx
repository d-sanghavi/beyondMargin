import { motion } from 'framer-motion'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '../shared/ui'
import { IconBack } from '../shared/icons'
import { useReduceMotion } from '../shared/hooks'
import { pageVariants } from '../shared/motion'

/**
 * Full-width, responsive shell for the B2G portal surfaces (Ministry, SCA officer).
 * These are desktop-first dashboards, unlike the citizen phone app.
 */
export function PortalShell({
  title,
  subtitle,
  tone = 'navy',
  children,
}: {
  title: string
  subtitle: string
  tone?: 'navy' | 'saffron'
  children: React.ReactNode
}) {
  const navigate = useNavigate()
  const reduce = useReduceMotion()
  return (
    <motion.div variants={pageVariants(reduce)} initial="initial" animate="animate" className="flex h-full flex-col bg-[#eef1f6]">
      <header className={`flex items-center gap-3 px-4 py-3 text-white lg:px-8 ${tone === 'navy' ? 'bg-navy' : 'bg-saffron'}`}>
        <button onClick={() => navigate('/app/profile')} aria-label="Back to app" className="grid h-9 w-9 place-items-center rounded-full bg-white/15 hover:bg-white/25">
          <IconBack size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="truncate font-serif text-lg text-white lg:text-xl">{title}</h1>
            <Badge tone="muted" className="hidden sm:inline-flex !bg-white/15 !text-white">Prototype</Badge>
          </div>
          <p className="truncate text-xs text-white/70">{subtitle}</p>
        </div>
        <div className="hidden text-right text-xs text-white/70 sm:block">
          <div className="font-semibold text-white">beyondMargin</div>
          <div>SIH 2026 · SIH26091</div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-6xl px-4 py-5 lg:px-8">{children}</div>
      </div>
    </motion.div>
  )
}

export function PortalCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-card border border-rule bg-white p-4 shadow-soft lg:p-5 ${className}`}>{children}</div>
}
