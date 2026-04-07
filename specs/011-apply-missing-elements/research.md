# Research: Feature 011 — Apply Missing MUI-Aligned Components

**Branch**: `011-apply-missing-elements`  
**Generated**: 2026-04-06 by speckit.plan  
**Status**: Final — all unknowns resolved

---

## Decision 1: Accordion Discriminated Union Pattern

**Unknown**: How to expose two mutually exclusive TypeScript prop shapes (data-driven vs composable) for `Accordion` without breaking the existing API.

### Alternatives Considered

| Option | Approach | Verdict |
|--------|----------|---------|
| A | Overloaded function signatures (`function Accordion(props: DataProps): JSX.Element; function Accordion(props: ComposableProps): JSX.Element`) | Rejected — overloads require separate declarations but TypeScript collapses them; behavior divergence hard to enforce |
| B | Discriminated union via explicit `mode: 'data' \| 'composable'` prop | Rejected — adds new required prop not present in MUI API; changes existing call sites |
| C | Discriminated union via mutually exclusive required fields: existing shape requires `title: string`; composable shape marks `title` as `never` and requires JSX children via `AccordionSummary` | **Chosen** |

### Decision

```typescript
// Data-driven (existing — backward-compatible)
interface AccordionDataProps extends ViewProps {
  title: string;
  children?: React.ReactNode;   // body content
  expanded?: boolean;
  onToggle?: (v: boolean) => void;
  disabled?: boolean;
  // ...existing props
  // Composable sub-components MUST NOT be provided alongside title:
  // (enforced by: AccordionSummary/Details/Actions are not valid children
  //  in the data-driven branch — context will not connect)
}

// Composable (new)
interface AccordionComposableProps extends ViewProps {
  title?: never;                // statically forbids mixing
  children: React.ReactNode;   // expects AccordionSummary + AccordionDetails
  expanded?: boolean;
  defaultExpanded?: boolean;
  onChange?: (event: unknown, expanded: boolean) => void;
  disabled?: boolean;
  // ...
}

export type AccordionProps = AccordionDataProps | AccordionComposableProps;
```

**Rationale**: `title?: never` on the composable branch causes a TypeScript compile error if `title` is provided. The existing shape is unchanged. Runtime detection: if `typeof props.title === 'string'` → data-driven branch; otherwise → composable branch. This is the minimal runtime check needed to render the correct sub-tree.

---

## Decision 2: React Context Topology for Sub-component Communication

**Unknown**: How each parent component shares expanded/active state with composable children without prop drilling.

### Pattern (consistent with existing codebase)

The existing `RadioButton/RadioButtonContext.ts` shows the established pattern — a `React.createContext` with a Provider on the parent and `useContext` on each child. Feature 011 adds three more internal contexts:

| Context | Parent | Children | Shape |
|---------|--------|----------|-------|
| `AccordionContext` | `Accordion` (composable branch) | `AccordionSummary`, `AccordionDetails`, `AccordionActions` | `{ isExpanded: boolean; toggle: () => void; disabled: boolean }` |
| `StepperContext` | `Stepper` | `Step`, `StepLabel`, `StepContent`, `StepConnector` | `{ activeStep: number; orientation: 'horizontal' \| 'vertical'; totalSteps: number }` |
| `RadioGroupContext` | `RadioGroup` | `Radio` | `{ value: string \| undefined; onChange: (v: string) => void; name?: string; disabled?: boolean; row?: boolean }` |

**Decision**: All contexts are internal (`context.ts` files in each component directory), NOT exported from `src/index.ts`. This matches the existing `RadioButtonContext.ts` pattern.

**Alternatives Rejected**: Render props / cloneElement injection — too fragile; explicit prop drilling — defeats composability purpose.

---

## Decision 3: `useMediaQuery` Reactive Implementation

**Unknown**: How to implement a reactive breakpoint hook that re-renders on dimension change with no new dependencies.

### Alternatives Considered

| Option | Approach | Verdict |
|--------|----------|---------|
| A | `Dimensions.addEventListener` subscription | Works but legacy-style; manual cleanup required |
| B | `useWindowDimensions()` from react-native (already peer dep) | **Chosen** — declarative, automatically re-renders on change, Fabric-compatible, zero new deps |
| C | External library (e.g., `react-native-responsive-screen`) | Rejected — adds peer dep; overkill for min/max-width only |

### Decision

```typescript
export function useMediaQuery(query: string): boolean {
  const { width } = useWindowDimensions();   // re-renders on resize
  const { theme }  = useTheme();             // reads breakpoints
  return evaluateQuery(query, width, theme.breakpoints.values);
}
```

