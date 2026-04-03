# Tasks: Add Missing UI Components

**Input**: Design documents from `/specs/002-add-missing-components/`
**Prerequisites**: plan.md ✓ · spec.md ✓ · research.md ✓ · data-model.md ✓ · contracts/ ✓ · quickstart.md ✓

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies on in-progress tasks)
- **[Story]**: User story label (US1–US5); omitted for Setup / Foundational / Polish phases
- All paths are relative to repository root

---

## Phase 1: Setup

**Purpose**: Create directory skeleton for all 46 new components; no existing code is modified.

- [X] T001 Create directory tree for all 47 new components: `src/components/{Portal,TouchableRipple,Icon,Text,ActivityIndicator,Skeleton,Alert,Backdrop,Snackbar,Modal,Menu,Checkbox,RadioButton,Switch,Slider,Select,Searchbar,SegmentedButtons,ToggleButton,Autocomplete,NumberField,HelperText,ButtonGroup,TransferList,Tabs,Drawer,Stepper,Pagination,Breadcrumbs,SpeedDial,Avatar,Badge,List,DataTable,Divider,Tooltip,Rating,Banner,IconButton,Link,Box,Container,Grid,Stack,Paper,Accordion,ImageList}/`, plus `tests/unit/components/` and `stories/components/` sub-paths for each

**Checkpoint**: All 46 component folders exist; `npm test` and `npm run lint` still exit cleanly (no new source files yet).

---

## Phase 2: Foundational (Core Utility Components)

**Purpose**: Portal, Icon, Text, and TouchableRipple are consumed by virtually every subsequent component. They MUST be complete before any Phase 3–7 work begins.

**⚠️ CRITICAL**: All overlay components (US1) require Portal. All form and display interactions require TouchableRipple. Icon and Text are consumed across all phases.

- [X] T002 [P] Implement Portal host + gate pattern in `src/components/Portal/`: create `types.ts` (export `PortalProps`, `PortalHostProps`, `PortalContextValue` per `contracts/overlay-api.md`), `PortalContext.ts` (create context with `mount`/`unmount` per R-01), `Portal.tsx` (calls `context.mount/unmount` on mount/unmount with a unique key via `useId()`), `PortalHost.tsx` (registers portal `ViewManager` ref; renders `View` at z-top of tree), and `index.ts` (export `Portal`, `PortalHost`, `PortalProps`, `PortalHostProps`)
- [X] T003 [P] Implement `src/components/Icon/`: create `types.ts` (export `IconProps` — `source: (props: { size, color }) => ReactElement | null`, `size?: number`, `color?: string`, `testID?`, `accessibilityLabel?` per data-model.md), `Icon.tsx` (render-prop wrapper that resolves `color` from `theme.colorScheme.onSurface` when omitted; forwards `accessibilityLabel` as `accessibilityRole="image"` when provided), and `index.ts`
- [X] T004 [P] Implement `src/components/Text/`: create `types.ts` (export `TextProps` — `variant: TypeScaleVariant` union of all 15 MD3 type roles, plus `color?`, `align?`, `children`, standard RN `TextProps` passthrough), `Text.tsx` (calls `useTheme()`, resolves `style` from `theme.typography[variant]` + `theme.colorScheme.onSurface`; `allowFontScaling={true}`; `accessibilityRole="text"` unless overridden), and `index.ts`
- [X] T005 Implement `src/components/TouchableRipple/`: create `types.ts` (export `TouchableRippleProps` — `onPress?`, `onLongPress?`, `rippleColor?`, `disabled?`, `borderless?`, `children`, `testID?`, `accessibilityRole?`, `accessibilityLabel?`, `accessibilityState?`), `TouchableRipple.tsx` (uses `GestureDetector` + `Gesture.Tap()` from RNGK v2; Reanimated ripple scale/opacity on press; resolves `rippleColor` from `theme.colorScheme.onSurface` at 12% opacity; `minWidth`/`minHeight` ≥ 48 dp on hit target; `accessibilityState={{ disabled }}`), and `index.ts`
- [X] T006 [P] Create Storybook stories for core utilities: `stories/components/Portal.stories.tsx` (PortalHost at root wrapping example overlay), `stories/components/Icon.stories.tsx` (render-prop icon, size/color variants), `stories/components/Text.stories.tsx` (all 15 MD3 type variants in light + dark), `stories/components/TouchableRipple.stories.tsx` (press, long-press, disabled, borderless modes)

**Checkpoint**: `Portal`, `Icon`, `Text`, `TouchableRipple` all compile (`tsc --noEmit` clean). `PortalHost` renders a portal teleporter in Storybook. All 4 stories visible in both light and dark mode.

---

## Phase 3: User Story 1 — Feedback & Overlay Components (Priority: P1) 🎯 MVP

**Goal**: A developer can show loading spinners, error alerts, skeleton placeholders, modals, snackbars, backdrops, and contextual menus — all using the active color theme, with zero custom overlay wiring.

**Independent Test**: Render each component inside `<PortalHost><ThemeProvider>…</ThemeProvider></PortalHost>`. Verify each component displays in both light and dark mode with correct theme colors and that Portal-based components (Backdrop, Snackbar, Modal, Menu) appear above sibling views.

### Implementation for User Story 1

