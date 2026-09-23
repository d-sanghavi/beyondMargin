import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { SPRING_SHEET, pressProps } from './motion'
import { useReduceMotion } from './hooks'
import { useToast } from './toast'

/* ------------------------------- Button ------------------------------- */
type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'navy'
export function Button({
  variant = 'primary',
  full,
  className = '',
  children,
  disabled,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; full?: boolean }) {
  const reduce = useReduceMotion()
  const base =
    'inline-flex items-center justify-center gap-2 rounded-btn px-5 font-semibold text-[15px] leading-none transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
  const sizes = 'min-h-[48px] py-3'
  const variants: Record<BtnVariant, string> = {
    primary: 'bg-saffron text-white hover:brightness-105 shadow-soft',
    navy: 'bg-navy text-white hover:brightness-110 shadow-soft',
    secondary: 'bg-white text-navy border border-rule hover:bg-info',
    ghost: 'bg-transparent text-saffron hover:bg-warm',
  }
  return (
    <motion.button
      {...(pressProps(reduce) as any)}
      className={`${base} ${sizes} ${variants[variant]} ${full ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  )
}

/* ------------------------------- Card ------------------------------- */
export function Card({
  className = '',
  children,
  onClick,
}: {
  className?: string
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-card bg-card shadow-soft border border-rule/60 ${onClick ? 'cursor-pointer active:scale-[0.99] transition-transform' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

/* ------------------------------- Chip ------------------------------- */
export function Chip({
  active,
  children,
  onClick,
  className = '',
}: {
  active?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <button onClick={onClick} className={`chip ${active ? 'chip-active' : ''} ${className}`}>
      {children}
    </button>
  )
}

/* ------------------------------- Badge ------------------------------- */
export function Badge({
  tone = 'info',
  children,
  className = '',
}: {
  tone?: 'info' | 'success' | 'warning' | 'danger' | 'muted' | 'saffron'
  children: React.ReactNode
  className?: string
}) {
  const tones: Record<string, string> = {
    info: 'bg-info text-navy',
    success: 'bg-[#E7F3EC] text-success',
    warning: 'bg-[#FEF1E1] text-warning',
    danger: 'bg-[#FBEAEA] text-danger',
    muted: 'bg-[#EFF1F5] text-muted',
    saffron: 'bg-warm text-saffron',
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]} ${className}`}>
      {children}
    </span>
  )
}

/* ------------------------------- Skeleton ------------------------------- */
export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton ${className}`} />
}

/* ------------------------------- Section label ------------------------------- */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">{children}</div>
}

/* ------------------------------- Toggle ------------------------------- */
export function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean
  onChange?: (v: boolean) => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-200 ${
        checked ? 'bg-success' : 'bg-[#CBD2DE]'
      } ${disabled ? 'opacity-50' : ''}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

/* ------------------------------- Bottom sheet ------------------------------- */
export function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}) {
  const reduce = useReduceMotion()
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-40 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-2xl rounded-t-sheet bg-white p-5 pb-7 shadow-softlg max-h-[85%] overflow-y-auto"
            initial={reduce ? { opacity: 0 } : { y: '100%' }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: '100%' }}
            transition={reduce ? { duration: 0.12 } : SPRING_SHEET}
          >
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-rule" />
            {title && <h3 className="text-lg mb-2">{title}</h3>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ------------------------------- Modal ------------------------------- */
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}) {
  const reduce = useReduceMotion()
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/45" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-md rounded-sheet bg-white p-5 shadow-softlg max-h-[86%] overflow-y-auto"
            initial={reduce ? { opacity: 0 } : { scale: 0.94, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {title && <h3 className="text-lg mb-3">{title}</h3>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ------------------------------- Toast host ------------------------------- */
export function ToastHost() {
  const toasts = useToast((s) => s.toasts)
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-24 z-[60] flex flex-col items-center gap-2 px-6">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className={`pointer-events-auto max-w-sm rounded-btn px-4 py-3 text-sm font-medium text-white shadow-softlg ${
              t.tone === 'success' ? 'bg-success' : 'bg-navy'
            }`}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------- Animated check (SVG draw) ------------------------------- */
export function DrawnCheck({ size = 72, color = '#15803D' }: { size?: number; color?: string }) {
  const reduce = useReduceMotion()
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" aria-hidden>
      <motion.circle
        cx="26"
        cy="26"
        r="24"
        fill="none"
        stroke={color}
        strokeWidth="3"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : 0.5 }}
      />
      <motion.path
        d="M15 27 l7 7 l15 -16"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.45 }}
      />
    </svg>
  )
}

/* ------------------------------- Confetti ------------------------------- */
export function Confetti() {
  const reduce = useReduceMotion()
  if (reduce) return null
  const colors = ['#B45309', '#1F3864', '#15803D', '#D97706', '#2563EB']
  const bits = Array.from({ length: 28 })
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bits.map((_, i) => {
        const left = Math.random() * 100
        const delay = Math.random() * 0.3
        const dur = 1.4 + Math.random() * 1.0
        const color = colors[i % colors.length]
        return (
          <motion.span
            key={i}
            className="absolute top-0 h-2 w-2 rounded-[2px]"
            style={{ left: `${left}%`, background: color }}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{ y: 520, opacity: 0, rotate: 360 }}
            transition={{ duration: dur, delay, ease: 'easeIn' }}
          />
        )
      })}
    </div>
  )
}

/* ------------------------------- Sandbox badge ------------------------------- */
export function SandboxBadge() {
  return (
    <div className="mb-4 flex items-center gap-2 text-xs text-muted">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-warning" />
      Sandbox Demo — no real bank or government system is contacted.
    </div>
  )
}

/* ------------------------------- useLockBodyScroll ------------------------------- */
export function useEscClose(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, onClose])
}
