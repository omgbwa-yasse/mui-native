import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useTransition } from '../../hooks/useTransition';
import type { ZoomProps } from './types';

/**
 * Zoom — scales the child from 0 to 1.
 */
export function Zoom({
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
}: ZoomProps): React.ReactElement | null {
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
    transform: [{ scale: progress.value }],
  }));

  if (!shouldMount) return null;

  return (
    <Animated.View testID={testID} style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
}
