import React, { memo, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  withSequence,
} from 'react-native-reanimated';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import type { LinearProgressProps } from './types';

const TRACK_HEIGHT = 4;
const INDETERMINATE_DURATION = 2100;
const INDETERMINATE_DELAY = 715;

function clamp(value: number): number {
  'worklet';
  return Math.min(Math.max(value, 0), 100);
}

/**
 * LinearProgress — MD3 linear progress indicator.
 *
 * Three-layer architecture: track → buffer → fill (absolute positioned).
 *
 * Supports four variants:
 * - `indeterminate`: two staggered bars animate across the track (2100 ms loop + 715 ms delay).
 * - `determinate`: primary bar fills proportionally to `value`.
 * - `buffer`: primary + secondary (buffer) bars visible.
 * - `query`: reversed indeterminate animation.
 */
const LinearProgress = memo(function LinearProgress(rawProps: LinearProgressProps) {
  const props = useComponentDefaults('LinearProgress', rawProps);
  const {
    variant = 'indeterminate',
    value = 0,
    valueBuffer = 0,
    sx,
    style,
    testID,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const reduceMotion = useReducedMotionValue();
  const indicatorColor = color ?? theme.colorScheme.primary;

  const clampedValue = clamp(value);
  const clampedBuffer = clamp(valueBuffer);

  // Indeterminate animation: bar1 sweeps across, bar2 follows with delay
  const bar1X = useSharedValue(-100);
  const bar2X = useSharedValue(-100);

  useEffect(() => {
    if (variant !== 'indeterminate' && variant !== 'query') return;
    if (reduceMotion.value) return;

    const direction = variant === 'query' ? -1 : 1;

    bar1X.value = withRepeat(
      withTiming(direction * 100, { duration: INDETERMINATE_DURATION }),
      -1,
      false,
    );
    bar2X.value = withDelay(
      INDETERMINATE_DELAY,
      withRepeat(
        withTiming(direction * 100, { duration: INDETERMINATE_DURATION }),
        -1,
        false,
      ),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  const bar1Style = useAnimatedStyle(() => ({
    transform: [{ translateX: `${bar1X.value}%` as unknown as number }],
    width: '60%',
  }));

  const bar2Style = useAnimatedStyle(() => ({
    transform: [{ translateX: `${bar2X.value}%` as unknown as number }],
    width: '80%',
  }));

  const isDeterminate = variant === 'determinate' || variant === 'buffer';

  return (
    <View
      accessible={true}
      accessibilityRole="progressbar"
      accessibilityValue={
        isDeterminate ? { min: 0, max: 100, now: clampedValue } : undefined
      }
      testID={testID}
      style={[styles.container, sxStyle, style]}
    >
      {/* Layer 1: track (background) */}
      <View
        style={[
          styles.track,
          { backgroundColor: `${indicatorColor}40` },
        ]}
      />

      {/* Layer 2: buffer bar */}
      {variant === 'buffer' && (
        <View
          style={[
            styles.bar,
            {
              width: `${clampedBuffer}%`,
              backgroundColor: `${indicatorColor}80`,
            },
          ]}
        />
      )}

      {/* Layer 3: primary fill / animated bars */}
      {isDeterminate ? (
        <View
          style={[
            styles.bar,
            {
              width: `${clampedValue}%`,
              backgroundColor: indicatorColor,
            },
          ]}
        />
      ) : (
        <>
          <Animated.View
            style={[
              styles.bar,
              bar1Style,
              { backgroundColor: indicatorColor, left: '-60%' },
            ]}
          />
          <Animated.View
            style={[
              styles.bar,
              bar2Style,
              { backgroundColor: indicatorColor, left: '-80%' },
            ]}
          />
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: TRACK_HEIGHT,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  track: {
    ...StyleSheet.absoluteFillObject,
  },
  bar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
});

export { LinearProgress };