- [X] T007 [P] [US1] Implement `src/components/ActivityIndicator/`: create `types.ts` (export `ActivityIndicatorProps` — `size?: 'small'|'medium'|'large'`, `color?`, `animating?: boolean`, `hidesWhenStopped?: boolean`, `testID?`, `accessibilityLabel?`), `ActivityIndicator.tsx` (Reanimated `withRepeat(withTiming(2*Math.PI, ...))` rotation worklet on `useSharedValue`; respects `useReduceMotion()` — when true, shows static circle; resolves color from `theme.colorScheme.primary`; `accessibilityRole="progressbar"`), and `index.ts`
- [X] T008 [P] [US1] Implement `src/components/Skeleton/`: create `types.ts` (export `SkeletonProps` — `width: number|string`, `height: number`, `variant?: 'rectangular'|'circular'|'text'`, `animation?: 'wave'|'pulse'|false`, `testID?`), `Skeleton.tsx` (Reanimated `withRepeat` shimmer — interpolates `backgroundColor` between `theme.colorScheme.surfaceVariant` and `theme.colorScheme.surface` per R-05; `reduceMotion` disables animation; circular variant uses `borderRadius: width/2`), and `index.ts`
- [X] T009 [P] [US1] Implement `src/components/Alert/`: create `types.ts` (export `AlertProps` — `severity: 'error'|'warning'|'info'|'success'`, `title?`, `action?`, `onClose?`, `children`, `testID?`), `Alert.tsx` (resolves container bg, icon color, and border from severity—mapped to MD3 `error`/`warning`/`tertiary`/`primary` color roles in theme; renders `Icon` + `Text` title + children + optional close `IconButton`; `accessibilityRole="alert"`), and `index.ts`
- [X] T010 [P] [US1] Implement `src/components/Backdrop/`: create `types.ts` (export `BackdropProps` per `contracts/overlay-api.md` — `visible`, `onDismiss?`, `opacity?`), `Backdrop.tsx` (renders via `Portal`; Reanimated `withTiming` fade 200 ms `motion.short2` on `visible` change; `reduceMotion` skips animation; `Pressable` scrim calls `onDismiss`; `accessibilityViewIsModal={true}` on scrim; blocks pointer events behind when visible), and `index.ts`
- [X] T011 [US1] Implement `src/components/Snackbar/`: create `types.ts` (export `SnackbarProps`, `SnackbarItem`, `SnackbarHostProps`), `useSnackbarQueue.ts` (FIFO reducer per R-02 — actions: `ADD`, `DISMISS`, `NEXT`; `duration` defaults: short=4000 ms, long=7000 ms; auto-dismiss via `useEffect` + `setTimeout`), `Snackbar.tsx` (renders via `Portal`; single `SnackbarItem` at a time; Reanimated slide-up from bottom 300 ms + fade; `reduceMotion` skips animation; action button calls `action.onPress`; `accessibilityLiveRegion="polite"`), `SnackbarHost.tsx` (provides queue context; renders active Snackbar), and `index.ts`
- [X] T012 [US1] Implement `src/components/Modal/`: create `types.ts` (export `ModalProps` per `contracts/overlay-api.md` — `visible`, `onDismiss?`, `dismissible?`, `children`, `testID?`), `Modal.tsx` (renders via `Portal`; Reanimated spring scale 0.9→1.0 + fade on enter/exit per R-12; keyboard-aware via `KeyboardAvoidingView` (Platform-specific behavior); scrim Pressable calls `onDismiss` when `dismissible`; `accessibilityViewIsModal={true}`; `reduceMotion` replaces spring with instant show/hide), and `index.ts`
- [X] T013 [US1] Implement `src/components/Menu/`: create `types.ts` (export `MenuProps` — `visible`, `anchor: React.RefObject<View>`, `onDismiss?`, `children`, `testID?`; export `MenuItemProps` — `label`, `leadingIcon?`, `onPress?`, `disabled?`), `Menu.tsx` (renders via `Portal`; positions dropdown below anchor using `measure()` per R-06; Reanimated scale + fade 150 ms on open/close; `reduceMotion` skips; `MenuItem` uses `TouchableRipple`; `accessibilityRole="menu"` on container; `accessibilityRole="menuitem"` on each item), and `index.ts`
- [X] T014 [P] [US1] Create Storybook stories: `stories/components/ActivityIndicator.stories.tsx` (sizes, animating/stopped, dark mode), `stories/components/Skeleton.stories.tsx` (variants, wave/pulse/false, dark), `stories/components/Alert.stories.tsx` (all 4 severities, with/without close action), `stories/components/Backdrop.stories.tsx` (visible/hidden toggle), `stories/components/Snackbar.stories.tsx` (single message, queued messages, with action), `stories/components/Modal.stories.tsx` (dismissible/non-dismissible, keyboard open scenario), `stories/components/Menu.stories.tsx` (anchor positioning, disabled items, icons)

**Checkpoint**: US1 complete. All 7 components render correctly. Snackbar queues multiple messages FIFO. Modal is not obscured by keyboard. Menu anchors below trigger. All stories show in light + dark.

---

## Phase 4: User Story 2 — Form Control Components (Priority: P1)

**Goal**: A developer can build complete forms with checkboxes, radios, switches, sliders, selects, search, segmented buttons, toggles, autocomplete, number fields, helper text, button groups, and transfer lists — all consistent, accessible, and controlled.

**Independent Test**: Each control renders with `value`/`onValueChange` props. Simulate press/gesture interactions via `@testing-library/react-native` `fireEvent`; verify state changes are reflected visually and callbacks fire.

### Implementation for User Story 2

