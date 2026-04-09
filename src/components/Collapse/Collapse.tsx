import React, { useCallback } from 'react';
import { View } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, interpolate } from 'react-native-reanimated';
import { useTransition } from '../../hooks/useTransition';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useSx } from '../../hooks/useSx';
import type { CollapseProps } from './types';
import { useTheme } from '../../theme';

/**
 * Collapse — animates height (vertical) or width (horizontal) between
 * `collapsedSize` and the natural measured size of the content.
 *
 * RN-DEVIATION: transitions use Reanimated worklets; react-transition-group is web-only
 */
export function Collapse(rawProps: CollapseProps): React.ReactElement | null {
  const props = useComponentDefaults('Collapse', rawProps);
  const { theme } = useTheme();
  const {
    in: inProp = false,
    timeout = 300,
    mountOnEnter = false,
    unmountOnExit = false,
    orientation = 'vertical',
    collapsedSize: collapsedSizeProp = 0,
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
  const clampedCollapsedSize = Math.max(0, collapsedSizeProp);

  const { progress, shouldMount, state } = useTransition({
    in: inProp,
    timeout,
    mountOnEnter,
    unmountOnExit,
  });

  // naturalSize holds the measured height (or width) of the inner container.
  // Starts at 0; updated on each layout pass.
  const naturalSize = useSharedValue(0);

  // Lifecycle callbacks
  const prevStateRef = React.useRef(state);
  React.useEffect(() => {
    const prev = prevStateRef.current;
    prevStateRef.current = state;
    if (prev !== 'ENTERING' && state === 'ENTERING') onEnter?.();
    if (prev !== 'ENTERED'  && state === 'ENTERED')  onEntered?.();
    if (prev !== 'EXITING'  && state === 'EXITING')  onExit?.();
    if (prev !== 'EXITED'   && state === 'EXITED')   onExited?.();
  }, [state, onEnter, onEntered, onExit, onExited]);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const measured =
        orientation === 'vertical'
          ? event.nativeEvent.layout.height
          : event.nativeEvent.layout.width;
      if (measured > 0) {
        naturalSize.value = measured;
      }
    },
    [orientation, naturalSize],
  );

  const animatedStyle = useAnimatedStyle(() => {
    // Interpolate between collapsedSize (progress=0) and naturalSize (progress=1).
    const dimension = interpolate(
      progress.value,
      [0, 1],
      [clampedCollapsedSize, naturalSize.value],
    );

    if (orientation === 'vertical') {
      return { overflow: 'hidden' as const, height: dimension };
    }
    return { overflow: 'hidden' as const, width: dimension };
  });

  if (!shouldMount) return null;

  return (
    <Animated.View testID={testID} style={[animatedStyle, sxStyle, style]}>
      <View onLayout={onLayout}>{children}</View>
    </Animated.View>
  );
}
