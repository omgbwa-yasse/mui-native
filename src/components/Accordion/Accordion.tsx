import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import { Text } from '../Text/Text';
import type { AccordionProps } from './types';

const ANIMATION_DURATION = 300;

const Accordion = memo<AccordionProps>(function Accordion(rawProps: AccordionProps) {
  const props = useComponentDefaults('Accordion', rawProps);
  const {
    title,
    children,
    expanded: expandedProp,
    onToggle,
    disabled = false,
    left,
    right,
    color,
    sx,
    style,
    ...rest
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);
  const reduceMotion = useReducedMotionValue();
  const isControlled = expandedProp !== undefined;

  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = isControlled ? (expandedProp ?? false) : internalExpanded;

  const [mounted, setMounted] = useState(isExpanded);
  const height = useSharedValue(0);
  const measuredHeight = useRef(0);
  const rotation = useSharedValue(isExpanded ? 180 : 0);

  const handlePress = useCallback(() => {
    if (disabled) return;
    const next = !isExpanded;
    if (!isControlled) setInternalExpanded(next);
    onToggle?.(next);
  }, [disabled, isExpanded, isControlled, onToggle]);

  useEffect(() => {
    if (isExpanded) {
      setMounted(true);
    }
  }, [isExpanded]);

  useEffect(() => {
    const duration = reduceMotion.value ? 0 : ANIMATION_DURATION;
    if (isExpanded) {
      height.value = withTiming(measuredHeight.current, { duration });
      rotation.value = withTiming(180, { duration });
    } else {
      height.value = withTiming(0, { duration });
      rotation.value = withTiming(0, { duration });
      const timer = setTimeout(() => setMounted(false), duration);
      return () => clearTimeout(timer);
    }
  }, [isExpanded, reduceMotion, height, rotation]);

  const animatedContentStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: 'hidden',
  }));

  const animatedChevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const { colorScheme: cs } = theme;

  return (
    <View
      style={[styles.container, sxStyle, style]}
      {...rest}
    >
      <TouchableRipple
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole={'button' as const}
        accessibilityState={{ expanded: isExpanded, disabled }}
        accessibilityLabel={title}
        style={[styles.header, disabled && styles.disabled]}
      >
        <View style={styles.headerRow}>
          {left != null && <View style={styles.leadingSlot}>{left}</View>}
          <Text
            variant="titleMedium"
            style={[styles.title, { color: cs.onSurface }]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {right != null ? (
            <View style={styles.trailingSlot}>{right(isExpanded)}</View>
          ) : (
            <Animated.Text
              style={[
                styles.chevron,
                { color: cs.onSurfaceVariant },
                animatedChevronStyle,
              ]}
            >
              ▼
            </Animated.Text>
          )}
        </View>
      </TouchableRipple>

      <Animated.View style={animatedContentStyle}>
        {mounted && (
          <View
            onLayout={(e) => {
              const h = e.nativeEvent.layout.height;
              if (h > 0) {
                measuredHeight.current = h;
                if (isExpanded) {
                  height.value = withTiming(h, {
                    duration: reduceMotion.value ? 0 : ANIMATION_DURATION,
                  });
                }
              }
            }}
          >
            {children}
          </View>
        )}
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  header: {
    minHeight: 48,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leadingSlot: {
    marginEnd: 16,
  },
  title: {
    flex: 1,
  },
  trailingSlot: {
    marginStart: 8,
  },
  chevron: {
    marginStart: 8,
    fontSize: 12,
  },
  disabled: {
    opacity: 0.38,
  },
});

export { Accordion };
