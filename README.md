# beyondMargin

**Smart India Hackathon 2026 · Problem Statement SIH26091**
*AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs — Ministry of Social Justice & Empowerment (MoSJE)*

> **Know before you borrow.** A multilingual advisory app that helps rural Indian
> micro-entrepreneurs check whether a business idea will work in their village *before*
> they borrow to start it.

This repository is the **front-end prototype** — a responsive, interactive click-through
that demonstrates the full product experience with mock/hardcoded data (no backend, no
real APIs). It is built to be demoed on a phone, tablet or desktop.

> The numbers shown are illustrative. In the full product the financial figures come from
> a deterministic, tested kernel — no rupee value is produced by a language model.

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · Zustand · React Router · Recharts ·
Framer Motion. Client-side only.

## Getting started

```bash
# from the repo root (delegates into ./client)
npm install --prefix client
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

Other commands (run from the root):

```bash
npm run build       # type-check + production build
npm run typecheck   # tsc --noEmit
npm run preview     # preview the production build
```

## Project structure

```
sih26091/
├─ client/              # the Vite frontend prototype
│  ├─ src/
│  │  ├─ app/           # router, providers, responsive AppFrame
│  │  ├─ shell/         # top bar, bottom nav, sidebar, layouts
│  │  ├─ screens/       # every screen (onboarding → report → loan → CFO, + portals)
│  │  ├─ features/      # map, gauges, report tabs, OTP, QR, etc.
│  │  ├─ shared/        # UI kit, hooks, motion, icons, toast
│  │  ├─ store/         # Zustand cross-phase state
│  │  └─ mock/          # all hardcoded demo data
│  └─ …                 # vite / tailwind / ts config
├─ package.json         # thin delegator to client
└─ .claude/             # project agents, skills, hooks, context (tailored for SIH 2026)
```

## What's inside the prototype

- **Onboarding** — splash, 22-language selection, mobile OTP sign-in, consent.
- **Feasibility report** (flagship) — conversational intake, mock catchment map with
  radius + heat layers + competitor pins, and 7 tabs: Market Reach, Competitors,
  Opportunity, Threats, Price Trends, SWOT, Viability score.
- **KYC & bank linking** — simulated Aadhaar/PAN/GST + Account Aggregator flow.
- **Loan module** — scheme match, capital stack + blended cost, flat/seasonal repayment,
  working-capital gap, insurance attach, Monte-Carlo stress, calculation passport, tracker.
- **Personal CFO** — runway, break-even, lean-period calendar, sale log.
- **Market Linkage** (ONDC catalogue draft) · **Micro-learning + Mentor** · **Bharat Mode**
  (offline / IVR / 4-SMS delivery).
- **Ministry portfolio dashboard** — saturation early-warning, intent telemetry, impact ledger.
- **SCA officer co-pilot** — scored application queue and dossier review.

Responsive across phone (mobile app), tablet (adaptive), and desktop (sidebar web app).

---

*Prototype — all data is fictional.*
