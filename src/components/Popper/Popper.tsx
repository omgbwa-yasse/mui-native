import React, { useCallback, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useAnchorPosition } from '../../hooks/useAnchorPosition';
import { Portal } from '../Portal/Portal';
import type { PopperProps, PopperPlacement } from './types';

type V = 'top' | 'center' | 'bottom';
type H = 'left' | 'center' | 'right';

interface OriginPair {
  anchorV: V; anchorH: H;
  transformV: V; transformH: H;
}

/** Lookup table: placement → anchor + transform origin pair. */
const PLACEMENT_MAP: Record<PopperPlacement, OriginPair> = {
  'top':           { anchorV: 'top',    anchorH: 'center', transformV: 'bottom', transformH: 'center' },
  'top-start':     { anchorV: 'top',    anchorH: 'left',   transformV: 'bottom', transformH: 'left'   },
  'top-end':       { anchorV: 'top',    anchorH: 'right',  transformV: 'bottom', transformH: 'right'  },
  'bottom':        { anchorV: 'bottom', anchorH: 'center', transformV: 'top',    transformH: 'center' },
  'bottom-start':  { anchorV: 'bottom', anchorH: 'left',   transformV: 'top',    transformH: 'left'   },
  'bottom-end':    { anchorV: 'bottom', anchorH: 'right',  transformV: 'top',    transformH: 'right'  },
  'left':          { anchorV: 'center', anchorH: 'left',   transformV: 'center', transformH: 'right'  },
  'left-start':    { anchorV: 'top',    anchorH: 'left',   transformV: 'top',    transformH: 'right'  },
  'left-end':      { anchorV: 'bottom', anchorH: 'left',   transformV: 'bottom', transformH: 'right'  },
  'right':         { anchorV: 'center', anchorH: 'right',  transformV: 'center', transformH: 'left'   },
  'right-start':   { anchorV: 'top',    anchorH: 'right',  transformV: 'top',    transformH: 'left'   },
  'right-end':     { anchorV: 'bottom', anchorH: 'right',  transformV: 'bottom', transformH: 'left'   },
};

function vFactor(v: V): number {
  if (v === 'center') return 0.5;
  if (v === 'bottom') return 1;
  return 0;
}

function hFactor(h: H): number {
  if (h === 'center') return 0.5;
  if (h === 'right') return 1;
  return 0;
}

/**
 * Popper — low-level anchored positioning without a backdrop.
 *
 * Unlike Popover, Popper does NOT render a backdrop and touches behind the
 * popper content pass through freely (FR-014).
 */
export function Popper({
  open,
  anchorRef,
  placement = 'bottom',
  disablePortal = false,
  keepMounted = false,
  children,
  style,
  testID,
}: PopperProps): React.ReactElement | null {
  const anchorPos = useAnchorPosition(anchorRef, open);
  const [surfaceSize, setSurfaceSize] = useState<{ width: number; height: number } | null>(null);

  const opacity = useSharedValue(open ? 1 : 0);
  const prevOpen = React.useRef(open);

  React.useEffect(() => {
    const wasOpen = prevOpen.current;
    prevOpen.current = open;
    if (open && !wasOpen) {
      opacity.value = withTiming(1, { duration: 150 });
    } else if (!open && wasOpen) {
      opacity.value = withTiming(0, { duration: 150 });
    }
  }, [open, opacity]);

  const surfaceStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setSurfaceSize({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  }, []);

  // Unmount when closed (and not keepMounted)
  const shouldRender = open || keepMounted;
  if (!shouldRender) return null;

  const { anchorV, anchorH, transformV, transformH } = PLACEMENT_MAP[placement];

  let top = 0;
  let left = 0;
  if (anchorPos && surfaceSize) {
    top =
      anchorPos.top +
      anchorPos.height * vFactor(anchorV) -
      surfaceSize.height * vFactor(transformV);
    left =
      anchorPos.left +
      anchorPos.width * hFactor(anchorH) -
      surfaceSize.width * hFactor(transformH);
  }

  const content = (
    <Animated.View
      testID={testID}
      onLayout={handleLayout}
      style={[
        { position: 'absolute', top, left },
        surfaceStyle,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );

  if (disablePortal) return content;
  return <Portal>{content}</Portal>;
}