**Query parsing** (raw string sub-set — supports `min-width` and `max-width` only):
```text
(min-width: Npx)  → width >= N
(max-width: Npx)  → width <= N
"xs" | "sm" | "md" | "lg" | "xl" → width >= breakpoints.values[key]
```
Regex: `/\((?:min|max)-width:\s*(\d+(?:\.\d+)?)px\)/`

**Rationale**: `useWindowDimensions()` is the standard RN 0.73 API for this use case. No external dependency needed. All five named breakpoints already defined in `theme.breakpoints.values`.

---

## Decision 4: RadioGroup API Alignment — `onChange` vs `onValueChange`

**Unknown**: The existing `RadioGroup` uses `onValueChange: (value: string) => void` (React Native Paper convention). Feature spec requires `onChange` (MUI convention).

### Decision

**Strategy**: Extend, don't replace.

The existing `RadioGroup` in `src/components/RadioButton/RadioGroup.tsx` is updated to:
1. Accept **both** `onChange` and `onValueChange` (call either that's provided)
2. Add `name?: string`, `defaultValue?: string`, `row?: boolean` props
3. Internal `RadioButtonContext` renamed to `RadioGroupContext` for clarity (keep re-export alias for backward compat)
4. Export `Radio` as alias for `RadioButton` from the `RadioButton` index

This approach means zero breaking changes — existing code using `onValueChange` still works.

**Alternatives Rejected**: Creating a new `Radio/` directory with its own `RadioGroup` — creates confusion and duplicate context; rejected in favour of extending the existing component.

---

## Decision 5: ListSubheader — No Sticky Positioning

**Unknown**: Should `ListSubheader` implement scroll-sticky behavior?

### Decision

**Non-sticky label only.** RN has no universal sticky API — `SectionList` offers sticky section headers via `renderSectionHeader`, but this is opt-in at the list-structure level and cannot be transparently added inside a composable `<List>` child.

**Implementation**: `ListSubheader` renders as `View` + `Text` with MD3 `labelSmall` typography style, `overline`-style letter-spacing, and appropriate left padding. Position is static in the flex flow.

**MD3 reference**: m3.material.io/components/lists (subheader is defined as a category label, not a sticky element; stickiness is layout-level, not component-level).

---

## Decision 6: Collapse Component as Foundation for AccordionDetails

**Unknown**: Should AccordionDetails use the existing `Collapse` component or reimplement animation?

### Decision

**Use existing `Collapse` component** — consistent with FR-011.

`Collapse` signature (verified from source):
```typescript
<Collapse in={boolean} timeout={number} orientation="vertical" unmountOnExit>
  {children}
</Collapse>
```

`AccordionDetails` wraps `Collapse` with `in={isExpanded}` (from `AccordionContext`). The existing `Accordion` component has its OWN animation via Reanimated `useSharedValue` — for the composable branch, we delegate to `Collapse` to avoid duplicating animation logic.

---

## Decision 7: Stepper — Data-Driven vs Composable Co-existence

**Unknown**: How does the existing `Stepper` (data-driven `steps: StepItem[]` array) coexist with the new composable `<Step>` children API?

### Decision

**Detection by children**: If `Stepper` receives `children` (React nodes), it renders them directly as composable steps. If it receives a `steps` array, it renders data-driven. This is identical to the pattern used by `Accordion` above — a runtime branch in the render function, enforced at the TypeScript level by discriminated union.

```typescript
type StepperDataProps = {
  steps: StepItem[];
  activeStep: number;
  // ...existing
  children?: never;
};

type StepperComposableProps = {
  steps?: never;
  activeStep: number;
  children: React.ReactNode;
  // ...
};

export type StepperProps = StepperDataProps | StepperComposableProps;
```

`StepperContext` is created in both modes — composable children read `activeStep` and `orientation` from context.

---

## Summary of All Decisions

| # | Domain | Decision |
|---|--------|----------|
| 1 | Accordion API | Discriminated union via `title?: never` in composable branch; runtime `typeof props.title` check |
| 2 | Context topology | Internal contexts; AccordionContext / StepperContext / RadioGroupContext — all unexported |
| 3 | useMediaQuery | `useWindowDimensions()` + regex parser for min/max-width; named breakpoints from theme |
| 4 | RadioGroup API | Extend existing component: add `onChange`, `name`, `defaultValue`, `row`; `onValueChange` kept for compat |
| 5 | ListSubheader | Non-sticky static label; no scroll awareness |
| 6 | AccordionDetails animation | Delegate to existing `Collapse` component |
| 7 | Stepper co-existence | Discriminated union: `steps` array vs `Step` children |

All NEEDS CLARIFICATION items resolved. No external research blocks remain.
