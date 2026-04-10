import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { useSx } from '../../hooks/useSx';
import type { TouchableRippleProps } from './types';

/**
 * TouchableRipple — MD3 press primitive.
 *
 * Wraps children with an animated ripple effect on press using Reanimated
 * worklets. Touch target is guaranteed ≥ 48 dp. Respects the OS reduce-motion
 * preference.
 *
 * @example
 * <TouchableRipple onPress={() => console.log('pressed')} accessibilityRole="button">
 *   <Text variant="labelLarge">Press me</Text>
 * </TouchableRipple>
 */
export const TouchableRipple = React.forwardRef<View, TouchableRippleProps>((rawProps, ref) => {
  const props = useComponentDefaults('TouchableRipple', rawProps);
  const {
    onPress,
    onLongPress,
    rippleColor,
    disabled = false,
    borderless = false,
    children,
    testID,
    accessibilityRole,
    accessibilityLabel,
    accessibilityState,
    style,
    sx,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const reduceMotion = useReducedMotionValue();

  const resolvedRippleColor =
    rippleColor ??
    // theme.colorScheme.onSurface at 12 % opacity
    `${theme.colorScheme.onSurface}1F`;

  const rippleOpacity = useSharedValue(0);
  const rippleScale = useSharedValue(0);
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });
  const viewRef = useRef<View>(null);

  const animatedRipple = useAnimatedStyle(() => ({
    opacity: rippleOpacity.value,
    transform: [{ scale: rippleScale.value }],
  }));

  const runOnJS_setPos = useCallback((x: number, y: number) => {
    setRipplePos({ x, y });
  }, []);

  const tap = useMemo(
    () =>
      Gesture.Tap()
        .enabled(!disabled)
        .onBegin(e => {
          'worklet';
          runOnJS(runOnJS_setPos)(e.x, e.y);
          if (!reduceMotion.value) {
            rippleScale.value = 0;
            rippleOpacity.value = 1;
            rippleScale.value = withTiming(1, { duration: 300 });
            rippleOpacity.value = withTiming(0, { duration: 300 });
          }
        })
        .onEnd(() => {
          'worklet';
          runOnJS(onPress ?? (() => {}))();
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled, onPress, reduceMotion],
  );

  const longPress = useMemo(
    () =>
      Gesture.LongPress()
        .enabled(!disabled && onLongPress != null)
        .onStart(() => {
          'worklet';
          runOnJS(onLongPress ?? (() => {}))();
        }),
    [disabled, onLongPress],
  );

  const composed = useMemo(() => Gesture.Simultaneous(tap, longPress), [tap, longPress]);

  return (
    <GestureDetector gesture={composed}>
      <View
        ref={ref ?? viewRef}
        style={[styles.container, borderless ? styles.borderless : styles.clipped, sxStyle, style]}
        accessible={true}
        accessibilityRole={accessibilityRole}
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled, ...accessibilityState }}
        onStartShouldSetResponder={disabled ? () => false : undefined}
        testID={testID}
      >
        {children}
        {!disabled && (
          <Animated.View
            style={[
              styles.ripple,
              { backgroundColor: resolvedRippleColor, left: ripplePos.x - 50, top: ripplePos.y - 50 },
              animatedRipple,
            ]}
            pointerEvents="none"
          />
        )}
      </View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  container: {
    minWidth: 48,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clipped: {
    overflow: 'hidden',
  },
  borderless: {
    overflow: 'visible',
  },
  ripple: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