- [X] T015 [P] [US2] Implement `src/components/Checkbox/`: create `types.ts` (export `CheckboxProps` — `status: 'checked'|'unchecked'|'indeterminate'`, `onPress?`, `disabled?`, `color?`, `testID?`, `accessibilityLabel?`), `Checkbox.tsx` (uses `TouchableRipple`; Reanimated scale + opacity for check-mark reveal; resolves color from `theme.colorScheme.primary`; `accessibilityRole="checkbox"`, `accessibilityState={{ checked, disabled }}`; `reduceMotion` skips animation), and `index.ts`
- [X] T016 [P] [US2] Implement `src/components/RadioButton/` with compound `RadioGroup`: create `types.ts` (export `RadioButtonProps`, `RadioGroupProps`, `RadioGroupContextValue`), `RadioButtonContext.ts`, `RadioButton.tsx` (reads group context; `TouchableRipple`; animated scale on select; `accessibilityRole="radio"`, `accessibilityState={{ checked, disabled }}`), `RadioGroup.tsx` (provides context `value`+`onValueChange`; renders children), and `index.ts`
- [X] T017 [P] [US2] Implement `src/components/Switch/`: create `types.ts` (export `SwitchProps` — `value`, `onValueChange`, `disabled?`, `color?`, `testID?`), `Switch.tsx` (`Gesture.Pan()` + `Gesture.Tap()` RNGK; Reanimated `useSharedValue` for thumb X position and track color interpolation; thumb color from `theme.colorScheme.onPrimary`; track from `theme.colorScheme.primary` when on, `theme.colorScheme.surfaceVariant` when off; `accessibilityRole="switch"`, `accessibilityState={{ checked: value, disabled }}`; touch target ≥ 48 dp; `reduceMotion` snaps without animation), and `index.ts`
- [X] T018 [P] [US2] Implement `src/components/Slider/`: create `types.ts` (export `SliderProps` — `value`, `onValueChange`, `onSlidingComplete?`, `min?`, `max?`, `step?`, `disabled?`, `marks?`, `testID?`), `Slider.tsx` (`Gesture.Pan()` on thumb; Reanimated `useSharedValue` for position + track fill width; clamps value to `[min,max]` with step snapping; `accessibilityRole="adjustable"`, `accessibilityValue={{ min, max, now: value }}`; touch target ≥ 48 dp; `reduceMotion` has no visible effect — gestures are direct), and `index.ts`
- [X] T019 [US2] Implement `src/components/Select/`: create `types.ts` (export `SelectProps` — `value`, `onValueChange`, `options: SelectOption[]`, `label?`, `placeholder?`, `disabled?`, `multiple?`, `testID?`; export `SelectOption` — `value: string`, `label: string`, `disabled?`), `Select.tsx` (renders trigger `TouchableRipple` that calls `anchor.current.measure()` per R-06 then mounts dropdown via `Portal`; dropdown shows `TouchableRipple`-wrapped options; `accessibilityRole="combobox"` on trigger; `accessibilityRole="listbox"` on dropdown; selected item highlighted with `theme.colorScheme.primaryContainer`), and `index.ts`
- [X] T020 [P] [US2] Implement `src/components/Searchbar/`: create `types.ts` (export `SearchbarProps` — `value`, `onChangeText`, `onSubmitEditing?`, `onClearIconPress?`, `placeholder?`, `icon?`, `right?`, `loading?`, `disabled?`, `testID?`), `Searchbar.tsx` (uses `TextInput` with leading search `Icon`; clear `IconButton` visible when value non-empty; `loading` shows `ActivityIndicator` as trailing element; `accessibilityRole="search"`), and `index.ts`
- [X] T021 [P] [US2] Implement `src/components/SegmentedButtons/`: create `types.ts` (export `SegmentedButtonsProps` — `value: string|string[]`, `onValueChange`, `buttons: SegmentButtonItem[]`, `multiSelect?`, `density?`, `testID?`; export `SegmentButtonItem` — `value`, `label?`, `icon?`, `disabled?`), `SegmentedButtons.tsx` (renders `TouchableRipple` buttons in row separated by 1dp dividers; active button fills with `theme.colorScheme.secondaryContainer`; `accessibilityRole="radiogroup"` / `"group"` on container, `accessibilityRole="radio"` / `"checkbox"` on each button), and `index.ts`
- [X] T022 [P] [US2] Implement `src/components/ToggleButton/` with compound `ToggleButtonGroup`: create `types.ts` (export `ToggleButtonProps`, `ToggleButtonGroupProps`), `ToggleButtonGroup.tsx` (context providing `value`+`onValueChange`+`disabled`), `ToggleButton.tsx` (uses `TouchableRipple`; reads group context; active state fills with `theme.colorScheme.secondaryContainer`; `accessibilityRole="button"`, `accessibilityState={{ pressed: selected, disabled }}`), and `index.ts`
- [X] T023 [US2] Implement `src/components/Autocomplete/`: create `types.ts` (export `AutocompleteProps` — `value`, `onValueChange`, `options: AutocompleteOption[]`, `filterOptions?`, `getOptionLabel?`, `inputValue?`, `onInputChange?`, `multiple?`, `freeSolo?`, `loading?`, `disabled?`, `testID?`), `Autocomplete.tsx` (text input shows suggestions list via `Portal` dropdown; default `filterOptions` does case-insensitive substring match; `freeSolo` allows arbitrary input; loading state shows `ActivityIndicator`; keyboard navigation via `onKeyPress`; `accessibilityRole="combobox"` on input), and `index.ts`
- [X] T024 [US2] Implement `src/components/NumberField/`: create `types.ts` (export `NumberFieldProps` — `value`, `onValueChange`, `min?`, `max?`, `step?`, `decimalScale?`, `prefix?`, `suffix?`, `disabled?`, `testID?`), `NumberField.tsx` (wraps `TextInput` with numeric keyboard; increment (`+`) and decrement (`−`) `IconButton` controls; validates input on blur; clamps to `[min,max]`; `accessibilityRole="spinbutton"`, `accessibilityValue={{ min, max, now: value }}`), and `index.ts`
- [X] T025 [P] [US2] Implement `src/components/HelperText/`: create `types.ts` (export `HelperTextProps` — `type: 'normal'|'error'|'info'`, `visible?`, `padding?: 'normal'|'none'`, `children`, `testID?`), `HelperText.tsx` (uses `Text` component; `error` type resolves color from `theme.colorScheme.error`; includes optional leading `Icon` for info/error indicators; `accessibilityRole="text"`), and `index.ts`
- [X] T026 [P] [US2] Implement `src/components/ButtonGroup/`: create `types.ts` (export `ButtonGroupProps` — `variant?: ButtonVariant`, `orientation?: 'horizontal'|'vertical'`, `disabled?`, `size?`, `children`, `testID?`), `ButtonGroup.tsx` (renders children `Button` in row/column; injects shared `variant`/`disabled`/`size` via `ButtonGroupContext`; draws 1dp `theme.colorScheme.outline` dividers between buttons; collapses adjacent border radii except outer corners), and `index.ts`
- [X] T027 [US2] Implement `src/components/TransferList/`: create `types.ts` (export `TransferListProps` — `left: TransferItem[]`, `right: TransferItem[]`, `onTransfer: (left, right) => void`, `leftTitle?`, `rightTitle?`, `testID?`; export `TransferItem` — `id`, `label`), `TransferList.tsx` (renders two list panels side-by-side; ⚠️ Implement internal rows using `FlatList` directly — **do NOT import the `List` component from Phase 6/T039** to avoid a cross-phase dependency; migrate to `List` once T039 is merged. `Checkbox` per item; "→" / "←" / "→→" / "←←" action `Button`s in center column; selected-items count shown in panel header; `accessibilityLabel` on each transfer button describes the action), and `index.ts`
- [X] T028 [P] [US2] Create Storybook stories batch 1: `stories/components/Checkbox.stories.tsx` (checked/unchecked/indeterminate, disabled, color override), `stories/components/RadioButton.stories.tsx` (group of 3, disabled item), `stories/components/Switch.stories.tsx` (on/off, disabled), `stories/components/Slider.stories.tsx` (basic, marks, step, disabled), `stories/components/Select.stories.tsx` (single, multiple, placeholder, disabled), `stories/components/Searchbar.stories.tsx` (empty, with value, loading), `stories/components/SegmentedButtons.stories.tsx` (single/multi select, with icons)
- [X] T029 [P] [US2] Create Storybook stories batch 2: `stories/components/ToggleButton.stories.tsx` (standalone and group), `stories/components/Autocomplete.stories.tsx` (single, multiple, freeSolo, loading), `stories/components/NumberField.stories.tsx` (basic, min/max/step, prefix/suffix), `stories/components/HelperText.stories.tsx` (normal/error/info, visible toggle), `stories/components/ButtonGroup.stories.tsx` (horizontal/vertical, all variants), `stories/components/TransferList.stories.tsx` (initial items, moving items between panels)

