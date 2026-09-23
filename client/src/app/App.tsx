import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppFrame } from './AppFrame'
import { ToastHost } from '../shared/ui'
import { MainLayout } from '../shell/MainLayout'
import { FocusLayout } from '../shell/FocusLayout'
import { Skeleton } from '../shared/ui'

// Onboarding (eager — tiny, first-paint)
import Splash from '../screens/Splash'
import Language from '../screens/Language'
import SignIn from '../screens/SignIn'
import Consent from '../screens/Consent'

// Tabs
import Home from '../screens/Home'
import Explore from '../screens/Explore'
import Profile from '../screens/Profile'

// Heavy / flow screens (lazy, route-split)
const Intake = lazy(() => import('../screens/Intake'))
const Building = lazy(() => import('../screens/Building'))
const Report = lazy(() => import('../screens/Report'))
const ReportSummary = lazy(() => import('../screens/ReportSummary'))
const Kyc = lazy(() => import('../screens/Kyc'))
const LinkedAccounts = lazy(() => import('../screens/LinkedAccounts'))
const LoanApply = lazy(() => import('../screens/LoanApply'))
const Tracker = lazy(() => import('../screens/Tracker'))
const LoanTab = lazy(() => import('../screens/LoanTab'))
const Cfo = lazy(() => import('../screens/Cfo'))
const Linkage = lazy(() => import('../screens/Linkage'))
const BharatMode = lazy(() => import('../screens/BharatMode'))
const Learning = lazy(() => import('../screens/Learning'))
const Ministry = lazy(() => import('../screens/Ministry'))
const Officer = lazy(() => import('../screens/Officer'))

function Loading() {
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-40 w-full rounded-card" />
      <Skeleton className="h-24 w-full rounded-card" />
      <Skeleton className="h-24 w-full rounded-card" />
    </div>
  )
}

export default function App() {
  return (
    <AppFrame>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Splash />} />

          {/* Onboarding + flows: centred readable column on desktop, full-bleed on phones */}
          <Route element={<FocusLayout />}>
            <Route path="/language" element={<Language />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/consent" element={<Consent />} />
            <Route path="/intake" element={<Intake />} />
            <Route path="/building" element={<Building />} />
            <Route path="/report" element={<Report />} />
            <Route path="/report/summary" element={<ReportSummary />} />
            <Route path="/kyc" element={<Kyc />} />
            <Route path="/loan/apply" element={<LoanApply />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/linkage" element={<Linkage />} />
            <Route path="/bharat-mode" element={<BharatMode />} />
            <Route path="/learning" element={<Learning />} />
          </Route>

          {/* B2G portal surfaces (full-width dashboards) */}
          <Route path="/ministry" element={<Ministry />} />
          <Route path="/officer" element={<Officer />} />

          {/* Tab shell */}
          <Route path="/app" element={<MainLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="loan" element={<LoanTab />} />
            <Route path="cfo" element={<Cfo />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/linked-accounts" element={<LinkedAccounts />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <ToastHost />
    </AppFrame>
  )
}
