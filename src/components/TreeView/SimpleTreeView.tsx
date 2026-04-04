import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { ScrollView } from 'react-native';
import type { TreeViewContextValue, SimpleTreeViewProps, TreeViewItemId } from './types';

// ─── Context ──────────────────────────────────────────────────────────────────

const DEFAULT_CONTEXT: TreeViewContextValue = {
  expandedItems: [],
  selectedItems: [],
  multiSelect: false,
  checkboxSelection: false,
  toggleExpand: () => undefined,
  toggleSelect: () => undefined,
  isDisabled: () => false,
};

export const TreeViewContext =
  createContext<TreeViewContextValue>(DEFAULT_CONTEXT);

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * `SimpleTreeView` — context provider for a hierarchical tree structure.
 *
 * Supports controlled and uncontrolled modes for both expand and select state.
 * Children should be composed of `<TreeItem>` elements.
 *
 * @RN-DEVIATION Keyboard navigation is touch-first; keyboard events are shimmed
 * via `accessibilityActions` — no native keyboard traversal equivalent.
 */
export function SimpleTreeView({
  children,
  multiSelect = false,
  checkboxSelection = false,
  defaultExpandedItems = [],
  expandedItems: expandedItemsProp,
  onExpandedItemsChange,
  selectedItems: selectedItemsProp,
  onSelectedItemsChange,
  disabledItems = [],
  style,
  testID,
}: SimpleTreeViewProps): React.ReactElement {
  // ── Expansion state (controlled / uncontrolled) ───────────────────────────
  const isExpandedControlled = expandedItemsProp !== undefined;
  const [internalExpanded, setInternalExpanded] = useState<TreeViewItemId[]>(
    defaultExpandedItems,
  );
  const expandedItems = isExpandedControlled
    ? (expandedItemsProp as TreeViewItemId[])
    : internalExpanded;

  const toggleExpand = useCallback(
    (id: TreeViewItemId) => {
      const next = expandedItems.includes(id)
        ? expandedItems.filter(x => x !== id)
        : [...expandedItems, id];

      if (!isExpandedControlled) {
        setInternalExpanded(next);
      }
      onExpandedItemsChange?.(next);
    },
    [expandedItems, isExpandedControlled, onExpandedItemsChange],
  );

  // ── Selection state (controlled / uncontrolled) ────────────────────────────
  const isSelectedControlled = selectedItemsProp !== undefined;
  const [internalSelected, setInternalSelected] = useState<TreeViewItemId[]>([]);
  const selectedItems = isSelectedControlled
    ? (selectedItemsProp as TreeViewItemId[])
    : internalSelected;

  const toggleSelect = useCallback(
    (id: TreeViewItemId) => {
      let next: TreeViewItemId[];
      if (multiSelect) {
        next = selectedItems.includes(id)
          ? selectedItems.filter(x => x !== id)
          : [...selectedItems, id];
      } else {
        // Single-select: clear previous selection
        next = selectedItems.includes(id) ? [] : [id];
      }

      if (!isSelectedControlled) {
        setInternalSelected(next);
      }
      onSelectedItemsChange?.(next);
    },
    [multiSelect, selectedItems, isSelectedControlled, onSelectedItemsChange],
  );

  // ── Disabled items helper ─────────────────────────────────────────────────
  const isDisabled = useCallback(
    (id: TreeViewItemId) => disabledItems.includes(id),
    [disabledItems],
  );

  // ── Context value ─────────────────────────────────────────────────────────
  const contextValue = useMemo<TreeViewContextValue>(
    () => ({
      expandedItems,
      selectedItems,
      multiSelect,
      checkboxSelection,
      toggleExpand,
      toggleSelect,
      isDisabled,
    }),
    [
      expandedItems,
      selectedItems,
      multiSelect,
      checkboxSelection,
      toggleExpand,
      toggleSelect,
      isDisabled,
    ],
  );

  return (
    <TreeViewContext.Provider value={contextValue}>
      <ScrollView
        style={style}
        testID={testID}
        accessibilityRole="list"
        accessibilityLabel="Tree view"
      >
        {children}
      </ScrollView>
    </TreeViewContext.Provider>
  );
}
