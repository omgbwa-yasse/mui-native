import React, { memo, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { useSx } from '../../hooks/useSx';
import type { ActivityIndicatorProps } from './types';

const SIZE_MAP = { small: 20, medium: 36, large: 48 };
const STROKE_MAP = { small: 2, medium: 3, large: 4 };

/**
 * ActivityIndicator — MD3 circular progress indicator.
 *
 * Uses Reanimated rotation worklet for 60 fps animation with full reduce-motion support.
 */
export const ActivityIndicator = memo(function ActivityIndicator(rawProps: ActivityIndicatorProps): React.ReactElement | null {
  const props = useComponentDefaults('ActivityIndicator', rawProps);
  const {
    size = 'medium',
    color,
    animating = true,
    hidesWhenStopped = true,
    testID,
    accessibilityLabel,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const reduceMotion = useReducedMotionValue();
  const rotation = useSharedValue(0);

  const resolvedColor = color ?? theme.colorScheme.primary;
  const sizePx = SIZE_MAP[size];
  const strokePx = STROKE_MAP[size];

  useEffect(() => {
    if (animating && !reduceMotion.value) {
      rotation.value = withRepeat(
        withTiming(1, { duration: 900, easing: Easing.linear }),
        -1,
        false,
      );
    } else {
      cancelAnimation(rotation);
      rotation.value = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animating]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 360}deg` }],
  }));

  if (!animating && hidesWhenStopped) return null;

  return (
    <View
      accessibilityRole="progressbar"
      accessible
      accessibilityLabel={accessibilityLabel ?? 'Loading'}
      testID={testID}
      style={[sxStyle, style]}
    >
      <Animated.View
        style={[
          {
            width: sizePx,
            height: sizePx,
            borderRadius: sizePx / 2,
            borderWidth: strokePx,
            borderColor: resolvedColor,
            borderTopColor: 'transparent',
          },
          animatedStyle,
        ]}
      />
    </View>
  );
});
