import { create } from 'zustand'

export type BusinessCategory =
  | 'Dairy'
  | 'Retail / General Store'
  | 'Tailoring'
  | 'Poultry'
  | 'Snacks & Food Stall'
  | 'Handicrafts'

export interface SelectedLocation {
  name: string
  district: string
  state: string
  lgd: string
  match: number
}

export interface BankAccount {
  id: string
  bank: string
  short: string
  type: string
  masked: string
  balance: number
  color: string
}

export interface CfoEntry {
  id: string
  amount: number
  note: string
  at: number
}

export interface ReportSummary {
  id: string
  location: string
  category: BusinessCategory | string
  score: number
  createdAt: number
}

interface KycState {
  aadhaarVerified: boolean
  panVerified: boolean
  panName: string
  gstProvided: boolean
  gstNumber: string | null
  account: BankAccount | null
}

interface LoanState {
  appId: string | null
  scheme: string | null
  projectCost: number
  loanAmount: number
  submitted: boolean
}

interface AppState {
  // onboarding
  language: string
  setLanguage: (l: string) => void
  reduceMotion: boolean
  setReduceMotion: (v: boolean) => void
  demoBannerDismissed: boolean
  dismissDemoBanner: () => void

  // feasibility intake (reused across phases)
  selectedLocation: SelectedLocation | null
  setSelectedLocation: (l: SelectedLocation) => void
  businessCategory: BusinessCategory | string | null
  setBusinessCategory: (c: BusinessCategory | string) => void
  marginCapital: number | null
  setMarginCapital: (v: number) => void

  reports: ReportSummary[]
  addReport: (r: ReportSummary) => void

  // KYC
  kyc: KycState
  setKyc: (patch: Partial<KycState>) => void
  kycComplete: () => boolean

  // loan
  loan: LoanState
  setLoan: (patch: Partial<LoanState>) => void

  // CFO
  cfoEntries: CfoEntry[]
  addCfoEntry: (e: CfoEntry) => void

  resetDemo: () => void
}

const initialKyc: KycState = {
  aadhaarVerified: false,
  panVerified: false,
  panName: 'RAMESH KUMAR PATIL',
  gstProvided: false,
  gstNumber: null,
  account: null,
}

const initialLoan: LoanState = {
  appId: null,
  scheme: null,
  projectCost: 0,
  loanAmount: 0,
  submitted: false,
}

export const useApp = create<AppState>((set, get) => ({
  language: 'English',
  setLanguage: (language) => set({ language }),
  reduceMotion: false,
  setReduceMotion: (reduceMotion) => set({ reduceMotion }),
  demoBannerDismissed: false,
  dismissDemoBanner: () => set({ demoBannerDismissed: true }),

  selectedLocation: null,
  setSelectedLocation: (selectedLocation) => set({ selectedLocation }),
  businessCategory: null,
  setBusinessCategory: (businessCategory) => set({ businessCategory }),
  marginCapital: null,
  setMarginCapital: (marginCapital) => set({ marginCapital }),

  reports: [],
  addReport: (r) => set((s) => ({ reports: [r, ...s.reports] })),

  kyc: initialKyc,
  setKyc: (patch) => set((s) => ({ kyc: { ...s.kyc, ...patch } })),
  kycComplete: () => {
    const { kyc } = get()
    return kyc.aadhaarVerified && kyc.panVerified && !!kyc.account
  },

  loan: initialLoan,
  setLoan: (patch) => set((s) => ({ loan: { ...s.loan, ...patch } })),

  cfoEntries: [
    { id: 'seed1', amount: 1800, note: 'Milk sold — morning round', at: Date.now() - 86400000 },
    { id: 'seed2', amount: 950, note: 'Curd + paneer', at: Date.now() - 43200000 },
  ],
  addCfoEntry: (e) => set((s) => ({ cfoEntries: [e, ...s.cfoEntries] })),

  resetDemo: () =>
    set({
      language: 'English',
      selectedLocation: null,
      businessCategory: null,
      marginCapital: null,
      reports: [],
      kyc: initialKyc,
      loan: initialLoan,
      demoBannerDismissed: false,
    }),
}))
