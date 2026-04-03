import { useEffect, useRef } from 'react';
import { AccessibilityInfo } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

/**
 * Returns a Reanimated `SharedValue<boolean>` that is `true` when the OS
 * "Reduce Motion" accessibility setting is active.
 *
 * The hook subscribes to the OS event so the value stays in sync when the user
 * toggles the setting without restarting the app.
 *
 * **Example — skip spring animation when reduce-motion is on:**
 * ```tsx
 * const reduceMotion = useReducedMotionValue();
 * const animatedStyle = useAnimatedStyle(() => ({
 *   transform: [{ scale: reduceMotion.value ? 1 : scale.value }],
 * }));
 * ```
 */
export function useReducedMotionValue(): SharedValue<boolean> {
  const reduceMotion = useSharedValue(false);

  // Keep a ref so we can cancel the subscription on unmount
  const listenerRef = useRef<ReturnType<
    typeof AccessibilityInfo['addEventListener']
  > | null>(null);

  useEffect(() => {
    // Read the current value when the hook mounts
    void AccessibilityInfo.isReduceMotionEnabled().then(enabled => {
      reduceMotion.value = enabled;
    });

    // Subscribe to future changes
    listenerRef.current = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      (enabled: boolean) => {
        reduceMotion.value = enabled;
      },
    );

    return () => {
      listenerRef.current?.remove();
    };
  }, [reduceMotion]);

  return reduceMotion;
}
