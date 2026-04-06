# Research: 3 Usage Examples for All Components

**Feature Branch**: `008-3-examples-all-components`  
**Date**: 2026-04-05  
**Status**: Complete — all unknowns resolved

---

## Decision 1: ExampleConfig Interface Extension (`code: string`)

**Problem**: `ExampleConfig` in `apps/showcase/src/catalogue/types.ts` currently has `label`,
`description`, and `render`. FR-012 requires that every example display its JSX usage snippet
above the rendered preview with syntax highlighting. There is no field for this snippet.

**Decision**: Add a required `code: string` field to `ExampleConfig`.

```typescript
export interface ExampleConfig {
  label: string;
  description: string | null;
  code: string;          // ← new required field (JSX snippet for CodeBlock)
  render: () => React.ReactElement;
}
```

**Language setting**: `'tsx'` is passed to `CodeBlock` for all example snippets to get
correct JSX/TSX syntax highlighting via the existing `react-native-syntax-highlighter`.

**Rationale**:
- The `CodeBlock` component already exists (`apps/showcase/src/components/CodeBlock.tsx`)
  and uses `react-native-syntax-highlighter` with `atomOneDark` theme — identical to the
  source-code display on the same detail page.
- A `code` field on the config keeps the snippet co-located with its `render` function,
  ensuring the two remain in sync when examples are edited.
- Making `code` required (not optional) enforces FR-012 at compile time — TypeScript strict
  mode will surface any missing snippets immediately.

**Migration for existing 15 examples**: Each existing `ExampleConfig` entry in `examples.tsx`
receives a minimum-viable `code` string stub (`code: ''`). This satisfies TypeScript
compilation without altering the behavioral contract (FR-009). Full snippets for those 15
entries are deferred to a companion task after this feature.

**Alternatives considered**:
- `code?: string` (optional) — TypeScript would not enforce FR-012; implementors could
  accidentally omit snippets; rejected in favour of a required field.
- Deriving the snippet from `render.toString()` — `Function.prototype.toString()` in
  Hermes/Metro produces unreliable, minified output at runtime; rejected.

---

## Decision 2: ExampleGallery Modification — CodeBlock per Example

**Problem**: `ExampleGallery.tsx` renders each `ExampleConfig` as: label → description →
preview. To satisfy FR-012, the code snippet must appear above the preview.

**Decision**: Insert `<CodeBlock code={example.code} language="tsx" />` between the
description area and the `<View style={styles.preview}>` in `ExampleGallery.tsx`. The block
is omitted when `code` is empty (the `CodeBlock` component already returns `null` when `code`
is falsy — confirmed from source).

**Updated render order within each example card:**
```
label
description (if non-null)
CodeBlock snippet  ← new position
rendered preview
```

**No new dependencies**: `CodeBlock` is already imported in `ComponentDetailScreen.tsx` and
exported from `apps/showcase/src/components/`. Only `ExampleGallery.tsx` needs updating.

**Rationale**:
- Placing the code above the preview matches real developer documentation conventions (MUI
  docs, Storybook, react-native.dev) where "here's the code → here's the result" is the
  expected reading order.
- The existing `CodeBlock` component handles `maxHeight: 320`, `ScrollView`, and
  `atomOneDark` theme already; no style work needed.

**CONSTITUTION-EXCEPTION**: `CodeBlock` uses `backgroundColor: '#282c34'` and
`atomOneDark` highlight colors. These are fixed color literals required for readable syntax
highlighting contrast (the `react-native-syntax-highlighter` library controls the color
palette; theme tokens cannot be injected). This is the same exception established in
feature 007 for the source-code `CodeBlock`. No action required for feature 008.

---

## Decision 3: Per-Category File Split

**Problem**: A single `examples.tsx` with 78 example tuples would exceed ~4 000–5 000 lines,
making it slow to edit, slow to review, and impractical to attribute changes per category.

