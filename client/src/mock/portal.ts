// Mock data for the Ministry portal (M14 / B1 / B7) and the SCA Officer Co-Pilot (M15 / B4).
// All illustrative.

export const MINISTRY_KPIS = [
  { label: 'Units advised', value: 48210, delta: '+6.2%' },
  { label: 'Units funded', value: 31940, delta: '+4.1%' },
  { label: 'Surviving @ 12 mo', value: 78, suffix: '%', delta: '+3 pts' },
  { label: 'Surviving @ 24 mo', value: 64, suffix: '%', delta: '+5 pts' },
]

// B1 — Saturation Early Warning: blocks trending toward over-concentration.
export interface SaturationRow {
  block: string
  district: string
  sector: string
  intended: number
  absorbable: number
  index: number // intended / absorbable, %
  alert: 'High' | 'Medium' | 'Low'
}
export const SATURATION_WATCHLIST: SaturationRow[] = [
  { block: 'Chikhli', district: 'Buldhana', sector: 'Dairy', intended: 42, absorbable: 28, index: 150, alert: 'High' },
  { block: 'Sindkhed Raja', district: 'Buldhana', sector: 'General Store', intended: 31, absorbable: 24, index: 129, alert: 'High' },
  { block: 'Mehkar', district: 'Buldhana', sector: 'Tailoring', intended: 22, absorbable: 20, index: 110, alert: 'Medium' },
  { block: 'Deulgaon Raja', district: 'Buldhana', sector: 'Poultry', intended: 18, absorbable: 21, index: 86, alert: 'Low' },
  { block: 'Lonar', district: 'Buldhana', sector: 'Snacks & Food', intended: 14, absorbable: 19, index: 74, alert: 'Low' },
]

// Intent telemetry over the last 12 weeks (pre-disbursement demand signal).
export const INTENT_TREND = [
  { w: 'W1', dairy: 12, retail: 8, other: 6 },
  { w: 'W2', dairy: 15, retail: 9, other: 7 },
  { w: 'W3', dairy: 18, retail: 11, other: 6 },
  { w: 'W4', dairy: 22, retail: 10, other: 8 },
  { w: 'W5', dairy: 26, retail: 12, other: 9 },
  { w: 'W6', dairy: 31, retail: 13, other: 8 },
  { w: 'W7', dairy: 34, retail: 15, other: 10 },
  { w: 'W8', dairy: 38, retail: 14, other: 11 },
  { w: 'W9', dairy: 40, retail: 16, other: 12 },
  { w: 'W10', dairy: 42, retail: 17, other: 11 },
]

// B7 — Public Impact Ledger: survival of those who followed the advisory vs not.
export const IMPACT_LEDGER = [
  { month: 'M3', followed: 98, ignored: 94 },
  { month: 'M6', followed: 93, ignored: 82 },
  { month: 'M9', followed: 88, ignored: 71 },
  { month: 'M12', followed: 84, ignored: 61 },
  { month: 'M18', followed: 76, ignored: 52 },
  { month: 'M24', followed: 68, ignored: 44 },
]

export const SECTOR_SPLIT = [
  { sector: 'Dairy', units: 14200 },
  { sector: 'Retail', units: 9800 },
  { sector: 'Tailoring', units: 6100 },
  { sector: 'Poultry', units: 4300 },
  { sector: 'Snacks', units: 3900 },
  { sector: 'Handicraft', units: 3640 },
]

// M15 / B4 — SCA Officer Co-Pilot: application dossier queue.
export interface Application {
  id: string
  applicant: string
  village: string
  district: string
  category: string
  score: number
  projectCost: number
  loan: number
  slaHours: number
  status: 'New' | 'In review' | 'Field pending'
  weakest: string
  passportVerified: boolean
  competitors: number
}
export const OFFICER_QUEUE: Application[] = [
  { id: 'BM-2026-004821', applicant: 'Ramesh K. Patil', village: 'Chikhli', district: 'Buldhana', category: 'Dairy', score: 74, projectCost: 1000000, loan: 900000, slaHours: 6, status: 'New', weakest: 'Working capital adequacy', passportVerified: true, competitors: 6 },
  { id: 'BM-2026-004822', applicant: 'Sunita R. Gaikwad', village: 'Mehkar', district: 'Buldhana', category: 'Tailoring', score: 81, projectCost: 450000, loan: 400000, slaHours: 19, status: 'New', weakest: 'Seasonal demand', passportVerified: true, competitors: 3 },
  { id: 'BM-2026-004823', applicant: 'Imran S. Shaikh', village: 'Lonar', district: 'Buldhana', category: 'Snacks & Food', score: 58, projectCost: 300000, loan: 250000, slaHours: 3, status: 'In review', weakest: 'Competitor saturation', passportVerified: true, competitors: 8 },
  { id: 'BM-2026-004824', applicant: 'Lata B. More', village: 'Sindkhed Raja', district: 'Buldhana', category: 'Poultry', score: 69, projectCost: 620000, loan: 560000, slaHours: 28, status: 'Field pending', weakest: 'Infrastructure access', passportVerified: false, competitors: 4 },
]

export const OVERRIDE_REASONS = ['Field visit confirms viability', 'Insufficient collateral', 'Catchment overstated', 'Duplicate intent in block', 'Documentation incomplete']
