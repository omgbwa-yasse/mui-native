# Data Model: Full MUI-Native ↔ Material UI Alignment

**Feature**: `010-full-mui-alignment`
**Phase**: 1 — Design
**Date**: 2026-04-06

---

## 1. Prop Alias Map

Additive aliases only — existing prop names continue to work indefinitely. When both are supplied, the MUI-idiomatic name takes precedence; a `__DEV__` warning is emitted.

| Component | MUI-Idiomatic (new alias) | Current Internal (preserved) | Type | FR |
|-----------|--------------------------|------------------------------|------|----|
| Dialog | `open: boolean` | `visible: boolean` | alias | FR-001 |
| Dialog | `onClose: (reason: DialogOnCloseReason) => void` | `onDismiss: () => void` | alias | FR-001 |
| Modal | `open: boolean` | `visible: boolean` | alias | FR-001 |
| Modal | `onClose: () => void` | `onDismiss: () => void` | alias | FR-002 |
| Menu | `open: boolean` | `visible: boolean` | alias | FR-001 |
| Menu | `onClose: () => void` | `onDismiss: () => void` | alias | FR-002 |
| Snackbar | `open: boolean` | `visible: boolean` | alias | FR-001 |
| BottomSheet | `open: boolean` | `visible: boolean` | alias | FR-001 |
| Switch | `checked: boolean` | *(current value prop)* | alias | FR-003 |
| Switch | `onChange: (e: { target: { checked: boolean } }) => void` | `onValueChange` | alias | FR-003 |
| Rating | `value: number \| null` | *(existing value)* | type extension | FR-003 |
| Rating | `onChange: (e: SyntheticEvent \| null, v: number \| null) => void` | `onValueChange` | alias | FR-003 |
| Slider | `onChange: (e: unknown, v: number \| number[]) => void` | `onValueChange` | alias | FR-004 |
| TextField | `helperText: ReactNode` | `supportingText` | alias | FR-005 |
| TextField | `error: boolean \| string` | *(new)* | new prop | FR-005 |
| Badge | `badgeContent: ReactNode` | `content` | alias | FR-006 |
| Badge | `invisible: boolean` | *(inverse of `visible`)* | new prop | FR-006 |

> **`DialogOnCloseReason`**: `'backdropPress' | 'hardwareBackPress'` — RN-DEVIATION from MUI Web's `'backdropClick' | 'escapeKeyDown'`

---

## 2. Component Coverage Matrix (MUI v7.3.9)

Coverage target: ≥ 95 % of 55 applicable components (58 total − 3 formal web-only exclusions).

### Inputs

| MUI Component | mui-native Status | Notes | FRs |
|---------------|-------------------|-------|-----|
| Autocomplete | ✅ Present | — | — |
| Button | ✅ Present | — | — |
| ButtonGroup | ✅ Present | — | — |
| Checkbox | ✅ Present | — | — |
| DatePicker | ✅ Present | — | — |
| DateTimePicker | ✅ Present | — | — |
| FAB | ✅ Present | — | — |
| Radio / RadioGroup | ✅ Present | — | — |
| Rating | ✅ Present + extend | Add value/onChange aliases | FR-003 |
| Select | ✅ Present | — | — |
| Slider | ✅ Present + extend | Add onChange MUI signature | FR-004 |
| Switch | ✅ Present + extend | Add checked/onChange aliases | FR-003 |
| TextField | ⚠️ Partial → Complete | Add standard variant + 5 props + helperText/error | FR-005, FR-016–020 |
| TimePicker | ✅ Present | — | — |
| TransferList | ❌ Web-only excluded | No drag-and-drop API in base RN | FR-036 |
| TextareaAutosize | ❌ Web-only excluded | CSS auto-resize is DOM feature | FR-036 |

### Data Display

| MUI Component | mui-native Status | Notes | FRs |
|---------------|-------------------|-------|-----|
| Avatar | ✅ Present | — | — |
| AvatarGroup | ❌ Missing → New | New component | FR-014/015 |
| Badge | ✅ Present + extend | Add badgeContent / invisible | FR-006 |
| Chip | ✅ Present | — | — |
| Divider | ✅ Present | — | — |
| Icon | ✅ Present | — | — |
| ImageList | ✅ Present | — | — |
| List | ✅ Present | — | — |
| Table | ❌ Missing → New | New composable family (8 components) | FR-028–030 |
| Tooltip | ✅ Present | — | — |
| Typography (Text) | ✅ Present + extend | Add MD2 variant aliases | FR-034/035 |

### Feedback

