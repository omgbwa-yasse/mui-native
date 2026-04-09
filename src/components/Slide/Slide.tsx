import React from 'react';
import { Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { useTransition } from '../../hooks/useTransition';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useSx } from '../../hooks/useSx';
import type { SlideProps, SlideDirection } from './types';
import { useTheme } from '../../theme';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('screen');

/**
 * Get off-screen translation values for a given slide direction.
 *
 * The contract specifies:
 * - 'up'    → child enters from bottom    (translateY starts positive)
 * - 'down'  → child enters from top       (translateY starts negative)
 * - 'left'  → child enters from right     (translateX starts positive)
 * - 'right' → child enters from left      (translateX starts negative)
 */
function getTranslation(
  direction: SlideDirection,
): { axis: 'translateX' | 'translateY'; from: number } {
  switch (direction) {
    case 'up':    return { axis: 'translateY', from: SCREEN_H };
    case 'down':  return { axis: 'translateY', from: -SCREEN_H };
    case 'left':  return { axis: 'translateX', from: SCREEN_W };
    case 'right': return { axis: 'translateX', from: -SCREEN_W };
  }
}

/**
 * Slide — translates the child in/out from an edge.
 */
export function Slide(rawProps: SlideProps): React.ReactElement | null {
  const props = useComponentDefaults('Slide', rawProps) as SlideProps;
  const { theme } = useTheme();
  const {
    in: inProp = false,
    timeout = 300,
    mountOnEnter = false,
    unmountOnExit = false,
    direction = 'down',
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

  const { axis, from } = getTranslation(direction);

  const animatedStyle = useAnimatedStyle(() => {
    const offset = interpolate(progress.value, [0, 1], [from, 0]);
    return {
      transform: [
        axis === 'translateX'
          ? { translateX: offset }
          : { translateY: offset },
      ],
    };
  });

  if (!shouldMount) return null;

  return (
    <Animated.View testID={testID} style={[animatedStyle, sxStyle, style]}>
      {children}
    </Animated.View>
  );
}
