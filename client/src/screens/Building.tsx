import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IconCheck } from '../shared/icons'
import { BUILD_STEPS } from '../mock/data'
import { useReduceMotion } from '../shared/hooks'

export default function Building() {
  const navigate = useNavigate()
  const reduce = useReduceMotion()
  const [done, setDone] = useState(0)

  useEffect(() => {
    if (done >= BUILD_STEPS.length) {
      const id = setTimeout(() => navigate('/report'), 500)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => setDone((d) => d + 1), done === 0 ? 500 : 650)
    return () => clearTimeout(id)
  }, [done, navigate])

  return (
    <div className="flex h-full flex-col items-center justify-center bg-appbg px-8">
      <h1 className="mb-8 text-2xl">Building your report</h1>
      <div className="w-full max-w-sm">
        {BUILD_STEPS.map((label, i) => {
          const state = i < done ? 'done' : i === done ? 'active' : 'todo'
          return (
            <div key={label} className="flex items-center gap-3 py-3">
              <div className="relative flex flex-col items-center">
                <motion.div
                  className={`grid h-8 w-8 place-items-center rounded-full ${
                    state === 'done' ? 'bg-success text-white' : state === 'active' ? 'bg-saffron text-white' : 'bg-rule text-muted'
                  }`}
                  animate={state === 'active' && !reduce ? { scale: [1, 1.12, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  {state === 'done' ? (
                    <IconCheck size={16} strokeWidth={3} />
                  ) : state === 'active' ? (
                    <motion.span
                      className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent"
                      animate={reduce ? {} : { rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                    />
                  ) : (
                    <span className="text-xs">{i + 1}</span>
                  )}
                </motion.div>
                {i < BUILD_STEPS.length - 1 && <div className={`h-6 w-0.5 ${i < done ? 'bg-success' : 'bg-rule'}`} />}
              </div>
              <span className={`text-sm ${state === 'todo' ? 'text-muted' : 'font-medium text-ink'}`}>{label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
