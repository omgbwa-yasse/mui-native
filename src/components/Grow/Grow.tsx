import React from 'react';
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { useTransition } from '../../hooks/useTransition';
import type { GrowProps } from './types';

const GROW_SCALE_MIN = 0.75;

/**
 * Grow — animates opacity 0→1 and scale 0.75→1 simultaneously.
 *
 * // RN-DEVIATION: MUI Web also animates transform-origin to match anchor direction.
 * // React Native uses center pivot only (default transform-origin behavior).
 */
export function Grow({
  in: inProp = false,
  timeout = 300,
  mountOnEnter = false,
  unmountOnExit = false,
  children,
  style,
  onEnter,
  onEntered,
  onExit,
  onExited,
  testID,
}: GrowProps): React.ReactElement | null {
  const { progress, shouldMount, state } = useTransition({
    in: inProp,
    timeout,
    mountOnEnter,
    unmountOnExit,
  });

  const prevStateRef = React.useRef(state);
  React.useEffect(() => {
    const prev = prevStateRef.current;
    prevStateRef.current = state;
    if (prev !== 'ENTERING' && state === 'ENTERING') onEnter?.();
    if (prev !== 'ENTERED' && state === 'ENTERED') onEntered?.();
    if (prev !== 'EXITING' && state === 'EXITING') onExit?.();
    if (prev !== 'EXITED' && state === 'EXITED') onExited?.();
  }, [state, onEnter, onEntered, onExit, onExited]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      {
        scale: interpolate(progress.value, [0, 1], [GROW_SCALE_MIN, 1]),
      },
    ],
  }));

  if (!shouldMount) return null;

  return (
    <Animated.View testID={testID} style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
}
