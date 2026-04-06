import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import type { CardProps, CardVariant } from './types';

const DefaultRoot = View;

function createCardStyles(
  colorScheme: ReturnType<typeof useTheme>['theme']['colorScheme'],
  shape: ReturnType<typeof useTheme>['theme']['shape'],
  variant: CardVariant,
) {
  const containerBase = {
    borderRadius: shape.medium,
    padding: 16,
    overflow: 'hidden' as const,
  };

  const containerMap: Record<CardVariant, object> = {
    elevated: {
      ...containerBase,
      backgroundColor: colorScheme.surface,
      shadowColor: colorScheme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    filled: {
      ...containerBase,
      backgroundColor: colorScheme.surfaceVariant,
    },
    outlined: {
      ...containerBase,
      backgroundColor: colorScheme.surface,
      borderWidth: 1,
      borderColor: colorScheme.outlineVariant,
    },
  };

  return StyleSheet.create({ container: containerMap[variant] });
}

export function Card(rawProps: CardProps): React.ReactElement {
  const props = useComponentDefaults('Card', rawProps);
  const {
    variant = 'elevated',
    children,
    onPress,
    accessibilityLabel,
    testID,
    color,
    sx,
    style,
    slots,
    slotProps,
  } = props;
  const Root = slots?.Root ?? DefaultRoot;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);
  const styles = useMemo(
    () => createCardStyles(theme.colorScheme, theme.shape, variant),
    [theme, variant],
  );

  const reduceMotion = useReducedMotionValue();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const callOnPress = (): void => { onPress?.(); };

  const tapGesture = useMemo(
    () =>
      Gesture.Tap()
        .enabled(onPress != null)
        .onBegin(() => {
          'worklet';
          if (!reduceMotion.value) scale.value = withTiming(0.98, { duration: 100 });
        })
        .onFinalize(() => {
          'worklet';
          if (!reduceMotion.value) scale.value = withTiming(1, { duration: 150 });
        })
        .onEnd(() => {
          'worklet';
          if (onPress) runOnJS(callOnPress)();
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onPress],
  );

  if (onPress != null) {
    return (
      <GestureDetector gesture={tapGesture}>
        <Animated.View
          style={[styles.container, animatedStyle]}
          accessible
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          testID={testID}
        >
          {children}
        </Animated.View>
      </GestureDetector>
    );
  }

  return (
    <Root {...slotProps?.Root} style={[styles.container, sxStyle, style, slotProps?.Root?.style]} testID={testID} accessible={accessibilityLabel != null} accessibilityLabel={accessibilityLabel}>
      {children}
    </Root>
  );
}
