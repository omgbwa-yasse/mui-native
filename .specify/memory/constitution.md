<!--
SYNC IMPACT REPORT
==================
Version change    : (none) → 1.0.0  [initial ratification]
Modified principles: N/A — all sections newly created from template placeholders
Added sections    :
  - Core Principles (6 principles)
  - Technology Stack & Constraints
  - Development Workflow & Quality Gates
  - Governance
Removed sections  : N/A (template placeholders replaced)
Templates requiring updates:
  - .specify/templates/plan-template.md  ✅ constitution-check gates aligned
  - .specify/templates/spec-template.md  ✅ user-story acceptance criteria aligned
  - .specify/templates/tasks-template.md ✅ task categories reflect component/token/a11y phases
Deferred TODOs    : none
-->

# RN-Material Constitution

## Core Principles

### I. Component Fidelity (NON-NEGOTIABLE)

Every component MUST be a faithful implementation of its Material Design 3 specification
as documented at https://m3.material.io, cross-referenced with MUI v6 behavior at
https://mui.com. Deviations from MD3 visual or interaction specs are only permitted when
the React Native platform physically cannot support them (e.g., web-only CSS features),
and MUST be documented with a `// RN-DEVIATION:` comment explaining the constraint.

- Component APIs MUST mirror MUI v6 prop names and semantics wherever applicable.
- Visual properties (color, spacing, shape, elevation) MUST match MD3 tokens exactly.
- No ad-hoc styling that bypasses the design-token system is permitted.

### II. Design Token Supremacy (NON-NEGOTIABLE)

All visual properties — color, typography, spacing, shape, elevation, motion duration —
MUST be derived from design tokens defined in `src/tokens/`. Hardcoded values (e.g.,
`'#1976D2'`, `16`, `'rgba(0,0,0,0.5)'`) MUST NOT appear in component files.

- Token files are the single source of truth; direct color/size literals are a build error.
- Dynamic Color tokens (MD3 color roles: `primary`, `onPrimary`, `surface`, etc.) MUST be
  consumed via the `useTheme()` hook; never accessed through static imports in render paths.
- Adding a new token MUST go through a spec review before implementation.

**Documented exceptions** (require explicit spec-level justification):

- **No-provider fallback color** (C2): A component whose spec mandates graceful standalone
  rendering outside `ThemeProvider` (e.g., FR-009) MAY use `'#000000'` as a literal fallback
  color. The literal MUST be isolated in a named constant (e.g., `FALLBACK_COLOR`), annotated
  with `// CONSTITUTION-EXCEPTION: no-provider fallback — see <FR-ref>`, and a `__DEV__`
  warning MUST be emitted to alert developers. The exception MUST be documented in the feature
  spec, research decisions, and the plan's constitution check.

- **`useContext(ThemeContext)` instead of `useTheme()`** (C1): When a component must not throw
  outside `ThemeProvider`, it MAY call `useContext(ThemeContext)` directly (which returns `null`
  safely) rather than `useTheme()`. The null branch MUST implement the no-provider fallback above.
  This is not an exemption from Theme-First Architecture (Principle III); the theme is still
  consumed when present.

### III. Theme-First Architecture

Every component MUST consume the framework's `ThemeProvider` context. Static light/dark
variants are both REQUIRED; dynamic color (Material You) SHOULD be supported where the
host app provides a seed color.

- Components MUST NOT store local color state; all palette decisions come from the theme.
- Theme switching (light ↔ dark) MUST require zero code changes in consuming apps.
- Platform overrides (`ios`/`android` within a theme) are allowed and encouraged when
  platform defaults differ from MD3 defaults.

### IV. Cross-Platform Parity

Every component MUST pass a visual and behavioral acceptance test on both iOS and Android
before being considered complete. Pixel-perfect parity is the goal; documented deviations
are acceptable only when justified by platform guidelines (e.g., haptics differ by OS).