| MUI Component | mui-native Status | Notes | FRs |
|---------------|-------------------|-------|-----|
| Alert | ✅ Present | — | — |
| Backdrop | ✅ Present | — | — |
| CircularProgress | ⚠️ Partial → Complete | Add thickness, disableShrink, enableTrackSlot | FR-008–010 |
| Dialog | ⚠️ Partial → Complete | Add open/onClose + sub-components + display props | FR-025–027 |
| LinearProgress | ✅ Present (verify) | All 4 variants in types — verify impl | FR-011/012 |
| Skeleton | ✅ Present | — | — |
| Snackbar | ✅ Present + extend | Add open alias | FR-001 |

### Surfaces

| MUI Component | mui-native Status | Notes | FRs |
|---------------|-------------------|-------|-----|
| Accordion | ✅ Present | — | — |
| AppBar | ✅ Present | — | — |
| Card | ⚠️ Partial → Complete | Add 5 sub-components | FR-021–024 |
| Paper | ✅ Present | — | — |

### Layout

| MUI Component | mui-native Status | Notes | FRs |
|---------------|-------------------|-------|-----|
| Box | ✅ Present | — | — |
| Container | ✅ Present | — | — |
| Grid | ✅ Present | — | — |
| ImageList (Masonry) | ✅ Present | — | — |
| Stack | ✅ Present | — | — |

### Navigation

| MUI Component | mui-native Status | Notes | FRs |
|---------------|-------------------|-------|-----|
| Breadcrumbs | ✅ Present | — | — |
| Drawer | ✅ Present | — | — |
| Link | ✅ Present | — | — |
| Menu | ✅ Present + extend | Add open/onClose aliases | FR-001/002 |
| Pagination | ✅ Present | — | — |
| SpeedDial | ✅ Present | — | — |
| Stepper | ✅ Present | — | — |
| Tabs | ✅ Present | — | — |
| BottomNavigation | ✅ Present | — | — |

### Utils

| MUI Component | mui-native Status | Notes | FRs |
|---------------|-------------------|-------|-----|
| Modal | ✅ Present + extend | Add open/onClose aliases | FR-001/002 |
| Popper | ❌ Web-only excluded | Depends on DOM getBoundingClientRect | FR-036 |
| Transitions (5) | ✅ Present + verify | All 5 already exported; verify prop types | FR-031–033 |

**Post-010 coverage**: 52 / 55 applicable = **94.5 %** pre-existing + new additions → **≥ 96 %** after feature complete (SC-007 target: ≥ 95 %)

> **Note**: `DataGrid`, `Charts`, `CodeInput`, `HumanizationScoreBar`, `InvitationStatusBadge`, `NavigationBar`, `BottomSheet`, `Banner`, `DataTable` are mui-native extensions beyond the 58-component MUI census. They are not counted in coverage metrics but remain exported.

---

## 3. Typography Variant Map (FR-035)

Export targets added to `src/tokens/typography.ts`:

```typescript
export type TypographyMD2Variant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'subtitle1' | 'subtitle2'
  | 'body1' | 'body2'
  | 'caption' | 'button' | 'overline';

export const typographyVariantMap: Record<TypographyMD2Variant, TypeScaleVariant> = {
  h1:        'displayLarge',
  h2:        'displayMedium',
  h3:        'displaySmall',
  h4:        'headlineLarge',
  h5:        'headlineMedium',
  h6:        'headlineSmall',
  subtitle1: 'titleLarge',
  subtitle2: 'titleMedium',
  body1:     'bodyMedium',
  body2:     'bodySmall',
  caption:   'labelSmall',
  button:    'labelLarge',
  overline:  'labelMedium',
};
```

`TypeScaleVariant` (already defined) = `keyof TypographyScale` — the 15 MD3 names.

`Text.variant` prop type is widened from `TypeScaleVariant` to `TypeScaleVariant | TypographyMD2Variant`.

Render-time resolution in `Text.tsx`:
```typescript
const resolvedVariant: TypeScaleVariant =
  typographyVariantMap[variant as TypographyMD2Variant] ?? (variant as TypeScaleVariant);
```

---

## 4. RN-Deviation Registry (FR-036)

All items tagged with `// RN-DEVIATION:` comments in source.