**Checkpoint**: US2 complete. All 13 form controls render. Controlled `value`/`onValueChange` pattern verified for each. `disabled` state rendered for all where required by FR-015. All 13 stories show in light + dark.

---

## Phase 5: User Story 3 — Navigation & Structural Components (Priority: P2)

**Goal**: A developer can add tabbed navigation, a side drawer, a step-by-step stepper, pagination controls, breadcrumbs, and a speed-dial action button to any screen — animated, accessible, and fully themed.

**Independent Test**: Render `<Tabs>` with 3 tabs and press label → verify active panel changes and indicator moves. Render `<Drawer open={false}>` → `open={true}` → verify slide-in animation triggered. Render `<Stepper activeStep={1}>` with 4 steps → verify step states.

### Implementation for User Story 3

- [X] T030 [P] [US3] Implement `src/components/Tabs/` with compound `TabPanel`: create `types.ts` (export `TabsProps`, `TabProps`, `TabPanelProps` per `contracts/navigation-api.md` — `value`, `onChange`, `variant?: 'standard'|'scrollable'|'fullWidth'`, `scrollButtons?`), `TabsContext.ts`, `Tabs.tsx` (renders `ScrollView` when `scrollable`; Reanimated `useSharedValue` for indicator position/width via `measure()` on tab press per R-08; `reduceMotion` snaps indicator; `accessibilityRole="tablist"` on container, `accessibilityRole="tab"` + `accessibilityState={{ selected }}` per tab), `TabPanel.tsx` (renders children only when `value === selectedValue`; `accessibilityRole="tabpanel"`), and `index.ts`
- [X] T031 [US3] Implement `src/components/Drawer/`: create `types.ts` (export `DrawerProps` per `contracts/navigation-api.md` — `open`, `onClose?`, `anchor?: 'left'|'right'`, `variant?: 'temporary'|'permanent'|'persistent'`, `width?`, `children`, `testID?`), `Drawer.tsx` (`Gesture.Pan()` for swipe-to-close; Reanimated slide from `anchor` side per R-07 — `temporary` variant: portal + scrim; `permanent`: static; `persistent`: pushes content; `reduceMotion` disables slide animation; `accessibilityRole="navigation"`; ≥ 44pt touch target on close handle; FR-013 compliance: left/right anchor + modal mode), and `index.ts`
- [X] T032 [P] [US3] Implement `src/components/Stepper/` with compound `Step`: create `types.ts` (export `StepperProps`, `StepProps`, `StepLabelProps`, `StepConnectorProps` per `contracts/navigation-api.md`), `StepperContext.ts`, `Stepper.tsx` (horizontal/vertical layout; provides active/completed state via context; steps numbered or icon per state), `Step.tsx`, `StepLabel.tsx` (complete: check icon + primary color; active: filled circle + primary; upcoming: outline circle + surfaceVariant), `StepConnector.tsx`, and `index.ts`
- [X] T033 [P] [US3] Implement `src/components/Pagination/`: create `types.ts` (export `PaginationProps` — `count`, `page`, `onPageChange`, `siblingCount?`, `boundaryCount?`, `showFirstButton?`, `showLastButton?`, `disabled?`, `size?`, `testID?`), `Pagination.tsx` (renders prev/next `IconButton` + page number buttons via `TouchableRipple`; active page uses `theme.colorScheme.primary`; truncates to "…" beyond boundary; `accessibilityRole="navigation"`; `accessibilityLabel="pagination"` on container; aria-current="page" equivalent: `accessibilityState={{ selected: true }}` on active page), and `index.ts`
- [X] T034 [P] [US3] Implement `src/components/Breadcrumbs/`: create `types.ts` (export `BreadcrumbsProps` — `separator?: ReactNode`, `maxItems?`, `itemsBeforeCollapse?`, `itemsAfterCollapse?`, `children`, `testID?`), `Breadcrumbs.tsx` (renders children with `separator` element between; last item has no press affordance; when items > `maxItems` collapses middle items with "…" expander `TouchableRipple`; `accessibilityRole="none"` on container with `aria-label="breadcrumb"`), and `index.ts`
- [X] T035 [P] [US3] Implement `src/components/SpeedDial/` with `SpeedDialAction`: create `types.ts` (export `SpeedDialProps`, `SpeedDialActionProps` per `contracts/navigation-api.md`), `SpeedDial.tsx` (main FAB button; Reanimated staggered slide-up + fade for action buttons on open; `Gesture.Tap()` on backdrop closes dial; `reduceMotion` shows/hides actions instantly; `accessibilityRole="group"`, main button `accessibilityLabel` = "Speed Dial" merged with open state), `SpeedDialAction.tsx` (mini FAB with `Icon` + optional `tooltipTitle` label on long-press), and `index.ts`
- [X] T036 [P] [US3] Create Storybook stories: `stories/components/Tabs.stories.tsx` (standard/scrollable/fullWidth, with icons, panel switching), `stories/components/Drawer.stories.tsx` (left/right anchor, temporary/permanent, swipe-to-close), `stories/components/Stepper.stories.tsx` (horizontal/vertical, active step 0–3), `stories/components/Pagination.stories.tsx` (10 pages, first/last buttons, disabled), `stories/components/Breadcrumbs.stories.tsx` (3 levels, separator variants, collapsed), `stories/components/SpeedDial.stories.tsx` (open/close, 3 actions, tooltips)

