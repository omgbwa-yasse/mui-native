import React, { useCallback, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useAnchorPosition } from '../../hooks/useAnchorPosition';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import { Portal } from '../Portal/Portal';
import type { PopoverProps, VerticalPosition, HorizontalPosition } from './types';

const FADE_DURATION = 150;

function vFactor(v: VerticalPosition): number {
  if (v === 'center') return 0.5;
  if (v === 'bottom') return 1;
  return 0; // 'top'
}

function hFactor(h: HorizontalPosition): number {
  if (h === 'center') return 0.5;
  if (h === 'right') return 1;
  return 0; // 'left'
}

/**
 * Popover — anchored contextual overlay.
 *
 * Renders children above all other content via Portal, positioned relative to
 * the provided `anchorRef`. Dismiss by pressing the backdrop if `onClose` is provided.
 *
 * Inline opacity animation via withTiming (does NOT import from Fade to prevent
 * circular dependency if Fade ever wraps Popover).
 */
export function Popover(rawProps: PopoverProps): React.ReactElement | null {
  const props = useComponentDefaults('Popover', rawProps);
  const {
    open,
    anchorRef,
    onClose,
    anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
    transformOrigin = { vertical: 'top', horizontal: 'left' },
    elevation: _elevationProp = 8,
    disablePortal = false,
    children,
    color,
    sx,
    style,
    testID,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);
  const anchorPos = useAnchorPosition(anchorRef, open);

  const [surfaceSize, setSurfaceSize] = useState<{ width: number; height: number } | null>(null);
  // Initialize from `open` so a popover that is open on mount renders immediately
  const opacity = useSharedValue(open ? 1 : 0);
  const [shouldRender, setShouldRender] = useState(open);
  const prevOpen = useRef(open);

  React.useEffect(() => {
    const wasOpen = prevOpen.current;
    prevOpen.current = open;

    if (open && !wasOpen) {
      setShouldRender(true);
      opacity.value = withTiming(1, { duration: FADE_DURATION });
    } else if (!open && wasOpen) {
      opacity.value = withTiming(0, { duration: FADE_DURATION }, (finished) => {
        if (finished) {
          // Clear surface size for next open
        }
      });
      const timeout = setTimeout(() => setShouldRender(false), FADE_DURATION + 16);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [open, opacity]);

  const surfaceStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const handleSurfaceLayout = useCallback((e: LayoutChangeEvent) => {
    setSurfaceSize({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  }, []);

  if (!shouldRender) return null;

  // Positioning: default to (0,0) until we have both anchor + surface sizes
  let top = 0;
  let left = 0;

  if (anchorPos && surfaceSize) {
    top =
      anchorPos.top +
      anchorPos.height * vFactor(anchorOrigin.vertical) -
      surfaceSize.height * vFactor(transformOrigin.vertical);
    left =
      anchorPos.left +
      anchorPos.width * hFactor(anchorOrigin.horizontal) -
      surfaceSize.width * hFactor(transformOrigin.horizontal);
  }

  const popoverContent = (
    <View
      style={StyleSheet.absoluteFill}
      pointerEvents="box-none"
      testID={testID}
    >
      {/* Backdrop — full-screen, captures presses to dismiss */}
      <Pressable
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Close popover"
        style={StyleSheet.absoluteFillObject}
        onPress={onClose}
        testID={testID ? `${testID}-backdrop` : undefined}
      />
      {/* Surface */}
      <Animated.View
        onLayout={handleSurfaceLayout}
        style={[
          styles.surface,
          {
            top,
            left,
            backgroundColor: theme.colorScheme.surface,
            shadowColor: theme.colorScheme.shadow,
          },
          surfaceStyle,
          sxStyle,
          style,
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );

  if (disablePortal) {
    return popoverContent;
  }

  return <Portal>{popoverContent}</Portal>;
}

const styles = StyleSheet.create({
  surface: {
    position: 'absolute',
    borderRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
});
