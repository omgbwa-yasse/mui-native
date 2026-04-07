# Data Model: Feature 011 — Apply Missing MUI-Aligned Components

**Branch**: `011-apply-missing-elements`  
**Generated**: 2026-04-06 by speckit.plan  
**Source**: research.md + spec.md

---

## Component Groups & Entities

### 1. List Sub-components

#### `ListItemButton`
```typescript
interface ListItemButtonProps extends ViewProps {
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;     // default: false
  selected?: boolean;     // default: false — highlights background
  dense?: boolean;        // default: false — reduces vertical padding
  alignItems?: 'flex-start' | 'center';  // default: 'center'
  disableRipple?: boolean;
  href?: string;          // no-op on native; retained for API parity
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  // Accessibility — FR-001
  role?: 'button';        // default: 'button'
  accessible?: boolean;  // default: true
  accessibilityLabel?: string;
  accessibilityState?: AccessibilityState;
  children?: React.ReactNode;
}
```

**State transitions**:
- `default` → `pressed` (ripple feedback)
- `default` ↔ `selected` (parent-controlled)
- `default` → `disabled` (no press, visual desaturation)

#### `ListItemIcon`
```typescript
interface ListItemIconProps {
  children: React.ReactNode;  // expects Icon or similar
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
```
No state transitions. Pure layout wrapper.

#### `ListItemAvatar`
```typescript
interface ListItemAvatarProps {
  children: React.ReactNode;  // expects Avatar
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
```

#### `ListItemText`
```typescript
interface ListItemTextProps {
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  primaryTypographyProps?: TextProps;   // passed to primary Text
  secondaryTypographyProps?: TextProps; // passed to secondary Text
  disableTypography?: boolean;  // skip automatic Text wrapping
  inset?: boolean;              // adds left margin to align without icon
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
```

#### `ListSubheader`
```typescript
interface ListSubheaderProps {
  children?: React.ReactNode;
  color?: 'default' | 'primary' | 'inherit';
  component?: string;   // ignored on native; retained for parity
  disableGutters?: boolean;  // remove left/right padding
  disableSticky?: true;      // always true on native — FR-005
  inset?: boolean;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
```

---

### 2. Accordion Sub-components

#### `AccordionContext` (internal — not exported)
```typescript
interface AccordionContextValue {
  isExpanded: boolean;
  toggle: () => void;
  disabled: boolean;
}
const AccordionContext = React.createContext<AccordionContextValue | null>(null);
```

#### `AccordionSummary`
```typescript
interface AccordionSummaryProps {
  expandIcon?: React.ReactNode;  // rotates 180° when expanded
  children?: React.ReactNode;    // header content
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  // Accessibility — FR-007
  // role="button" + accessible={true} set internally
  accessibilityLabel?: string;
}
```

**State transitions**:
- `collapsed` ↔ `expanded` (reads/writes `AccordionContext`)
- `expandIcon` rotates 0° → 180° when expanded (Reanimated)

#### `AccordionDetails`
```typescript
interface AccordionDetailsProps {
  children: React.ReactNode;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
```

Wraps `<Collapse in={isExpanded}>`. Visibility driven by `AccordionContext.isExpanded`.

#### `AccordionActions`
```typescript
interface AccordionActionsProps {
  children: React.ReactNode;
  disableSpacing?: boolean;  // default: false — removes gap between action buttons
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
```

Rendered in a `flexDirection: 'row'` / `justifyContent: 'flex-end'` container.  
Only visible when parent `Accordion` is expanded (reads `AccordionContext`).

#### `Accordion` — Updated Discriminated Union Type
```typescript
// Branch 1: data-driven (existing API — unchanged)
interface AccordionDataProps extends ViewProps {
  title: string;
  children?: React.ReactNode;
  expanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  disabled?: boolean;
  left?: React.ReactNode;
  right?: (expanded: boolean) => React.ReactNode;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  // Compile-time guard (forbids composable usage when title is present):
  // AccordionSummary/Details/Actions are valid as children,
  // but context won't connect in data-driven branch
}

// Branch 2: composable (new)
interface AccordionComposableProps extends ViewProps {
  title?: never;         // ← mutually exclusive with branch 1
  children: React.ReactNode;  // expects AccordionSummary + AccordionDetails
  expanded?: boolean;
  defaultExpanded?: boolean;
  onChange?: (event: unknown, expanded: boolean) => void;
  disabled?: boolean;
  disableGutters?: boolean;
  elevation?: number;
  square?: boolean;
  sx?: SxProps;
}

export type AccordionProps = AccordionDataProps | AccordionComposableProps;
```

