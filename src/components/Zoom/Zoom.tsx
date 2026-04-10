import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useTransition } from '../../hooks/useTransition';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useSx } from '../../hooks/useSx';
import type { ZoomProps } from './types';
import { useTheme } from '../../theme';

/**
 * Zoom — scales the child from 0 to 1.
 */
export function Zoom(rawProps: ZoomProps): React.ReactElement | null {
  const props = useComponentDefaults('Zoom', rawProps) as ZoomProps;
  const { theme } = useTheme();
  const {
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
    sx,
  } = props;
  const sxStyle = useSx(sx, theme);
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
    <Animated.View testID={testID} style={[animatedStyle, sxStyle, style]}>
      {children}
    </Animated.View>
  );
}
