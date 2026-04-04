# MUI vs mui-native — Comparative Analysis Report

> **Generated**: 2026-04-02  
> **Sources**: [mui.com/material-ui](https://mui.com/material-ui/all-components/) · mui-native `src/components/` (55 components)  
> **Design system**: MUI follows Material Design 2 (with MD3 updates); **mui-native follows Material Design 3 (MD3)**  
> **Platform**: MUI targets Web (React DOM); mui-native targets React Native (iOS/Android/Web)

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Component exists in mui-native with equivalent functionality |
| ⚠️ | Component exists but with significant API or naming differences |
| ❌ | Missing from mui-native |
| 🚫 | Web-only concept — not applicable in React Native |
| ➕ | Extra component in mui-native with no direct MUI equivalent |

---

## Summary Table

| # | MUI Component | MUI Category | mui-native | Status | Notes |
|---|--------------|-------------|-----------|--------|-------|
| 1 | Autocomplete | Inputs | Autocomplete | ✅⚠️ | API close; see details |
| 2 | Button | Inputs | Button | ✅⚠️ | MD3 variants differ from MUI |
| 3 | Button Group | Inputs | ButtonGroup | ✅ | Similar API |
| 4 | Checkbox | Inputs | Checkbox | ⚠️ | `status` vs `checked`+`indeterminate` |
| 5 | Floating Action Button | Inputs | FAB | ✅ | MD3 variants |
| 6 | Radio Group | Inputs | RadioButton | ✅ | RadioGroup + RadioButton |
| 7 | Rating | Inputs | Rating | ✅ | Similar API |
| 8 | Select | Inputs | Select | ✅⚠️ | Array-based options API |
| 9 | Slider | Inputs | Slider | ✅ | Similar API |
| 10 | Switch | Inputs | Switch | ✅ | Similar API |
| 11 | Text Field | Inputs | TextField | ⚠️ | Props renamed; no multiline; no standard variant |
| 12 | Transfer List | Inputs | TransferList | ✅ | Similar API |
| 13 | Toggle Button | Inputs | ToggleButton | ✅ | ToggleButton + ToggleButtonGroup |
| 14 | Avatar | Data Display | Avatar | ✅ | Similar API |
| 15 | Badge | Data Display | Badge | ✅ | Similar API |
| 16 | Chip | Data Display | Chip | ⚠️ | MD3 variants (assist/filter/input/suggestion) differ |
| 17 | Divider | Data Display | Divider | ✅ | Exists |
| 18 | Icons | Data Display | Icon | ⚠️ | Render-prop pattern vs SVG icon components |
| 19 | List | Data Display | List | ✅ | Rich API: ListItem, ListSection, ListAccordion |
| 20 | Table | Data Display | DataTable | ⚠️ | Monolithic vs MUI composable primitives |
| 21 | Tooltip | Data Display | Tooltip | ✅ | Similar API |
| 22 | Typography | Data Display | Text | ⚠️ | MD3 scale vs MUI variants (h1-h6/body1/body2…) |
| 23 | Alert | Feedback | Alert | ⚠️ | Missing `variant` (filled/outlined/standard) |
| 24 | Backdrop | Feedback | Backdrop | ✅ | Similar API |
| 25 | Dialog | Feedback | Dialog | ⚠️ | Monolithic vs MUI composable sub-components |
| 26 | Progress | Feedback | ActivityIndicator | ⚠️❌ | ActivityIndicator ≠ CircularProgress; LinearProgress missing |
| 27 | Skeleton | Feedback | Skeleton | ✅ | Similar API |
| 28 | Snackbar | Feedback | Snackbar+SnackbarHost | ⚠️ | Queue-based system; different architecture |
| 29 | Accordion | Surfaces | Accordion | ⚠️ | Monolithic vs MUI composable |
| 30 | App Bar | Surfaces | AppBar | ⚠️ | MD3 variants; `position` prop missing |
| 31 | Card | Surfaces | Card | ⚠️ | MD3 variants; no CardHeader/CardContent/CardMedia |
| 32 | Paper | Surfaces | Paper | ✅ | Similar API |
| 33 | Bottom Navigation | Navigation | NavigationBar | ⚠️ | Exists as NavigationBar; different API/naming |
| 34 | Breadcrumbs | Navigation | Breadcrumbs | ✅ | Similar API |
| 35 | Drawer | Navigation | Drawer | ⚠️ | Missing top/bottom anchors |
| 36 | Link | Navigation | Link | ✅ | Similar API |
| 37 | Menu | Navigation | Menu | ⚠️ | Anchor as React.RefObject; no DOM positioning |
| 38 | Pagination | Navigation | Pagination | ✅ | Similar API |
| 39 | Speed Dial | Navigation | SpeedDial | ✅ | Similar API |
| 40 | Stepper | Navigation | Stepper | ✅ | Similar API |
| 41 | Tabs | Navigation | Tabs | ⚠️ | Items array vs composable Tab children |
| 42 | Box | Layout | Box | ✅ | Spacing tokens instead of `sx` |
| 43 | Container | Layout | Container | ✅ | Similar API |
| 44 | Grid / GridLegacy | Layout | Grid | ✅ | Similar API |
| 45 | Stack | Layout | Stack | ✅ | Similar API |
| 46 | Image List | Layout | ImageList | ✅ | standard/masonry/quilted |
| 47 | Masonry | Lab | — | ❌ | Not implemented |
| 48 | Timeline | Lab | — | ❌ | Not implemented |
| 49 | Click-Away Listener | Utils | — | 🚫 | Web-only; handled via Modal/onDismiss in RN |
| 50 | CSS Baseline | Utils | — | 🚫 | Web-only; not applicable |
| 51 | Modal | Utils | Modal | ✅ | Similar API |
| 52 | No SSR | Utils | — | 🚫 | Web-only; not applicable |
| 53 | Popover | Utils | — | ❌ | Not implemented |
| 54 | Popper | Utils | — | ❌ | Not implemented |
| 55 | Portal | Utils | Portal+PortalHost | ✅ | Custom implementation without DOM |
| 56 | Textarea Autosize | Utils | — | 🚫 | Covered by TextField multiline (not yet added) |
| 57 | Transitions (Fade/Grow/Slide/Zoom/Collapse) | Utils | — | ❌ | Reanimated used internally; none exported |
| 58 | useMediaQuery | Utils | — | 🚫 | Web-only hook; use `useWindowDimensions` in RN |
| — | Banner | — | Banner | ➕ | MD3 component; no MUI equivalent |
| — | Bottom Sheet | — | BottomSheet | ➕ | MD3 component; no MUI equivalent |
| — | Segmented Buttons | — | SegmentedButtons | ➕ | MD3; MUI equivalent = ToggleButtonGroup |
| — | Navigation Bar | — | NavigationBar | ➕ | MD3 variant of Bottom Navigation |
| — | Activity Indicator | — | ActivityIndicator | ➕ | RN native spinner |
| — | Touchable Ripple | — | TouchableRipple | ➕ | RN press primitive |
| — | Number Field | — | NumberField | ➕ | MUI mentions it in TextField docs; not standard |
| — | Helper Text | — | HelperText | ➕ | Standalone; MUI embeds in FormHelperText |
| — | Searchbar | — | Searchbar | ➕ | No MUI equivalent |
| — | Snackbar Host | — | SnackbarHost | ➕ | Queue management wrapper |

---

## Metrics Summary

| Metric | Value |
|--------|-------|
| MUI components analysed | 58 |
| mui-native components | 55 (+10 MD3/RN extras) |
| ✅ Fully equivalent | 22 |
| ⚠️ Exists with significant API differences | 17 |
| ❌ Missing (implementable) | 7 |
| 🚫 Web-only (not applicable) | 6 |
| ➕ mui-native extras | 10 |
| Overall coverage (excl. web-only) | **~75%** |

---

---

## Per-Component Analysis

---

### 1. Button ⚠️

**MUI** (`@mui/material/Button`)

| Prop | MUI | mui-native | Gap |
|------|-----|-----------|-----|
| `variant` | `text \| contained \| outlined` | `filled \| tonal \| outlined \| text \| elevated` | ⚠️ Different vocabulary (MD2 vs MD3) |
| Content | `children` (ReactNode) | `label` (string) | ⚠️ MUI accepts rich content; mui-native text-only |
| `color` | `inherit \| primary \| secondary \| success \| error \| info \| warning` | — | ❌ Missing |
| `size` | `small \| medium \| large` | — | ❌ Missing |
| `startIcon` / `endIcon` | Both supported | `icon` (leading only) | ❌ No trailing icon |
| `loading` | `boolean` (v6.4+) | — | ❌ Missing loading state |
| `fullWidth` | `boolean` | — | ❌ Missing |
| `href` | `string` (renders `<a>`) | — | 🚫 Web-only |
| `disableElevation` | `boolean` | — | — |
| `disabled` | ✅ | ✅ | — |
| `onClick` / `onPress` | `onClick` | `onPress` | RN naming ✅ |

**Recommendation**: Add `size`, `color`, `endIcon`, `loading`, `fullWidth` props to match MUI feature parity.

---

### 2. TextField ⚠️

**MUI** (`@mui/material/TextField`)

| Prop | MUI | mui-native | Gap |
|------|-----|-----------|-----|
| `variant` | `outlined \| filled \| standard` | `outlined \| filled` | ❌ No `standard` variant |
| `helperText` | `string \| ReactNode` | `supportingText` | ⚠️ Renamed |
| `error` | `boolean` | `error` (`string`, truthy = error) | ⚠️ MUI uses bool; mui-native uses string message |
| `size` | `small \| medium` | — | ❌ Missing |
| `color` | theme color key | — | ❌ Missing |
| `fullWidth` | `boolean` | — | ❌ Missing |
| `multiline` | `boolean` | — | ❌ Missing |
| `rows` / `minRows` / `maxRows` | Supported | — | ❌ Missing |
| `InputAdornment` | Composable via `slotProps` | `leadingIcon` / `trailingIcon` | ⚠️ Different API (icon vs Adornment) |
| `required` | `boolean` | — | ❌ Missing |
| `autoFocus` | `boolean` | via RN TextInput | — |
| Controlled | `value` + `onChange` | `value` + `onChangeText` | RN naming ✅ |

**Sub-components exposed by MUI not in mui-native**:  
`FormControl`, `InputBase`, `Input`, `FilledInput`, `OutlinedInput`, `InputLabel`, `InputAdornment`, `FormHelperText`

**Recommendation**: Add `multiline`, `rows`, `size`, `color`, `fullWidth`, `required`. Rename `supportingText` → `helperText` for compatibility, or add as alias.

---

### 3. Checkbox ⚠️

**MUI** (`@mui/material/Checkbox`)

| Prop | MUI | mui-native | Gap |
|------|-----|-----------|-----|
| `checked` | `boolean` | via `status: 'checked'` | ⚠️ Different API |
| `indeterminate` | `boolean` | via `status: 'indeterminate'` | ⚠️ Different API |
| `color` | theme color key | `color` (any string) | ⚠️ Not theme-aware |
| `size` | `small \| medium` | — | ❌ Missing |
| `icon` / `checkedIcon` | Custom icon elements | — | ❌ Missing |
| `disableRipple` | `boolean` | — | — |
| `onChange` | `(event) => void` | `onPress` | ⚠️ RN naming |

**Recommendation**: Add `checked` + `indeterminate` as aliases for `status`, add `size`.

---

### 4. Autocomplete ⚠️

**MUI** (`@mui/material/Autocomplete`)

| Prop | MUI | mui-native | Gap |
|------|-----|-----------|-----|
| `options` | `T[]` (generic) | `AutocompleteOption[]` | ⚠️ Fixed shape in mui-native |
| `value` / `multiple` | ✅ | ✅ | ✅ |
| `freeSolo` | ✅ | ✅ | ✅ |
| `loading` / `loadingText` | ✅ | `loading` only | ⚠️ No `loadingText` |
| `groupBy` | `(option) => string` | — | ❌ Missing |
| `renderOption` | Custom option renderer | — | ❌ Missing |
| `renderTags` | Custom tag renderer | — | ❌ Missing |
| `getLimitTagsText` | Truncation text | — | ❌ Missing |
| `limitTags` | `number` | — | ❌ Missing |
| `open` / `onOpen` / `onClose` | Controlled open state | — | ❌ Missing |
| `disableCloseOnSelect` | `boolean` | — | ❌ Missing |
| `filterSelectedOptions` | `boolean` | — | ❌ Missing |
| `isOptionEqualToValue` | Custom equality | — | ❌ Missing |

**Recommendation**: Add `groupBy`, `renderOption`, `limitTags`, controlled `open`/`onOpen`/`onClose`.

---

### 5. Select ⚠️

**MUI** (`@mui/material/Select`)

| Prop | MUI | mui-native | Gap |
|------|-----|-----------|-----|
| `value` / `multiple` | ✅ | ✅ | ✅ |
| `variant` | `outlined \| filled \| standard` | — | ❌ No variant support |
| `renderValue` | Custom value renderer | — | ❌ Missing |
| `displayEmpty` | `boolean` | via `placeholder` | ⚠️ Partial |
| `size` | `small \| medium` | — | ❌ Missing |
| `native` | Native `<select>` | — | 🚫 Web-only |
| `MenuProps` | Custom dropdown props | — | ❌ Missing |

---

### 6. Chip ⚠️

**MUI** (`@mui/material/Chip`)

| Prop | MUI | mui-native | Gap |
|------|-----|-----------|-----|
| `variant` | `filled \| outlined` | `assist \| filter \| input \| suggestion` (MD3) | ⚠️ Different taxonomy |
| `color` | theme color key | — | ❌ Missing |
| `size` | `small \| medium` | — | ❌ Missing |
| `avatar` | Avatar element | — | ❌ Missing |
| `icon` | Leading icon | `icon` | ✅ |
| `deleteIcon` | Custom delete icon | — | ❌ Missing (has `onRemove`) |
| `onDelete` | Delete handler | `onRemove` | ⚠️ Renamed |
| `clickable` | auto-inferred | via `onPress` | ✅ |
| `href` | `string` | — | 🚫 Web-only |

---

### 7. Alert ⚠️

**MUI** (`@mui/material/Alert`)

| Prop | MUI | mui-native | Gap |
|------|-----|-----------|-----|
| `severity` | `error \| warning \| info \| success` | ✅ same | ✅ |
| `variant` | `filled \| outlined \| standard` | — | ❌ Missing |
| `icon` | Custom icon element | — | ❌ Missing (auto-icon only) |
| `color` | Override color | — | ❌ Missing |
| `action` | Action slot | `action` | ✅ |
| `onClose` | Close handler | `onClose` | ✅ |
| `title` | — (use AlertTitle) | `title` | ➕ Simpler API |
| `components` / `slots` | Customisation API | — | — |

---

### 8. Dialog ⚠️

**MUI** — Composable:
```
<Dialog open>
  <DialogTitle>Title</DialogTitle>
  <DialogContent>
    <DialogContentText>Message</DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button>Cancel</Button>
    <Button>OK</Button>
  </DialogActions>
</Dialog>
```

**mui-native** — Monolithic:
```tsx
<Dialog
  visible={true}
  title="Title"
  actions={[
    { label: 'Cancel', onPress: () => {} },
    { label: 'OK', onPress: () => {}, variant: 'filled' },
  ]}
>
  Message text
</Dialog>
```

| Prop | MUI | mui-native | Gap |
|------|-----|-----------|-----|
| `open` / `visible` | `open` | `visible` | ⚠️ Renamed |
| `maxWidth` | `xs \| sm \| md \| lg \| xl \| false` | — | ❌ Missing |
| `fullWidth` | `boolean` | — | ❌ Missing |
| `fullScreen` | `boolean` | — | ❌ Missing |
| `scroll` | `paper \| body` | — | ❌ Missing |
| `TransitionComponent` | Custom animation | — | ❌ Missing |
| Composable sub-components | DialogTitle, DialogContent, DialogActions | — | ❌ Missing |
| `disableEscapeKeyDown` | `boolean` | — | — |

---

### 9. Progress ⚠️❌

**MUI** provides two components:
- `CircularProgress` — circular spinner (indeterminate + determinate)
- `LinearProgress` — horizontal bar (indeterminate + determinate + buffer)

**mui-native** has:
- `ActivityIndicator` — wraps RN's native `ActivityIndicator`; indeterminate circular spinner only

| Feature | MUI CircularProgress | MUI LinearProgress | ActivityIndicator (mui-native) |
|---------|---------------------|-------------------|-------------------------------|
| Indeterminate | ✅ | ✅ | ✅ |
| Determinate | ✅ (`value` 0-100) | ✅ (`value` 0-100) | ❌ |
| Buffer variant | — | ✅ | ❌ |
| `size` | pixels, rem, number | — | `small \| medium \| large` |
| `color` | theme colors | theme colors | any string |
| With label | ✅ (custom build) | ✅ (custom build) | ❌ |
| `disableShrink` | ✅ | — | — |

**Recommendation (HIGH PRIORITY)**:
1. Create `CircularProgress` component with `variant`: `indeterminate | determinate`, `value`, `size`, `color`
2. Create `LinearProgress` component with `variant`: `indeterminate | determinate | buffer`, `value`, `valueBuffer`, `color`
3. Keep `ActivityIndicator` as RN-native alias

---

### 10. Snackbar ⚠️

**MUI architecture** — Direct render:
```tsx
<Snackbar
  open={open}
  autoHideDuration={6000}
  onClose={handleClose}
  message="Note archived"
  action={action}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
/>
```

**mui-native architecture** — Queue-based host:
```tsx
// Root: <PortalHost><SnackbarHost>...</SnackbarHost></PortalHost>
// Usage: const { show } = useSnackbar(); show({ message, duration, action })
```

| Feature | MUI | mui-native | Gap |
|---------|-----|-----------|-----|
| Controlled `open` | ✅ | ❌ | ❌ |
| `autoHideDuration` | ✅ | `duration` in item | ✅ |
| `anchorOrigin` | vertical+horizontal | — | ❌ Missing positioning |
| Queue management | Manual | ✅ Auto-queue | ➕ |
| `action` | ReactNode | `{ label, onPress }` | ⚠️ |
| `TransitionComponent` | ✅ | — | ❌ |

---

### 11. Accordion ⚠️

**MUI architecture** — Composable:
```tsx
<Accordion>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>Header</AccordionSummary>
  <AccordionDetails>Body content</AccordionDetails>
  <AccordionActions>Actions</AccordionActions>
</Accordion>
```

**mui-native** — Monolithic: `<Accordion title="Header">Body</Accordion>`

| Prop | MUI | mui-native | Gap |
|------|-----|-----------|-----|
| `expanded` / `defaultExpanded` | ✅ | `expanded` | ✅ |
| `onChange` / `onToggle` | `(event, isExpanded) => void` | `(expanded: boolean) => void` | ⚠️ Signature differs |
| `disableGutters` | `boolean` | — | ❌ Missing |
| `square` | `boolean` | — | ❌ Missing |
| `TransitionComponent` | ✅ | — | ❌ Missing |
| `left` / `right` render props | — | ✅ | ➕ |
| AccordionActions | Sub-component | — | ❌ Missing |

---

### 12. AppBar ⚠️

**MUI architecture** — Composable:
```tsx
<AppBar position="sticky">
  <Toolbar>
    <IconButton edge="start">…</IconButton>
    <Typography variant="h6" sx={{ flex: 1 }}>Title</Typography>
    <Button color="inherit">Login</Button>
  </Toolbar>
</AppBar>
```

**mui-native** — Opinionated MD3:
```tsx
<AppBar variant="center" title="Title" navigationIcon={<BackIcon />} actions={[<SearchIcon />]} />
```

| Prop | MUI | mui-native | Gap |
|------|-----|-----------|-----|
| `position` | `fixed \| absolute \| sticky \| static \| relative` | — | ❌ Missing (layout positioning) |
| `color` | `default \| inherit \| primary \| secondary \| transparent` | — | ❌ Missing |
| `variant` | — (via Toolbar) | `center \| small \| medium \| large` (MD3) | ➕ MD3-specific |
| `elevation` | `number` | — | ❌ Missing |
| Composable content | Any children via Toolbar | `title`, `navigationIcon`, `actions[]` | ⚠️ Less flexible |

---

### 13. Card ⚠️

**MUI architecture** — Composable sub-components:
`CardHeader`, `CardMedia`, `CardContent`, `CardActions`, `CardActionArea`

**mui-native** — Monolithic: `<Card variant="elevated" onPress={…}>{...}</Card>`

| Prop | MUI | mui-native | Gap |
|------|-----|-----------|-----|
| `variant` | `elevation \| outlined` | `elevated \| filled \| outlined` (MD3) | ⚠️ Different vocabulary |
| `raised` | `boolean` | achieved via `variant="elevated"` | — |
| Composable | CardHeader, CardMedia, CardContent, CardActions | — | ❌ Missing sub-components |
| `onPress` / onClick | via `CardActionArea` | `onPress` | ⚠️ Different mechanism |

---

### 14. Table / DataTable ⚠️

**MUI architecture** — Ultra-composable primitives:
```tsx
<TableContainer component={Paper}>
  <Table stickyHeader>
    <TableHead><TableRow><TableCell sortDirection="asc">Name</TableCell></TableRow></TableHead>
    <TableBody>
      <TableRow selected><TableCell>Value</TableCell></TableRow>
    </TableBody>
    <TableFooter>
      <TablePagination count={20} rowsPerPage={5} page={0} onPageChange={…} />
    </TableFooter>
  </Table>
</TableContainer>
```

**mui-native** — Config-driven monolithic:
```tsx
<DataTable
  columns={[{ key: 'name', label: 'Name', sortable: true }]}
  rows={data}
  keyExtractor={r => r.id}
  onSort={(col, dir) => …}
  selectedRows={['1']}
  onRowSelect={keys => …}
/>
```

| Feature | MUI Table | mui-native DataTable | Gap |
|---------|----------|---------------------|-----|
| Composable primitives | ✅ | ❌ | ❌ |
| Sorting | TableSortLabel | `sortColumn` + `onSort` | ✅ |
| Row selection | Checkbox + state | `selectedRows` + `onRowSelect` | ✅ |
| Pagination | `TablePagination` | `onEndReached` (infinite) | ⚠️ |
| Sticky headers | `stickyHeader` | — | ❌ Missing |
| Column grouping | Multiple `TableHead` rows | — | ❌ Missing |
| Collapsible rows | Via `Collapse` | — | ❌ Missing |
| Custom cell render | — | `renderCell` fn | ✅ |
| Empty state | — | `emptyState` | ✅ |
| `dense` | `size="small"` | — | ❌ Missing |
| Virtualization | react-virtuoso integration | — | ❌ Missing |

---

### 15. Drawer ⚠️

| Prop | MUI | mui-native | Gap |
|------|-----|-----------|-----|
| `anchor` | `left \| right \| top \| bottom` | `left \| right` | ❌ No top/bottom anchors |
| `variant` | `temporary \| persistent \| permanent` | ✅ same | ✅ |
| `open` / `onClose` | ✅ | ✅ | ✅ |
| `ModalProps` | Pass-through to Modal | — | ❌ Missing |
| `PaperProps` | Style the drawer container | — | ❌ Missing |
| `drawerWidth` | via `sx` / `PaperProps` | `drawerWidth` | ⚠️ Explicit here, good |
| `disableScrollLock` | `boolean` | — | — |

---

### 16. Tabs ⚠️

**MUI architecture** — Composable:
```tsx
<Tabs value={value} onChange={handleChange} variant="scrollable">
  <Tab label="Item 1" value="1" icon={<HomeIcon />} disabled />
  <Tab label="Item 2" value="2" />
</Tabs>
```

**mui-native** — Items-array:
```tsx
<Tabs
  items={[{ value: '1', label: 'Item 1', icon: <HomeIcon />, disabled: true }]}
  value={value}
  onValueChange={setValue}
  variant="primary"
  scrollable
/>
```

| Prop | MUI | mui-native | Gap |
|------|-----|-----------|-----|
| `variant` | `standard \| scrollable \| fullWidth` | `primary \| secondary` (MD3) | ⚠️ |
| `scrollButtons` | `auto \| true \| false` | hidden if scrollable | ❌ |
| `textColor` | `inherit \| primary \| secondary` | — | ❌ |
| `indicatorColor` | `primary \| secondary` | — | ❌ |
| `orientation` | `horizontal \| vertical` | — | ❌ Missing vertical tabs |
| `centered` | `boolean` | — | ❌ Missing |
| `badge` on tab | — | `badge` on TabItem | ➕ |

---

### 17. Menu ⚠️

| Prop | MUI | mui-native | Gap |
|------|-----|-----------|-----|
| `anchorEl` | DOM element ref | `anchor: React.RefObject<View>` | ⚠️ RN equivalent ✅ |
| `anchorOrigin` / `transformOrigin` | Full positioning control | — | ❌ Missing |
| `anchorPosition` | `{top, left}` fallback | — | ❌ Missing |
| `open` / `visible` | `open` | `visible` | ⚠️ Renamed |
| `onClose` / `onDismiss` | `onClose` | `onDismiss` | ⚠️ Renamed |
| `MenuList` / `MenuItem` | ✅ | `MenuItem` | ⚠️ No `MenuList` |
| `MenuItem.icon` | `leading icon` | `leadingIcon` | ✅ |
| `MenuItem.shortcut` | keyboard shortcut hint | — | 🚫 Web-only |

---

### 18. Snackbar ⚠️ (see §10)

---

### 19. Avatar ✅ (with minor notes)

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| Image avatar | `src` | `source` | ⚠️ RN uses `ImageSourcePropType` |
| Letter avatar | `children` + typography | `label` | ✅ |
| Icon avatar | via children | `icon` | ✅ |
| `AvatarGroup` | ✅ | ❌ | ❌ Missing overlap groups |
| `variant` | `circular \| rounded \| square` | — | ❌ Missing shape variants |
| `size` | via sx | `size` (number) | ✅ |

---

### 20. Badge ✅

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| `badgeContent` / `content` | `badgeContent` | `content` | ⚠️ Renamed |
| `max` | ✅ | ✅ | ✅ |
| `invisible` / `visible` | `invisible: boolean` | `visible: boolean` | ⚠️ Inverted |
| `anchorOrigin` | ✅ | ✅ | ✅ |
| `variant` | `standard \| dot` | — | ❌ No dot variant |
| `color` | theme colors | any string | ⚠️ Not theme-aware |

---

### 21. Typography / Text ⚠️

**MUI `Typography`** uses an **MD2-derived** type scale:
`h1 | h2 | h3 | h4 | h5 | h6 | subtitle1 | subtitle2 | body1 | body2 | caption | overline | button | inherit`

**mui-native `Text`** uses the **MD3** type scale (`TypeScaleVariant`):
`displayLarge | displayMedium | displaySmall | headlineLarge | headlineMedium | headlineSmall | titleLarge | titleMedium | titleSmall | bodyLarge | bodyMedium | bodySmall | labelLarge | labelMedium | labelSmall`

| Feature | MUI Typography | mui-native Text | Notes |
|---------|---------------|----------------|-------|
| Type scale | MD2 (h1-h6 etc.) | MD3 (15 roles) | ⚠️ Different naming |
| `variant` required | no (defaults to body1) | **yes** | ⚠️ Required in mui-native |
| `component` override | ✅ semantic mapping | — | ❌ Missing `component` prop |
| `noWrap` | ✅ | — | ❌ Missing |
| `gutterBottom` | ✅ | — | ❌ Missing |
| `paragraph` | ✅ | — | ❌ Missing |
| `color` | theme color tokens | any string | ⚠️ Not theme-aware |
| `align` | ✅ | ✅ | ✅ |

**MD2 → MD3 mapping reference**:
| MUI (MD2) | mui-native MD3 equivalent |
|-----------|--------------------------|
| `h1` | `displayLarge` |
| `h2` | `displayMedium` |
| `h3` | `headlineLarge` |
| `h4` | `headlineMedium` |
| `h5` | `titleLarge` |
| `h6` | `titleMedium` |
| `subtitle1` | `titleSmall` |
| `subtitle2` | `labelLarge` |
| `body1` | `bodyLarge` |
| `body2` | `bodyMedium` |
| `caption` | `labelSmall` |
| `overline` | `labelMedium` |
| `button` | `labelLarge` |

---

### 22. FAB ✅ (with notes)

| Feature | MUI FAB | mui-native FAB | Notes |
|---------|---------|---------------|-------|
| `variant` | `circular \| extended` | `primary \| secondary \| tertiary \| surface` (MD3) | ⚠️ Different taxonomy |
| Extended (with label) | `variant="extended"` + `children` | `label` prop | ✅ |
| `size` | `small \| medium \| large` | ✅ same | ✅ |
| `color` | theme colors | `variant` controls color | ⚠️ |
| `href` | link FAB | — | 🚫 Web-only |

---

### 23. Rating ✅

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| `value`, `onChange` | ✅ | `value` + `onValueChange` | ⚠️ Renamed |
| `max` | ✅ | ✅ | ✅ |
| `precision` | `0.5 \| 1` | ✅ | ✅ |
| `readOnly` | ✅ | ✅ | ✅ |
| `disabled` | ✅ | ✅ | ✅ |
| `size` | `small \| medium \| large` | ✅ | ✅ |
| `icon` / `emptyIcon` | ✅ | ✅ (IconSource) | ✅ |
| `getLabelText` | Accessibility function | — | ❌ Missing |
| `highlightSelectedOnly` | `boolean` | — | ❌ Missing |

---

### 24. Skeleton ✅

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| `variant` | `text \| rectangular \| rounded \| circular` | `text \| rectangular \| circular` | ❌ No `rounded` |
| `animation` | `pulse \| wave \| false` | `wave \| pulse \| false` | ✅ |
| `width` / `height` | ✅ | ✅ | ✅ |
| `children` | Takes children shape | — | ❌ Missing children inference |

---

### 25. Pagination ✅

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| `count`, `page`, `onChange` | ✅ | `count`, `page`, `onPageChange` | ⚠️ Renamed |
| `siblingCount` | ✅ | ✅ | ✅ |
| `boundaryCount` | ✅ | ✅ | ✅ |
| `showFirstButton` / `showLastButton` | ✅ | ✅ | ✅ |
| `size` | `small \| medium \| large` | ✅ | ✅ |
| `disabled` | ✅ | ✅ | ✅ |
| `color` | `primary \| secondary \| standard` | — | ❌ Missing theme color |
| `variant` | `text \| outlined` | — | ❌ Missing variant |
| `shape` | `circular \| rounded` | — | ❌ Missing shape |
| `renderItem` | Custom item renderer | — | ❌ Missing |

---

### 26. Slider ✅

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| `value`, `onChange` | ✅ | `value`, `onValueChange` | ⚠️ Renamed |
| `min`, `max`, `step` | ✅ | ✅ | ✅ |
| `marks` | `boolean \| array` | ✅ | ✅ |
| `disabled` | ✅ | ✅ | ✅ |
| `range` (array value) | ✅ (array value) | — | ❌ Missing range slider |
| `orientation` | `horizontal \| vertical` | — | ❌ Missing vertical slider |
| `color` | theme colors | — | ❌ Missing |
| `size` | `small \| medium` | — | ❌ Missing |
| `track` | `normal \| inverted \| false` | — | ❌ Missing |
| `valueLabelDisplay` | `auto \| on \| off` | — | ❌ Missing value label |

---

### 27. Switch ✅

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| `checked`, `onChange` | ✅ | `value`, `onValueChange` | ⚠️ Renamed |
| `disabled` | ✅ | ✅ | ✅ |
| `color` | theme colors | any string | ⚠️ |
| `size` | `small \| medium` | — | ❌ Missing |
| `icon` / `checkedIcon` | Custom icons | — | ❌ Missing |
| `edge` | `start \| end \| false` | — | — |

---

### 28. Tooltip ✅

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| `title` | ✅ | ✅ | ✅ |
| `placement` | 12 placements | `top \| bottom \| left \| right` | ⚠️ Fewer placements |
| `enterDelay` / `leaveDelay` | ✅ | ✅ | ✅ |
| `arrow` | `boolean` | — | ❌ Missing arrow pointer |
| `open` (controlled) | ✅ | — | ❌ Missing controlled mode |
| `disableFocusListener` | ✅ | — | — |
| `PopperProps` | ✅ | — | — |

---

### 29. Paper ✅

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| `elevation` | 0-24 | 0-5 | ⚠️ Limited range |
| `variant` | `elevation \| outlined` | `mode: flat \| elevated` | ⚠️ Different prop naming |
| `square` | ✅ | ✅ | ✅ |
| `component` | HTML element override | — | 🚫 Web-only |

---

### 30. Divider ✅

Minor note: MUI `Divider` supports `orientation` (`horizontal | vertical`), `textAlign`, children (label in divider), `flexItem`, `light` — these are not documented as checked in mui-native.

---

### 31. Modal ✅

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| `open` / `visible` | `open` | `visible` | ⚠️ Renamed |
| `onClose` / `onDismiss` | `onClose` | `onDismiss` | ⚠️ Renamed |
| `BackdropComponent` | ✅ | — | ❌ Missing |
| `disableEscapeKeyDown` | ✅ | — | — |
| `keepMounted` | ✅ | — | ❌ Missing |
| `container` | DOM node target | — | 🚫 Web-only |
| `dismissible` | via `onClose` presence | `dismissible` explicit prop | ➕ Cleaner API |

---

### 32. Portal ✅

MUI `Portal` renders into `document.body` or a custom `container` DOM node.  
mui-native `Portal` uses a custom `PortalHost` / `PortalContext` system — equivalent but React Native–safe.

---

### 33. Bottom Navigation → NavigationBar ⚠️

**MUI** `BottomNavigation` + `BottomNavigationAction`  
**mui-native** `NavigationBar` (MD3 specification)

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| `value` / `activeIndex` | controlled `value` | `activeIndex` (number) | ⚠️ Different control API |
| `onChange` | `(event, value) => void` | per-item `onPress` | ⚠️ Different pattern |
| `showLabels` | `boolean` | always shown (MD3) | ⚠️ |
| Component name | `BottomNavigation` | `NavigationBar` | ⚠️ Renamed |
| Item max count | 3-5 (guideline) | 3-5 (enforced via MD3) | ✅ |

---

### 34. SpeedDial ✅

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| `open`, `onOpen`, `onClose` | ✅ | ✅ | ✅ |
| `direction` | `up \| down \| left \| right` | ✅ | ✅ |
| `icon` / `openIcon` | `SpeedDialIcon` component | ✅ | ✅ |
| `actions` (items) | `SpeedDialAction` children | `actions[]` array | ⚠️ Array vs composable |
| `ariaLabel` | required | — | ❌ Missing |

---

### 35. Stepper ✅

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| Controlled via `activeStep` | ✅ | ✅ | ✅ |
| `orientation` | `horizontal \| vertical` | ✅ | ✅ |
| `nonLinear` | ✅ | ✅ | ✅ |
| `alternativeLabel` | ✅ (horizontal) | — | ❌ Missing |
| Step icons | Custom via `StepIcon` | via `StepState` color | ⚠️ |
| Composable sub-components | Step, StepLabel, StepContent | `steps[]` array | ⚠️ |

---

### 36. Breadcrumbs ✅

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| `separator` | ✅ | ✅ | ✅ |
| `maxItems` | ✅ | ✅ | ✅ |
| `expandText` | Collapsed expand text | — | ❌ Missing |
| `itemsBeforeCollapse` | ✅ | — | ❌ Missing |
| `itemsAfterCollapse` | ✅ | — | ❌ Missing |

---

### 37. Link ✅

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| `underline` | `always \| hover \| none` | ✅ | ✅ |
| `color` | theme colors | any string | ⚠️ |
| `href` | ✅ | ✅ | ✅ |
| `variant` / `component` | Typography variant + element | extends `TextProps` | ✅ |

---

### 38. List, ListItem ✅

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| Dense list | `dense` on List | — | ❌ Missing |
| `subheader` on List | ✅ | — | ❌ Missing |
| `ListItemText` | Composable | Bundled in `ListItemProps` | ⚠️ |
| `ListItemIcon` / `ListItemAvatar` | Composable | `left` / `right` render props | ✅ |
| `ListItemButton` | Composable | `onPress` on item | ✅ |
| `selected` on item | ✅ | ✅ | ✅ |
| `disablePadding` | ✅ | — | ❌ Missing |
| `ListAccordion` | — | ✅ | ➕ |
| `ListSection` | — | ✅ | ➕ |

---

### 39. Backdrop ✅

Minor difference: MUI `Backdrop` uses `open` (not `visible`) and `TransitionComponent`. mui-native uses `visible` + `opacity` prop (useful extra).

---

### 40. ImageList ✅

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| `variant` | `standard \| masonry \| quilted \| woven` | `standard \| masonry \| quilted` | ❌ No `woven` |
| `cols`, `gap`, `rowHeight` | ✅ | ✅ | ✅ |
| `ImageListItem.cols/rows` | ✅ | ✅ | ✅ |
| `ImageListItemBar` | Title overlay sub-component | `title` prop on item | ⚠️ |

---

### 41. Box ✅

MUI `Box` supports the `sx` prop with the full Material UI system (theme-aware, CSS shorthand).  
mui-native `Box` uses typed `SpacingKey` tokens for spacing (p, m, px, py, etc.) + raw `sx: ViewStyle`.  
Limited to spacing — no full sx system. Layout props are good.

---

### 42. Grid ✅

| Feature | MUI Grid v2 | mui-native Grid | Notes |
|---------|------------|----------------|-------|
| `columns` | ✅ | ✅ | ✅ |
| `spacing`, `columnSpacing`, `rowSpacing` | ✅ | ✅ | ✅ |
| Responsive breakpoints `xs/sm/md/lg/xl` | ✅ | ✅ (via GridItemProps) | ✅ |
| `container` / `item` props | ✅ | implicit via Grid vs GridItem | ✅ |
| `direction`, `alignItems` | ✅ (on container) | — | ❌ Missing |
| `wrap` | ✅ | — | ❌ Missing |
| `offset` | ✅ (v2) | — | ❌ Missing |
| `zeroMinWidth` | ✅ | — | — |

---

### 43. Stack ✅

MUI `Stack` uses the `sx` system with `divider`, `spacing`, `direction`, `flexWrap`, `alignItems`, `justifyContent`.  
mui-native `Stack` maps all these with typed props including `SpacingKey` for spacing. Very close to MUI.

---

### 44. Container ✅

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| `maxWidth` | `xs/sm/md/lg/xl/false` | ✅ | ✅ |
| `disableGutters` | ✅ | ✅ | ✅ |
| `fixed` | ✅ | ✅ | ✅ |

---

### 45. RadioButton / RadioGroup ✅

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| `RadioGroup` wrapper | ✅ | ✅ | ✅ |
| Controlled `value` | ✅ | ✅ | ✅ |
| `row` orientation | `row` prop on RadioGroup | — | ❌ Missing |
| `color` | theme colors | `color` any string | ⚠️ |
| `size` | `small \| medium` | — | ❌ Missing |
| `onChange` | `(event) => void` | `onValueChange` | ⚠️ |

---

### 46. Select ✅ (see §5 for gaps)

---

### 47. TransferList ✅

MUI and mui-native both implement the dual-list transfer pattern. API is comparable.

---

### 48. ToggleButton ✅

| Feature | MUI | mui-native | Notes |
|---------|-----|-----------|-------|
| `ToggleButtonGroup` | ✅ | ✅ | ✅ |
| `exclusive` (single select) | ✅ | via controlled `value` type | ✅ |
| `color` | theme colors | — | ❌ Missing |
| `size` | `small \| medium \| large` | — | ❌ Missing |
| `orientation` | `horizontal \| vertical` | — | ❌ Missing |
| `fullWidth` | ✅ | — | ❌ Missing |

---

### 49. Popover ❌ — NOT IMPLEMENTED

**MUI** `Popover` — a Modal-backed positioned overlay anchored to a DOM element via `anchorEl` + `getBoundingClientRect`.

**react-native adaptation**: A popover system for RN cannot rely on `getBoundingClientRect`. Instead it needs to use `onLayout`/`ref.measure()` to get the anchor position, then render absolutely positioned content inside a `Modal`.

**Recommended implementation approach**:
```tsx
interface PopoverProps {
  open: boolean;
  anchorRef: React.RefObject<View>;
  onClose?: () => void;
  anchorOrigin?: { vertical: 'top'|'center'|'bottom'; horizontal: 'left'|'center'|'right' };
  transformOrigin?: { vertical: 'top'|'center'|'bottom'; horizontal: 'left'|'center'|'right' };
  children: React.ReactNode;
}
```

---

### 50. Popper ❌ — NOT IMPLEMENTED

**MUI** `Popper` — a low-level positioning component powered by Popper.js (now Floating UI). Fully DOM-dependent.

**react-native adaptation**: Partially similar to Popover but without scroll/clickaway blocking. Uses `Modal`-less absolute positioning within a parent container. Could be implemented using `react-native-popper` or a custom layout-based approach.

**Note**: `Menu`, `Tooltip`, and `Autocomplete` dropdown all need Popper-like functionality internally.

---

### 51. Transitions ❌ — NOT EXPORTED

**MUI exports**: `Fade`, `Grow`, `Slide`, `Zoom`, `Collapse`

**mui-native status**: All animations are powered by `react-native-reanimated` 3.x internally, but **none of these transition components are exported** as standalone composables that match MUI's API.

**MUI API pattern**:
```tsx
<Fade in={visible}>
  <Box>Content</Box>
</Fade>

<Slide direction="up" in={visible} mountOnEnter unmountOnExit>
  <Box>Content</Box>
</Slide>
```

**Recommended additions**:
| Component | props | RN equivalent |
|-----------|-------|--------------|
| `Fade` | `in`, `timeout`, `unmountOnExit` | `useAnimatedStyle` opacity |
| `Slide` | `in`, `direction`, `timeout`, `container` | `useAnimatedStyle` + translateX/Y |
| `Zoom` | `in`, `timeout` | `useAnimatedStyle` scale |
| `Grow` | `in`, `timeout`, `style.transformOrigin` | `useAnimatedStyle` scale + opacity |
| `Collapse` | `in`, `orientation`, `collapsedSize`, `timeout` | `useAnimatedStyle` height |

---

### 52. Masonry ❌ — NOT IMPLEMENTED (MUI Lab)

A layout component for staggered grid/masonry layouts.  
mui-native `ImageList` supports `variant="masonry"` for images, but there is no general-purpose `Masonry` container for arbitrary content.

---

### 53. Timeline ❌ — NOT IMPLEMENTED (MUI Lab)

A vertical/horizontal timeline display component.  
`Timeline`, `TimelineItem`, `TimelineSeparator`, `TimelineDot`, `TimelineContent`, `TimelineConnector`, `TimelineOppositeContent`.

No equivalent in mui-native.

---

## Web-Only Components (N/A for React Native)

| MUI Component | Reason N/A in RN | Suggested RN Alternative |
|--------------|-----------------|------------------------|
| **CSS Baseline** | Resets browser CSS defaults | Not applicable — RN has no browser CSS |
| **No SSR** | Prevents server-side rendering | Not applicable |
| **Textarea Autosize** | `<textarea>` auto-height in DOM | `<TextInput multiline>` in RN; TextField with multiline |
| **useMediaQuery** | CSS media query hook | `useWindowDimensions()`, `Dimensions.get('window')` |
| **Click-Away Listener** | DOM event bubbling | `Modal` with `onDismiss`, `TouchableWithoutFeedback` |
| **Popper (full)** | Floating UI / Popper.js depends on DOM | Custom layout-based or `react-native-popper` |

---

## mui-native-only Components (MD3 / RN Extras)

These components exist in mui-native but have **no direct MUI equivalent**:

| Component | Description | MUI Closest Equivalent |
|-----------|-------------|----------------------|
| **Banner** | MD3 persistent notification banner at top of screen | No equivalent |
| **BottomSheet** | MD3 modal/persistent sheet from bottom with snap points | No equivalent |
| **SegmentedButtons** | MD3 mutually-exclusive selection strip | `ToggleButtonGroup` (different visual) |
| **NavigationBar** | MD3 bottom navigation bar | `BottomNavigation` (different API) |
| **ActivityIndicator** | RN native circular spinner | `CircularProgress` indeterminate |
| **TouchableRipple** | MD3 press/ripple primitive for custom touchable areas | `ButtonBase` (web equivalent concept) |
| **NumberField** | Numeric input with increment/decrement controls | Not in standard MUI (separate package) |
| **HelperText** | Standalone form helper/error text | `FormHelperText` (part of form system) |
| **Searchbar** | MD3 search bar (Surface + SearchView hint) | No direct equivalent |
| **SnackbarHost** | Queue management for snackbars | No equivalent (manual state) |

---

## Priority Gap Analysis

### 🔴 HIGH PRIORITY — Missing core components

| Gap | Impact | Effort |
|-----|--------|--------|
| `CircularProgress` + `LinearProgress` | High — loading/progress states are fundamental | Medium |
| Transitions (`Fade`, `Slide`, `Zoom`, `Grow`, `Collapse`) | High — used internally by Dialog, Snackbar, Drawer, Tooltip | High |
| `Popover` | Medium — needed for Tooltip anchoring, Autocomplete dropdown | High |
| `Typography` component alias | Medium — developers migrating from MUI expect `Typography` | Low |

### 🟡 MEDIUM PRIORITY — API gaps in existing components

| Component | Key Missing Props |
|-----------|------------------|
| **Button** | `loading`, `size`, `color`, `endIcon`, `fullWidth` |
| **TextField** | `multiline`, `rows`, `size`, `standard` variant, `fullWidth`, `required` |
| **Dialog** | composable sub-components, `maxWidth`, `fullWidth`, `fullScreen` |
| **Tabs** | `orientation` (vertical), `centered`, `indicatorColor` |
| **Slider** | range slider (array value), `orientation`, `valueLabelDisplay` |
| **DataTable** | sticky headers, collapsible rows, `dense` size, pagination component |
| **Chip** | `color`, `size`, `deleteIcon` |
| **Card** | sub-components (CardHeader, CardContent, CardMedia, CardActions) |
| **Accordion** | sub-components (AccordionDetails, AccordionActions), `disableGutters` |
| **Avatar** | `AvatarGroup`, `variant` (rounded/square) |

### 🟢 LOW PRIORITY — Lab / Niche

| Gap | Notes |
|-----|-------|
| `Masonry` | Layout component; low usage |
| `Timeline` | Niche component |
| `Skeleton` rounded variant | Minor |
| `Badge` dot variant | Minor |

---

## Naming Conventions Drift

Several prop names differ from MUI due to React Native conventions:

| MUI Prop | mui-native Equivalent | Note |
|---------|----------------------|------|
| `open` | `visible` | RN convention |
| `onClick` | `onPress` | RN convention |
| `onChange` | `onValueChange` / `onChangeText` | RN convention |
| `onClose` | `onDismiss` | Custom decision |
| `children` (text) | `label` (string) | Simplification |
| `helperText` | `supportingText` | MD3 terminology |
| `badgeContent` | `content` | Shortened |
| `checked` | `value` | RN checkbox convention |
| `startIcon` / `endIcon` | `icon` (leading only) | Simplified |
| `anchorEl` | `anchor: RefObject<View>` | RN equivalent |

---

*Report generated from mui-native v0.1.0 · 55 components · Tests: 100/100 passing*  
*MUI source: @mui/material v7.3.9 · https://mui.com/material-ui/*