**Runtime branch detection**: `'title' in props && typeof props.title === 'string'`

---

### 3. Stepper Sub-components

#### `StepperContext` (internal — not exported)
```typescript
interface StepperContextValue {
  activeStep: number;
  orientation: 'horizontal' | 'vertical';
  totalSteps: number;
  nonLinear: boolean;
}
const StepperContext = React.createContext<StepperContextValue | null>(null);
```

#### `Step`
```typescript
interface StepProps {
  active?: boolean;     // overrides context if provided
  completed?: boolean;  // overrides context if provided
  disabled?: boolean;
  index?: number;       // set by Stepper parent (auto-injected when composable)
  last?: boolean;       // set by Stepper parent
  expanded?: boolean;   // for non-linear steppers
  children?: React.ReactNode;  // expects StepLabel, optional StepContent
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
```

**State derivation**: if `active`/`completed` not provided, derived from `StepperContext.activeStep`:
- `index < activeStep` → completed
- `index === activeStep` → active
- `index > activeStep` → upcoming

#### `StepLabel`
```typescript
interface StepLabelProps {
  children?: React.ReactNode;  // label text (string or JSX)
  optional?: React.ReactNode;  // sub-label (e.g., "Optional")
  error?: boolean;
  icon?: React.ReactNode;      // replaces the step number bubble
  StepIconComponent?: React.ComponentType<StepIconProps>;
  StepIconProps?: Partial<StepIconProps>;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}

interface StepIconProps {
  active: boolean;
  completed: boolean;
  error: boolean;
  icon: React.ReactNode;
}
```

#### `StepContent`
```typescript
interface StepContentProps {
  children: React.ReactNode;
  TransitionComponent?: React.ComponentType;  // default: Collapse
  transitionDuration?: number | { enter: number; exit: number };
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
```

Visible only when parent `Step` is active (`StepperContext.activeStep === index`).  
Uses `<Collapse in={isActive}>` for animation (consistent with AccordionDetails).

#### `StepConnector`
```typescript
interface StepConnectorProps extends ViewProps {
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
```

Renders a line segment between steps. Receives `active`/`completed` state from `StepperContext` (index-aware rendering in `Stepper` parent). Replaceable via `connector` prop on `Stepper`.

#### `MobileStepper`
```typescript
type MobileStepperVariant = 'dots' | 'progress' | 'text';

interface MobileStepperProps {
  steps: number;           // total step count
  activeStep: number;      // current step (0-based)
  variant?: MobileStepperVariant;  // default: 'dots'
  backButton?: React.ReactNode;    // left navigation button
  nextButton?: React.ReactNode;    // right navigation button
  position?: 'bottom' | 'top' | 'static';  // default: 'bottom'
  LinearProgressProps?: object;    // passed to LinearProgress (variant="progress")
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
```

**Variant rendering**:
- `dots`: row of N circles; circle at `activeStep` index uses primary color
- `progress`: `<LinearProgress variant="determinate" value={(activeStep / (steps-1)) * 100} />`
- `text`: `"{activeStep + 1} / {steps}"` using MD3 body typography

#### `Stepper` — Updated Discriminated Union Type
```typescript
// Branch 1: data-driven (existing)
interface StepperDataProps {
  steps: StepItem[];
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  nonLinear?: boolean;
  onStepPress?: (index: number) => void;
  children?: never;
  // ... existing props
}

// Branch 2: composable (new)
interface StepperComposableProps {
  steps?: never;
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  nonLinear?: boolean;
  children: React.ReactNode;  // expects Step components
  connector?: React.ReactElement;  // custom StepConnector
  alternativeLabel?: boolean;  // labels below icons (horizontal only)
  // ... common props
}

export type StepperProps = StepperDataProps | StepperComposableProps;
```

---

### 4. Radio Components

#### `Radio` (new export — alias / wrapper)
```typescript
// Identical to RadioButtonProps — FR-018
interface RadioProps {
  value: string;
  checked?: boolean;    // standalone use
  onChange?: (value: string) => void;
  onPress?: () => void; // fallback for backward compat with RadioButton
  disabled?: boolean;
  color?: string;
  size?: SizeProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}
```

`Radio` = `RadioButton` re-exported under new name. Internal implementation unchanged.

#### `RadioGroupContext` (renamed from `RadioButtonContext`)
```typescript
interface RadioGroupContextValue {
  value: string | undefined;
  onChange: (value: string) => void;  // unified name (was onValueChange)
  onValueChange?: (value: string) => void;  // kept for compat
  name?: string;
  disabled?: boolean;
  row?: boolean;
}
```

