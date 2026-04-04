import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import type { CircularProgressProps } from './types';

const STROKE_WIDTH = 4;
const ROTATE_DURATION = 900;

function clamp(value: number, min: number, max: number): number {
  'worklet';
  return Math.min(Math.max(value, min), max);
}

/**
 * CircularProgress — MD3 circular progress indicator.
 *
 * Supports two variants:
 * - `indeterminate`: endless spinning animation using Reanimated worklets.
 * - `determinate`: shows a segmented arc via two-half-circle View clipping.
 *   // RN-DEVIATION: determinate arc implemented via two-half-circle View clipping
 *   // (no react-native-svg dependency).
 */
const CircularProgress = memo(function CircularProgress({
  variant = 'indeterminate',
  value = 0,
  size = 40,
  color,
  style,
  testID,
}: CircularProgressProps) {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotionValue();
  const indicatorColor = color ?? theme.colorScheme.primary;

  const clampedValue = clamp(value, 0, 100);
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    if (variant !== 'indeterminate') return;
    if (reduceMotion.value) {
      rotation.value = 0;
      return;
    }
    rotation.value = withRepeat(
      withTiming(360, { duration: ROTATE_DURATION }),
      -1,
      false,
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  const spinnerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const outerSize = size;
  const halfSize = outerSize / 2;
  const innerSize = outerSize - STROKE_WIDTH * 2;

  // ── Determinate arc via two-half-circle clipping ──────────────────────────
  // The circle is split into two half-circles (left and right).
  // For 0-50%  : only the right half rotates from 0 to 180deg.
  // For 50-100%: right half is at 180deg, left half rotates from 0 to 180deg.
  const rightDeg = clampedValue >= 50 ? 180 : (clampedValue / 50) * 180;
  const leftDeg = clampedValue >= 50 ? ((clampedValue - 50) / 50) * 180 : 0;

  const containerStyle = {
    width: outerSize,
    height: outerSize,
    borderRadius: halfSize,
    overflow: 'hidden' as const,
    backgroundColor: 'transparent',
  };

  const trackStyle = {
    width: outerSize,
    height: outerSize,
    borderRadius: halfSize,
    borderWidth: STROKE_WIDTH,
    borderColor: `${indicatorColor}40`,
    position: 'absolute' as const,
  };

  if (variant === 'indeterminate') {
    return (
      <View
        accessible={true}
        accessibilityRole="progressbar"
        testID={testID}
        style={[containerStyle, style]}
      >
        <View style={trackStyle} />
        <Animated.View
          style={[
            spinnerStyle,
            {
              position: 'absolute',
              width: outerSize,
              height: outerSize,
            },
          ]}
        >
          <View
            style={[
              trackStyle,
              {
                borderColor: indicatorColor,
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent',
              },
            ]}
          />
        </Animated.View>
      </View>
    );
  }

  // Determinate
  return (
    <View
      accessible={true}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clampedValue }}
      testID={testID}
      style={[containerStyle, style]}
    >
      {/* Track ring */}
      <View style={trackStyle} />
      {/* Right half (first 50%) */}
      <View
        style={{
          position: 'absolute',
          width: halfSize,
          height: outerSize,
          left: halfSize,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            position: 'absolute',
            width: outerSize,
            height: outerSize,
            right: 0,
            borderWidth: STROKE_WIDTH,
            borderColor: indicatorColor,
            borderRadius: halfSize,
            transform: [{ rotate: `${rightDeg - 180}deg` }],
          }}
        />
      </View>
      {/* Left half (second 50%) */}
      <View
        style={{
          position: 'absolute',
          width: halfSize,
          height: outerSize,
          left: 0,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            position: 'absolute',
            width: outerSize,
            height: outerSize,
            left: 0,
            borderWidth: STROKE_WIDTH,
            borderColor: indicatorColor,
            borderRadius: halfSize,
            transform: [{ rotate: `${leftDeg}deg` }],
          }}
        />
      </View>
      {/* Center hole */}
      <View
        style={{
          position: 'absolute',
          width: innerSize,
          height: innerSize,
          borderRadius: innerSize / 2,
          backgroundColor: theme.colorScheme.surface,
          top: STROKE_WIDTH,
          left: STROKE_WIDTH,
        }}
      />
    </View>
  );
});

export { CircularProgress };
