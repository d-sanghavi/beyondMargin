# Testing

Test the **beyondMargin prototype** (SIH26091) — a client-side app with mock data and
simulated delays. There is no API, DB, auth or external service to test.

## Tools

- **Vitest** + **React Testing Library** for component behaviour.
- **Playwright** (optional) for the end-to-end click-through journey.

## What to cover

- Component states: loading (skeleton), empty, error/edge, and success.
- Form validation and toggles (OTP boxes, PAN/GST format, consent locks, insurance
  toggles).
- **Cross-phase state:** margin capital entered in the feasibility flow reappears in the
  loan module; the bank account selected in KYC appears in the tracker.
- Conditional flows: GST step shows only for Retail/Handicrafts; loan flow redirects to
  KYC when it is incomplete.
- Accessibility: roles/labels, 44px targets, focus order; and that the reduce-motion flag
  disables non-essential animation.
- Responsive rendering at phone / tablet / desktop widths (no horizontal scroll).

Test both the happy path and the "user changes their mind / edits / skips" paths.

Do not write tests against a backend, database, RLS, or real external services — none
exist in this prototype.
