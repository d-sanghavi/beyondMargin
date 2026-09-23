# Performance

Optimise the **beyondMargin prototype** (React + Vite) for a mid-range / low-end phone.
Measure before optimising; make the smallest change that fixes a measured bottleneck.

Track:
- initial bundle size (gzipped) and per-route chunks
- route-level code splitting / lazy routes actually working
- render cost and unnecessary re-renders (memoise where it measurably helps)
- animation smoothness — target 60fps; avoid layout thrash during counters/morphs
- image/font weight (self-host or subset Fraunces/Inter)

Frontend levers:
- lazy-load heavy screens (report, charts) and the "+14 more" language sheet
- keep Recharts imports narrow; avoid pulling a second charting lib
- debounce the catchment-radius slider's recomputation
- prefer CSS transforms/opacity for animation over layout-affecting properties

There is no backend, DB, or AI runtime to profile — payload and animation on a real
device are the concerns. Do not add dependencies to "optimise"; prefer removing weight.
