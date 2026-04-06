/**
 * CONTRACT: Component Inventory Key Strings
 *
 * Typed const arrays of the componentKey strings that are expected to have
 * ExampleTuple entries authored in feature 008.
 *
 * These match the `key` field on ComponentEntry objects inside registry.ts.
 * Any new placeholder component added to the registry after feature 008
 * is outside this contract's scope.
 */

// ─── INPUTS ───────────────────────────────────────────────────────────────────

/** Components already having examples BEFORE feature 008 */
export const INPUTS_WITH_EXAMPLES = [
  'Button',
  'Select',
  'TextField',
] as const;

/** Components receiving NEW examples in feature 008 */
export const INPUTS_NEW = [
  'Autocomplete',
  'ButtonGroup',
  'Checkbox',
  'CodeInput',       // requires src/index.ts export (Phase 0 prerequisite)
  'DatePicker',
  'DateTimePicker',
  'FAB',
  'IconButton',
  'NumberField',
  'RadioButton',
  'Rating',
  'Searchbar',
  'SegmentedButtons',
  'Slider',
  'Switch',
  'TimePicker',
  'ToggleButton',
  'TouchableRipple',
  'TransferList',    // requires stateful wrapper (Pattern B + transfer logic)
] as const;

// ─── DATA_DISPLAY ─────────────────────────────────────────────────────────────

export const DATA_DISPLAY_WITH_EXAMPLES = [
  'Avatar',
  'Chip',
  'Text',
] as const;

export const DATA_DISPLAY_NEW = [
  'Badge',
  'Charts',            // requires react-native-gifted-charts in showcase
  'DataGrid',          // rows must have id field
  'DataTable',         // uses keyExtractor (not id)
  'HumanizationScoreBar',  // requires src/index.ts export (Phase 0)
  'Icon',
  'ImageList',
  'InvitationStatusBadge', // requires src/index.ts export (Phase 0)
  'List',
  'Masonry',
  'MaterialIcon',
  'Timeline',          // composite hierarchy
  'Tooltip',
  'TreeView',          // SimpleTreeView + TreeItem children
  'WorkerAgentRow',    // requires src/index.ts export (Phase 0)
] as const;

// ─── FEEDBACK ─────────────────────────────────────────────────────────────────

export const FEEDBACK_WITH_EXAMPLES = [
  'Alert',
  'CircularProgress',
  'Snackbar',
] as const;

export const FEEDBACK_NEW = [
  'ActivityIndicator',
  'Backdrop',
  'Banner',
  'Dialog',
  'LinearProgress',
  'Modal',
  'Skeleton',
  'SpeedDial',
] as const;

// ─── NAVIGATION ───────────────────────────────────────────────────────────────

export const NAVIGATION_WITH_EXAMPLES = [
  'AppBar',
  'Drawer',
  'Tabs',
] as const;

export const NAVIGATION_NEW = [
  'BottomSheet',
  'Breadcrumbs',
  'Link',
  'Menu',
  'NavigationBar',
  'Pagination',
  'Stepper',
] as const;

// ─── LAYOUT ───────────────────────────────────────────────────────────────────

export const LAYOUT_WITH_EXAMPLES = [
  'Card',
  'Divider',
  'Stack',
] as const;

export const LAYOUT_NEW = [
  'Accordion',
  'Box',
  'Collapse',    // TransitionBaseProps + orientation + collapsedSize
  'Container',
  'Fade',        // TransitionBaseProps — stateful wrapper (Pattern C)
  'Grid',
  'Grow',        // TransitionBaseProps — stateful wrapper (Pattern C)
  'HelperText',
  'Paper',
  'Popover',
  'Popper',
  'Portal',
  'Slide',       // TransitionBaseProps + direction prop — stateful wrapper (Pattern C)
  'Zoom',        // TransitionBaseProps — stateful wrapper (Pattern C)
] as const;

// ─── TOTALS ───────────────────────────────────────────────────────────────────

export const TOTAL_COMPONENTS = 78;
export const COMPONENTS_WITH_EXISTING_EXAMPLES = 15;
export const COMPONENTS_RECEIVING_NEW_EXAMPLES = 63;
