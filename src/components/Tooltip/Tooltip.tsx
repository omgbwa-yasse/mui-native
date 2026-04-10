import React, { memo, useCallback, useRef, useState } from 'react';
import type { AccessibilityRole, View } from 'react-native';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { useSx } from '../../hooks/useSx';
import { Portal } from '../Portal/Portal';
import { Text } from '../Text/Text';
import type { TooltipProps } from './types';

const FADE_DURATION = 150;
const AUTO_HIDE_DELAY = 1500;
const TOOLTIP_PADDING = 8;
const SCREEN_EDGE_PADDING = 8;
const TOOLTIP_OFFSET = 4;

const Tooltip = memo(function Tooltip(rawProps: TooltipProps) {
  const props = useComponentDefaults('Tooltip', rawProps);
  const {
    title,
    children,
    placement = 'top',
    enterDelay = 0,
    testID,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const reduceMotion = useReducedMotionValue();
  const opacity = useSharedValue(0);
  const [visible, setVisible] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const anchorRef = useRef<View>(null);
  const autoHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const screenWidth = Dimensions.get('window').width;

  const show = useCallback(() => {
    if (!anchorRef.current) return;
    anchorRef.current.measure((_x, _y, width, height, pageX, pageY) => {
      let top = 0;
      let left = pageX + width / 2;

      switch (placement) {
        case 'bottom':
          top = pageY + height + TOOLTIP_OFFSET;
          break;
        case 'left':
          top = pageY + height / 2;
          left = pageX - TOOLTIP_OFFSET;
          break;
        case 'right':
          top = pageY + height / 2;
          left = pageX + width + TOOLTIP_OFFSET;
          break;
        default: // top
          top = pageY - TOOLTIP_OFFSET;
          break;
      }

      // Clamp to screen edges
      left = Math.max(SCREEN_EDGE_PADDING, Math.min(left, screenWidth - SCREEN_EDGE_PADDING));

      setTooltipPos({ top, left });
      setVisible(true);
      opacity.value = reduceMotion.value ? 1 : withTiming(1, { duration: FADE_DURATION });

      autoHideTimer.current = setTimeout(() => {
        opacity.value = reduceMotion.value
          ? 0
          : withTiming(0, { duration: FADE_DURATION }, (finished) => {
              if (finished) runOnJS(setVisible)(false);
            });
        if (reduceMotion.value) setVisible(false);
      }, AUTO_HIDE_DELAY);
    });
  }, [placement, screenWidth, opacity, reduceMotion]);

  const handleLongPress = useCallback(() => {
    if (autoHideTimer.current) clearTimeout(autoHideTimer.current);
    if (enterDelay > 0) {
      enterTimer.current = setTimeout(show, enterDelay);
    } else {
      show();
    }
  }, [enterDelay, show]);

  const tooltipStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const clonedChild = React.cloneElement(children, {
    ref: anchorRef,
    onLongPress: handleLongPress,
    accessibilityLabel: children.props.accessibilityLabel
      ? `${children.props.accessibilityLabel}, ${title}`
      : title,
  });

  return (
    <>
      {clonedChild}
      {visible && (
        <Portal>
          <Animated.View
            style={[
              styles.tooltip,
              tooltipStyle,
              {
                top: tooltipPos.top,
                left: tooltipPos.left,
                backgroundColor: theme.colorScheme.inverseSurface,
                transform: [{ translateX: -50 }],
              },
              sxStyle,
              style,
            ]}
            accessibilityRole={'tooltip' as AccessibilityRole}
            testID={testID}
          >
            <Text variant="bodySmall" color={theme.colorScheme.inverseOnSurface}>
              {title}
            </Text>
          </Animated.View>
        </Portal>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    paddingHorizontal: TOOLTIP_PADDING,
    paddingVertical: 4,
    borderRadius: 4,
    maxWidth: 200,
  },
});

export { Tooltip };
