import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import type { NavigationBarProps, NavigationBarItem } from './types';

interface NavItemProps {
  item: NavigationBarItem;
  isActive: boolean;
}

function NavItem({ item, isActive }: NavItemProps): React.ReactElement {
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
      <Animated.View
        style={[styles.itemContainer, animatedStyle]}
        accessible
        accessibilityRole="tab"
        accessibilityLabel={item.accessibilityLabel ?? item.label}
        accessibilityState={{ selected: isActive }}
      >
        <View style={styles.indicator}>{item.icon}</View>
        <Text style={styles.label} numberOfLines={1}>
          {item.label}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
}

export function NavigationBar({
  activeIndex,
  items,
  testID,
}: NavigationBarProps): React.ReactElement {
  const { theme } = useTheme();
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
    <View
      style={styles.container}
      testID={testID}
      accessibilityRole="tablist"
    >
      {items.map((item, idx) => (
        <NavItem key={idx} item={item} isActive={idx === activeIndex} />
      ))}
    </View>
  );
}
