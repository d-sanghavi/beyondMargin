# Frontend Engineering

Build the **beyondMargin** prototype with **React 18 + TypeScript + Vite + Tailwind**.
This is a front-end-only prototype (SIH26091): mock data, simulated delays, no backend.
Read PROJECT_CONTEXT.md for the full stack, design tokens and responsive contract.

## Structure (feature-oriented)

```
src/
  app/        router, providers, AppFrame, reduce-motion, demo banner
  shell/      top bar, bottom nav (5 tabs), page-transition wrapper
  screens/    splash, language, signin/otp, consent, home, explore,
              report, kyc, loan, tracker, cfo, profile
  features/   geo-picker, feasibility-map, swot, viability-ring,
              schedule-table, capital-stack, otp-input, provenance-sheet,
              passport-qr, skeletons
  shared/     ui kit (Button/Card/Chip/Toast/BottomSheet/Gauge/Counter),
              hooks (useAnimatedNumber, useReduceMotion), i18n strings
  store/      zustand cross-phase mock state
  mock/       hardcoded datasets
```

## Rules

- Strict TypeScript; no unnecessary `any`. Functional components; composition over
  duplication; avoid unnecessary `useEffect`.
- Separate UI state, URL/route state, and the shared Zustand store. Cross-phase data
  (margin capital, location, business category, KYC, loan, CFO) lives in the store so it
  is never re-entered.
- Every screen has explicit loading (skeleton shimmer, not a bare spinner), empty, and
  error/edge states.
- **Mock-data pattern:** wrap each "fetch"/"verify" in a small helper that `setTimeout`s,
  then returns hardcoded data from `src/mock`. No real network calls.
- **Charts:** Recharts only. Keep the footprint small.
- **Motion:** framer-motion (or CSS) per the token spec; every animation reads the global
  reduce-motion flag and degrades to fade/instant.

## Responsive (all devices)

- Mobile-first, fluid on phones. Tablet = widened adaptive. Desktop = centred
  **phone-frame** device shell; content scrolls inside. Enforced by a single `AppFrame`.
- Min 44px touch targets, 16px body text, contrast ≥ 4.5:1, never colour-only meaning
  (verdicts are word + icon).
- No horizontal page scroll at any width.

## i18n

Language selection is functional at least for the wordmark/tagline and key labels; use a
simple string map keyed by locale. A user loads one language, not all of them.

## Don't

Next.js, Express, Django, Supabase, PostgreSQL, Google Drive, real APIs, secrets, or a
backend. Client-side only.

Use Vitest + Testing Library for component behaviour; Playwright optional for the journey.
