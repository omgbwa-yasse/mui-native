# API Contracts: Feature 011 — Apply Missing MUI-Aligned Components

**Branch**: `011-apply-missing-elements`  
**Generated**: 2026-04-06 by speckit.plan  
**Contract Type**: TypeScript public API surface (library exports)

---

## Overview

Every symbol below is exported from `src/index.ts` (the library's single public entry point — FR-025). Internal contexts (`AccordionContext`, `StepperContext`, `RadioGroupContext`) are **not** exported.

---

## 1. List Sub-components

### Components

| Export | File | New/Modified |
|--------|------|-------------|
| `ListItemButton` | `src/components/List/ListItemButton.tsx` | **New** |
| `ListItemIcon` | `src/components/List/ListItemIcon.tsx` | **New** |
| `ListItemAvatar` | `src/components/List/ListItemAvatar.tsx` | **New** |
| `ListItemText` | `src/components/List/ListItemText.tsx` | **New** |
| `ListSubheader` | `src/components/List/ListSubheader.tsx` | **New** |

### Type Signatures

```typescript
// src/components/List/types.ts (additions)

export interface ListItemButtonProps extends ViewProps {
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  selected?: boolean;
  dense?: boolean;
  alignItems?: 'flex-start' | 'center';
  disableRipple?: boolean;
  sx?: SxProps;
  children?: React.ReactNode;
  testID?: string;
  // Built-in accessibility (not overridable without explicit prop):
  accessible?: boolean;   // default: true
  accessibilityLabel?: string;
  accessibilityState?: AccessibilityState;
}

export interface ListItemIconProps {
  children: React.ReactNode;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}

export interface ListItemAvatarProps {
  children: React.ReactNode;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}

export interface ListItemTextProps {
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  primaryTypographyProps?: TextProps;
  secondaryTypographyProps?: TextProps;
  disableTypography?: boolean;
  inset?: boolean;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}

export interface ListSubheaderProps {
  children?: React.ReactNode;
  color?: 'default' | 'primary' | 'inherit';
  disableGutters?: boolean;
  inset?: boolean;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
```

### Index export additions (`src/components/List/index.ts`)

```typescript
// Existing (unchanged):
export { List } from './List';
export { ListItem } from './ListItem';
export { ListSection } from './ListSection';
export { ListAccordion } from './ListAccordion';
export type { ListProps, ListItemProps, ListSectionProps, ListAccordionProps } from './types';

// New:
export { ListItemButton } from './ListItemButton';
export { ListItemIcon } from './ListItemIcon';
export { ListItemAvatar } from './ListItemAvatar';
export { ListItemText } from './ListItemText';
export { ListSubheader } from './ListSubheader';
export type {
  ListItemButtonProps,
  ListItemIconProps,
  ListItemAvatarProps,
  ListItemTextProps,
  ListSubheaderProps,
} from './types';
```

---

## 2. Accordion Sub-components

### Components

| Export | File | New/Modified |
|--------|------|-------------|
| `AccordionSummary` | `src/components/Accordion/AccordionSummary.tsx` | **New** |
| `AccordionDetails` | `src/components/Accordion/AccordionDetails.tsx` | **New** |
| `AccordionActions` | `src/components/Accordion/AccordionActions.tsx` | **New** |
| `Accordion` | `src/components/Accordion/Accordion.tsx` | **Modified** |
| `AccordionProps` | `src/components/Accordion/types.ts` | **Modified** |
| `AccordionContext` | `src/components/Accordion/AccordionContext.ts` | **New (internal)** |

### Type Signatures

```typescript
// src/components/Accordion/types.ts (updated)

// Branch 1: existing data-driven API (no changes to shape)
export interface AccordionDataProps extends ViewProps {
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
}

// Branch 2: new composable API
export interface AccordionComposableProps extends ViewProps {
  title?: never;  // compile-time guard
  children: React.ReactNode;
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

// Sub-component props
export interface AccordionSummaryProps {
  expandIcon?: React.ReactNode;
  children?: React.ReactNode;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}

export interface AccordionDetailsProps {
  children: React.ReactNode;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}

export interface AccordionActionsProps {
  children: React.ReactNode;
  disableSpacing?: boolean;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
```

### Index export additions (`src/components/Accordion/index.ts`)

```typescript
// Existing (unchanged):
export { Accordion } from './Accordion';
export type { AccordionProps } from './types';

// New:
export { AccordionSummary } from './AccordionSummary';
export { AccordionDetails } from './AccordionDetails';
export { AccordionActions } from './AccordionActions';
export type {
  AccordionSummaryProps,
  AccordionDetailsProps,
  AccordionActionsProps,
} from './types';
```

---

## 3. Stepper Sub-components

### Components

| Export | File | New/Modified |
|--------|------|-------------|
| `Step` | `src/components/Stepper/Step.tsx` | **New** |
| `StepLabel` | `src/components/Stepper/StepLabel.tsx` | **New** |
| `StepContent` | `src/components/Stepper/StepContent.tsx` | **New** |
| `StepConnector` | `src/components/Stepper/StepConnector.tsx` | **New** |
| `MobileStepper` | `src/components/Stepper/MobileStepper.tsx` | **New** |
| `Stepper` | `src/components/Stepper/Stepper.tsx` | **Modified** |
| `StepperContext` | `src/components/Stepper/StepperContext.ts` | **New (internal)** |

### Type Signatures

```typescript
// src/components/Stepper/types.ts (additions)

export interface StepProps {
  active?: boolean;
  completed?: boolean;
  disabled?: boolean;
  index?: number;
  last?: boolean;
  expanded?: boolean;
  children?: React.ReactNode;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}

export interface StepIconProps {
  active: boolean;
  completed: boolean;
  error: boolean;
  icon: React.ReactNode;
}

export interface StepLabelProps {
  children?: React.ReactNode;
  optional?: React.ReactNode;
  error?: boolean;
  icon?: React.ReactNode;
  StepIconComponent?: React.ComponentType<StepIconProps>;
  StepIconProps?: Partial<StepIconProps>;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}

export interface StepContentProps {
  children: React.ReactNode;
  TransitionComponent?: React.ComponentType<unknown>;
  transitionDuration?: number | { enter: number; exit: number };
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}

export interface StepConnectorProps extends ViewProps {
  sx?: SxProps;
}

export type MobileStepperVariant = 'dots' | 'progress' | 'text';

export interface MobileStepperProps {
  steps: number;
  activeStep: number;
  variant?: MobileStepperVariant;
  backButton?: React.ReactNode;
  nextButton?: React.ReactNode;
  position?: 'bottom' | 'top' | 'static';
  LinearProgressProps?: object;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

// Updated Stepper discriminated union
export type StepperDataProps = {
  steps: StepItem[];
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  nonLinear?: boolean;
  connector?: React.ReactElement;
  alternativeLabel?: boolean;
  onStepPress?: (index: number) => void;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  children?: never;
};

export type StepperComposableProps = {
  steps?: never;
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  nonLinear?: boolean;
  connector?: React.ReactElement;
  alternativeLabel?: boolean;
  children: React.ReactNode;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export type StepperProps = StepperDataProps | StepperComposableProps;
```

### Index export additions (`src/components/Stepper/index.ts`)

```typescript
// Existing (unchanged):
export { Stepper } from './Stepper';
export type { StepperProps, StepItem, StepState } from './types';

// New:
export { Step } from './Step';
export { StepLabel } from './StepLabel';
export { StepContent } from './StepContent';
export { StepConnector } from './StepConnector';
export { MobileStepper } from './MobileStepper';
export type {
  StepProps,
  StepLabelProps,
  StepContentProps,
  StepConnectorProps,
  MobileStepperProps,
  MobileStepperVariant,
  StepIconProps,
  StepperDataProps,
  StepperComposableProps,
} from './types';
```

---

## 4. Radio Components

### Components

| Export | File | New/Modified |
|--------|------|-------------|
| `Radio` | `src/components/RadioButton/index.ts` (re-export) | **New (alias)** |
| `RadioGroup` | `src/components/RadioButton/RadioGroup.tsx` | **Modified** |
| `RadioGroupContext` | `src/components/RadioButton/RadioGroupContext.ts` | **New (replaces RadioButtonContext)** |

### Type Signatures

```typescript
// src/components/RadioButton/types.ts (additions)

export interface RadioProps {
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  onPress?: () => void;
  disabled?: boolean;
  color?: string;
  size?: SizeProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}

// Updated RadioGroupProps (backward-compatible)
export interface RadioGroupProps {
  // MUI-aligned API (new — FR-019):
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: unknown, value: string) => void;
  row?: boolean;

  // Existing API (kept for backward compat — FR-020):
  onValueChange?: (value: string) => void;

  // Common:
  disabled?: boolean;
  children: React.ReactNode;
  testID?: string;
}
```

### Index export additions (`src/components/RadioButton/index.ts`)

```typescript
// Existing (unchanged):
export { RadioButton } from './RadioButton';
export { RadioGroup } from './RadioGroup';
export type { RadioButtonProps, RadioGroupProps, RadioGroupContextValue } from './types';

// New:
export { RadioButton as Radio } from './RadioButton';
export type { RadioProps } from './types';
```

---

## 5. `useMediaQuery` Hook

### Hook

| Export | File | New/Modified |
|--------|------|-------------|
| `useMediaQuery` | `src/hooks/useMediaQuery.ts` | **New** |

### Type Signatures

```typescript
// src/hooks/useMediaQuery.ts

/**
 * Returns true when the current window width satisfies the query.
 *
 * @param query - A named breakpoint ('xs'|'sm'|'md'|'lg'|'xl') or raw media query string.
 *   Raw strings support (min-width: Npx) and (max-width: Npx) only.
 *   Other media features silently return false.
 *
 * @example
 *   const isMd = useMediaQuery('md');          // width >= 900
 *   const isNarrow = useMediaQuery('(max-width: 599px)'); // width <= 599
 */
export function useMediaQuery(query: string): boolean;
```

### `src/index.ts` addition

```typescript
export { useMediaQuery } from './hooks/useMediaQuery';
```

---

## 6. `src/index.ts` — Summary of Additions

```typescript
// List sub-components (new)
export {
  List, ListItem, ListSection, ListAccordion,  // existing
  ListItemButton, ListItemIcon, ListItemAvatar, ListItemText, ListSubheader,  // new
} from './components/List';
export type {
  ListProps, ListItemProps, ListSectionProps, ListAccordionProps,  // existing
  ListItemButtonProps, ListItemIconProps, ListItemAvatarProps, ListItemTextProps, ListSubheaderProps,  // new
} from './components/List';

// Accordion (updated)
export { Accordion, AccordionSummary, AccordionDetails, AccordionActions } from './components/Accordion';
export type {
  AccordionProps,
  AccordionSummaryProps, AccordionDetailsProps, AccordionActionsProps,
} from './components/Accordion';

// Stepper (updated)
export {
  Stepper,  // existing
  Step, StepLabel, StepContent, StepConnector, MobileStepper,  // new
} from './components/Stepper';
export type {
  StepperProps, StepItem, StepState,  // existing
  StepProps, StepLabelProps, StepContentProps, StepConnectorProps,
  MobileStepperProps, MobileStepperVariant, StepIconProps,
} from './components/Stepper';

// Radio (updated)
export { RadioButton, RadioGroup, Radio } from './components/RadioButton';
export type {
  RadioButtonProps, RadioGroupProps, RadioGroupContextValue,  // existing
  RadioProps,  // new
} from './components/RadioButton';

// useMediaQuery hook (new)
export { useMediaQuery } from './hooks/useMediaQuery';
```

---

## Non-Goals (explicitly out of scope)

The following are **not** part of this feature's public API:

- `TransferList` drag-to-reorder variant
- `Popper` anchor engine improvements
- `orientation: portrait|landscape` in `useMediaQuery`
- Sticky `ListSubheader` (requires consumer-level `SectionList` integration)
- `Radio` with complex accessibility tree (beyond `role="radio"` + `accessibilityState.checked`)
