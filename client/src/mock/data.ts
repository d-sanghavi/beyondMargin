import type { BankAccount, SelectedLocation } from '../store/useApp'

// ---- Location candidates (intake step 2) ----
export const LOCATION_CANDIDATES: SelectedLocation[] = [
  { name: 'Chikhli', district: 'Buldhana district', state: 'Maharashtra', lgd: '512340', match: 94 },
  { name: 'Chikhli', district: 'Jalna district', state: 'Maharashtra', lgd: '514902', match: 61 },
  { name: 'Chikhli Khurd', district: 'Buldhana district', state: 'Maharashtra', lgd: '512871', match: 58 },
]

export const BUSINESS_CATEGORIES = [
  'Dairy',
  'Retail / General Store',
  'Tailoring',
  'Poultry',
  'Snacks & Food Stall',
  'Handicrafts',
] as const

export const MARGIN_CHIPS = [25000, 50000, 100000, 200000]

// ---- Report building stepper ----
export const BUILD_STEPS = [
  'Confirming your location',
  'Checking population reach',
  'Mapping nearby businesses',
  'Estimating local demand',
  'Assessing risks',
  'Writing your report',
]

// ---- Competitor pins ----
export type PinConfidence = 'confirmed' | 'registry' | 'map'
export interface Competitor {
  id: string
  name: string
  category: string
  distanceKm: number
  confidence: PinConfidence
  // position as % within the map box
  x: number
  y: number
}

export const COMPETITORS: Competitor[] = [
  { id: 'c1', name: 'Lakshmi Dairy Store', category: 'Dairy', distanceKm: 1.2, confidence: 'confirmed', x: 42, y: 38 },
  { id: 'c2', name: 'Sai Milk Center', category: 'Dairy', distanceKm: 2.4, confidence: 'confirmed', x: 62, y: 55 },
  { id: 'c3', name: 'Gramin Provisions', category: 'General Store', distanceKm: 3.1, confidence: 'registry', x: 35, y: 62 },
  { id: 'c4', name: 'Patil Dairy Farm', category: 'Dairy', distanceKm: 4.0, confidence: 'registry', x: 70, y: 34 },
  { id: 'c5', name: 'Jai Kisan Store', category: 'General Store', distanceKm: 2.8, confidence: 'map', x: 52, y: 70 },
  { id: 'c6', name: 'Anand Milk Point', category: 'Dairy', distanceKm: 5.2, confidence: 'map', x: 28, y: 46 },
]

export const PIN_LEGEND: Record<PinConfidence, { label: string; color: string }> = {
  confirmed: { label: 'Confirmed by other users', color: '#15803D' },
  registry: { label: 'From official business registry', color: '#D97706' },
  map: { label: 'From map data only', color: '#6B7280' },
}

export const HEAT_LAYERS = ['Competitors', 'Population density', 'Purchasing power', 'Roads & infrastructure']

// ---- Market reach stats ----
export const MARKET_REACH = {
  basePeople: 8400,
  households: 1640,
  nonFarmPct: 38,
  electrifiedPct: 91,
  purchasingPowerZone: 'Moderate',
  source: 'Source: Census 2011 · SHRUG · updated 2024',
}

// ---- Opportunity ----
export const OPPORTUNITY = {
  villages: [
    { name: 'Jalgaon Khurd', note: '6 km away', uplift: 34, why: 'Fewer dairy outlets per 1,000 people and a weekly market that pulls footfall from three adjacent hamlets.' },
    { name: 'Dhanora', note: '9 km away', uplift: 21, why: 'Lower competitor saturation, though a smaller catchment population offsets part of the gain.' },
  ],
  businesses: [
    { name: 'Milk chilling & collection point', demand: 'high', why: 'No cold-chain node within 11 km; existing producers sell at a discount to distant aggregators.' },
    { name: 'Packaged snacks retail', demand: 'high', why: 'Rising non-farm incomes and a young population; nearest branded snack stockist is in the block town.' },
  ],
}

// ---- Threats ----
export interface Threat {
  id: string
  name: string
  severity: 'Low' | 'Medium' | 'High'
  explain: string
  spark: number[]
}
export const THREATS: Threat[] = [
  { id: 't1', name: 'Seasonal demand dip in monsoon', severity: 'High', explain: 'Milk offtake and cash purchases both fall for roughly ten weeks during heavy rain.', spark: [60, 58, 52, 40, 30, 44] },
  { id: 't2', name: 'Single mandi dependency for raw milk', severity: 'Medium', explain: 'One collection mandi sets the input price; a disruption there squeezes your margin.', spark: [50, 52, 55, 48, 46, 49] },
  { id: 't3', name: 'Road access limited in heavy rain', severity: 'Medium', explain: 'The approach road floods a few days each season, delaying supply and customers.', spark: [70, 68, 55, 42, 60, 66] },
  { id: 't4', name: 'New scheme entrants may increase competition', severity: 'Low', explain: 'A handful of applicants nearby are exploring the same category this quarter.', spark: [20, 24, 28, 30, 33, 36] },
]

// ---- Price trends ----
export const PRICE_SERIES = {
  block: [42, 43, 44, 46, 47, 45, 41, 39, 40, 43, 46, 48],
  state: [40, 41, 42, 43, 44, 43, 42, 41, 41, 42, 44, 45],
  months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  band: '₹42–₹48 per litre',
}

