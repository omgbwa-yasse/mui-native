/**
 * catalogue/registry.ts
 * Hand-authored catalogue data. All 78 library components across 5 categories.
 *
 * Priority components (15 total, 3 per category) have hasFullExamples: true
 * with AuthoredExamples filled in Phase 7.
 * All other entries have examples: null, hasFullExamples: false.
 *
 * Source code strings are injected at build time by scripts/generate-registry.ts
 * via registry.generated.ts. At development time they default to empty string.
 */

import React from 'react';
import type { Category, ComponentEntry, CatalogueRegistry } from './types';
import {
  // INPUTS
  autocompleteExamples,
  buttonExamples,
  buttonGroupExamples,
  checkboxExamples,
  codeInputExamples,
  datePickerExamples,
  dateTimePickerExamples,
  fabExamples,
  iconButtonExamples,
  numberFieldExamples,
  radioButtonExamples,
  ratingExamples,
  searchbarExamples,
  segmentedButtonsExamples,
  selectExamples,
  sliderExamples,
  switchExamples,
  textFieldExamples,
  timePickerExamples,
  toggleButtonExamples,
  touchableRippleExamples,
  transferListExamples,
  // DATA_DISPLAY
  avatarExamples,
  badgeExamples,
  chartsExamples,
  chipExamples,
  dataGridExamples,
  dataTableExamples,
  humanizationScoreBarExamples,
  iconExamples,
  imageListExamples,
  invitationStatusBadgeExamples,
  listExamples,
  masonryExamples,
  materialIconExamples,
  textExamples,
  timelineExamples,
  tooltipExamples,
  treeViewExamples,
  workerAgentRowExamples,
  // FEEDBACK
  activityIndicatorExamples,
  alertExamples,
  backdropExamples,
  bannerExamples,
  circularProgressExamples,
  dialogExamples,
  linearProgressExamples,
  modalExamples,
  skeletonExamples,
  snackbarExamples,
  speedDialExamples,
  // NAVIGATION
  appBarExamples,
  bottomSheetExamples,
  breadcrumbsExamples,
  drawerExamples,
  linkExamples,
  menuExamples,
  navigationBarExamples,
  paginationExamples,
  stepperExamples,
  tabsExamples,
  // LAYOUT
  accordionExamples,
  boxExamples,
  cardExamples,
  collapseExamples,
  containerExamples,
  dividerExamples,
  fadeExamples,
  gridExamples,
  growExamples,
  helperTextExamples,
  paperExamples,
  popoverExamples,
  popperExamples,
  portalExamples,
  slideExamples,
  stackExamples,
  zoomExamples,
} from './examples';
import muiApiExamples from './examples.muiApiProps';

// ---------------------------------------------------------------------------
// Source code map — injected by build-time generator
// Gracefully falls back to empty strings when generation hasn't run yet.
// ---------------------------------------------------------------------------

let sourceCodeMap: Record<string, string> = {};
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  sourceCodeMap = require('./registry.generated').default ?? {};
} catch {
  // Generator has not run yet — source code will be empty strings
}

