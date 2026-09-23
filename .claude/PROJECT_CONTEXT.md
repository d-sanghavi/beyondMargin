# PROJECT_CONTEXT — beyondMargin (SIH 2026)

> Single source of truth for all agents and skills in this repo. Read this before
> changing anything.

## Event & problem statement

- **Event:** Smart India Hackathon 2026 (SIH 2026)
- **Problem statement:** **SIH26091** — *AI-Driven Hyper-Local Business Advisory and
  Financial Structuring Assistant for Rural Micro-Entrepreneurs*
- **Organisation:** Ministry of Social Justice and Empowerment (MoSJE), Government of India
- **Theme:** Software · Agriculture, FoodTech & Rural Development
- **Product name:** **beyondMargin** — a multilingual, offline-minded advisory app that
  helps rural Indian micro-entrepreneurs check whether a business idea will work in
  their village *before* they borrow to start it. Tagline: *"Know before you borrow."*

## What we are building HERE

**A front-end-only PROTOTYPE.** This repository is a visual, interactive click-through
demo — the kind you run on a phone at the finale. It is **not** the production system.

- **Everything is client-side.** Mock/hardcoded data only.
- **No real network calls.** Every "fetch"/"verify"/"loading" is a `setTimeout` plus a
  skeleton shimmer.
- **No real Aadhaar / PAN / GST / Account Aggregator / bank / geodata / amortization.**
  Numbers are illustrative. (The real product's financial kernel is deterministic Python
  tested against golden fixtures — that is out of scope for this prototype.)
- **No backend, no database, no auth server, no secrets.**

If the jury asks whether the numbers are real: they demonstrate the *experience* of the
system, not the production financial engine.

## Repo layout

- **`client/`** — the frontend prototype (Vite app: `client/src`, `client/package.json`,
  `client/index.html`, etc.). All app work happens here; run `npm install`/`npm run dev`
  inside `client/`, or use the root delegator scripts below.
- **root `package.json`** — thin delegator (`npm run dev|build|lint|typecheck` →
  `npm --prefix client run ...`). Leaves room for a future `server/` folder.
- **`.claude/`** — agents, skills, hooks, this file, `launch.json`.

## Canonical prototype stack

| Concern        | Choice                                                            |
|----------------|------------------------------------------------------------------|
| Framework      | **React 18 + TypeScript** (strict)                               |
| Build          | **Vite** (route-level code splitting, lazy routes)               |
| Routing        | **React Router** with lazy route elements                        |
| Client state   | **Zustand** — small shared mock state across the flow            |
| Styling        | **Tailwind CSS** with the design tokens below                    |
| Charts         | **Recharts** (small footprint)                                   |
| Motion         | **framer-motion** (or CSS) — all gated by a global reduce-motion flag |
| Map            | **Styled mock map** (div + pins/overlay). No MapLibre/tiles.     |
| Testing        | Vitest + Testing Library (Playwright optional for the journey)   |

**Forbidden in this prototype:** Next.js, Express/Node backend, Django/DRF, Supabase,
PostgreSQL, Google Drive, MongoDB, real API keys, any server.

## Design tokens (from the build script)

- **Colours:** primary navy `#1F3864`, accent saffron `#B45309`, success `#15803D`,
  warning `#D97706`, danger `#B91C1C`, app bg `#F7F8FA`, card `#FFFFFF`, info tint
  `#EDF2F9`, warm tint `#FFF4E5`, border/rule `#E4E9F2`, muted text `#6B7280`,
  ink text `#1A1A1A`.
- **Type:** **Fraunces** (serif 600–700) for headings + the wordmark; **Inter** for all
  body, labels, buttons and numbers. Money/stat numbers are Inter, bold, tabular figures,
  navy or saffron.
- **Shape:** radius 16px cards, 12px buttons/inputs, 24px bottom sheets/modals. Soft,
  low-elevation shadows only.
- **Motion:** 220ms ease-out screen transitions (forward = slide-in-from-right, back =
  from-left), 300ms spring for bottom sheets, 60–80ms stagger for list/card groups, tap
  scales to 0.97. Loading states use skeleton shimmer, never a bare spinner.

## Responsive contract (must work on ALL devices)

- **Mobile-first.** Fluid full-screen on real phones.
- **Tablet:** widened adaptive layout.
- **Desktop:** the app is centred inside a **phone-frame** device shell (soft shadow),
  content scrolls inside it.
- A single `AppFrame` wrapper enforces this so every screen inherits it.
- **Accessibility:** min 44px touch targets, min 16px body text, contrast ≥ 4.5:1,
  never convey meaning by colour alone (verdicts are a word + icon, not just a colour).

## Copy

Short, warm, plain-language. Users may be reading a smartphone screen for the first time.
No jargon in UI text.

## Cross-phase shared state (Zustand)

`language`, `marginCapital` (entered once in the feasibility flow, reused in the loan
module), `businessCategory`, `selectedLocation`, `kyc` (aadhaar/pan/gst/account),
`loan` (appId/scheme), `reports[]`, `cfoEntries[]`, `reduceMotion`.
