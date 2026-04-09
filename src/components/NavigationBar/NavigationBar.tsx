import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { NavigationBarProps, NavigationBarItem } from './types';
import type { ViewProps } from 'react-native';

interface NavItemProps {
  item: NavigationBarItem;
  isActive: boolean;
  ItemSlot?: React.ComponentType<ViewProps>;
  IndicatorSlot?: React.ComponentType<ViewProps>;
  itemSlotProps?: Partial<ViewProps>;
  indicatorSlotProps?: Partial<ViewProps>;
}

function NavItem({ item, isActive, ItemSlot, IndicatorSlot, itemSlotProps, indicatorSlotProps }: NavItemProps): React.ReactElement {
  const ResolvedItemSlot = ItemSlot ?? Animated.View;
  const ResolvedIndicatorSlot = IndicatorSlot ?? View;
  const { theme } = useTheme();
  const { colorScheme, typography, shape } = theme;

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const callPress = (): void => { item.onPress(); };

  const tap = useMemo(
    () =>
      Gesture.Tap()
        .onBegin(() => {
          'worklet';
          scale.value = withTiming(0.94, { duration: 80 });
        })
        .onFinalize(() => {
          'worklet';
          scale.value = withTiming(1, { duration: 120 });
        })
        .onEnd(() => {
          'worklet';
          runOnJS(callPress)();
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item.onPress],
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        itemContainer: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 12,
          minHeight: 48,
        },
        indicator: {
          width: 64,
          height: 32,
          borderRadius: shape.full,
          backgroundColor: isActive ? colorScheme.secondaryContainer : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 4,
        },
        label: {
          ...typography.labelMedium,
          color: isActive ? colorScheme.onSurface : colorScheme.onSurfaceVariant,
          fontWeight: isActive ? '700' : '400',
        },
      }),
    [theme, isActive],
  );

  return (
    <GestureDetector gesture={tap}>
      <ResolvedItemSlot
        {...itemSlotProps}
        style={[styles.itemContainer, animatedStyle, itemSlotProps?.style]}
        accessible
        accessibilityRole="tab"
        accessibilityLabel={item.accessibilityLabel ?? item.label}
        accessibilityState={{ selected: isActive }}
      >
        <ResolvedIndicatorSlot {...indicatorSlotProps} style={[styles.indicator, indicatorSlotProps?.style]}>{item.icon}</ResolvedIndicatorSlot>
        <Text style={styles.label} numberOfLines={1}>
          {item.label}
        </Text>
      </ResolvedItemSlot>
    </GestureDetector>
  );
}

export function NavigationBar(rawProps: NavigationBarProps): React.ReactElement {
  const props = useComponentDefaults('NavigationBar', rawProps);
  const {
    activeIndex,
    items,
    testID,
    sx,
    style,
    slots,
    slotProps,
  } = props;

  const RootSlot = slots?.Root ?? View;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { colorScheme, elevation: elev } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          backgroundColor: colorScheme.surface,
          shadowColor: colorScheme.shadow,
          shadowOffset: { width: 0, height: -elev.level2.shadowOffsetY },
          shadowRadius: elev.level2.shadowRadius,
          shadowOpacity: elev.level2.shadowOpacity,
          elevation: elev.level2.elevation,
        },
      }),
    [theme],
  );

  return (
    <RootSlot
      {...slotProps?.Root}
      style={[styles.container, sxStyle, style, slotProps?.Root?.style]}
      testID={testID}
      accessibilityRole="tablist"
    >
      {items.map((item, idx) => (
        <NavItem
          key={idx}
          item={item}
          isActive={idx === activeIndex}
          ItemSlot={slots?.Item as React.ComponentType<any> | undefined}
          IndicatorSlot={slots?.Indicator}
          itemSlotProps={slotProps?.Item}
          indicatorSlotProps={slotProps?.Indicator}
        />
      ))}
    </RootSlot>
  );
}
