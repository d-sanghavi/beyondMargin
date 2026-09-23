import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomSheet } from '../shared/ui'
import { IconCheck } from '../shared/icons'
import { LANGUAGES, MORE_LANGUAGES } from '../mock/i18n'
import { useApp } from '../store/useApp'
import { useReduceMotion } from '../shared/hooks'
import { staggerContainer, staggerItem } from '../shared/motion'

export default function Language() {
  const navigate = useNavigate()
  const setLanguage = useApp((s) => s.setLanguage)
  const current = useApp((s) => s.language)
  const [selected, setSelected] = useState<string | null>(current)
  const [sheet, setSheet] = useState(false)
  const reduce = useReduceMotion()

  const choose = (lang: string) => {
    setSelected(lang)
    setLanguage(lang)
    setSheet(false)
    setTimeout(() => navigate('/signin'), 400)
  }

  return (
    <div className="flex h-full flex-col bg-appbg">
      <div className="px-6 pt-10 lg:pt-14 text-center">
        <h1 className="text-2xl">Choose your language</h1>
        <p className="mt-2 text-sm text-muted">आपकी भाषा चुनें · तुमची भाषा निवडा</p>
      </div>
      <motion.div
        className="grid grid-cols-2 gap-3 px-6 pt-8 content-start flex-1 overflow-y-auto pb-6"
        variants={staggerContainer(reduce)}
        initial="hidden"
        animate="show"
      >
        {LANGUAGES.map((l) => {
          const isSel = selected === l.key
          return (
            <motion.button
              key={l.key}
              variants={staggerItem(reduce)}
              onClick={() => choose(l.key)}
              className={`relative flex min-h-[72px] flex-col items-center justify-center rounded-card border bg-white p-3 shadow-soft transition-colors ${
                isSel ? 'border-saffron ring-2 ring-saffron/30' : 'border-rule'
              }`}
            >
              {isSel && (
                <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-saffron text-white">
                  <IconCheck size={13} strokeWidth={3} />
                </span>
              )}
              <span className="text-lg font-semibold text-navy">{l.label}</span>
              <span className="text-[11px] text-muted">{l.en}</span>
            </motion.button>
          )
        })}
        <motion.button
          variants={staggerItem(reduce)}
          onClick={() => setSheet(true)}
          className="flex min-h-[72px] items-center justify-center rounded-card border border-dashed border-rule bg-info/40 p-3 text-sm font-semibold text-navy"
        >
          + 14 more
        </motion.button>
      </motion.div>

      <BottomSheet open={sheet} onClose={() => setSheet(false)} title="More languages">
        <div className="grid grid-cols-2 gap-3">
          {MORE_LANGUAGES.map((l) => (
            <button
              key={l}
              onClick={() => choose(l)}
              className="min-h-[56px] rounded-btn border border-rule bg-white px-3 text-base font-semibold text-navy"
            >
              {l}
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  )
}
