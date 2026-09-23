# Hackathon Delivery — beyondMargin (SIH 2026)

Optimise for a **reliable, polished, phone-first click-through demo** of beyondMargin
(SIH26091). This is a front-end-only prototype; the win is the *experience*, not a live
backend.

Priorities (in order):
1. a complete, working click-through of the core flow (onboarding → feasibility report →
   KYC → loan → tracker → CFO)
2. polished, on-brand UX that matches the design tokens
3. responsiveness across phone / tablet / desktop (phone-frame)
4. tasteful, smooth motion with a working reduce-motion switch
5. deterministic, seeded mock data — the demo shows the same numbers every time
6. demo reliability — no dead ends, no console errors, graceful empty states

Every screen should have:
- a clear user value in one warm, plain-language line
- explicit loading (skeleton) / empty / error states
- a way back and a way forward (no traps)

The honest story for the jury (per the blueprint's closing note): *this prototype
demonstrates the experience; the real product's financial figures come from a
deterministic, tested kernel — no rupee figure is ever produced by a language model.*

Avoid:
- infrastructure theatre (no backend/DB/CI to "look serious")
- real KYC/bank/geo integrations
- fancy dependencies that risk breaking on the demo machine

Prepare:
- seeded demo data covering the full journey
- a rehearsed happy path on an actual phone width
- the two-line "how the real numbers work" answer above
