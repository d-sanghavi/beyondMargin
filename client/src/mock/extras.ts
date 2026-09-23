// Mock data for Market Linkage (M18/B5), Micro-learning + Mentor (B6),
// Bharat Mode (T2) and Monte-Carlo stress (F4). All illustrative.

// M18 / B5 — Market Linkage Bridge: generated ONDC-ready catalogue + demand anchors.
export const ONDC_CATALOGUE = {
  seller: 'Ramesh Dairy · Chikhli',
  items: [
    { name: 'Fresh cow milk', unit: 'per litre', capacity: '120 L/day', price: '₹44', packaging: 'Loose / 500ml pouch' },
    { name: 'Curd (dahi)', unit: 'per kg', capacity: '20 kg/day', price: '₹90', packaging: '200g / 1kg cup' },
    { name: 'Paneer', unit: 'per kg', capacity: '8 kg/day', price: '₹320', packaging: '200g vacuum pack' },
  ],
}

export const DEMAND_ANCHORS = {
  mandis: [
    { name: 'Chikhli APMC', distance: '4 km', spread: '+8%' },
    { name: 'Buldhana APMC', distance: '22 km', spread: '+12%' },
  ],
  institutions: [
    { name: 'ZP School (Mid-day Meal)', type: 'Institutional buyer', need: '60 L/day' },
    { name: 'Anganwadi cluster', type: 'Institutional buyer', need: '25 L/day' },
    { name: 'Chikhli Dairy Co-op', type: 'Aggregator', need: 'Bulk' },
  ],
  gem: ['Dairy products supply', 'Nutrition & food supply'],
}

// B6 — Deficit-triggered micro-learning + mentor graph.
export const MICRO_LESSON = {
  triggerDimension: 'Working capital',
  title: 'Managing cash before your first sale',
  minutes: 3,
  language: 'Marathi',
  transcript:
    'Before your first milk payment arrives, you still pay for feed, transport and pouches. Keep about three weeks of running cost aside so a slow week never stops your supply…',
}

export const MENTOR = {
  name: 'Anil D. Jadhav',
  village: 'Deulgaon Raja',
  distanceKm: 11,
  category: 'Dairy',
  years: 6,
  note: 'Runs a 40-litre/day dairy funded under the same scheme in 2020.',
}

// T2 — Bharat Mode: the same verdict across three delivery grades.
// Grade C: fixed-field 160-char feasibility card across 4 SMS.
export const SMS_CARD = [
  'beyondMargin 1/4 VERDICT: Viable-with-changes (74/100). Chikhli, Buldhana LGD512340. Dairy.',
  'beyondMargin 2/4 REACH: ~8400 ppl/6km. Competitors: 6 (Crowded). Price band Rs42-48/L.',
  'beyondMargin 3/4 FINANCE: Project Rs10.0L Loan Rs9.0L @8% 7yr. EMI Rs1.08L/qtr. Break-even m9.',
  'beyondMargin 4/4 RISK: Monsoon demand dip (High). Add Rs25k working capital. Reply VOICE for call.',
]

// F4 — Monte-Carlo debt-service stress: DSCR distribution across 10,000 paths.
export const DSCR_DISTRIBUTION = [
  { dscr: '0.6', paths: 2 },
  { dscr: '0.8', paths: 6 },
  { dscr: '1.0', paths: 12 },
  { dscr: '1.2', paths: 22 },
  { dscr: '1.4', paths: 26 },
  { dscr: '1.6', paths: 18 },
  { dscr: '1.8', paths: 9 },
  { dscr: '2.0', paths: 5 },
]
export const MONTE_CARLO = {
  probBelowOne: 19, // % of quarters with DSCR < 1
  firstStressMonth: 9,
  sensitivities: [
    { factor: 'Milk price', impact: 42 },
    { factor: 'Monsoon demand', impact: 31 },
    { factor: 'Feed cost', impact: 18 },
  ],
}

// F5 — blended cost of the capital stack (effective cost per layer).
export const CAPITAL_LAYERS = [
  { label: 'Own margin', amount: 100000, cost: 0 },
  { label: 'MoSJE term loan', amount: 900000, cost: 8 },
]
