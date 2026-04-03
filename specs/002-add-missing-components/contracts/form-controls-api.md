# Contract: Form Controls API

**Branch**: `002-add-missing-components` | **Date**: 2026-04-02  
**Scope**: All interactive form input components

---

## Components Covered

`Checkbox`, `RadioButton` / `RadioGroup`, `Switch`, `Slider`,
`Select`, `Searchbar`, `SegmentedButtons`, `ToggleButton` / `ToggleButtonGroup`,
`Autocomplete`, `NumberField`

---

## Shared Form Controls Contract

All form controls in this library adhere to the following contract:

```ts
interface FormControlContract {
  // Controlled interface — omitting value makes the control uncontrolled
  value?:         unknown;
  onValueChange?: (value: unknown) => void;

  // State
  disabled?:      boolean;   // default: false
  error?:         boolean;   // default: false (where applicable)

  // Accessibility (FR-001, FR-003)
  testID?:             string;
  accessibilityLabel?: string;
}
```

---

## Checkbox

```ts
export function Checkbox(props: CheckboxProps): JSX.Element;

// Public API surface
interface CheckboxPublicAPI {
  status?:          'checked' | 'unchecked' | 'indeterminate';
  onValueChange?:   (checked: boolean) => void;
  disabled?:        boolean;
  label?:           string;
}
```

**Invariants**:
- `indeterminate` is a display state only; `onValueChange` always returns `boolean`
- When `label` is provided, the entire row (label + checkbox) is the touch target
- Minimum touch target: 48 × 48 dp (SC-001)

---

## RadioButton / RadioGroup

```ts
export function RadioButton(props: RadioButtonProps): JSX.Element;
export function RadioGroup(props: RadioGroupProps): JSX.Element;

// Public API surface
interface RadioGroupPublicAPI {
  value:          string;
  onValueChange:  (value: string) => void;
}

interface RadioButtonPublicAPI {
  value:     string;   // identifies this option within the group
  disabled?: boolean;
  label?:    string;
}
```

**Invariants**:
- `RadioButton` works standalone (provide `status` + `onPress`) or inside `RadioGroup`
- `RadioGroup` provides value context — child `RadioButton` reads it via context
- Exactly one button can be selected at a time within a group

---

## Switch

```ts
export function Switch(props: SwitchProps): JSX.Element;

// Public API surface
interface SwitchPublicAPI {
  value?:           boolean;
  onValueChange?:   (value: boolean) => void;
  disabled?:        boolean;
  label?:           string;
}
```

**Invariants**:
- Bridges to `react-native` `Switch` internally; `value` prop is controlled
- Thumb icon (`thumbIcon`) renders inside the thumb at 16 dp

---

## Slider

```ts
export function Slider(props: SliderProps): JSX.Element;

// Public API surface
interface SliderPublicAPI {
  value?:              number;
  onValueChange?:      (value: number) => void;
  onSlidingComplete?:  (value: number) => void;
  minimumValue?:       number;   // default: 0
  maximumValue?:       number;   // default: 100
  step?:               number;   // default: 1
  disabled?:           boolean;
}
```

**Invariants**:
- Value is clamped to `[minimumValue, maximumValue]`
- `onValueChange` fires continuously during drag; `onSlidingComplete` fires on release
- Track touch region: full-width, 44 dp tall (SC-001)

---

## Select

```ts
export function Select<T = string>(props: SelectProps<T>): JSX.Element;

// Public API surface
interface SelectPublicAPI<T> {
  options:        { label: string; value: T; disabled?: boolean }[];
  value?:         T;
  onValueChange?: (value: T) => void;
  label?:         string;
  placeholder?:   string;
  disabled?:      boolean;
  error?:         boolean;
  helperText?:    string;
}
```

**Invariants**:
- Dropdown renders via `Portal` (see overlay-api.md)
- Position computed with `measure()` on the trigger; opens below or above depending on available space
- `disabled` options are rendered but non-interactive (opacity 0.38)

