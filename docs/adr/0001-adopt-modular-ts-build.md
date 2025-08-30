# ADR-0001: Adopt Modular TypeScript Build and Move Inlined Runtime

Date: 2025-08-30
Status: Accepted
Deciders: Tech Lead, Runtime Owner, UI/UX Owner, QA/Tooling Owner
Context: `3gpp_simulator.html` contains inlined runtime logic. TS files provide type references but are not part of the build.

## Decision
Adopt a modular TypeScript architecture built with Vite. Extract inlined runtime into `src/` modules (`core` and `ui`) and expose `createSim()` to bootstrap from `index.html`.

## Rationale
- Improves maintainability, testability, and type safety.
- Enables unit/integration tests and CI.
- Facilitates feature growth and performance optimization.

## Consequences
- Short-term cost to refactor and parity-test.
- Adds dependency on Node/Vite build for development.
- Unlocks CI gates and coverage, easing contributions.

## Options Considered
1. Keep inlined JS: simplest, but poor testability and scaling.
2. Partial extraction only of utilities: incremental, still leaves runtime monolith.
3. Full modularization (chosen): clear boundaries and testing surface.

## Implementation Notes
- Create `src/core/{geometry.ts,signal.ts,mobility.ts,fsm.ts,sim.ts}` and `src/ui/{render.ts,controls.ts}`.
- `src/main.ts` boots `createSim()` and binds to DOM.
- Preserve behavior parity with a checklist derived from `ARCHITECTURE.md`.

