## Testing Strategy

### Frameworks
- Unit: Vitest
- DOM: @testing-library/dom with jsdom or happy-dom

### Unit Test Targets
- Geometry: toroidal distance, intersection checks, obstruction counting, wrapped paths
- Signal: coverage grid generation, UE signal info with obstructions and scaling
- Scheduling: proportional sharing and capacity scaling
- Selection: `findBest` behavior and gNB bias
- FSM: RACH → RRC Setup → NAS Attach → HO transitions and timers

### Integration Scenarios
- Attach and data transfer within single gNB
- HO to a better gNB; HO to NTN when gNB unavailable; RLF and recovery
- NTN visibility changes affecting feeder capacity

### Coverage
- Line and branch coverage thresholds: 80% for utils, 70% overall initially

### CI Gates
- Run tests on PR; block merge on failures or coverage regressions

