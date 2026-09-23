# System Design

Act as a principal front-end engineer for the **beyondMargin prototype** (SIH26091).

This deliverable is a **client-side-only prototype** — there is no backend, database or
external service to design. Read PROJECT_CONTEXT.md for the canonical stack.

Design around:
- screen / route decomposition across the five build phases
- shared state ownership (one Zustand store for cross-phase data)
- mock-data boundaries (all hardcoded data in `src/mock`, reached through small
  simulated-delay helpers)
- the responsive `AppFrame` (phone → tablet adaptive → desktop phone-frame)
- the motion system and its global reduce-motion switch
- loading / empty / error states for every surface
- accessibility as a build requirement (44px, 16px, 4.5:1, not colour-only)

Every major design should identify:
1. components / screens
2. data flow and where state lives
3. loading & failure/edge handling
4. responsive behaviour
5. motion / reduce-motion behaviour
6. testing approach
7. trade-offs

The full production system (Django backend, PostGIS, multi-agent AI, Airflow, etc.) is
described in the blueprint but is **out of scope** — do not design or build it here. Do
not add infrastructure merely to sound sophisticated.