---

## Searchbar

```ts
export function Searchbar(props: SearchbarProps): JSX.Element;

// Public API surface
interface SearchbarPublicAPI {
  value?:           string;
  onChangeText?:    (text: string) => void;
  placeholder?:     string;
  onSubmitEditing?: () => void;
  onClearIconPress?: () => void;
  loading?:         boolean;
}
```

**Invariants**:
- Clear icon appears only when `value` is non-empty
- `loading={true}` replaces the right-side slot with `ActivityIndicator`
- Keyboard `returnKeyType` defaults to `'search'`

---

## SegmentedButtons

```ts
export function SegmentedButtons(props: SegmentedButtonsProps): JSX.Element;

// Public API surface
interface SegmentedButtonsPublicAPI {
  buttons:        { value: string; label?: string; icon?: IconSource; disabled?: boolean }[];
  value:          string | string[];
  onValueChange:  (value: string | string[]) => void;
  multiSelect?:   boolean;  // default: false
}
```

**Invariants**:
- Single-select: only one button active; active button carries filled surface
- Multi-select: any combination is valid; empty selection is allowed
- All buttons have equal width (distribute available width evenly)

---

## ToggleButton / ToggleButtonGroup

```ts
export function ToggleButton(props: ToggleButtonProps): JSX.Element;
export function ToggleButtonGroup(props: ToggleButtonGroupProps): JSX.Element;

// Public API surface
interface ToggleButtonGroupPublicAPI {
  value:           string | string[];
  onValueChange:   (value: string | string[]) => void;
  nullable?:       boolean;   // allow deselecting all; default: false
}
```

**Invariants**:
- `ToggleButton` can operate standalone or inside `ToggleButtonGroup`
- Inside group, status is derived from group context
- `nullable={false}` (default): at least one button must remain selected

---

## Autocomplete

```ts
export function Autocomplete<T = string>(props: AutocompleteProps<T>): JSX.Element;

// Public API surface
interface AutocompletePublicAPI<T> {
  options:        { label: string; value: T }[];
  value?:         T | null;
  onValueChange?: (value: T | null) => void;
  inputValue?:    string;
  onInputChange?: (text: string) => void;
  freeSolo?:      boolean;
  loading?:       boolean;
  filterOptions?: (options: AutocompleteOption<T>[], inputValue: string) => AutocompleteOption<T>[];
}
```

**Invariants**:
- Dropdown filtered in-component unless consumer provides `filterOptions`
- `freeSolo={true}` allows any string value even if not in `options`
- When `loading={true}` and dropdown is open, shows spinner in dropdown panel

---

## NumberField

```ts
export function NumberField(props: NumberFieldProps): JSX.Element;

// Public API surface
interface NumberFieldPublicAPI {
  value?:         number;
  onValueChange?: (value: number) => void;
  min?:           number;
  max?:           number;
  step?:          number;   // default: 1
  disabled?:      boolean;
  showStepper?:   boolean;  // default: true
}
```

**Invariants**:
- Value is clamped to `[min, max]` on blur and on stepper press
- Keyboard type: `numeric`; accepts only numeric input
- Increment/decrement buttons disable when value is at boundary (SC-001 touch target applies)

---

## Form Control a11y Matrix

| Component | accessibilityRole | required accessible name |
|-----------|-------------------|-|
| Checkbox | `checkbox` | label or accessibilityLabel |
| RadioButton | `radio` | label or accessibilityLabel |
| Switch | `switch` | label or accessibilityLabel |
| Slider | `adjustable` | accessibilityLabel |
| Select | `combobox` | label or accessibilityLabel |
| Searchbar | `search` | accessibilityLabel |
| SegmentedButtons | `group` > buttons | each button label |
| ToggleButton | `button` | label or accessibilityLabel |
| Autocomplete | `combobox` | label or accessibilityLabel |
| NumberField | `spinbutton` | label or accessibilityLabel |
