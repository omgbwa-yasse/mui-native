import React, { Children, useCallback, useContext, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { TreeViewContext } from './SimpleTreeView';
import { TreeItemRow } from './TreeItemRow';
import type { TreeItemProps } from './types';

const ANIMATION_DURATION = 250;

/**
 * Recursive tree item component. Renders a `TreeItemRow` and, when the item
 * has children, an animated-height container that expands/collapses.
 *
 * All Reanimated animation code runs on the UI thread only — no `runOnJS`.
 */
export function TreeItem({
  itemId,
  label,
  disabled = false,
  children,
  style,
  testID,
}: TreeItemProps): React.ReactElement {
  const ctx = useContext(TreeViewContext);
  const reduceMotion = useReducedMotionValue();

  const hasChildren = Children.count(children) > 0;
  const isExpanded = ctx.expandedItems.includes(itemId);

  // Track the natural (measured) height of the children container
  const measuredHeight = useRef(0);
  const animatedHeight = useSharedValue(0);
  const [isMeasured, setIsMeasured] = useState(false);

  // Depth: computed by counting ancestor TreeItemRow indentations.
  // We rely on nesting depth via the context's depth counter
  // (SimpleTreeView passes depth via cloneElement — here we read from ctx).
  const depth: number = (ctx as unknown as { _depth?: number })._depth ?? 0;

  const handleChildrenLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const h = e.nativeEvent.layout.height;
      if (h > 0 && measuredHeight.current === 0) {
        measuredHeight.current = h;
        setIsMeasured(true);
        // If already expanded when we first measure, jump to full height
        if (isExpanded) {
          animatedHeight.value = h;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Drive height animation whenever expansion changes
  React.useEffect(() => {
    if (!isMeasured) return;
    const target = isExpanded ? measuredHeight.current : 0;
    animatedHeight.value = withTiming(target, {
      duration: reduceMotion.value ? 0 : ANIMATION_DURATION,
    });
    // reduceMotion.value is a SharedValue's runtime field — safe to access here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded, isMeasured]);

  const animatedContainerStyle = useAnimatedStyle(
    () => ({ height: animatedHeight.value, overflow: 'hidden' }),
  );

  return (
    <View style={style} testID={testID} accessibilityRole="none">
      <TreeItemRow
        itemId={itemId}
        label={label}
        hasChildren={hasChildren}
        disabled={disabled}
        depth={depth}
      />

      {hasChildren && (
        <Animated.View style={animatedContainerStyle}>
          {/* Hidden absolute measurement pass */}
          {!isMeasured && (
            <View
              style={StyleSheet.absoluteFill}
              pointerEvents="none"
              onLayout={handleChildrenLayout}
            >
              {children}
            </View>
          )}
          {/* Visible children */}
          {isMeasured && children}
        </Animated.View>
      )}
    </View>
  );
}