**Checkpoint**: US3 complete. Tabs indicator animated on tab change. Drawer slides in from left/right with correct FR-013 compliance. Stepper shows step states. All 6 stories visible in light + dark.

---

## Phase 6: User Story 4 — Display & Content Components (Priority: P2)

**Goal**: A developer can display user avatars with fallback, overlay badges, scroll through list items, browse data tables, separate sections with dividers, show tooltips on press, rate content with stars, show banner notices, trigger icon buttons, and navigate with links.

**Independent Test**: Render each component with representative props; verify `accessibilityRole` and visual structure. `<Avatar />` with no source shows initials. `<Badge content={100}>` shows "99+". `<DataTable>` empty state renders slot.

### Implementation for User Story 4

- [X] T037 [P] [US4] Implement `src/components/Avatar/`: create `types.ts` (export `AvatarProps` per `contracts/display-api.md` — `source?: ImageSourcePropType`, `label?: string`, `icon?: IconSource`, `size?`, `color?`, `style?`, `testID?`), `Avatar.tsx` (renders circular `Image` when `source`; falls back to initials from `label` (first two letters) in a filled circle using `theme.colorScheme.primaryContainer`; then falls back to default user `Icon`; `accessibilityRole="image"`, `accessibilityLabel` defaults to `label` or "avatar"), and `index.ts`
- [X] T038 [P] [US4] Implement `src/components/Badge/`: create `types.ts` (export `BadgeProps` per `contracts/display-api.md` — `content?: number|string`, `max?`, `invisible?`, `overlap?`, `anchorOrigin?`, `color?`, `children`, `testID?`), `Badge.tsx` (absolutely-positioned mini-badge at `anchorOrigin` (default top-right) of `children`; when `content > max` (default 99) renders `"${max}+"` string; `invisible` hides badge; resolves background from `theme.colorScheme.error` by default; `accessibilityLabel` announces count), and `index.ts`
- [X] T039 [US4] Implement `src/components/List/` with sub-components: create `types.ts` (export `ListProps`, `ListItemProps`, `ListItemButtonProps`, `ListSectionProps` per `contracts/display-api.md`), `List.tsx` (container with optional `ScrollView`; `accessibilityRole="list"`), `ListItem.tsx` (non-interactive item; leading/trailing slots; 2-line/3-line variants), `ListItemButton.tsx` (uses `TouchableRipple`; `accessibilityRole="button"`; selected state fills with `theme.colorScheme.primaryContainer`; ≥ 48dp touch height), `ListSection.tsx` (header `Text` + divider + grouped items), and `index.ts`
- [X] T040 [US4] Implement `src/components/DataTable/` with sub-components: create `types.ts` (export `DataTableProps`, `DataTableHeaderProps`, `DataTableRowProps`, `DataTableCellProps`, `DataTableTitleProps` per `contracts/display-api.md`), `DataTable.tsx` (wraps `ScrollView`; provides sort/selection context; empty-state `renderEmpty` slot per spec edge case; FR-012 sortable columns + row selection + pagination), `DataTableHeader.tsx`, `DataTableTitle.tsx` (sortable column with `Icon` indicator; `onSort` callback with `direction: 'asc'|'desc'`; `accessibilityRole="columnheader"`, `accessibilityState={{ sort }}`), `DataTableRow.tsx` (optional `Checkbox` for selection; `selected` state fills row with `theme.colorScheme.primaryContainer` at 8% opacity), `DataTableCell.tsx`, and `index.ts`
- [X] T041 [P] [US4] Implement `src/components/Divider/`: create `types.ts` (export `DividerProps` — `orientation?: 'horizontal'|'vertical'`, `inset?: boolean|number`, `bold?`, `style?`, `testID?`), `Divider.tsx` (renders 1dp `View` with `backgroundColor: theme.colorScheme.outlineVariant`; `inset` adds left margin; bold uses 2dp; `accessibilityRole="separator"`), and `index.ts`
- [X] T042 [US4] Implement `src/components/Tooltip/`: create `types.ts` (export `TooltipProps` per `contracts/overlay-api.md` / `contracts/display-api.md` — `title`, `children`, `enterDelay?`, `leaveDelay?`, `placement?`, `testID?`), `Tooltip.tsx` (wraps child in `TouchableOpacity`; long-press shows tooltip via `Portal`; positions near element using `measure()` per R-09; Reanimated fade 150 ms; auto-hides after 1500 ms; `accessibilityLabel` on child includes `title`; `reduceMotion` skips fade), and `index.ts`
- [X] T043 [P] [US4] Implement `src/components/Rating/`: create `types.ts` (export `RatingProps` per `contracts/display-api.md` — `value`, `onChange?`, `max?`, `precision?`, `size?`, `icon?`, `emptyIcon?`, `readOnly?`, `disabled?`, `testID?`), `Rating.tsx` (renders `max` star icons; filled stars use `icon` or default star; empty use `emptyIcon`; `precision=0.5` uses half-star overlay; `TouchableRipple` on each star if not `readOnly`; `accessibilityRole="slider"`, `accessibilityValue={{ min: 0, max, now: value }}`), and `index.ts`
- [X] T044 [P] [US4] Implement `src/components/Banner/`: create `types.ts` (export `BannerProps` per `contracts/display-api.md` — `visible`, `icon?`, `actions?: BannerAction[]`, `children`, `testID?`; export `BannerAction` — `label`, `onPress`), `Banner.tsx` (animates height from 0 to `auto` using Reanimated `useSharedValue` + `measure` on content; optional `Icon` in leading slot; action `Button`s in trailing row; surface color `theme.colorScheme.surface`; `accessibilityRole="alert"` when visible; `reduceMotion` skips height animation), and `index.ts`
- [X] T045 [P] [US4] Implement `src/components/IconButton/`: create `types.ts` (export `IconButtonProps` per `contracts/display-api.md` — `icon: IconSource`, `variant?: 'standard'|'outlined'|'filled'|'tonal'`, `selected?`, `size?`, `disabled?`, `onPress?`, `testID?`, `accessibilityLabel?`), `IconButton.tsx` (uses `TouchableRipple`; 4 variants map to different background/icon colors from theme; ≥ 48×48dp touch target enforced; `accessibilityRole="button"`, `accessibilityState={{ selected: selected??false, disabled }}`), and `index.ts`
- [X] T046 [P] [US4] Implement `src/components/Link/`: create `types.ts` (export `LinkProps` — extends `TextProps`; adds `href?`, `onPress?`, `underline?: 'always'|'hover'|'none'`, `color?`, `testID?`), `Link.tsx` (wraps `Text`; resolves default `color` from `theme.colorScheme.primary`; underline applied via `textDecorationLine`; `accessibilityRole="link"`; when `href` provided calls `Linking.openURL` on press), and `index.ts`
- [X] T047 [P] [US4] Create Storybook stories: `stories/components/Avatar.stories.tsx` (image/initials/icon fallbacks, sizes), `stories/components/Badge.stories.tsx` (number/text/99+/invisible, overlap variants), `stories/components/List.stories.tsx` (simple items, with icons, pressable, sections), `stories/components/DataTable.stories.tsx` (headers+rows, sortable, selectable, empty state), `stories/components/Divider.stories.tsx` (horizontal/vertical, inset, bold), `stories/components/Tooltip.stories.tsx` (long-press trigger, placement variants), `stories/components/Rating.stories.tsx` (1–5 stars, half-star, readOnly), `stories/components/Banner.stories.tsx` (visible/hidden animate, with icon+actions), `stories/components/IconButton.stories.tsx` (all 4 variants, selected, disabled), `stories/components/Link.stories.tsx` (underline modes, color override, href)

