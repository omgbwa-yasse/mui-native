import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { AccessibilityRole, LayoutChangeEvent } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import type { BannerProps } from './types';

const ANIMATION_DURATION = 300;

const Banner = memo(function Banner(rawProps: BannerProps) {
  const props = useComponentDefaults('Banner', rawProps);
  const {
    visible,
    children,
    actions,
    icon,
    testID,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const height = useSharedValue(0);
  const measuredHeight = useRef(0);
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
    } else {
      height.value = withTiming(0, { duration: ANIMATION_DURATION }, (finished) => {
        if (finished) {
          // We can't call setMounted from a worklet, use runOnJS-like approach
        }
      });
    }
  }, [visible, height]);

  useEffect(() => {
    if (visible && measuredHeight.current > 0) {
      height.value = withTiming(measuredHeight.current, { duration: ANIMATION_DURATION });
    } else if (!visible) {
      height.value = withTiming(0, { duration: ANIMATION_DURATION });
      const timer = setTimeout(() => setMounted(false), ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [visible, height]);

  const containerStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: 'hidden' as const,
  }));

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const measured = e.nativeEvent.layout.height;
      if (measured > 0) {
        measuredHeight.current = measured;
        if (visible) {
          height.value = withTiming(measured, { duration: ANIMATION_DURATION });
        }
      }
    },
    [visible, height],
  );

  if (!mounted) {
    return null;
  }

  return (
    <Animated.View
      style={[containerStyle, { backgroundColor: theme.colorScheme.surface }, sxStyle, style]}
      testID={testID}
    >
      <View
        onLayout={handleLayout}
        style={styles.content}
        accessibilityRole={'alert' as AccessibilityRole}
      >
        <View style={styles.body}>
          {icon && (
            <View style={styles.iconSlot}>
              <Icon
                source={icon}
                size={24}
                color={theme.colorScheme.onSurface}
              />
            </View>
          )}
          <Text variant="bodyMedium" style={styles.message}>
            {children}
          </Text>
        </View>
        {actions && actions.length > 0 && (
          <View style={styles.actions}>
            {actions.map((action, index) => (
              <TouchableRipple
                key={index}
                onPress={action.onPress}
                style={styles.actionButton}
                accessibilityRole="button"
                accessibilityLabel={action.label}
              >
                <Text
                  variant="labelLarge"
                  color={bg}
                >
                  {action.label}
                </Text>
              </TouchableRipple>
            ))}
          </View>
        )}
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconSlot: {
    marginEnd: 16,
    marginTop: 2,
  },
  message: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    marginBottom: 4,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    marginStart: 8,
  },
});

export { Banner };
