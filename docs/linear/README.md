## Linear Workflow for 3GPP System Simulator

### Concepts
- Teams/Projects: Use a single project "3GPP Simulator" with cycles disabled initially.
- Views: Roadmap for epics; Board for tasks; Issues list for backlog grooming.

### Backlog Import
Use `backlog.csv` to seed the initial epics and issues. In Linear: Import → CSV → map columns.

### Labels
- phase:0-baseline, phase:1-modularization, phase:2-type-safety, phase:3-testing, phase:4-ci, phase:5-features
- area:runtime, area:ui, area:geometry, area:signal, area:fsm, area:tooling
- role:product, role:arch, role:runtime, role:uiux, role:qa

### Workflow
1. Create an Epic per Phase (Phase 1–5) and break down tasks from `docs/WORKPLAN.md`.
2. Assign roles by using role labels and CODEOWNERS as references.
3. For each new task, link corresponding ADR if architectural.
4. Branch naming: `feature/<issue-key>-short-title` off `develop`.
5. PR: link to Linear issue key in title and description.

### CSV Notes
Map columns: `Title`, `Description`, `Priority`, `Label`, `Project`, `Assignee` (optional), `Parent` (Epic title), `Status`.

