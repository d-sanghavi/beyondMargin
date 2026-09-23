import { AnimatePresence, motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { TopBar } from './TopBar'
import { BottomNav } from './BottomNav'
import { Sidebar } from './Sidebar'
import { DemoBanner } from './DemoBanner'
import { pageVariants } from '../shared/motion'
import { useReduceMotion } from '../shared/hooks'

export function MainLayout() {
  const location = useLocation()
  const reduce = useReduceMotion()
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar />
        <DemoBanner />
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants(reduce)}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 mx-auto flex w-full max-w-4xl flex-col"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
        <BottomNav />
      </div>
    </div>
  )
}
