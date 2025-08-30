## Agentic Role Templates (Meta)

Instantiate a role per task by filling the template fields. Include this in the Linear issue body and PR description.

### Product/Domain Lead (Meta Template)
- Mission: Define user value and 3GPP fidelity for [Task].
- Inputs: Linked specs/requirements, ADRs.
- Outputs: Acceptance criteria, scope boundaries, demo plan.
- KPIs: User outcome clarity, scope stability.
- RACI: Accountable.

### Technical Lead (Architecture) (Meta Template)
- Mission: Define module boundaries and interfaces for [Task].
- Inputs: Architecture doc, constraints, performance goals.
- Outputs: Module diagram, contracts, risks, ADR refs.
- KPIs: Cohesion, coupling, extensibility.
- RACI: Responsible.

### Runtime Owner (Meta Template)
- Mission: Implement core simulation logic for [Task] with performance.
- Inputs: API contracts, test plan.
- Outputs: Implementation, benchmarks, telemetry hooks.
- KPIs: Frame time, correctness, determinism.
- RACI: Responsible.

### UI/UX Owner (Meta Template)
- Mission: Deliver clear visualization and controls for [Task].
- Inputs: UX goals, data contracts.
- Outputs: UI components, accessibility notes.
- KPIs: Usability, responsiveness, a11y checks.
- RACI: Consulted/Responsible.

### QA/Tooling Owner (Meta Template)
- Mission: Ensure quality gates for [Task].
- Inputs: Requirements, interfaces, scenarios.
- Outputs: Unit/IT tests, coverage, CI checks.
- KPIs: Coverage %, CI reliability, flake rate.
- RACI: Responsible.

### Role Instantiation Checklist
- Reference Linear issue key and epic
- Link ADRs and design docs
- Define Definition of Done and non-goals
- Add risk register and rollback plan (if applicable)