function src(key: string): string {
  return sourceCodeMap[key] ?? '';
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function entry(
  componentKey: string,
  name: string,
  categoryId: ComponentEntry['categoryId'],
  description: string,
  icon: string,
  examples: ComponentEntry['examples'] = null,
): ComponentEntry {
  const apiExamples = muiApiExamples[componentKey] ?? [];
  const merged = examples
    ? [...examples, ...apiExamples]
    : apiExamples.length > 0
      ? apiExamples
      : null;
  return {
    name,
    componentKey,
    categoryId,
    description,
    icon,
    sourceCode: src(componentKey),
    examples: merged,
    hasFullExamples: merged !== null,
  };
}

// ---------------------------------------------------------------------------
// INPUTS (22 components)
// Priority: Button, TextField, Select
// ---------------------------------------------------------------------------

const INPUTS_COMPONENTS: ComponentEntry[] = [
  entry('Autocomplete', 'Autocomplete', 'INPUTS', 'Autocomplete text input with dropdown suggestions', 'manage_search', autocompleteExamples),
  entry('Button', 'Button', 'INPUTS', 'Contained, outlined, and text button variants', 'smart_button', buttonExamples),
  entry('ButtonGroup', 'ButtonGroup', 'INPUTS', 'Groups related buttons in a row or column', 'table_rows', buttonGroupExamples),
  entry('Checkbox', 'Checkbox', 'INPUTS', 'Binary selection control with checked, unchecked, and indeterminate states', 'check_box', checkboxExamples),
  entry('CodeInput', 'CodeInput', 'INPUTS', 'Segmented OTP / verification code input field', 'pin', codeInputExamples),
  entry('DatePicker', 'DatePicker', 'INPUTS', 'Calendar date picker with modal or inline display', 'calendar_today', datePickerExamples),
  entry('DateTimePicker', 'DateTimePicker', 'INPUTS', 'Combined date and time picker', 'event', dateTimePickerExamples),
  entry('FAB', 'FAB', 'INPUTS', 'Floating action button — primary call-to-action', 'add_circle', fabExamples),
  entry('IconButton', 'IconButton', 'INPUTS', 'Compact icon-only button with ripple feedback', 'touch_app', iconButtonExamples),
  entry('NumberField', 'NumberField', 'INPUTS', 'Numeric input with increment/decrement controls', 'numbers', numberFieldExamples),
  entry('RadioButton', 'RadioButton', 'INPUTS', 'Single-selection control within a group of options', 'radio_button_checked', radioButtonExamples),
  entry('Rating', 'Rating', 'INPUTS', 'Star-based rating input', 'star', ratingExamples),
  entry('Searchbar', 'Searchbar', 'INPUTS', 'Expandable search input with clear action', 'search', searchbarExamples),
  entry('SegmentedButtons', 'SegmentedButtons', 'INPUTS', 'Mutually exclusive segmented control', 'segment', segmentedButtonsExamples),
  entry('Select', 'Select', 'INPUTS', 'Dropdown selection field with single and multi-select modes', 'arrow_drop_down_circle', selectExamples),
  entry('Slider', 'Slider', 'INPUTS', 'Continuous range input control', 'linear_scale', sliderExamples),
  entry('Switch', 'Switch', 'INPUTS', 'Toggle switch for on/off settings', 'toggle_on', switchExamples),
  entry('TextField', 'TextField', 'INPUTS', 'Single-line and multiline text input', 'text_fields', textFieldExamples),
  entry('TimePicker', 'TimePicker', 'INPUTS', 'Clock-based time picker', 'schedule', timePickerExamples),
  entry('ToggleButton', 'ToggleButton', 'INPUTS', 'Toggle button for binary or exclusive selection', 'power_settings_new', toggleButtonExamples),
  entry('TouchableRipple', 'TouchableRipple', 'INPUTS', 'Material ripple wrapper for any touchable element', 'waves', touchableRippleExamples),
  entry('TransferList', 'TransferList', 'INPUTS', 'Dual-panel list for transferring items between sets', 'compare_arrows', transferListExamples),
];

// ---------------------------------------------------------------------------
// DATA_DISPLAY (18 components)
// Priority: Text, Avatar, Chip
// ---------------------------------------------------------------------------

const DATA_DISPLAY_COMPONENTS: ComponentEntry[] = [
  entry('Avatar', 'Avatar', 'DATA_DISPLAY', 'User or entity avatar — image, initials, or icon', 'account_circle', avatarExamples),
  entry('Badge', 'Badge', 'DATA_DISPLAY', 'Numeric or status badge overlaid on an element', 'badge', badgeExamples),
  entry('Charts', 'Charts', 'DATA_DISPLAY', 'Line, bar, and pie chart components', 'bar_chart', chartsExamples),
  entry('Chip', 'Chip', 'DATA_DISPLAY', 'Compact element representing an attribute, input, or action', 'sell', chipExamples),
  entry('DataGrid', 'DataGrid', 'DATA_DISPLAY', 'Sortable, paginated data grid with column definitions', 'grid_on', dataGridExamples),
  entry('DataTable', 'DataTable', 'DATA_DISPLAY', 'Simple tabular data display', 'table_chart', dataTableExamples),
  entry('HumanizationScoreBar', 'HumanizationScoreBar', 'DATA_DISPLAY', 'Visual score bar for humanization metrics', 'ssid_chart', humanizationScoreBarExamples),
  entry('Icon', 'Icon', 'DATA_DISPLAY', 'Material Design icon renderer', 'emoji_emotions', iconExamples),
  entry('ImageList', 'ImageList', 'DATA_DISPLAY', 'Masonry or grid image gallery', 'photo_library', imageListExamples),
  entry('InvitationStatusBadge', 'InvitationStatusBadge', 'DATA_DISPLAY', 'Badge showing invitation status', 'mark_email_read', invitationStatusBadgeExamples),
  entry('List', 'List', 'DATA_DISPLAY', 'Vertically scrolling list of items with optional icons and actions', 'format_list_bulleted', listExamples),
  entry('Masonry', 'Masonry', 'DATA_DISPLAY', 'Pinterest-style masonry grid layout', 'view_quilt', masonryExamples),
  entry('MaterialIcon', 'MaterialIcon', 'DATA_DISPLAY', 'Google Material Symbols icon component', 'interests', materialIconExamples),
  entry('Text', 'Text', 'DATA_DISPLAY', 'Typography component with MD3 type scale variants', 'title', textExamples),
  entry('Timeline', 'Timeline', 'DATA_DISPLAY', 'Vertical or horizontal chronological event timeline', 'timeline', timelineExamples),
  entry('Tooltip', 'Tooltip', 'DATA_DISPLAY', 'Informational tooltip on long-press', 'help_outline', tooltipExamples),
  entry('TreeView', 'TreeView', 'DATA_DISPLAY', 'Collapsible hierarchical tree', 'account_tree', treeViewExamples),
  entry('WorkerAgentRow', 'WorkerAgentRow', 'DATA_DISPLAY', 'Row component for worker agent list entries', 'person_pin', workerAgentRowExamples),
];

// ---------------------------------------------------------------------------
// FEEDBACK (11 components)
// Priority: Alert, CircularProgress, Snackbar
// ---------------------------------------------------------------------------

const FEEDBACK_COMPONENTS: ComponentEntry[] = [
  entry('ActivityIndicator', 'ActivityIndicator', 'FEEDBACK', 'Native platform activity/loading indicator', 'hourglass_empty', activityIndicatorExamples),
  entry('Alert', 'Alert', 'FEEDBACK', 'Contextual feedback for user actions — success, warning, error, info', 'warning_amber', alertExamples),
  entry('Backdrop', 'Backdrop', 'FEEDBACK', 'Dark overlay that backgrounds interactive elements', 'blur_on', backdropExamples),
  entry('Banner', 'Banner', 'FEEDBACK', 'Persistent inline notification with optional actions', 'campaign', bannerExamples),
  entry('CircularProgress', 'CircularProgress', 'FEEDBACK', 'Circular loading indicator — indeterminate or determinate', 'loop', circularProgressExamples),
  entry('Dialog', 'Dialog', 'FEEDBACK', 'Modal dialog for confirmations and forms', 'chat_bubble_outline', dialogExamples),
  entry('LinearProgress', 'LinearProgress', 'FEEDBACK', 'Horizontal progress bar — indeterminate or determinate', 'trending_flat', linearProgressExamples),
  entry('Modal', 'Modal', 'FEEDBACK', 'Low-level modal container', 'open_in_new', modalExamples),
  entry('Skeleton', 'Skeleton', 'FEEDBACK', 'Placeholder content skeleton for loading states', 'view_day', skeletonExamples),
  entry('Snackbar', 'Snackbar', 'FEEDBACK', 'Brief bottom notification with optional action', 'notifications_active', snackbarExamples),
  entry('SpeedDial', 'SpeedDial', 'FEEDBACK', 'Expandable FAB with multiple secondary actions', 'speed', speedDialExamples),
];

// ---------------------------------------------------------------------------
// NAVIGATION (10 components)
// Priority: AppBar, Tabs, Drawer
// ---------------------------------------------------------------------------

const NAVIGATION_COMPONENTS: ComponentEntry[] = [
  entry('AppBar', 'AppBar', 'NAVIGATION', 'Top application bar with title and optional actions', 'web_asset', appBarExamples),
  entry('BottomSheet', 'BottomSheet', 'NAVIGATION', 'Swipeable bottom sheet panel', 'expand_less', bottomSheetExamples),
  entry('Breadcrumbs', 'Breadcrumbs', 'NAVIGATION', 'Hierarchical path navigation trail', 'more_horiz', breadcrumbsExamples),
  entry('Drawer', 'Drawer', 'NAVIGATION', 'Side navigation drawer — modal or persistent', 'menu_open', drawerExamples),
  entry('Link', 'Link', 'NAVIGATION', 'Inline navigation link element', 'link', linkExamples),
  entry('Menu', 'Menu', 'NAVIGATION', 'Contextual dropdown menu anchored to a trigger', 'more_vert', menuExamples),
  entry('NavigationBar', 'NavigationBar', 'NAVIGATION', 'Bottom navigation bar with icon tabs', 'tab', navigationBarExamples),
  entry('Pagination', 'Pagination', 'NAVIGATION', 'Page navigation control for lists and tables', 'chevron_right', paginationExamples),
  entry('Stepper', 'Stepper', 'NAVIGATION', 'Step-by-step wizard navigation', 'linear_scale', stepperExamples),
  entry('Tabs', 'Tabs', 'NAVIGATION', 'Horizontal tab bar for switching content panels', 'tab', tabsExamples),
];

// ---------------------------------------------------------------------------
// LAYOUT (17 components)
// Priority: Card, Stack, Divider
// ---------------------------------------------------------------------------

const LAYOUT_COMPONENTS: ComponentEntry[] = [
  entry('Accordion', 'Accordion', 'LAYOUT', 'Collapsible content panel with header trigger', 'expand_more', accordionExamples),
  entry('Box', 'Box', 'LAYOUT', 'Generic layout container with sx-style theming', 'crop_square', boxExamples),
  entry('Card', 'Card', 'LAYOUT', 'Elevated content card with header, body, and actions', 'credit_card', cardExamples),
  entry('Collapse', 'Collapse', 'LAYOUT', 'Animated expand/collapse transition wrapper', 'compress', collapseExamples),
  entry('Container', 'Container', 'LAYOUT', 'Responsive max-width page container', 'web', containerExamples),
  entry('Divider', 'Divider', 'LAYOUT', 'Thin separator line — horizontal, vertical, or labelled', 'horizontal_rule', dividerExamples),
  entry('Fade', 'Fade', 'LAYOUT', 'Fade in/out transition wrapper', 'opacity', fadeExamples),
  entry('Grid', 'Grid', 'LAYOUT', 'Responsive 12-column flexbox grid', 'grid_view', gridExamples),
  entry('Grow', 'Grow', 'LAYOUT', 'Scale-based grow transition wrapper', 'zoom_out_map', growExamples),
  entry('HelperText', 'HelperText', 'LAYOUT', 'Descriptive or error text beneath input fields', 'help', helperTextExamples),
  entry('Paper', 'Paper', 'LAYOUT', 'Elevated surface with configurable border radius', 'layers', paperExamples),
  entry('Popover', 'Popover', 'LAYOUT', 'Anchored overlay popover', 'open_in_new', popoverExamples),
  entry('Popper', 'Popper', 'LAYOUT', 'Low-level positioning engine for overlays', 'place', popperExamples),
  entry('Portal', 'Portal', 'LAYOUT', 'Renders children outside the current DOM/view tree', 'launch', portalExamples),
  entry('Slide', 'Slide', 'LAYOUT', 'Directional slide transition wrapper', 'swipe', slideExamples),
  entry('Stack', 'Stack', 'LAYOUT', 'Vertical or horizontal flex stack with spacing', 'view_stream', stackExamples),
  entry('Zoom', 'Zoom', 'LAYOUT', 'Scale zoom transition wrapper', 'zoom_in', zoomExamples),
];

// ---------------------------------------------------------------------------
// Category definitions
// ---------------------------------------------------------------------------

const CATEGORIES: Category[] = [
  {
    id: 'INPUTS',
    label: 'Inputs',
    description: 'Interactive controls for capturing user input',
    icon: 'tune',
    components: INPUTS_COMPONENTS,
  },
  {
    id: 'DATA_DISPLAY',
    label: 'Data Display',
    description: 'Components for presenting information and content',
    icon: 'dashboard',
    components: DATA_DISPLAY_COMPONENTS,
  },
  {
    id: 'FEEDBACK',
    label: 'Feedback',
    description: 'Alerts, progress indicators, and status messages',
    icon: 'notifications',
    components: FEEDBACK_COMPONENTS,
  },
  {
    id: 'NAVIGATION',
    label: 'Navigation',
    description: 'App structure and wayfinding components',
    icon: 'menu',
    components: NAVIGATION_COMPONENTS,
  },
  {
    id: 'LAYOUT',
    label: 'Layout',
    description: 'Structural components for composing screen layouts',
    icon: 'grid_view',
    components: LAYOUT_COMPONENTS,
  },
];

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

// Build flat lookup maps for O(1) access
const _componentMap = new Map<string, ComponentEntry>();
const _categoryMap = new Map<string, Category>();

for (const category of CATEGORIES) {
  _categoryMap.set(category.id, category);
  for (const component of category.components) {
    _componentMap.set(component.componentKey, component);
  }
}

export const registry = {
  categories: CATEGORIES,
  getComponent: (componentKey: string) => _componentMap.get(componentKey),
  getCategory: (categoryId: Category['id']) => _categoryMap.get(categoryId),
} as const;

export default registry;
