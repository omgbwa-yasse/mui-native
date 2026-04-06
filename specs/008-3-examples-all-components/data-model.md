# Data Model: 3 Usage Examples for All Components

**Feature Branch**: `008-3-examples-all-components`  
**Date**: 2026-04-05

---

## Overview

Feature 008 is a **purely additive content authoring** feature. The showcase app gains no
new persistence layer, no new navigation routes, and no new screens. The only structural
changes are:

1. `ExampleConfig` interface gains a required `code: string` field
2. `ExampleGallery` renders `CodeBlock` per example above the preview
3. `examples.tsx` becomes a re-export barrel alongside 5 new per-category source files
4. 63 placeholder `null` entries in the component registry become filled `ExampleTuple` values
5. 4 missing library exports are added to `src/index.ts`

---

## Updated Entity: `ExampleConfig`

### Before (feature 007)

```typescript
interface ExampleConfig {
  label: string;
  description: string | null;
  render: () => React.ReactElement;
}
```

### After (feature 008)

```typescript
interface ExampleConfig {
  label: string;
  description: string | null;
  code: string;          // ← JSX snippet shown above the preview via CodeBlock
  render: () => React.ReactElement;
}
```

**Invariants**:
- `label` is non-empty; identifies the variant (e.g. "Default", "Outlined", "Disabled")
- `code` is a string; empty string `''` is permitted only for the 15 priority-component
  stub entries that satisfy FR-009's TypeScript compilation requirement; all 63
  newly-authored entries MUST have a non-empty `code` value (SC-006)
- `render` must not call React hooks directly; controlled examples use a stateful wrapper
  component that is defined locally in the category file
- Each component's `ExampleConfig` items are grouped in a fixed-length tuple of exactly 3

---

## Updated Entity: `ExampleTuple`

No change to the TypeScript type (`[ExampleConfig, ExampleConfig, ExampleConfig]`), but the
definition of "valid" expands:

| Criterion | Requirement |
|-----------|-------------|
| Length | Exactly 3 |
| Labels | All 3 are distinct within the tuple |
| Code fields | All 3 are non-empty for newly-authored tuples |
| Distinct outputs | At least 2 of 3 must produce visually/behaviourally different output |
| A11y | All interactive elements have `accessibilityLabel` and `accessibilityRole` |

---

## Updated Entity: `ComponentEntry`

No change to the TypeScript interface. Only the data changes:

| Field | Before | After |
|-------|--------|-------|
| `examples` | `null` for 63 components | Full `ExampleTuple` for all 78 |
| `hasFullExamples` | `false` for 63 | `true` for all 78 |
| `sourceCode` | Unchanged | Unchanged |

---

## File Structure: Per-Category Example Files

```
apps/showcase/src/catalogue/
├── examples.tsx              ← becomes a re-export barrel (no logic)
├── examples.inputs.tsx       ← 19 new tuples + migrated Button, Select, TextField
├── examples.dataDisplay.tsx  ← 15 new tuples + migrated Avatar, Chip, Text
├── examples.feedback.tsx     ← 8 new tuples + migrated Alert, CircularProgress, Snackbar
├── examples.navigation.tsx   ← 7 new tuples + migrated AppBar, Tabs, Drawer
└── examples.layout.tsx       ← 14 new tuples + migrated Card, Stack, Divider
```

### `examples.tsx` (barrel — no logic)

```typescript
export * from './examples.inputs';
export * from './examples.dataDisplay';
export * from './examples.feedback';
export * from './examples.navigation';
export * from './examples.layout';
```

`registry.ts` imports remain unchanged (`from './examples'`).

---

## Component Inventory — 63 Placeholder Components

### INPUTS (19 placeholders)

| Component | Key Prop Notes | Stateful? |
|-----------|---------------|-----------|
| Autocomplete | `options`, `value`, `onChange`, `label` | Yes (controlled) |
| ButtonGroup | `orientation`, `variant`, children `<Button>` | No |
| Checkbox | `checked`, `onChange`, `label?` | Yes |
| CodeInput | `length`, `value`, `onChange`, `secureTextEntry?` | Yes |
| DatePicker | `value`, `onChange` | Yes |
| DateTimePicker | `value`, `onChange` | Yes |
| FAB | `onPress`, `icon`, `label?`, `extended?` | No |
| IconButton | `onPress`, children `<MaterialIcon>` | No |
| NumberField | `value`, `onChangeValue`, `min?`, `max?` | Yes |
| RadioButton | `value`, `selected`, `onPress`, `label?` | Yes (group) |
| Rating | `value`, `onChange`, `max?` | Yes |
| Searchbar | `value`, `onChangeText`, `onSubmitEditing?` | Yes |
| SegmentedButtons | `value`, `onValueChange`, `buttons: []` | Yes |
| Slider | `value`, `onValueChange`, `minimumValue`, `maximumValue` | Yes |
| Switch | `value`, `onValueChange` | Yes |
| TimePicker | `value`, `onChange` | Yes |
| ToggleButton | `value`, `selected`, `onChange` | Yes (group) |
| TouchableRipple | `onPress`, children | No |
| TransferList | `left`, `right`, `onTransfer` | Yes |

### DATA_DISPLAY (15 placeholders)

