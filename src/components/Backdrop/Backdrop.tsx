import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Portal } from '../Portal/Portal';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { useSx } from '../../hooks/useSx';
import type { BackdropProps } from './types';

/**
 * Backdrop — full-screen Portal-rendered scrim.
 *
 * Fades in/out over 200 ms (motion short2). Mounted via Portal so it always
 * appears above the full view tree. Respects reduce-motion.
 */
export function Backdrop(rawProps: BackdropProps): React.ReactElement | null {
  const props = useComponentDefaults('Backdrop', rawProps);
  const {
    visible,
    onDismiss,
    opacity = 0.5,
    testID,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  const reduceMotion = useReducedMotionValue();
  const fadeAnim = useSharedValue(visible ? opacity : 0);

  useEffect(() => {
    const target = visible ? opacity : 0;
    if (reduceMotion.value) {
      fadeAnim.value = target;
    } else {
      fadeAnim.value = withTiming(target, { duration: 200 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  if (!visible && fadeAnim.value === 0) return null;

  return (
    <Portal>
      <Animated.View style={[StyleSheet.absoluteFill, styles.scrim, { backgroundColor: theme.colorScheme.scrim }, animatedStyle, sxStyle, style]}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onDismiss}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          testID={testID}
          // Block pointer events on the scrim itself
          pointerEvents={visible ? 'auto' : 'none'}
        />
      </Animated.View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  scrim: {},
});
