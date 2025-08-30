## 3GPP System Simulator – High-Level Architecture

This document introduces the current architecture of the 3GPP simulator codebase. It explains the domain model, data structures, main algorithms, UI composition, and extension points to give new contributors a solid grasp for next steps.

### Goals and Scope
- Illustrate basic RAN and NTN behavior for learning and experimentation
- Demonstrate UE mobility, coverage, access procedures, handover, and throughput sharing
- Provide an interactive canvas-based visualization with minimal build/tooling

### Technology Overview
- Language: TypeScript types for models; runtime executed as inlined JavaScript within `3gpp_simulator.html`
- Tooling: Vite is scaffolded but not actively used for the inlined HTML build; no test framework currently configured
- Rendering: HTML5 Canvas; single-page app structure inside `3gpp_simulator.html`

### Top-Level Structure
- `3gpp_simulator.html`: Main UI, inlined simulator logic and rendering
- `index.tsx`: TypeScript reference for shapes of `window.sim` and functions (non-executed)
- `types.ts`, `ue.ts`, `gnb.ts`, `satellite.ts`, `groundstation.ts`, `base_station.ts`, `map_elements.ts`: TypeScript model interfaces
- `style.css`: UI styling
- `vite.config.ts`, `package.json`, `tsconfig.json`: Project scaffold

### Runtime Composition
At runtime, the simulator is a global `window.sim` object defined in `3gpp_simulator.html` with these key members:
- State collections
  - `bs: Map<number, GNB>`: gNB cells
  - `sats: Satellite[]`: NTN satellites
  - `groundStations: Map<number, GroundStation>`: feeder link endpoints
  - `ues: Map<number, UE>`: user equipment
  - `blocks: Block[]`, `streets: Street[]`: city grid and road intersections
  - `msgs: Array<...>` and `log: Array<...>`: signaling queue and UI log
  - `cellTput: Map<number, { history: {t, v}[] }>`: per-cell throughput histories
- Simulation control
  - `running`, `time`, `speed`, `scanInterval`
  - `gnbSize`, `ntnSize` (coverage scaling), `scaleX/scaleY` (canvas scaling)
  - Canvas handles: `cv`, `ctx`, `gnbpcv/gnbpctx`, `uepcv/uepctx`
- Core operations
  - `init()`: initialize canvases, grid, topology, entities, UI listeners
  - `step()`: advance time, move UEs/satellites, execute procedures, schedule resources, update metrics, render
  - `render()`: draw map, coverage overlays, entities, link lines, plots, and dashboard stats
  - `reset()`, `toggle()`, `forceHO()`
  - `recalculateOverlays()`: recompute gNB coverage heatmaps and no-service grid
  - `updateSatelliteFeeders()`: maintain satellite-to-ground-station feeder links
  - `updateTputAndQuality()`: compute UE link quality, proportional sharing, and histories
  - `scanForNetworks()`: periodic IDLE scans triggering access
  - `checkRLF()`, `checkHO()`, `completeHO()`: mobility and robustness
  - `rach()`, `process()`, `send()`: simplified signaling state machine

### Configuration and Utilities
- `simulationCoreConfig`
  - Geometry: `REF_WIDTH`, `REF_HEIGHT`, `REF_GRID_BLOCK_SIZE`, `STREET_WIDTH`
  - Coverage: `COVERAGE_GRID_RESOLUTION`, `GNB_COVERAGE_ZONES`, `NTN_COVERAGE_ZONES`, radius scaling via `gnbSize`/`ntnSize`
  - Capacity: `GNB_CAPACITY`, `GS_FEEDER_CAPACITY`
  - Preference: `GNB_PREFERENCE_DB` to bias cell selection toward gNBs
  - Mobility: `UE_TURN_PROBABILITY_AT_INTERSECTION`
  - Logging: `LOG_MAX_SIZE`
- `simulationGeometryUtils`
  - Toroidal distance for wraparound world
  - Line/rectangle intersection; path wrapping and obstruction counting
- `simulationSignalUtils`
  - `generateCoverageGrid(cell, scale, config, toroidalDist)`: precompute gNB heatmaps
  - `getUeSignalInfo(pos, cell, simState)`: link-quality multiplier and usability with obstruction loss