| Component | Key Prop Notes | Stateful? |
|-----------|---------------|-----------|
| Badge | `badgeContent`, `color?`, children | No |
| Charts | `data: ChartSeries[]`, `height?` | No |
| DataGrid | `rows` (id required), `columns: GridColDef[]` | No (Ex 1); Yes (Ex 2–3 for sort/selection) |
| DataTable | `rows`, `columns`, `keyExtractor` | No (Ex 1); Yes (Ex 2–3) |
| HumanizationScoreBar | `fleschKincaidBefore`, `fleschKincaidAfter`, `maxScore?` | No |
| Icon | `name`, `size?`, `color?` | No |
| ImageList | `cols?`, `rowHeight?`, children `<ImageListItem>` | No |
| InvitationStatusBadge | `status: 'active'|'expired'|'revoked'|'converted'` | No |
| List | `items?: []` or children `<ListItem>` | No |
| Masonry | `columns?`, children | No |
| MaterialIcon | `name`, `size?`, `color?`, `source` | No |
| Timeline | composite children hierarchy | No |
| Tooltip | `title`, children (trigger element) | No |
| TreeView (SimpleTreeView) | `<TreeItem itemId label>` children | Yes (controlled expand) |
| WorkerAgentRow | `workerId`, `sectionIndex`, `status`, `progressPercent`, `label?` | No |

### FEEDBACK (8 placeholders)

| Component | Key Prop Notes | Stateful? |
|-----------|---------------|-----------|
| ActivityIndicator | `animating?`, `size?`, `color?` | No |
| Backdrop | `open`, `onClose?`, children? | Yes |
| Banner | `open`, `message`, `actions?` | Yes |
| Dialog | `open`, `onClose`, `title?`, children | Yes |
| LinearProgress | `variant?`, `value?`, `color?` | No (Ex 1–2); Yes (Ex 3 animated) |
| Modal | `open`, `onClose`, children | Yes |
| Skeleton | `variant?`, `width?`, `height?`, `animation?` | No |
| SpeedDial | `ariaLabel`, `icon`, `actions: []`, `open?`, `onOpen`, `onClose` | Yes |

### NAVIGATION (7 placeholders)

| Component | Key Prop Notes | Stateful? |
|-----------|---------------|-----------|
| BottomSheet | `open`, `onClose`, children | Yes |
| Breadcrumbs | children `<Link>` or `<Text>` items | No |
| Link | `onPress`, children | No |
| Menu | `anchor`, `open`, `onClose`, children `<MenuItem>` | Yes |
| NavigationBar | `items`, `activeItem`, `onItemPress` | Yes |
| Pagination | `count`, `page`, `onChange` | Yes |
| Stepper | `activeStep`, `steps: []`, `onStepPress?` | Yes |

### LAYOUT (14 placeholders)

| Component | Key Prop Notes | Stateful? |
|-----------|---------------|-----------|
| Accordion | children `<AccordionSummary>` + `<AccordionDetails>`, `expanded?` | Yes |
| Box | `style?`, children — generic container | No |
| Collapse | `in`, `orientation?`, `collapsedSize?`, children | Yes |
| Container | `maxWidth?`, children | No |
| Fade | `in`, `timeout?`, children | Yes |
| Grid | `container?`, `item?`, `xs?`, `spacing?`, children | No |
| Grow | `in`, `timeout?`, children | Yes |
| HelperText | `type?: 'info'|'error'`, children | No |
| Paper | `elevation?`, `variant?`, children | No |
| Popover | `open`, `anchor`, `onClose`, children | Yes |
| Popper | `open`, `anchor`, children | Yes |
| Portal | children — renders outside current tree | No |
| Slide | `in`, `direction?`, `timeout?`, children | Yes |
| Zoom | `in`, `timeout?`, children | Yes |

---

## State Transitions

Interactive components (Checkbox, Switch, Slider, etc.) use this wrapper pattern:

```typescript
// Pattern A — single boolean value (Checkbox, Switch)
const CheckboxExample: React.FC = () => {
  const [checked, setChecked] = React.useState(false);
  return <Checkbox checked={checked} onChange={(v) => setChecked(v)} />;
};

export const checkboxExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  { label: 'Default', code: `<CheckboxExample />`, description: null, render: () => <CheckboxExample /> },
  // …
];
```

```typescript
// Pattern B — string/enum value (Select, RadioButton)
const RadioGroupExample: React.FC = () => {
  const [selected, setSelected] = React.useState('a');
  return (
    <>
      <RadioButton value="a" selected={selected === 'a'} onPress={() => setSelected('a')} label="Option A" />
      <RadioButton value="b" selected={selected === 'b'} onPress={() => setSelected('b')} label="Option B" />
    </>
  );
};
```

```typescript
// Pattern C — animation (Fade, Grow, Zoom, Slide, Collapse)
const FadeToggleExample: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button onPress={() => setVisible(v => !v)}>Toggle</Button>
      <Fade in={visible}><View><Text>Faded content</Text></View></Fade>
    </>
  );
};
```

---

## library `src/index.ts` Additions

Four components must be added as named exports before their examples can import from `@mui-native`:

| Component | Source path |
|-----------|-------------|
| `CodeInput` | `./components/CodeInput` |
| `HumanizationScoreBar` | `./components/HumanizationScoreBar` |
| `InvitationStatusBadge` | `./components/InvitationStatusBadge` |
| `WorkerAgentRow` | `./components/WorkerAgentRow` |

Export pattern follows the existing convention in `src/index.ts`:

```typescript
export { default as CodeInput } from './components/CodeInput';
export type { CodeInputProps } from './components/CodeInput';
```