- A component shipped for one platform only is considered a partial implementation and
  MUST be labelled `@platform ios` or `@platform android` in its JSDoc header.
- Storybook stories MUST be runnable on both platforms via Expo Go or bare workflow.

### V. Accessibility by Default (NON-NEGOTIABLE)

Every interactive component MUST satisfy WCAG 2.1 AA contrast requirements and React
Native accessibility semantics before it can be merged into `main`.

- `accessibilityLabel`, `accessibilityRole`, and `accessibilityState` MUST be set on all
  interactive primitives.
- Touch targets MUST be at least 48×48 dp per MD3 and WCAG guidelines.
- Components MUST pass an automated accessibility audit (e.g., `@testing-library/react-native`
  `toBeAccessible`) as part of the test suite.
- Animations MUST respect the `reduceMotion` accessibility preference.

### VI. Performance Contract

Animations MUST use `react-native-reanimated` worklets to avoid blocking the JS thread.
Components MUST NOT trigger unnecessary re-renders when unrelated theme values change.

- Ripple / press feedback MUST be implemented with `react-native-gesture-handler` for
  frame-accurate gesture recognition.
- Components MUST be memoized (`React.memo`) where prop changes are infrequent.
- Bundle impact: adding a new component MUST NOT increase the library's minified bundle
  by more than 10 kB without a documented justification.

## Technology Stack & Constraints

**Language**: TypeScript 5.x — strict mode (`"strict": true`) is mandatory across all
source files.

**Core runtime dependencies**:
- `react-native` ≥ 0.73
- `react-native-reanimated` ≥ 3.x
- `react-native-gesture-handler` ≥ 2.x

**Optional peer dependencies** (consumers opt-in):
- `react-native-vector-icons` or `@expo/vector-icons` for the Icon system
- `react-native-safe-area-context` for layout-aware containers

**Prohibited patterns**:
- `StyleSheet.create` with static colors (violates Token Supremacy)
- Inline `style={{ color: '#...' }}` in JSX (same violation)
- `Platform.OS === 'ios' ? <ComponentA/> : <ComponentB/>` structural divergence inside
  a single component file — use platform extension files (`.ios.tsx`, `.android.tsx`)
  for genuine platform splits

**Testing stack**: Jest + `@testing-library/react-native`; Storybook for visual review.

## Development Workflow & Quality Gates

**Branch strategy**: Feature branches off `main`; branch names follow `###-feature-name`
sequential numbering (managed by speckit).

**Definition of Done** — a component is releasable when ALL of the following pass:

1. Visual spec review against MD3 reference screenshots.
2. Unit tests cover all prop variants and state transitions.
3. Accessibility audit passes (`toBeAccessible` assertions present).
4. Storybook story exists and renders on both iOS and Android.
5. Token usage verified: `grep -r '#[0-9A-Fa-f]' src/components/<name>` returns zero hits.
6. Performance: no JS-thread animation confirmed via Reanimated worklet audit.
7. PR approved by at least one other contributor.

**Breaking-change policy**: Any change that alters a public component prop name, removes a
prop, or changes observable layout/behavior MUST bump the library's MAJOR version and
include a migration guide entry in `docs/migrations/`.

## Governance

This constitution supersedes all individual component READMEs, PR descriptions, and ad-hoc
conventions when conflicts arise. Amendments require:

1. A written proposal describing the change, rationale, and impact assessment.
2. Review and approval from at least two maintainers.
3. A migration plan for any affected components or downstream consumers.
4. Version bump per semantic versioning rules (see header of this document).

All PRs MUST include a "Constitution Check" section confirming compliance with the six
Core Principles. Non-compliant PRs MUST NOT be merged until compliance is documented.

The `speckit` toolchain is the authoritative source for spec, plan, and task generation;
`.specify/memory/constitution.md` is the root governance document that all generated
artifacts MUST reference.

**Version**: 1.0.0 | **Ratified**: 2026-04-02 | **Last Amended**: 2026-04-02