**Decision**: The existing `examples.tsx` becomes a re-export barrel. Five new per-category
source files are introduced:

| File | Category | New tuples |
|------|----------|-----------|
| `examples.inputs.tsx` | INPUTS | 19 |
| `examples.dataDisplay.tsx` | DATA_DISPLAY | 15 |
| `examples.feedback.tsx` | FEEDBACK | 8 |
| `examples.navigation.tsx` | NAVIGATION | 7 |
| `examples.layout.tsx` | LAYOUT | 14 |

The 15 existing tuples in the original `examples.tsx` are migrated to their respective
per-category files. `examples.tsx` then becomes:

```typescript
export * from './examples.inputs';
export * from './examples.dataDisplay';
export * from './examples.feedback';
export * from './examples.navigation';
export * from './examples.layout';
```

**`registry.ts` is not modified**: it already imports named exports from `./examples`; the
barrel re-export makes all names available without changing the import surface.

**Rationale**:
- Each category file stays under ~800 lines (largest: INPUTS at 19 tuples)
- Git diffs are scoped to one category per PR phase
- No circular dependency risk (all files import only from `@mui-native` and React)

---

## Decision 4: Animation Component Trigger Pattern (Fade, Grow, Zoom, Slide, Collapse)

**Problem**: Fade, Grow, Zoom, Slide, and Collapse all use a boolean `in` prop to control
visibility. A static example with `in={true}` shows the visible state only — the animation
is never observable (FR-005 explicitly rejects this).

**Decision**: Each example uses a stateful wrapper containing a `useState(false)` boolean
that is passed as the `in` prop. Three examples per component follow this pattern:

- **Example 1** ("Toggle"): Simple `<Button onPress={() => setVisible(v => !v)}`
  toggle next to the animated content. This is the "pure demo" — shows both in and out
  transitions in isolation.
- **Example 2** (realistic trigger 1): A contextual use case — e.g., for Fade: a
  "Load More" button that fades in additional content; for Slide: a notification that
  slides in from the bottom.
- **Example 3** (realistic trigger 2): A second realistic use case — e.g., for Collapse:
  an accordion panel; for Zoom: a FAB that zooms in after a delay.

All 5 animation components share `TransitionBaseProps` (confirmed from source research):
- `in?: boolean` — visibility controller
- `timeout?: number | { enter: number; exit: number }` — default 300 ms
- `children: React.ReactElement` — single child required
- `mountOnEnter?: boolean`, `unmountOnExit?: boolean` — optional lifecycle control

**Alternatives considered**:
- Using `setInterval` to auto-toggle — animated but disorienting without user intent; rejected
- Pre-using `in={true}` frozen state — rejected by FR-005

---

## Decision 5: Complex Component Minimum Viable Data Shapes

Research confirmed the following minimum-viable data for complex components.
These structures will be used verbatim (or slightly extended) in the examples.

### DataGrid
Requires `rows: TRow[]` (each row MUST have `id`) + `columns: GridColDef[]`:

```typescript
const rows = [
  { id: 1, name: 'Alice', role: 'Designer', age: 29 },
  { id: 2, name: 'Bob', role: 'Engineer', age: 34 },
  { id: 3, name: 'Carol', role: 'Manager', age: 41 },
];
const columns = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'role', headerName: 'Role', flex: 1 },
  { field: 'age', headerName: 'Age', type: 'number', width: 80 },
];
```

### DataTable
Requires `rows`, `columns` (with `key` not `field`), and `keyExtractor`:

```typescript
const rows = [
  { id: '1', product: 'Widget A', qty: 10, price: 9.99 },
  { id: '2', product: 'Widget B', qty: 5, price: 19.99 },
  { id: '3', product: 'Widget C', qty: 20, price: 4.99 },
];
const columns = [
  { key: 'product', label: 'Product', flex: 1 },
  { key: 'qty', label: 'Qty', numeric: true },
  { key: 'price', label: 'Price ($)', numeric: true },
];
```

