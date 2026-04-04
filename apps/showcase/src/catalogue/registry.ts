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
  buttonExamples,
  textFieldExamples,
  selectExamples,
  textExamples,
  avatarExamples,
  chipExamples,
  alertExamples,
  circularProgressExamples,
  snackbarExamples,
  appBarExamples,
  tabsExamples,
  drawerExamples,
  cardExamples,
  stackExamples,
  dividerExamples,
} from './examples';

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
  examples: ComponentEntry['examples'] = null,
): ComponentEntry {
  return {
    name,
    componentKey,
    categoryId,
    description,
    sourceCode: src(componentKey),
    examples,
    hasFullExamples: examples !== null,
  };
}

// ---------------------------------------------------------------------------
// INPUTS (22 components)
// Priority: Button, TextField, Select
// ---------------------------------------------------------------------------

const INPUTS_COMPONENTS: ComponentEntry[] = [
  entry('Autocomplete', 'Autocomplete', 'INPUTS', 'Autocomplete text input with dropdown suggestions'),
  entry('Button', 'Button', 'INPUTS', 'Contained, outlined, and text button variants', buttonExamples),
  entry('ButtonGroup', 'ButtonGroup', 'INPUTS', 'Groups related buttons in a row or column'),
  entry('Checkbox', 'Checkbox', 'INPUTS', 'Binary selection control with checked, unchecked, and indeterminate states'),
  entry('CodeInput', 'CodeInput', 'INPUTS', 'Segmented OTP / verification code input field'),
  entry('DatePicker', 'DatePicker', 'INPUTS', 'Calendar date picker with modal or inline display'),
  entry('DateTimePicker', 'DateTimePicker', 'INPUTS', 'Combined date and time picker'),
  entry('FAB', 'FAB', 'INPUTS', 'Floating action button — primary call-to-action'),
  entry('IconButton', 'IconButton', 'INPUTS', 'Compact icon-only button with ripple feedback'),
  entry('NumberField', 'NumberField', 'INPUTS', 'Numeric input with increment/decrement controls'),
  entry('RadioButton', 'RadioButton', 'INPUTS', 'Single-selection control within a group of options'),
  entry('Rating', 'Rating', 'INPUTS', 'Star-based rating input'),
  entry('Searchbar', 'Searchbar', 'INPUTS', 'Expandable search input with clear action'),
  entry('SegmentedButtons', 'SegmentedButtons', 'INPUTS', 'Mutually exclusive segmented control'),
  entry('Select', 'Select', 'INPUTS', 'Dropdown selection field with single and multi-select modes', selectExamples),
  entry('Slider', 'Slider', 'INPUTS', 'Continuous range input control'),
  entry('Switch', 'Switch', 'INPUTS', 'Toggle switch for on/off settings'),
  entry('TextField', 'TextField', 'INPUTS', 'Single-line and multiline text input', textFieldExamples),
  entry('TimePicker', 'TimePicker', 'INPUTS', 'Clock-based time picker'),
  entry('ToggleButton', 'ToggleButton', 'INPUTS', 'Toggle button for binary or exclusive selection'),
  entry('TouchableRipple', 'TouchableRipple', 'INPUTS', 'Material ripple wrapper for any touchable element'),
  entry('TransferList', 'TransferList', 'INPUTS', 'Dual-panel list for transferring items between sets'),
];

// ---------------------------------------------------------------------------
// DATA_DISPLAY (18 components)
// Priority: Text, Avatar, Chip
// ---------------------------------------------------------------------------

const DATA_DISPLAY_COMPONENTS: ComponentEntry[] = [
  entry('Avatar', 'Avatar', 'DATA_DISPLAY', 'User or entity avatar — image, initials, or icon', avatarExamples),
  entry('Badge', 'Badge', 'DATA_DISPLAY', 'Numeric or status badge overlaid on an element'),
  entry('Charts', 'Charts', 'DATA_DISPLAY', 'Line, bar, and pie chart components'),
  entry('Chip', 'Chip', 'DATA_DISPLAY', 'Compact element representing an attribute, input, or action', chipExamples),
  entry('DataGrid', 'DataGrid', 'DATA_DISPLAY', 'Sortable, paginated data grid with column definitions'),
  entry('DataTable', 'DataTable', 'DATA_DISPLAY', 'Simple tabular data display'),
  entry('HumanizationScoreBar', 'HumanizationScoreBar', 'DATA_DISPLAY', 'Visual score bar for humanization metrics'),
  entry('Icon', 'Icon', 'DATA_DISPLAY', 'Material Design icon renderer'),
  entry('ImageList', 'ImageList', 'DATA_DISPLAY', 'Masonry or grid image gallery'),
  entry('InvitationStatusBadge', 'InvitationStatusBadge', 'DATA_DISPLAY', 'Badge showing invitation status'),
  entry('List', 'List', 'DATA_DISPLAY', 'Vertically scrolling list of items with optional icons and actions'),
  entry('Masonry', 'Masonry', 'DATA_DISPLAY', 'Pinterest-style masonry grid layout'),
  entry('MaterialIcon', 'MaterialIcon', 'DATA_DISPLAY', 'Google Material Symbols icon component'),
  entry('Text', 'Text', 'DATA_DISPLAY', 'Typography component with MD3 type scale variants', textExamples),
  entry('Timeline', 'Timeline', 'DATA_DISPLAY', 'Vertical or horizontal chronological event timeline'),
  entry('Tooltip', 'Tooltip', 'DATA_DISPLAY', 'Informational tooltip on long-press'),
  entry('TreeView', 'TreeView', 'DATA_DISPLAY', 'Collapsible hierarchical tree'),
  entry('WorkerAgentRow', 'WorkerAgentRow', 'DATA_DISPLAY', 'Row component for worker agent list entries'),
];

