import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

/**
 * Unique identifier for a tree item.
 * @RN-DEVIATION Keyboard navigation is touch-first; keyboard events shimmed via
 * `accessibilityActions` — no native keyboard traversal equivalent.
 */
export type TreeViewItemId = string;

/**
 * Shape of the value exposed through `TreeViewContext`.
 */
export interface TreeViewContextValue {
  /** Set of currently expanded item IDs. */
  expandedItems: TreeViewItemId[];
  /** Currently selected item ID(s). Empty string means nothing selected. */
  selectedItems: TreeViewItemId[];
  /** Whether multiple items can be selected simultaneously. */
  multiSelect: boolean;
  /** Whether checkbox selection controls are shown next to each item. */
  checkboxSelection: boolean;
  /** Toggle expand/collapse for the given item. */
  toggleExpand: (id: TreeViewItemId) => void;
  /** Toggle selection for the given item. */
  toggleSelect: (id: TreeViewItemId) => void;
  /** Whether an item is disabled (blocks interaction). */
  isDisabled: (id: TreeViewItemId) => boolean;
}

/**
 * Props for a single tree item node.
 */
export interface TreeItemProps {
  /** Unique identifier — must be unique across the entire tree. */
  itemId: TreeViewItemId;
  /** Display label rendered in the row. */
  label: string;
  /** When true the item is non-interactive; opacity is reduced to 0.38. */
  disabled?: boolean;
  /** Nested `<TreeItem>` children expand/collapse inside this item. */
  children?: ReactNode;
  /** Override styles for the item's root container. */
  style?: StyleProp<ViewStyle>;
  /** Test ID forwarded to the root container. */
  testID?: string;
}

/**
 * Props for `SimpleTreeView`.
 *
 * Supports both **controlled** (`expandedItems`/`selectedItems`) and
 * **uncontrolled** (`defaultExpandedItems`) operation modes.
 */
export interface SimpleTreeViewProps {
  /** Tree items, expressed as `<TreeItem>` elements. */
  children: ReactNode;
  /** Allow selecting multiple items at the same time. Default: `false`. */
  multiSelect?: boolean;
  /** Show a checkbox beside each item. Default: `false`. */
  checkboxSelection?: boolean;
  /**
   * IDs that are expanded on first render (uncontrolled).
   * Ignored when `expandedItems` is provided.
   */
  defaultExpandedItems?: TreeViewItemId[];
  /**
   * Controlled expanded item IDs.
   * When provided the component is fully controlled for expansion.
   */
  expandedItems?: TreeViewItemId[];
  /** Callback fired when the set of expanded items changes. */
  onExpandedItemsChange?: (ids: TreeViewItemId[]) => void;
  /**
   * Controlled selected item IDs.
   * When provided the component is fully controlled for selection.
   */
  selectedItems?: TreeViewItemId[];
  /** Callback fired when the selected items change. */
  onSelectedItemsChange?: (ids: TreeViewItemId[]) => void;
  /**
   * IDs of items that should be rendered but are not interactive.
   * Disabled items show at 38 % opacity and ignore press events.
   */
  disabledItems?: TreeViewItemId[];
  /** Override styles for the `ScrollView` wrapper. */
  style?: StyleProp<ViewStyle>;
  /** Test ID forwarded to the root `ScrollView`. */
  testID?: string;
}