| MUI Feature | Reason for Deviation | RN Alternative | Source Location |
|-------------|---------------------|----------------|-----------------|
| `Dialog.onClose` reason `'backdropClick'` | No DOM click events in RN | `'backdropPress'` | `src/components/Dialog/types.ts` |
| `Dialog.onClose` reason `'escapeKeyDown'` | No keyboard escape key on touch screen | `'hardwareBackPress'` (Android) | `src/components/Dialog/types.ts` |
| `TablePagination.onPageChange(event, page)` | No `React.MouseEvent` in RN | `onPageChange(page: number)` | `src/components/Table/TablePagination.tsx` |
| `Table.stickyHeader` | No CSS `position: sticky` in RN | RN-specific `position: 'absolute'` header with `paddingTop` on body | `src/components/Table/Table.tsx` |
| `TransferList` component | Drag-and-drop relies on HTML5 Drag API (DOM only) | `react-native-draggable-flatlist` or custom `PanGestureHandler` solution | `src/components/TransferList/index.ts` |
| `TextareaAutosize` component | CSS-based auto-resize is a DOM feature | `TextField multiline minRows/maxRows` | N/A — document in TextField JSDoc |
| `Popper` component | Depends on DOM `getBoundingClientRect` and viewport-relative CSS positioning | `Modal` or `Menu` for overlay positioning | `src/components/Popper/index.ts` |
| `Portal` component | Uses React DOM `createPortal` to render into a separate DOM node | Not needed in RN — `Modal` handles z-ordering natively | `src/components/Portal/index.ts` |
| `NoSsr` utility | SSR guard for Next.js / Remix (no SSR in standard RN) | Not applicable; render normally | N/A — note in README |

---

## 5. New Component Props Summary

### AvatarGroup

```typescript
interface AvatarGroupProps {
  children: ReactNode;
  max?: number;                              // default: 5
  total?: number;                            // overrides computed surplus
  spacing?: 'medium' | 'small' | number;    // default: 'medium'
  variant?: 'circular' | 'rounded' | 'square'; // default: 'circular'
  renderSurplus?: (surplus: number) => ReactNode;
  sx?: ThemeSxProp;
}
```

### CircularProgress (extended)

Adds to existing props: `thickness?: number` (default 3.6), `disableShrink?: boolean` (default false), `enableTrackSlot?: boolean` (default false).

### Card Sub-Components

See `contracts/card-sub-components.ts` for full TypeScript interfaces.

| Sub-component | Key props |
|---------------|-----------|
| `CardHeader` | `avatar`, `title`, `subheader`, `action` (all ReactNode) |
| `CardMedia` | `image: string`, `height`, `alt`, `component` |
| `CardContent` | `children` |
| `CardActions` | `children`, `disableSpacing?: boolean` |
| `CardActionArea` | `children`, `onPress`, `disabled` |

### Dialog (extended + sub-components)

Adds to existing Dialog props: `open`, `onClose(reason)`, `title: ReactNode` (widened), `fullScreen`, `fullWidth`, `maxWidth`, `scroll`.

See `contracts/dialog-sub-components.ts` for sub-component interfaces.

| Sub-component | Key props |
|---------------|-----------|
| `DialogTitle` | `children` |
| `DialogContent` | `children`, `dividers?: boolean` |
| `DialogContentText` | `children` |
| `DialogActions` | `children`, `disableSpacing?: boolean` |

### Table Family

See `contracts/table-family.ts` for full TypeScript interfaces.

| Component | Key props / deviations |
|-----------|----------------------|
| `TableContainer` | `children`, scroll wrapper |
| `Table` | `stickyHeader`, `size`, `padding` — RN-DEVIATION on stickyHeader |
| `TableHead` | `children` |
| `TableBody` | `children` |
| `TableFooter` | `children` |
| `TableRow` | `children`, `selected`, `hover`, `onPress` |
| `TableCell` | `align`, `padding`, `size`, `sortDirection`, `variant` |
| `TableSortLabel` | `active`, `direction`, `onPress`, `hideSortIcon` |
| `TablePagination` | `count`, `page`, `rowsPerPage`, `onPageChange(page)` — RN-DEVIATION: no event arg |

### TextField (extended)

Adds to existing props: `variant: 'filled' \| 'outlined' \| 'standard'` (extends existing enum), `multiline`, `rows`, `minRows`, `maxRows`, `fullWidth`, `required`, `select`, `helperText`, `error`.

---

## 6. State Transitions

### `TextField error` prop resolution

```text
error = undefined  →  no error styling; supportingText (or helperText) renders normally
error = false      →  no error styling
error = true       →  error styling applied; helperText (or supportingText) renders normally
error = "string"   →  error styling applied
                   AND if helperText is not supplied → "string" is also rendered as helper text
                   AND if helperText IS supplied    → helperText takes precedence; string is only used for styling
```

### `AvatarGroup` surplus calculation

```text
childCount = React.Children.count(children)
effective_max = max - 1            // show max-1 avatars + 1 surplus slot
surplus = childCount - effective_max
(if total prop is provided, surplus = total - effective_max)
```

### Dual-alias resolution (all aliased components)

```text
resolvedProp = muiAlias ?? internalProp
if (__DEV__ && muiAlias !== undefined && internalProp !== undefined):
    console.warn('[mui-native] Both "open" and "visible" supplied to <Dialog>. "open" takes precedence.')
```
