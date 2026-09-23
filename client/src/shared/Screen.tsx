import { motion } from 'framer-motion'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IconBack } from './icons'
import { useReduceMotion } from './hooks'
import { pageVariants } from './motion'

/** A full screen (used outside the tab shell) with a mount transition. */
export function Screen({
  children,
  className = '',
  dark = false,
}: {
  children: React.ReactNode
  className?: string
  dark?: boolean
}) {
  const reduce = useReduceMotion()
  return (
    <motion.div
      variants={pageVariants(reduce)}
      initial="initial"
      animate="animate"
      className={`flex h-full flex-col ${dark ? 'bg-navy text-white' : 'bg-appbg'} ${className}`}
    >
      {children}
    </motion.div>
  )
}

/** Header with an optional back button and title. */
export function ScreenHeader({
  title,
  onBack,
  right,
  subtle,
}: {
  title?: string
  onBack?: () => void
  right?: React.ReactNode
  subtle?: boolean
}) {
  const navigate = useNavigate()
  return (
    <div className={`flex items-center gap-2 px-3 py-3 lg:pt-6 ${subtle ? '' : 'border-b border-rule/70'}`}>
      <button
        aria-label="Back"
        onClick={() => (onBack ? onBack() : navigate(-1))}
        className="grid h-10 w-10 place-items-center rounded-full text-navy hover:bg-info"
      >
        <IconBack size={22} />
      </button>
      {title && <h2 className="flex-1 text-lg truncate">{title}</h2>}
      {!title && <div className="flex-1" />}
      {right}
    </div>
  )
}
