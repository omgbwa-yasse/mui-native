import React, { useContext, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { Checkbox } from '../Checkbox/Checkbox';
import { TreeViewContext } from './SimpleTreeView';
import type { TreeViewItemId } from './types';

const ANIMATION_DURATION = 200;

interface TreeItemRowProps {
  itemId: TreeViewItemId;
  label: string;
  hasChildren: boolean;
  disabled?: boolean;
  depth: number;
  testID?: string;
}

export const TreeItemRow = React.memo(function TreeItemRow({
  itemId,
  label,
  hasChildren,
  disabled = false,
  depth,
  testID,
}: TreeItemRowProps): React.ReactElement {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotionValue();
  const ctx = useContext(TreeViewContext);

  const isExpanded = ctx.expandedItems.includes(itemId);
  const isSelected = ctx.selectedItems.includes(itemId);
  const isItemDisabled = disabled || ctx.isDisabled(itemId);

  // Chevron rotation — worklet only, never calls runOnJS
  const rotationDeg = useDerivedValue(
    () =>
      withTiming(isExpanded ? 90 : 0, {
        duration: reduceMotion.value ? 0 : ANIMATION_DURATION,
      }),
    [isExpanded],
  );

  const chevronStyle = useAnimatedStyle(
    () => ({ transform: [{ rotate: `${rotationDeg.value}deg` }] }),
  );

  const handleRowPress = React.useCallback(() => {
    if (isItemDisabled) return;
    if (hasChildren) {
      ctx.toggleExpand(itemId);
    } else {
      ctx.toggleSelect(itemId);
    }
  }, [isItemDisabled, hasChildren, ctx, itemId]);

  const handleLabelPress = React.useCallback(() => {
    if (isItemDisabled) return;
    ctx.toggleSelect(itemId);
  }, [isItemDisabled, ctx, itemId]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: 48,
          paddingLeft: 8 + depth * 16,
          paddingRight: 8,
          backgroundColor: isSelected
            ? theme.colorScheme.secondaryContainer
            : 'transparent',
          opacity: isItemDisabled ? 0.38 : 1,
        } as const,
        chevronWrapper: {
          width: 24,
          height: 24,
          justifyContent: 'center',
          alignItems: 'center',
        } as const,
        chevronPlaceholder: {
          width: 24,
        } as const,
        chevronText: {
          fontSize: 12,
          color: theme.colorScheme.onSurfaceVariant,
        } as const,
        label: {
          flex: 1,
          fontSize: 14,
          color: theme.colorScheme.onSurface,
          paddingVertical: 4,
        } as const,
      }),
    [theme, isSelected, isItemDisabled, depth],
  );

  return (
    <TouchableOpacity
      onPress={handleRowPress}
      activeOpacity={0.7}
      role="treeitem"
      accessibilityState={{
        expanded: hasChildren ? isExpanded : undefined,
        selected: isSelected,
        disabled: isItemDisabled,
      }}
      accessibilityLabel={label}
      testID={testID}
      style={styles.row}
    >
      {ctx.checkboxSelection && (
        <Checkbox
          status={isSelected ? 'checked' : 'unchecked'}
          onPress={handleLabelPress}
          disabled={isItemDisabled}
          accessibilityLabel={`Select ${label}`}
        />
      )}

      {hasChildren ? (
        <Animated.View style={[styles.chevronWrapper, chevronStyle]}>
          <Text style={styles.chevronText}>›</Text>
        </Animated.View>
      ) : (
        <View style={styles.chevronPlaceholder} />
      )}

      <Text
        style={styles.label}
        onPress={handleLabelPress}
        accessibilityRole="text"
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
});
