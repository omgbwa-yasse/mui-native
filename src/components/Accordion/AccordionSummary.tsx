import React, { memo, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import { AccordionContext } from './AccordionContext';
import type { AccordionSummaryProps } from './types';

const ANIMATION_DURATION = 300;

const AccordionSummary = memo(function AccordionSummary({
  expandIcon,
  children,
  sx,
  style,
  ...rest
}: AccordionSummaryProps) {
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { isExpanded, toggle, disabled } = useContext(AccordionContext);
  const reduceMotion = useReducedMotionValue();

  const rotation = useSharedValue(isExpanded ? 180 : 0);

  // Keep rotation in sync with expansion
  React.useEffect(() => {
    const duration = reduceMotion.value ? 0 : ANIMATION_DURATION;
    rotation.value = withTiming(isExpanded ? 180 : 0, { duration });
  }, [isExpanded, reduceMotion, rotation]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <TouchableRipple
      onPress={toggle}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ expanded: isExpanded, disabled }}
      style={[styles.root, disabled && styles.disabled, sxStyle, style as any]}
      {...rest}
    >
      <View style={styles.row}>
        <View style={styles.content}>{children}</View>
        <Animated.View style={[styles.expandIcon, chevronStyle]}>
          {expandIcon ?? (
            <Animated.Text
              style={{ color: theme.colorScheme.onSurfaceVariant, fontSize: 12 }}
            >
              ▼
            </Animated.Text>
          )}
        </Animated.View>
      </View>
    </TouchableRipple>
  );
});

const styles = StyleSheet.create({
  root: {
    minHeight: 48,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  content: {
    flex: 1,
  },
  expandIcon: {
    marginStart: 8,
  },
  disabled: {
    opacity: 0.38,
  },
});

export { AccordionSummary };
