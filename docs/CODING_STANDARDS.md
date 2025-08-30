## Coding Standards

### Languages and Modules
- Prefer TypeScript for all new code. Avoid inlining logic in HTML; use ES modules under `src/`.
- Keep modules small and cohesive: geometry, signal, mobility, FSM, rendering, controls.

### Naming
- Descriptive names; avoid abbreviations. Functions are verbs; data types/objects are nouns.

### Error Handling
- Use guard clauses; avoid deep nesting. Handle edge cases explicitly.
- Do not swallow errors; log meaningfully or propagate.

### Style Tools
- ESLint (typescript-eslint) and Prettier. Enforce on CI. Run format on staged files.

### Tests
- Unit tests for pure modules. Integration tests for flows. Keep tests deterministic.

### Performance
- Precompute and cache. Avoid per-frame allocations in hot paths. O(n log n) preferred over O(n^2).

### Docs
- Update `ARCHITECTURE.md` when modules/interfaces change. Add docstrings to non-obvious logic.