**Checkpoint**: US4 complete. Avatar fallback chain works. Badge shows "99+" when content > 99. DataTable empty-state slot renders. Tooltip appears above trigger. All 10 stories in light + dark.

---

## Phase 7: User Story 5 — Layout Primitives (Priority: P3)

**Goal**: A developer can compose screens using Box/Container/Grid/Stack for layout, Paper for elevated surfaces, Accordion for collapsible sections, and ImageList for photo grids — all using theme tokens, no hardcoded dimensions.

**Independent Test**: Render `<Grid columns={2}>` with 4 items → verify 2-column layout. Render `<Accordion>` → tap summary → verify details expand with animation. Render `<Stack spacing={2}>` → verify uniform gap between 3 children.

### Implementation for User Story 5

- [X] T048 [P] [US5] Implement `src/components/Box/`: create `types.ts` (export `BoxProps` — extends `ViewProps`; adds shorthand spacing tokens: `m?`, `mt?`, `mb?`, `ml?`, `mr?`, `mx?`, `my?`, `p?`, `pt?`, `pb?`, `pl?`, `pr?`, `px?`, `py?` mapped to `theme.spacing` token values; `sx?: ViewStyle` escape hatch), `Box.tsx` (resolves spacing props into `ViewStyle`; calls `useTheme()` for token scale; renders `View` with merged styles; `testID` forwarded), and `index.ts`
- [X] T049 [P] [US5] Implement `src/components/Container/`: create `types.ts` (export `ContainerProps` — `maxWidth?: 'xs'|'sm'|'md'|'lg'|'xl'|false|number`, `disableGutters?`, `fixed?`, `children`, `testID?`), `Container.tsx` (centers content with `alignSelf: 'center'`; applies `maxWidth` pixel values from breakpoint map: xs=444, sm=600, md=900, lg=1200, xl=1536; horizontal padding from `theme.spacing.lg` unless `disableGutters`; FR-011 no visual side effects on children), and `index.ts`
- [X] T050 [P] [US5] Implement `src/components/Grid/`: create `types.ts` (export `GridProps` — `columns?`, `spacing?`, `rowSpacing?`, `columnSpacing?`, `children`, `testID?`; export `GridItemProps` — `xs?|sm?|md?|lg?|xl?` column-span numbers), `Grid.tsx` (flex-wrap row per R-10; each `GridItem` child width = `(span/columns) * 100% - gutter`; `spacing` maps to `theme.spacing` tokens; `GridItem` standalone component for explicit span; FR-011 no side effects on children), and `index.ts`
- [X] T051 [P] [US5] Implement `src/components/Stack/`: create `types.ts` (export `StackProps` — `direction?: 'row'|'column'|'row-reverse'|'column-reverse'`, `spacing?: number|string`, `divider?: ReactElement`, `wrap?`, `alignItems?`, `justifyContent?`, `children`, `testID?`), `Stack.tsx` (renders `View` with `flexDirection`; injects `gap` from `theme.spacing[spacing]` (or raw number); inserts `divider` clone between children when provided; `wrap` maps to `flexWrap`), and `index.ts`
- [X] T052 [P] [US5] Implement `src/components/Paper/`: create `types.ts` (export `PaperProps` — `elevation?: 0|1|2|3|4|5`, `variant?: 'elevation'|'outlined'`, `square?`, `children`, `testID?`, `style?`), `Paper.tsx` (resolves shadow from `theme.elevation[levelN]`; surface color tinted with elevation tint at `theme.elevation[levelN].tintOpacity`; `outlined` variant uses `theme.colorScheme.outline` border + no shadow; `square` skips border radius; `borderRadius` from `theme.shape.extraSmall`), and `index.ts`
- [X] T053 [US5] Implement `src/components/Accordion/` with sub-compounds: create `types.ts` (export `AccordionProps`, `AccordionSummaryProps`, `AccordionDetailsProps` per `contracts/layout-api.md`), `AccordionContext.ts` (expanded state), `Accordion.tsx` (manages expanded state; passes context; optional controlled mode via `expanded`/`onChange`), `AccordionSummary.tsx` (uses `TouchableRipple`; rotates expand `Icon` 0→180° via Reanimated on expanded; `accessibilityRole="button"`, `accessibilityState={{ expanded }}`; `reduceMotion` snaps icon), `AccordionDetails.tsx` (Reanimated height animation from 0 to measured height per R-11; `opacity` fade; `reduceMotion` shows/hides instantly), and `index.ts`
- [X] T054 [P] [US5] Implement `src/components/ImageList/` with `ImageListItem`: create `types.ts` (export `ImageListProps` — `cols?`, `gap?`, `variant?: 'standard'|'masonry'|'quilted'`, `rowHeight?`, `children`, `testID?`; export `ImageListItemProps` — `rows?`, `cols?`, `img: ImageSourcePropType`, `title?`, `actionIcon?`), `ImageList.tsx` (standard: equal-width columns via flex-wrap; masonry: staggered column ScrollView arrays per R-10; quilted: spans via absolute positioning), `ImageListItem.tsx` (renders `Image` filling allocated cell; optional title overlay bar with token background), and `index.ts`
- [X] T055 [P] [US5] Create Storybook stories: `stories/components/Box.stories.tsx` (spacing shorthands, sx prop), `stories/components/Container.stories.tsx` (all maxWidth breakpoints, gutters), `stories/components/Grid.stories.tsx` (2/3/4 columns, responsive spans, spacing), `stories/components/Stack.stories.tsx` (row/column, spacing, divider, wrap), `stories/components/Paper.stories.tsx` (elevation 0–5, outlined variant), `stories/components/Accordion.stories.tsx` (single expand, multiple, controlled), `stories/components/ImageList.stories.tsx` (standard/masonry/quilted, 6 images)

