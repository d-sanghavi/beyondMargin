import { NavLink, useNavigate } from 'react-router-dom'
import { IconCFO, IconExplore, IconGlobe, IconHome, IconLoan, IconProfile } from '../shared/icons'
import { useApp } from '../store/useApp'

const TABS = [
  { to: '/app/home', label: 'Home', Icon: IconHome },
  { to: '/app/explore', label: 'Explore', Icon: IconExplore },
  { to: '/app/loan', label: 'Loan', Icon: IconLoan },
  { to: '/app/cfo', label: 'CFO', Icon: IconCFO },
  { to: '/app/profile', label: 'Profile', Icon: IconProfile },
]

/** Desktop / tablet vertical navigation. Hidden on phones (bottom nav takes over). */
export function Sidebar() {
  const navigate = useNavigate()
  const language = useApp((s) => s.language)
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-rule bg-white lg:flex">
      <div className="px-6 pt-7 pb-6">
        <div className="font-serif text-2xl font-bold text-navy leading-none">beyondMargin</div>
        <div className="mt-1 text-[11px] text-muted">SIH 2026 · SIH26091</div>
      </div>

      <nav className="flex-1 px-3">
        {TABS.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `mb-1 flex items-center gap-3 rounded-btn px-3 py-3 text-[15px] font-semibold transition-colors ${
                isActive ? 'bg-warm text-saffron' : 'text-muted hover:bg-info hover:text-navy'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-rule p-3">
        <button
          onClick={() => navigate('/language')}
          className="mb-2 flex w-full items-center gap-2 rounded-btn px-3 py-2 text-sm font-medium text-muted hover:bg-info"
        >
          <IconGlobe size={18} /> {language}
        </button>
        <button
          onClick={() => navigate('/app/profile')}
          className="flex w-full items-center gap-3 rounded-btn px-3 py-2 text-left hover:bg-info"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-sm font-bold text-white">RP</span>
          <span>
            <span className="block text-sm font-semibold text-ink">Ramesh Kumar Patil</span>
            <span className="block text-[11px] text-muted">View profile</span>
          </span>
        </button>
      </div>
    </aside>
  )
}