// ---- SWOT ----
export const SWOT = {
  strengths: [
    { text: 'Low margin capital requirement to enter dairy', observed: true },
    { text: 'Existing household experience with cattle', observed: false },
    { text: 'Assured procurement via nearby cooperative', observed: true },
  ],
  weaknesses: [
    { text: 'Working-capital cycle before first payout', observed: true },
    { text: 'No cold storage on site', observed: false },
    { text: 'Limited bargaining power on input price', observed: true },
  ],
  opportunities: [
    { text: 'Unserved chilling & collection demand nearby', observed: true },
    { text: 'Rising non-farm household incomes', observed: false },
    { text: 'Scheme-linked interest subvention available', observed: true },
  ],
  threats: [
    { text: 'Monsoon seasonal demand dip', observed: true },
    { text: 'Single-mandi input dependency', observed: false },
    { text: 'Competitor saturation trending up', observed: true },
  ],
}

// ---- Viability ----
export const VIABILITY = {
  score: 74,
  verdict: 'Likely viable, with changes',
  factors: [
    { label: 'Catchment demand', effect: 18 },
    { label: 'Competitor saturation', effect: -9 },
    { label: 'Working capital adequacy', effect: 6 },
    { label: 'Seasonal risk', effect: -4 },
    { label: 'Infrastructure access', effect: 3 },
  ],
}

// ---- KYC / banks ----
export const BANK_ACCOUNTS: BankAccount[] = [
  { id: 'sbi', bank: 'State Bank of India', short: 'S', type: 'Savings Account', masked: '•••• 4821', balance: 18240, color: '#22409a' },
  { id: 'hdfc', bank: 'HDFC Bank', short: 'H', type: 'Savings Account', masked: '•••• 7710', balance: 42900, color: '#004c8f' },
  { id: 'union', bank: 'Union Bank of India', short: 'U', type: 'Jan Dhan Savings Account', masked: '•••• 1190', balance: 3150, color: '#a51d34' },
]

export const AA_STEPS = [
  'Connecting to the Account Aggregator network',
  'Requesting your consent',
  'State Bank of India responding',
  'HDFC Bank responding',
  'Union Bank of India responding',
  '3 accounts found',
]

// ---- Loan / scheme ----
export const SCHEME = {
  name: 'MoSJE Term Loan Scheme',
  multiplier: 10, // project cost = margin * 10
  interest: 8,
  tenureYears: 7,
  moratoriumMonths: 6,
  tierLow: 140000,
  tierHigh: 5000000,
  reason:
    'Your project cost is above ₹1.4 lakh, so you’re matched to the Term Loan tier rather than the Micro Finance tier.',
}

export const OTHER_SCHEMES = [
  { name: 'Stand-Up India', eligible: true, reason: 'First-generation SC/ST or woman entrepreneur — matches.' },
  { name: 'PMEGP', eligible: false, reason: 'Project cost exceeds the PMEGP service-sector ceiling.' },
  { name: 'Mudra Kishore', eligible: false, reason: 'Loan requirement is above the ₹5 lakh Kishore limit.' },
]

export const INSURANCE_COVERS = [
  { id: 'livestock', name: 'Livestock cover', desc: 'Protects against loss of your animals', premium: 1200 },
  { id: 'shop', name: 'Shop fire & theft cover', desc: 'Covers your premises and stock', premium: 800 },
]

export const TRACKER_STAGES = ['Submitted', 'Under review', 'Field verification', 'Sanctioned', 'Disbursed']

// ---- CFO ----
export const CFO = {
  runwayMonths: 3.4,
  breakEvenPct: 68,
  breakEvenMonth: 9,
  leanStartWeeks: 6,
  leanHold: 22000,
  nextInstalmentRebate: 1240,
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  leanMonthIndex: 6,
}

// Utility: rupee formatting (Indian grouping)
export function inr(n: number): string {
  return '₹' + n.toLocaleString('en-IN')
}

// Build a mock repayment schedule row set
export interface ScheduleRow {
  period: string
  due: string
  interest: number
  principal: number
  instalment: number
  balance: number
  moratorium?: boolean
}

export function buildSchedule(loan: number, seasonal: boolean): ScheduleRow[] {
  const rows: ScheduleRow[] = []
  const quarters = 12
  const rate = SCHEME.interest / 100 / 4
  let balance = loan
  const flatPrincipal = loan / (quarters - 2)
  const dueDates = ['15 Jun', '15 Sep', '15 Dec', '15 Mar']
  // seasonal weights across the 10 paying quarters (harvest-heavy)
  const seasonalWeights = [1.4, 0.6, 0.7, 1.5, 1.4, 0.6, 0.7, 1.5, 1.3, 0.3]
  let wIdx = 0
  for (let i = 0; i < quarters; i++) {
    const year = 2026 + Math.floor(i / 4)
    const period = `Q${(i % 4) + 1} ${year}`
    const due = `${dueDates[i % 4]} ${year}`
    const interest = Math.round(balance * rate)
    if (i < 2) {
      rows.push({ period, due, interest, principal: 0, instalment: interest, balance: Math.round(balance), moratorium: true })
      continue
    }
    let principal = flatPrincipal
    if (seasonal) {
      principal = flatPrincipal * seasonalWeights[wIdx]
      wIdx++
    }
    principal = Math.min(principal, balance)
    balance -= principal
    rows.push({
      period,
      due,
      interest,
      principal: Math.round(principal),
      instalment: Math.round(principal + interest),
      balance: Math.round(Math.max(balance, 0)),
    })
  }
  return rows
}