**Checkpoint**: US5 complete. Grid distributes items in correct column count. Accordion height animation triggers on summary tap. Paper reflects elevation shadows. All 7 stories in light + dark.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Barrel completeness, TypeScript gate, literal audits, RTL/a11y checks, full test run, and final commit.

- [X] T056 Update `src/index.ts` barrel: add export blocks for all 47 new components alphabetically — `Accordion`, `ActivityIndicator`, `Alert`, `Autocomplete`, `Avatar`, `Backdrop`, `Badge`, `Banner`, `Box`, `Breadcrumbs`, `ButtonGroup`, `Checkbox`, `Container`, `DataTable`, `Divider`, `Drawer`, `Grid`, `HelperText`, `Icon`, `IconButton`, `ImageList`, `Link`, `List`, `Menu`, `Modal`, `NumberField`, `Pagination`, `Paper`, `Portal`, `PortalHost`, `RadioButton`, `RadioGroup`, `Rating`, `Searchbar`, `SegmentedButtons`, `Select`, `Skeleton`, `Slider`, `Snackbar`, `SnackbarHost`, `SpeedDial`, `Stack`, `Stepper`, `Switch`, `Tabs`, `TabPanel`, `Text`, `ToggleButton`, `ToggleButtonGroup`, `Tooltip`, `TouchableRipple`, `TransferList` — plus all corresponding `*Props` type exports (FR-004)
- [X] T057 [P] TypeScript gate: run `tsc --noEmit` → must exit 0; fix all type errors in the 47 new component files before marking complete (SC-001 proxy: all types correctly inferred)
- [X] T058 [P] Token literal audit: run `grep -rE "#[0-9A-Fa-f]{3,8}" src/components/` scoped to the 47 new component directories → zero matches; run `grep -rE "[0-9]+(px|dp)" src/components/` (excluding `// RN-DEVIATION:` lines) → zero matches; fix any violations (FR-007 / SC-005)
- [X] T059 [P] RTL audit: run `grep -rE "style[^}]+'(left|right)'" src/components/` on new component files → all occurrences either use logical properties or carry a `// RN-DEVIATION:` comment; verify leading/trailing icon logic in Navigation, Form, and Display components uses `I18nManager`-aware start/end semantics
- [X] T060 [P] Accessibility audit for new interactive components: verify `minWidth`/`minHeight` ≥ 48 dp (or `hitSlop`) on all `TouchableRipple`-based components (Checkbox, RadioButton, Switch, ToggleButton, IconButton, ListItemButton, Rating star, SpeedDialAction); verify `accessibilityRole`, `accessibilityLabel`, `accessibilityState` present on all interactive components (SC-006 / FR-003)
- [X] T061 Run final quality gate: execute `npm test` → all tests pass; execute `npm run lint` → zero errors; verify SC-001 (all 47 components present in `src/components/` AND exported from `src/index.ts`); verify SC-007 (all 47 component Storybook stories load without console errors); verify Constitution §VI — all pure display components (Skeleton, Avatar, Badge, Divider, Icon, Text, HelperText, Breadcrumbs, Paper, ImageList, Tooltip) are wrapped in `React.memo`; commit `specs/002-add-missing-components/tasks.md` as execution record
- [X] T062 Write automated accessibility unit tests for all 47 interactive components: for each component in `tests/unit/components/`, add assertions using `toBeAccessible()` (jest-native matcher) and `getByRole()` queries from `@testing-library/react-native` covering primary interactive states; verify `accessibilityRole`, `accessibilityLabel`, and `accessibilityState` are present and correct on each rendered output (SC-005 / Constitution §V MUST)

