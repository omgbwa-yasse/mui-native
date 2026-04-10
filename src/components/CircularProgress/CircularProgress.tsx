import React, { memo } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { useSx } from '../../hooks/useSx';
import type { CircularProgressProps } from './types';

const ROTATE_DURATION = 1400;
const SEMANTIC_SIZES = { small: 32, medium: 40, large: 48 } as const;

// AnimatedCircle for native-driven strokeDashoffset oscillation (shrink effect)
const AnimatedCircle = Animated.createAnimatedComponent(
  Circle as React.ComponentType<{
    cx: number;
    cy: number;
    r: number;
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
    strokeDasharray?: number;
    strokeDashoffset?: number;
    strokeLinecap?: string;
    rotation?: number;
    origin?: string;
    testID?: string;
  }>,
);

function clamp(val: number, lo: number, hi: number): number {
  'worklet';
  return Math.min(Math.max(val, lo), hi);
}

/**
 * CircularProgress â€” MD3 circular progress indicator.
 *
 * Supports two variants:
 * - `indeterminate`: rotation loop + optional arc-length oscillation (shrink).
 * - `determinate`: SVG arc sized via strokeDashoffset proportional to `value`.
 *
 * Uses react-native-svg <Svg>/<Circle> for accurate arc rendering.
 * All Reanimated animation worklets are gated on `!useReducedMotionValue()`.
 */
const CircularProgress = memo(function CircularProgress(rawProps: CircularProgressProps) {
  const props = useComponentDefaults('CircularProgress', rawProps);
  const {
    variant = 'indeterminate',
    value = 0,
    size = 40,
    thickness = 3.6,
    color,
    disableShrink = false,
    enableTrackSlot = false,
    style,
    testID,
    sx,
  } = props;

  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const reduceMotion = useReducedMotionValue();
  const indicatorColor = color ?? theme.colorScheme.primary;
  const trackColor = `${indicatorColor}40`;

  const outerSize: number = typeof size === 'number' ? size : SEMANTIC_SIZES[size];
  const radius = (outerSize - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = clamp(value, 0, 100);

  // â”€â”€ Shared values â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const rotation = useSharedValue(0);
  // Initial shrinkOffset: 20% of circumference (partial arc, as in MUI)
  const shrinkOffset = useSharedValue(circumference * 0.2);

  React.useEffect(() => {
    if (variant !== 'indeterminate') return;

    if (reduceMotion.value) {
      // Reduce motion: freeze at a representative static position
      rotation.value = 0;
      shrinkOffset.value = circumference * 0.2;
      return;
    }

    // Continuous rotation loop
    rotation.value = withRepeat(
      withTiming(360, { duration: ROTATE_DURATION }),
      -1,
      false,
    );

    // Shrink/grow oscillation â€” gated on !disableShrink (T017)
    if (!disableShrink) {
      shrinkOffset.value = withRepeat(
        withSequence(
          withTiming(circumference * 0.75, { duration: ROTATE_DURATION / 2 }),
          withTiming(circumference * 0.2, { duration: ROTATE_DURATION / 2 }),
        ),
        -1,
        false,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, disableShrink, circumference]);

  const spinnerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  // Animated strokeDashoffset for shrink/grow on the indeterminate arc
  const arcAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: shrinkOffset.value,
  }));

  const containerStyle = { width: outerSize, height: outerSize };

  // â”€â”€ Indeterminate â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (variant === 'indeterminate') {
    return (
      <View
        accessible
        accessibilityRole="progressbar"
        testID={testID}
        style={[containerStyle, sxStyle, style]}
      >
        <Animated.View style={[{ position: 'absolute' }, spinnerStyle]}>
          <Svg width={outerSize} height={outerSize}>
            {enableTrackSlot && (
              <Circle
                testID="progress-track"
                cx={outerSize / 2}
                cy={outerSize / 2}
                r={radius}
                stroke={trackColor}
                strokeWidth={thickness}
                fill="none"
              />
            )}
            <AnimatedCircle
              testID="progress-arc"
              cx={outerSize / 2}
              cy={outerSize / 2}
              r={radius}
              stroke={indicatorColor}
              strokeWidth={thickness}
              fill="none"
              strokeDasharray={circumference}
              animatedProps={arcAnimatedProps}
              strokeLinecap="round"
              rotation={-90}
              origin={`${outerSize / 2},${outerSize / 2}`}
            />
          </Svg>
        </Animated.View>
      </View>
    );
  }

  // â”€â”€ Determinate â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const determinateOffset = circumference * (1 - clampedValue / 100);

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clampedValue }}
      testID={testID}
      style={[containerStyle, sxStyle, style]}
    >
      <Svg width={outerSize} height={outerSize}>
        {enableTrackSlot && (
          <Circle
            testID="progress-track"
            cx={outerSize / 2}
            cy={outerSize / 2}
            r={radius}
            stroke={trackColor}
            strokeWidth={thickness}
            fill="none"
          />
        )}
        <Circle
          testID="progress-arc"
          cx={outerSize / 2}
          cy={outerSize / 2}
          r={radius}
          stroke={indicatorColor}
          strokeWidth={thickness}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={determinateOffset}
          strokeLinecap="round"
          rotation={-90}
          origin={`${outerSize / 2},${outerSize / 2}`}
        />
      </Svg>
    </View>
  );
});

export { CircularProgress };
