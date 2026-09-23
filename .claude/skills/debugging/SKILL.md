# Debugging

Debug the **beyondMargin prototype** (SIH26091) systematically.

1. reproduce
2. isolate
3. inspect console / React DevTools / network (should be empty — it's mock data)
4. identify the boundary
5. form a hypothesis
6. test it
7. fix the root cause
8. add regression coverage
9. verify adjacent failure modes

Classify failures as:
- render / component
- state (Zustand cross-phase, local component state)
- routing / lazy-load
- animation / motion / reduce-motion
- responsive / layout (breakpoint, phone-frame, overflow)
- mock-data (missing/shape-mismatched fixture)

Do not hide errors with broad catches, and do not "fix" a bug by introducing a backend or
real API call — the prototype is client-side only.
