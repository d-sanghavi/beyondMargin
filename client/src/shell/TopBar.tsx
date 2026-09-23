import { useNavigate } from 'react-router-dom'
import { IconGlobe } from '../shared/icons'
import { useApp } from '../store/useApp'

export function TopBar() {
  const navigate = useNavigate()
  const language = useApp((s) => s.language)
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-appbg/95 backdrop-blur border-b border-rule/70 lg:hidden">
      <div className="font-serif text-xl font-bold text-navy leading-none">beyondMargin</div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/language')}
          aria-label={`Language: ${language}. Change`}
          className="flex h-10 items-center gap-1.5 rounded-full border border-rule bg-white px-2.5 text-xs font-semibold text-navy"
        >
          <IconGlobe size={17} />
          <span className="max-w-[54px] truncate">{language}</span>
        </button>
        <button
          onClick={() => navigate('/app/profile')}
          aria-label="Profile"
          className="grid h-10 w-10 place-items-center rounded-full bg-navy text-sm font-bold text-white"
        >
          RP
        </button>
      </div>
    </div>
  )
}