---

## Dependencies (Story Completion Order)

```
Phase 1 (Setup — directory structure)
    └─► Phase 2 (Foundational: Portal, Icon, Text, TouchableRipple)  [BLOCKING for ALL stories]
            ├─► Phase 3 (US1: ActivityIndicator, Skeleton, Alert, Backdrop, Snackbar, Modal, Menu)  🎯 MVP
            │       └─► Phase 4 (US2: Checkbox, RadioButton, Switch, Slider, Select, Searchbar,
            │                        SegmentedButtons, ToggleButton, Autocomplete, NumberField,
            │                        HelperText, ButtonGroup, TransferList)
            │               ├─► Phase 5 (US3: Tabs, Drawer, Stepper, Pagination, Breadcrumbs, SpeedDial)
            │               └─► Phase 6 (US4: Avatar, Badge, List, DataTable, Divider, Tooltip,
            │                               Rating, Banner, IconButton, Link)
            │                       └─► Phase 7 (US5: Box, Container, Grid, Stack, Paper, Accordion, ImageList)
            │                               └─► Phase 8 (Polish & Gate)
            └─► Phase 5–7 can also start after Phase 2 if US1/US2 dependencies are individually met
```

**Phase 5 (US3)** can begin once Phase 2 and any required US1/US2 sub-components are done.
**Phase 6 (US4)** requires only Phase 2 (Icon + TouchableRipple) — DataTable/List/Avatar/etc. don't depend on US1.
**Phase 7 (US5)** — Box, Container, Stack, Paper, Grid, ImageList require only Phase 2; Accordion requires Phase 2 only.

---

## Parallel Execution Examples

### MVP Sprint (Phases 1–3)

```
[Sequential] T001 (mkdir)
[Parallel]   T002 (Portal), T003 (Icon), T004 (Text), T005 (TouchableRipple*)
             * TouchableRipple reads Icon but Icon need not be complete — it only composes at render time
[Parallel]   T007 (ActivityIndicator), T008 (Skeleton), T009 (Alert), T010 (Backdrop)
[Sequential] T011 (Snackbar — depends on Portal being done)
[Sequential] T012 (Modal — depends on Portal)
[Sequential] T013 (Menu — depends on Portal + TouchableRipple)
[Parallel]   T006 (Phase 2 stories), T014 (Phase 3 stories)
```

### Full Library Sprint (after US1 complete)

```
[Parallel]  T015 (Checkbox), T016 (RadioButton), T017 (Switch), T018 (Slider),
            T020 (Searchbar), T021 (SegmentedButtons), T022 (ToggleButton),
            T025 (HelperText), T026 (ButtonGroup)
[Sequential] T019 (Select — depends on Portal), T023 (Autocomplete — depends on Portal)
[Sequential] T024 (NumberField — standalone)
[Sequential] T027 (TransferList — depends on List from US4, or mock List for decoupling)
[Parallel]  T030 (Tabs), T032 (Stepper), T033 (Pagination), T034 (Breadcrumbs), T035 (SpeedDial)
[Sequential] T031 (Drawer — complex animation, solo)
[Parallel]  T037 (Avatar), T038 (Badge), T040 (DataTable*), T041 (Divider), T043 (Rating),
            T044 (Banner), T045 (IconButton), T046 (Link)
            * DataTable is complex — consider solo
[Sequential] T039 (List — compound component, solo)
[Sequential] T042 (Tooltip — depends on Portal)
[Parallel]  T048–T052 (Box, Container, Grid, Stack, Paper — all independent)
[Sequential] T053 (Accordion — Reanimated height, solo)
[Parallel]  T054 (ImageList), T055 (stories)
[Sequential] T056→T057→T058→T059→T060→T061 (Polish sequentially or T057-T060 in parallel)
```

---

## Implementation Strategy

**MVP Scope** (Phases 1–3): Core utilities + 7 feedback/overlay components (US1). After Phase 3, the library supports ActivityIndicator, Snackbar, Modal, Alert, Skeleton, Backdrop, Menu — covering the most common production-app needs. Ship as `v0.2.0`.

**Increment 2** (Phase 4): 13 form controls (US2) — covers all interactive input patterns. Ship as `v0.3.0`.

**Increment 3** (Phase 5 + 6): Navigation (US3) + Display (US4) — covers complex screen patterns. Ship as `v0.4.0`.

**Increment 4** (Phase 7 + 8): Layout primitives (US5) + Polish gate. Full 46-component parity with MUI + RN Paper. Ship as `v0.5.0`.

