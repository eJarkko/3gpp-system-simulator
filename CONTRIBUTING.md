## Contributing Guidelines

Thank you for your interest in improving the 3GPP System Simulator. This guide outlines the workflow and quality bar.

### Development Workflow
1. Create an issue describing the change (feature/bug/doc). Link related specs or references.
2. Create a feature branch from `main`.
3. Implement with tests (unit/integration) when applicable.
4. Run lint, type-check, tests locally; ensure CI passes.
5. Open a PR with a clear description, screenshots/gifs for UI, and risk/rollout notes.

### Coding Standards
- Prefer TypeScript and modular code. Avoid inlining logic in HTML when feasible.
- Follow the code style described in `ARCHITECTURE.md` and repository ESLint/Prettier configs (to be added).
- Name things descriptively; avoid abbreviations. Keep functions short and cohesive.

### Commit and PR Hygiene
- Commits: small, descriptive; present tense (e.g., "Add HO threshold control").
- PRs: keep scope focused; include testing instructions and acceptance criteria.

### Documentation
- Update `ARCHITECTURE.md` for architecture-affecting changes.
- Update `README.md` for usage or operational changes.
- Add or update inline docstrings for non-obvious logic.

### Tests
- Unit tests for pure utilities and algorithms (geometry, signal, scheduling, selection, FSM transitions).
- Integration tests for end-to-end scenarios (UE attach, HO, RLF recovery, NTN visibility).

### Performance and UX
- Avoid O(n^2) in per-frame paths; precompute where possible.
- Ensure UI remains responsive at target UE counts; throttle rendering if necessary.

### Security and Licensing
- Do not include sensitive keys or credentials in code.
- Maintain license headers where applicable.

