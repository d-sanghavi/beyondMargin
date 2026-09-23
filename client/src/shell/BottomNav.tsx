import { motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import { IconCFO, IconExplore, IconHome, IconLoan, IconProfile } from '../shared/icons'

const TABS = [
  { to: '/app/home', label: 'Home', Icon: IconHome },
  { to: '/app/explore', label: 'Explore', Icon: IconExplore },
  { to: '/app/loan', label: 'Loan', Icon: IconLoan },
  { to: '/app/cfo', label: 'CFO', Icon: IconCFO },
  { to: '/app/profile', label: 'Profile', Icon: IconProfile },
]

export function BottomNav() {
  const { pathname } = useLocation()
  const activeIndex = TABS.findIndex((t) => pathname.startsWith(t.to))
  return (
    <nav className="relative border-t border-rule bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="relative grid grid-cols-5">
        {activeIndex >= 0 && (
          <motion.div
            className="absolute top-0 h-0.5 rounded-full bg-saffron"
            style={{ width: `${100 / TABS.length}%` }}
            initial={false}
            animate={{ left: `${(100 / TABS.length) * activeIndex}%` }}
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          />
        )}
        {TABS.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className="flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px]"
          >
            {({ isActive }) => (
              <>
                <Icon size={23} strokeWidth={isActive ? 2.2 : 1.8} className={isActive ? 'text-saffron' : 'text-muted'} />
                <span className={`text-[11px] font-semibold ${isActive ? 'text-saffron' : 'text-muted'}`}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
