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

## Agentic Roles Demo

This repo includes a lightweight coordinator and role-based agent templates.

- Coordinator template: `agentic/templates/coordinator.yaml`
- Specialist templates: `agentic/templates/specialists.yaml`
- Runtime: `agentic/demo.js`

Run demo:
```bash
npm install
npm run agents:demo -- "Generate meta templates for defined agentic roles"
```

The demo will:
- Spawn role-based agents (domain specialist, reviewer, evaluator)
- Execute a simple pipeline (analysis → review → evaluation)
- Print a JSON report including steps and a final verdict

## Notes
- The runtime logic is currently inlined in `3gpp_simulator.html`. TypeScript files in the repo define models and serve as references for a future modular build.