// ---------------------------------------------------------------------------
// FEEDBACK (11 components)
// Priority: Alert, CircularProgress, Snackbar
// ---------------------------------------------------------------------------

const FEEDBACK_COMPONENTS: ComponentEntry[] = [
  entry('ActivityIndicator', 'ActivityIndicator', 'FEEDBACK', 'Native platform activity/loading indicator'),
  entry('Alert', 'Alert', 'FEEDBACK', 'Contextual feedback for user actions — success, warning, error, info', alertExamples),
  entry('Backdrop', 'Backdrop', 'FEEDBACK', 'Dark overlay that backgrounds interactive elements'),
  entry('Banner', 'Banner', 'FEEDBACK', 'Persistent inline notification with optional actions'),
  entry('CircularProgress', 'CircularProgress', 'FEEDBACK', 'Circular loading indicator — indeterminate or determinate', circularProgressExamples),
  entry('Dialog', 'Dialog', 'FEEDBACK', 'Modal dialog for confirmations and forms'),
  entry('LinearProgress', 'LinearProgress', 'FEEDBACK', 'Horizontal progress bar — indeterminate or determinate'),
  entry('Modal', 'Modal', 'FEEDBACK', 'Low-level modal container'),
  entry('Skeleton', 'Skeleton', 'FEEDBACK', 'Placeholder content skeleton for loading states'),
  entry('Snackbar', 'Snackbar', 'FEEDBACK', 'Brief bottom notification with optional action', snackbarExamples),
  entry('SpeedDial', 'SpeedDial', 'FEEDBACK', 'Expandable FAB with multiple secondary actions'),
];

// ---------------------------------------------------------------------------
// NAVIGATION (10 components)
// Priority: AppBar, Tabs, Drawer
// ---------------------------------------------------------------------------

const NAVIGATION_COMPONENTS: ComponentEntry[] = [
  entry('AppBar', 'AppBar', 'NAVIGATION', 'Top application bar with title and optional actions', appBarExamples),
  entry('BottomSheet', 'BottomSheet', 'NAVIGATION', 'Swipeable bottom sheet panel'),
  entry('Breadcrumbs', 'Breadcrumbs', 'NAVIGATION', 'Hierarchical path navigation trail'),
  entry('Drawer', 'Drawer', 'NAVIGATION', 'Side navigation drawer — modal or persistent', drawerExamples),
  entry('Link', 'Link', 'NAVIGATION', 'Inline navigation link element'),
  entry('Menu', 'Menu', 'NAVIGATION', 'Contextual dropdown menu anchored to a trigger'),
  entry('NavigationBar', 'NavigationBar', 'NAVIGATION', 'Bottom navigation bar with icon tabs'),
  entry('Pagination', 'Pagination', 'NAVIGATION', 'Page navigation control for lists and tables'),
  entry('Stepper', 'Stepper', 'NAVIGATION', 'Step-by-step wizard navigation'),
  entry('Tabs', 'Tabs', 'NAVIGATION', 'Horizontal tab bar for switching content panels', tabsExamples),
];

// ---------------------------------------------------------------------------
// LAYOUT (17 components)
// Priority: Card, Stack, Divider
// ---------------------------------------------------------------------------

const LAYOUT_COMPONENTS: ComponentEntry[] = [
  entry('Accordion', 'Accordion', 'LAYOUT', 'Collapsible content panel with header trigger'),
  entry('Box', 'Box', 'LAYOUT', 'Generic layout container with sx-style theming'),
  entry('Card', 'Card', 'LAYOUT', 'Elevated content card with header, body, and actions', cardExamples),
  entry('Collapse', 'Collapse', 'LAYOUT', 'Animated expand/collapse transition wrapper'),
  entry('Container', 'Container', 'LAYOUT', 'Responsive max-width page container'),
  entry('Divider', 'Divider', 'LAYOUT', 'Thin separator line — horizontal, vertical, or labelled', dividerExamples),
  entry('Fade', 'Fade', 'LAYOUT', 'Fade in/out transition wrapper'),
  entry('Grid', 'Grid', 'LAYOUT', 'Responsive 12-column flexbox grid'),
  entry('Grow', 'Grow', 'LAYOUT', 'Scale-based grow transition wrapper'),
  entry('HelperText', 'HelperText', 'LAYOUT', 'Descriptive or error text beneath input fields'),
  entry('Paper', 'Paper', 'LAYOUT', 'Elevated surface with configurable border radius'),
  entry('Popover', 'Popover', 'LAYOUT', 'Anchored overlay popover'),
  entry('Popper', 'Popper', 'LAYOUT', 'Low-level positioning engine for overlays'),
  entry('Portal', 'Portal', 'LAYOUT', 'Renders children outside the current DOM/view tree'),
  entry('Slide', 'Slide', 'LAYOUT', 'Directional slide transition wrapper'),
  entry('Stack', 'Stack', 'LAYOUT', 'Vertical or horizontal flex stack with spacing', stackExamples),
  entry('Zoom', 'Zoom', 'LAYOUT', 'Scale zoom transition wrapper'),
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
