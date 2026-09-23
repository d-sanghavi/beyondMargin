import { Outlet } from 'react-router-dom'

/**
 * Layout for onboarding & flow screens (sign-in, consent, intake, report, KYC,
 * loan, tracker). Full-bleed on phones; on wider screens the content sits in a
 * readable centred column so it doesn't stretch awkwardly across a desktop.
 */
export function FocusLayout() {
  return (
    <div className="flex h-full w-full justify-center bg-[#eef1f6] lg:py-6">
      <div className="flex h-full w-full max-w-2xl flex-col overflow-hidden bg-appbg shadow-none lg:rounded-2xl lg:border lg:border-rule lg:shadow-soft">
        <Outlet />
      </div>
    </div>
  )
}