#### `RadioGroup` — Updated (MUI-aligned API)
```typescript
interface RadioGroupProps {
  // New MUI-aligned props (FR-019)
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: unknown, value: string) => void;
  row?: boolean;  // when true: flexDirection = 'row'

  // Existing props (kept for backward compat — FR-020)
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
  testID?: string;
}
```

**State management**: supports both controlled (`value` prop) and uncontrolled (`defaultValue`) modes. Internally uses `useState` seeded by `defaultValue` when uncontrolled.

---

### 5. `useMediaQuery` Hook

#### Input / Output
```typescript
function useMediaQuery(query: string): boolean;
```

#### Internal Types
```typescript
type NamedBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface BreakpointValues {
  xs: number;   // 0
  sm: number;   // 600
  md: number;   // 900
  lg: number;   // 1200
  xl: number;   // 1536
}

type ParsedQuery =
  | { type: 'named'; key: NamedBreakpoint }
  | { type: 'min-width'; value: number }
  | { type: 'max-width'; value: number }
  | { type: 'unknown' };  // always returns false
```

#### Evaluation Rules
| Input | Evaluated As | Returns `true` when |
|-------|-------------|---------------------|
| `"xs"` | `min-width: 0` | always |
| `"sm"` | `min-width: 600` | width ≥ 600 |
| `"md"` | `min-width: 900` | width ≥ 900 |
| `"lg"` | `min-width: 1200` | width ≥ 1200 |
| `"xl"` | `min-width: 1536` | width ≥ 1536 |
| `"(min-width: 600px)"` | raw min-width | width ≥ 600 |
| `"(max-width: 899px)"` | raw max-width | width ≤ 899 |
| anything else | unknown | false |

---

## Entity Relationships

```text
Accordion (composable branch)
├── AccordionContext (internal)
├── AccordionSummary ──reads AccordionContext──▶ toggle()
├── AccordionDetails ──reads AccordionContext──▶ isExpanded
└── AccordionActions ──reads AccordionContext──▶ isExpanded

Stepper (composable branch)
├── StepperContext (internal)
└── Step[0..N] ──reads StepperContext──▶ activeStep
    ├── StepLabel
    └── StepContent ──reads StepperContext──▶ isActive

RadioGroup
├── RadioGroupContext (internal)
└── Radio[0..N] ──reads RadioGroupContext──▶ value / onChange

List (flat composition — no shared context)
├── ListSubheader  (static, no context)
├── ListItemButton (Pressable, standalone)
│   ├── ListItemIcon
│   ├── ListItemAvatar
│   └── ListItemText
└── ...

useMediaQuery
└── useWindowDimensions() ──▶ width ──▶ evaluateQuery() ──▶ boolean
     └── theme.breakpoints.values ──▶ named breakpoint thresholds
```

---

## Validation Rules

| Entity | Rule | FR Reference |
|--------|------|-------------|
| `ListItemButton` | `accessible={true}` if `role` is set | FR-001, Assumption 8 |
| `ListItemButton` | Touch target ≥ 48×48 dp | Constitution V |
| `AccordionSummary` | `accessible={true}` + `role="button"` always set | FR-007 |
| `RadioGroup` | Only one `Radio` can be selected at a time | FR-019 |
| `MobileStepper` | `0 ≤ activeStep ≤ steps` — no crash outside range | Edge case |
| `useMediaQuery` | Unknown query format returns `false` (no throw) | FR-022 |
| `Stepper` | Zero `Step` children renders empty without crash | Edge case |
| `Accordion` | Missing `expandIcon` renders without crash | Edge case |
| `RadioGroup` | `value` not matching any `Radio` = no selection, no error | Edge case |

---

## State Transitions Summary

```text
AccordionSummary press
  ──▶ AccordionContext.toggle()
      ──▶ Accordion.isExpanded toggles
          ──▶ AccordionDetails (Collapse in={isExpanded})
          ──▶ AccordionSummary expandIcon rotation animation
          ──▶ AccordionActions visibility

Radio press (inside RadioGroup)
  ──▶ RadioGroupContext.onChange(value)
      ──▶ RadioGroup internal state updates
          ──▶ Re-render: selected Radio highlights

Window resize
  ──▶ useWindowDimensions() triggers re-render
      ──▶ useMediaQuery re-evaluates query
          ──▶ returns new boolean (potential component re-render)
```