### Charts (BarChart / LineChart)
`ChartSeries[]` with `data: ChartDataPoint[]`. Note: requires `react-native-gifted-charts`
(optional peer dep). Examples provide 5–6 data points:

```typescript
const salesData = [
  { name: 'Q1', data: [{ label: 'Jan', value: 40 }, { label: 'Feb', value: 55 }, { label: 'Mar', value: 61 }] },
  { name: 'Q2', data: [{ label: 'Apr', value: 70 }, { label: 'May', value: 85 }, { label: 'Jun', value: 78 }] },
];
```

### Timeline
Composite: `<Timeline>` > `<TimelineItem>` > `<TimelineSeparator>` + `<TimelineContent>`.
Needs at least 3 items for meaningful display.

### TreeView (SimpleTreeView)
`<SimpleTreeView>` wraps `<TreeItem itemId="..." label="...">` children. Parent `TreeItem`
contains nested `TreeItem` children for hierarchy.

### TransferList
**Stateful wrapper required** — `left`, `right`, and `onTransfer` must be controlled:

```typescript
const [left, setLeft] = React.useState([
  { id: '1', label: 'TypeScript' },
  { id: '2', label: 'React Native' },
  { id: '3', label: 'GraphQL' },
]);
const [right, setRight] = React.useState([
  { id: '4', label: 'Redux' },
]);
```

---

## Decision 6: Domain-Specific Synthetic Mock Data

### HumanizationScoreBar
Props: `fleschKincaidBefore: number`, `fleschKincaidAfter: number`, `maxScore?: number`.
Three examples: improvement, regression, and neutral/equal scores.

```typescript
// Example 1 — Improvement
<HumanizationScoreBar fleschKincaidBefore={42} fleschKincaidAfter={78} />

// Example 2 — Regression (score dropped)
<HumanizationScoreBar fleschKincaidBefore={85} fleschKincaidAfter={55} maxScore={100} />

// Example 3 — Near-perfect after
<HumanizationScoreBar fleschKincaidBefore={30} fleschKincaidAfter={92} maxScore={100} />
```

### InvitationStatusBadge
Shows all 4 statuses: `'active' | 'expired' | 'revoked' | 'converted'`.
Three examples cover: active, expired/revoked, and converted.

### WorkerAgentRow
Props: `workerId`, `sectionIndex`, `status` (`'pending' | 'running' | 'completed' | 'failed'`),
`progressPercent`, `label?`. Three examples: running in-progress, completed, and failed.

---

## Decision 7: Charts Peer Dependency — Graceful Fallback

`react-native-gifted-charts` is an optional peer dependency for the Charts component.
If the package is not installed, the component renders a fallback UI (confirmed from source).
The showcase `package.json` must list it as a direct dependency so examples render correctly.
This is added as a pre-requisite task (T005 equivalent in the implementation phase).

**Alternatives considered**:
- Skip Charts examples or mark as deferred — rejected; FR-001 requires all 78 components
- Use a different chart library — the Charts component is built on `react-native-gifted-charts`
  specifically; swapping libraries is out of scope

---

## Decision 8: Missing `src/index.ts` Exports — Pre-Requisite Order

Four components exist in `src/components/` but are absent from `src/index.ts`:
`CodeInput`, `HumanizationScoreBar`, `InvitationStatusBadge`, `WorkerAgentRow`.

These MUST be exported from `src/index.ts` **before** their example tuples are authored,
because all examples import exclusively from `@mui-native` (FR-007). The four exports are
added as a Phase 0 task (Foundation) and must be completed before Phase 2 (DATA_DISPLAY)
and INPUTS (for CodeInput).

**Implementation**: Add four named exports to `src/index.ts` following the existing pattern:

```typescript
export { default as CodeInput } from './components/CodeInput';
export type { CodeInputProps } from './components/CodeInput';
// … same pattern for HumanizationScoreBar, InvitationStatusBadge, WorkerAgentRow
```
