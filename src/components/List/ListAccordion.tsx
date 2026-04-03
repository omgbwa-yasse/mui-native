import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { AccessibilityRole, LayoutChangeEvent } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import { Text } from '../Text/Text';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import type { ListAccordionProps } from './types';

const ANIMATION_DURATION = 200;

const ListAccordion = memo(function ListAccordion({
  title,
  description,
  left,
  right,
  expanded,
  onPress,
  disabled = false,
  children,
  testID,
}: ListAccordionProps) {
  const { theme } = useTheme();
  const isControlled = expanded !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = isControlled ? (expanded ?? false) : internalExpanded;

  const height = useSharedValue(0);
  const measuredHeight = useRef(0);
  const [mounted, setMounted] = useState(isExpanded);

  const iconColor = theme.colorScheme.onSurfaceVariant;

  useEffect(() => {
    if (isExpanded) {
      setMounted(true);
      if (measuredHeight.current > 0) {
        height.value = withTiming(measuredHeight.current, { duration: ANIMATION_DURATION });
      }
    } else {
      height.value = withTiming(0, { duration: ANIMATION_DURATION });
      const timer = setTimeout(() => setMounted(false), ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isExpanded, height]);

  const handlePress = useCallback(() => {
    if (!isControlled) {
      setInternalExpanded((prev) => !prev);
    }
    onPress?.();
  }, [isControlled, onPress]);

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const measured = e.nativeEvent.layout.height;
      if (measured > 0 && measuredHeight.current !== measured) {
        measuredHeight.current = measured;
        if (isExpanded) {
          height.value = withTiming(measured, { duration: ANIMATION_DURATION });
        }
      }
    },
    [isExpanded, height],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: 'hidden' as const,
  }));

  return (
    <View testID={testID}>
      <TouchableRipple
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole={'listitem' as AccessibilityRole}
        accessibilityState={{ disabled, expanded: isExpanded }}
      >
        <View style={[styles.header, { minHeight: 48 }]}>
          {left && <View style={styles.left}>{left({ color: iconColor })}</View>}
          <View style={styles.textBox}>
            <Text variant="bodyLarge" color={theme.colorScheme.onSurface} numberOfLines={1}>
              {title}
            </Text>
            {description ? (
              <Text
                variant="bodyMedium"
                color={theme.colorScheme.onSurfaceVariant}
                numberOfLines={2}
              >
                {description}
              </Text>
            ) : null}
          </View>
          {right && <View style={styles.right}>{right({ color: iconColor })}</View>}
        </View>
      </TouchableRipple>
      <Animated.View style={animatedStyle}>
        {mounted && (
          <View onLayout={handleLayout} style={styles.childrenContainer}>
            {children}
          </View>
        )}
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  left: {
    marginEnd: 16,
    justifyContent: 'center',
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
  },
  right: {
    marginStart: 16,
    justifyContent: 'center',
  },
  childrenContainer: {
    paddingStart: 16,
  },
});

export { ListAccordion };
