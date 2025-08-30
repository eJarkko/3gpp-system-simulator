# 3GPP System Simulator

An interactive canvas-based simulator that illustrates 3GPP RAN and NTN behaviors: UE mobility, coverage, access, HO, and throughput sharing.

## Get Started

Prerequisites: Node.js (LTS recommended)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Open `3gpp_simulator.html` directly in a browser for the current inlined build, or use Vite for local hosting:
   ```bash
   npm run dev
   ```
   Then open the printed local URL in your browser.

## Documentation
- Architecture overview: see `ARCHITECTURE.md`
- Workplan and roles: see `docs/WORKPLAN.md`, `docs/TEAM_ROLES.md`
- Linear workflow and backlog import: see `docs/linear/README.md`, `docs/linear/backlog.csv`
- ADRs: see `docs/adr/` (e.g., `0001-adopt-modular-ts-build.md`)

## Notes
- The runtime logic is currently inlined in `3gpp_simulator.html`. TypeScript files in the repo define models and serve as references for a future modular build.
