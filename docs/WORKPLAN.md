## Enhancement Workplan (Dynamic Waterfall)

This plan evolves from high-level to specific steps. Iteration is allowed when plan changes are detected. Dependencies are explicit. We apply SDLC rigor (requirements → design → implementation → test → release).

### Phase 0: Baseline and Governance
- Deliverables:
  - Confirmed baseline docs: `ARCHITECTURE.md`, `README.md`, `CONTRIBUTING.md`
  - Repo governance: `CODEOWNERS`, issue/PR templates
- Dependencies: none

### Phase 1: Modularization and Build System
- Goals: Move inlined runtime from `3gpp_simulator.html` into TypeScript modules; build with Vite
- Steps:
  1. Create `src/` with modules: `core/sim.ts`, `core/geometry.ts`, `core/signal.ts`, `core/mobility.ts`, `core/fsm.ts`, `ui/render.ts`, `ui/controls.ts`
  2. Export `createSim()` to instantiate and bind to DOM
  3. Wire Vite entry `index.html` and `src/main.ts`
  4. Preserve behavior parity via manual verification checklist
- Dependencies: Phase 0

### Phase 2: Type Safety and Linting
- Goals: Enforce TS across core; add ESLint + Prettier; strict `tsconfig`
- Steps:
  1. Add ESLint config (typescript, import, prettier)
  2. Add Prettier config; format script
  3. Enable `noImplicitAny`, `strictNullChecks`, and module boundaries
  4. Fix type errors incrementally
- Dependencies: Phase 1 (module presence)

### Phase 3: Testing (UT/IT)
- Goals: Establish robust tests for geometry, signal, scheduling, selection, FSM
- Steps:
  1. Add `vitest` and `@testing-library/dom` for DOM bits; `happy-dom` or `jsdom`
  2. Unit tests for utilities (geometry, signal, scheduling)
  3. FSM tests for RACH/RRC/NAS/HO flows
  4. Integration tests for scenarios (attach → data → HO → RLF recovery)
  5. Coverage reporting
- Dependencies: Phase 1, Phase 2

### Phase 4: CI/CD
- Goals: Github Actions workflow: install, build, lint, test, coverage, preview
- Steps:
  1. Add `ci.yml` workflow with Node matrix
  2. Cache deps; collect coverage artifact
  3. Upload preview build (Pages or artifact)
- Dependencies: Phase 3

### Phase 5: Features and Models
- Candidates:
  - Config profiles and scenario JSON
  - More realistic propagation and mobility models
  - HO policies, RLF timers, DRX
  - Metrics export and headless run for CI
- Dependencies: Phases 1–4

### Task Template and Rules
- Use `.github/ISSUE_TEMPLATE` for feature/bug/task
- Definition of Done:
  - Code + tests + docs updated
  - Lint/type-check/test pass locally and in CI
  - No performance regressions in target scenarios

### Team Roles
- Product/Domain Lead: owns roadmap, 3GPP fidelity, acceptance criteria
- Tech Lead (Architecture): owns modularization, API boundaries, performance
- Runtime Owner: core simulation loop, FSM, scheduling
- UI/UX Owner: rendering, controls, dashboards
- QA/Tooling Owner: tests, CI, coverage, linting, releases

### Dependencies Matrix (examples)
- Phase 3 depends on Phase 1 (modules) and Phase 2 (stable types)
- CI setup depends on tests existing (Phase 3)
- Feature work should branch after Phase 1–3 to avoid rework

### Milestones and Checkpoints
- M1 (2 weeks): Phases 0–1 complete, parity demo
- M2 (1–2 weeks): Phase 2 complete, zero-TS-errors, lint clean
- M3 (2 weeks): Phase 3 complete, 70%+ coverage on core utils/FSM
- M4 (1 week): Phase 4 live, green CI on main
- M5 (ongoing): Phase 5 features prioritized by domain lead