### Domain Model (Type Definitions)
- `UE`
  - Kinematics: `pos`, `dir`, `speed`; `move(dt)` supplied at creation
  - Connection: `cell`, `cell_obj`, and signaling `sm` states: `rrc`, `nas`, `procs`
  - Metrics: `tput`, `curTput`, `qualityHistory`, `currentMultiplier`, grid metrics: `cellsPassed/Connected/Signalling/Searching`
  - Link map: `signalQualities: Map<cellId, {multiplier, isUsable}>`
- `GNB extends BaseStationShared`
  - `type: 'gnb'`, `coverageGrid: number[][]`
- `Satellite extends BaseStationShared`
  - `type: 'ntn'`, `vel`, `phase`, `feederLinks`, `maxFeederLinks`, `vis()`, optional `coverageGrid`
- `GroundStation`
  - `id`, `pos`, `type: 'gs'`
- `BaseStationShared`
  - `id`, `pos`, `pwr`, `sm: { ues: Map<number, any> }`
- `Block`, `Street`, `Position`

### Algorithms and Logic
- Movement: `ueMoveFn(ue, dt, streets)` performs continuous motion with wraparound; probabilistic turning at intersections
- Satellite motion: circular/elliptical progression by `phase` with velocity `vel`
- Visibility: `satelliteIsVisibleFn` checks boundaries of the reference world
- Signal quality:
  - gNB: sampled from precomputed `coverageGrid` (scaled by `gnbSize`)
  - NTN: radial zones (scaled by `ntnSize`)
  - Obstructions: number of intersecting `blocks` segments reduces multiplier (0.4 loss per obstruction)
- Cell selection: `findBest(ue_or_pos, isLightweight)`
  - Computes best candidate among visible cells using multiplier and `GNB_PREFERENCE_DB`
  - Lightweight mode for coverage/no-service visualization
- Access and procedures: `send()`, `rach()`, `process()`
  - Enqueues messages with category-derived delay
  - Processes queue to drive: RACH, RRC Setup, NAS Attach, RRC Reconfiguration (for HO)
- RLF and HO:
  - `checkRLF()`: drop connection if current serving cell becomes unusable
  - `checkHO()`: triggers HO if a candidate exceeds current by threshold (+0.2)
  - `completeHO()` moves UE context between cells and logs
- Scheduling and throughput:
  - Capacity: `GNB_CAPACITY` per gNB; NTN capacity equals `feederLinks.length * GS_FEEDER_CAPACITY`
  - UEs with active signaling procedures do not consume user-plane throughput
  - Proportional sharing across connected UEs according to their current multiplier; scale to capacity if sum exceeds capacity
  - Time-series histories are maintained for plots and dashboard

### Rendering and UI
- Map canvas draws:
  - Street grid, city blocks, gNB coverage heatmaps, NTN zone borders, ground stations
  - UEs and serving-link overlay (color-coded by technology and obstruction)
- Plots:
  - Cell Throughput panel: small-multiples throughput over last 60s
  - UE Throughput & Signal Quality: background bands by quality and UE throughput line
- Dashboard and Controls:
  - Counts: UEs, active cells, RRC Connected, pending messages
  - Buttons: Start/Stop, Add UE, Reset
  - Sliders: Speed, Scan interval, gNB size, NTN size, Turn probability

### Execution Flow
1) `window.load` → `sim.init()`
2) Create topology (gNBs, GSs, satellites), precompute coverage and no-service grid
3) Seed UEs and start render loop on Start/Toggle
4) Each frame via `step()`:
   - Move entities → update feeders → process signaling → update quality & scheduling → check RLF/HO → scans → update metrics → render

### Known Limitations
- Inlined HTML/JS is the single runtime; TypeScript files provide types only, no build-integration
- No automated tests; logic is validated via visual behavior
- Simplified PHY/RRC/NAS procedures and channel models; not faithful to timing or messaging granularity of full 3GPP stacks

### Extension Points and Ideas
- Extract runtime to TypeScript modules and compile with Vite; keep HTML only as UI host
- Introduce configuration profiles and scenario files (JSON) for topologies
- Add pluggable propagation models and mobility models
- Implement richer RRC/NAS procedures (e.g., timers, backoff, DRX) and HO policies
- Add metrics export and headless simulation mode for CI

### Interfaces and Boundaries
- UI ↔ Core: DOM event listeners update `sim` params; rendering reads `sim` state
- Core ↔ Models: Core functions consume the TypeScript interfaces (currently mirrored as JS objects)
- Core ↔ Utilities: Geometry/signal helper modules within the HTML script

