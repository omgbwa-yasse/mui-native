import React, { memo, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { NavigationRailItem as NavItemType, NavigationRailProps } from './types';

const RAIL_WIDTH = 80;

// ─── Rail Item ────────────────────────────────────────────────────────────────

interface RailItemProps {
  item: NavItemType;
  isActive: boolean;
  showLabels: boolean;
  onSelect: (value: string | number) => void;
}

const RailItem = memo(function RailItem({
  item,
  isActive,
  showLabels,
  onSelect,
}: RailItemProps): React.ReactElement {
  const { theme } = useTheme();
  const { colorScheme, typography, shape } = theme;

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const handleSelect = (): void => {
    if (!item.disabled) onSelect(item.value);
  };

  const tap = useMemo(
    () =>
      Gesture.Tap()
        .enabled(!item.disabled)
        .onBegin(() => {
          'worklet';
          scale.value = withTiming(0.92, { duration: 80 });
        })
        .onFinalize(() => {
          'worklet';
          scale.value = withTiming(1, { duration: 120 });
        })
        .onEnd(() => {
          'worklet';
          runOnJS(handleSelect)();
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item.value, item.disabled],
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        item: {
          width: RAIL_WIDTH,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 12,
          opacity: item.disabled ? 0.38 : 1,
        },
        indicator: {
          width: 56,
          height: 32,
          borderRadius: shape.full,
          backgroundColor: isActive ? colorScheme.secondaryContainer : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: showLabels ? 4 : 0,
        },
        label: {
          ...typography.labelMedium,
          color: isActive ? colorScheme.onSurface : colorScheme.onSurfaceVariant,
          fontWeight: isActive ? '700' : '400',
          textAlign: 'center',
        },
      }),
    [theme, isActive, showLabels, item.disabled],
  );

  return (
    <GestureDetector gesture={tap}>
      <Pressable
        onPress={handleSelect}
        accessible
        accessibilityRole="tab"
        accessibilityLabel={item.accessibilityLabel ?? item.label}
        accessibilityState={{ selected: isActive, disabled: item.disabled }}
        disabled={item.disabled}
      >
        <Animated.View style={[styles.item, animatedStyle]}>
          <View style={styles.indicator}>{item.icon}</View>
          {showLabels && (
            <Text style={styles.label} numberOfLines={1}>
              {item.label}
            </Text>
          )}
        </Animated.View>
      </Pressable>
    </GestureDetector>
  );
});

// ─── NavigationRail ───────────────────────────────────────────────────────────

/**
 * NavigationRail — MD3 vertical navigation bar for tablets and desktop layouts.
 *
 * Renders a narrow side-panel with icon destinations.  Mirrors the API of
 * `NavigationBar` (bottom bar) but is oriented vertically.
 *
 * @example
 * ```tsx
 * <NavigationRail
 *   value={active}
 *   onChange={setActive}
 *   items={[
 *     { value: 'home',  icon: <Icon name="home" />,   label: 'Home'   },
 *     { value: 'mail',  icon: <Icon name="email" />,  label: 'Mail'   },
 *     { value: 'notes', icon: <Icon name="article" />, label: 'Notes' },
 *   ]}
 * />
 * ```
 */
export const NavigationRail = memo(function NavigationRail(
  props: NavigationRailProps,
): React.ReactElement {
  const {
    value,
    onChange,
    items,
    position = 'left',
    header,
    showLabels = true,
    testID,
    sx,
    style,
  } = props;

  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { colorScheme, elevation: elev } = theme;

  const handleSelect = (itemValue: string | number): void => {
    onChange?.(itemValue);
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: {
          width: RAIL_WIDTH,
          // Align to the specified edge via absolute positioning support;
          // the consumer is responsible for absolute layout when needed.
          alignItems: 'center',
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: colorScheme.surface,
          // MD3 Navigation Rail uses surface tint at elevation 1
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(elev as any)?.surfaceOverlay?.(1),
        },
        header: {
          width: RAIL_WIDTH,
          alignItems: 'center',
          paddingVertical: 8,
          marginBottom: 4,
        },
        itemsContainer: {
          flex: 1,
          width: RAIL_WIDTH,
          alignItems: 'center',
        },
        borderRight: {
          borderRightWidth: StyleSheet.hairlineWidth,
          borderRightColor: colorScheme.outlineVariant,
        },
        borderLeft: {
          borderLeftWidth: StyleSheet.hairlineWidth,
          borderLeftColor: colorScheme.outlineVariant,
        },
      }),
    [theme],
  );

  return (
    <View
      testID={testID}
      accessibilityRole="tablist"
      style={[
        styles.root,
        position === 'right' ? styles.borderLeft : styles.borderRight,
        sxStyle,
        style,
      ]}
    >
      {header != null && <View style={styles.header}>{header}</View>}
      <View style={styles.itemsContainer}>
        {items.map((item) => (
          <RailItem
            key={String(item.value)}
            item={item}
            isActive={item.value === value}
            showLabels={showLabels}
            onSelect={handleSelect}
          />
        ))}
      </View>
    </View>
  );
});
