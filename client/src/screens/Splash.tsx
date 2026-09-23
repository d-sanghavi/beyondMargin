import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReduceMotion } from '../shared/hooks'
import { useApp } from '../store/useApp'
import { TAGLINE } from '../mock/i18n'

// How long the branded landing stays before auto-advancing. It's the main
// marketing moment, so we hold it — and it's tappable to skip.
const SPLASH_MS = 4500

export default function Splash() {
  const navigate = useNavigate()
  const reduce = useReduceMotion()
  const language = useApp((s) => s.language)

  useEffect(() => {
    const id = setTimeout(() => navigate('/language'), SPLASH_MS)
    return () => clearTimeout(id)
  }, [navigate])

  return (
    <div
      className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-navy px-8 text-center"
      onClick={() => navigate('/language')}
      role="button"
      aria-label="Continue"
    >
      {/* soft radial glow behind the wordmark */}
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute h-80 w-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(180,83,9,0.35), transparent 70%)' }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0.9, 0.6], scale: [0.6, 1.1, 1] }}
          transition={{ duration: 2.4, ease: 'easeOut' }}
        />
      )}

      <motion.h1
        className="relative font-serif text-5xl font-bold text-white"
        initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduce ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        beyondMargin
      </motion.h1>

      {/* animated underline sweep */}
      {!reduce && (
        <motion.div
          className="mt-3 h-0.5 rounded-full bg-saffron"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 120, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      <motion.p
        className="relative mt-4 text-lg text-white/75"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduce ? 0 : 1.0, duration: 0.6 }}
      >
        {TAGLINE[language] ?? TAGLINE.English}
      </motion.p>

      {/* tap hint */}
      <motion.div
        className="absolute bottom-24 text-xs text-white/50"
        initial={{ opacity: 0 }}
        animate={reduce ? { opacity: 1 } : { opacity: [0, 0.7, 0.35, 0.7] }}
        transition={reduce ? { delay: 0 } : { delay: 2, duration: 2.4, repeat: Infinity }}
      >
        Tap anywhere to continue
      </motion.div>

      {/* progress line signalling auto-advance */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-white/10">
        <motion.div
          className="h-full bg-saffron"
          initial={{ width: reduce ? '100%' : '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: reduce ? 0 : SPLASH_MS / 1000, ease: 'linear' }}
        />
      </div>

      <motion.div
        className="absolute bottom-10 text-xs text-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        SIH 2026 · Prototype
      </motion.div>
    </div>
  )
}
