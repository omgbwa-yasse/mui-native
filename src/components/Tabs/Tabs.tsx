import React, { memo, useCallback, useRef, useState } from 'react';
import type { AccessibilityRole } from 'react-native';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import { Text } from '../Text/Text';
import { TabsContext } from './TabsContext';
import type { TabsProps } from './types';

const INDICATOR_DURATION = 200;

const Tabs = memo(function Tabs({
  items,
  value,
  onValueChange,
  variant = 'primary',
  scrollable = false,
  children,
  testID,
}: TabsProps) {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotionValue();

  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  const tabWidths = useRef<number[]>([]);
  const tabOffsets = useRef<number[]>([]);
  const [tabsReady, setTabsReady] = useState(false);

  const activeColor = variant === 'secondary'
    ? theme.colorScheme.secondary
    : theme.colorScheme.primary;

  const moveIndicator = useCallback(
    (index: number) => {
      const x = tabOffsets.current[index] ?? 0;
      const w = tabWidths.current[index] ?? 0;
      const duration = INDICATOR_DURATION;
      if (reduceMotion.value) {
        indicatorX.value = x;
        indicatorWidth.value = w;
      } else {
        indicatorX.value = withTiming(x, { duration });
        indicatorWidth.value = withTiming(w, { duration });
      }
    },
    [indicatorX, indicatorWidth, reduceMotion],
  );

  const handleTabLayout = useCallback(
    (index: number, x: number, w: number) => {
      tabWidths.current[index] = w;
      tabOffsets.current[index] = x;
      // Once first layout is measured, set active indicator immediately
      const activeIndex = items.findIndex((it) => it.value === value);
      if (index === activeIndex) {
        indicatorX.value = x;
        indicatorWidth.value = w;
        setTabsReady(true);
      }
    },
    [items, value, indicatorX, indicatorWidth],
  );

  const handleTabPress = useCallback(
    (tabValue: string, index: number) => {
      onValueChange(tabValue);
      moveIndicator(index);
    },
    [onValueChange, moveIndicator],
  );

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
    width: indicatorWidth.value,
  }));

  const tabBar = (
    <View
      style={styles.tabBar}
      accessible
      accessibilityRole="tablist"
      testID={testID}
    >
      {items.map((item, index) => {
        const isActive = item.value === value;
        const textColor = isActive
          ? activeColor
          : theme.colorScheme.onSurfaceVariant;

        return (
          <TouchableRipple
            key={item.value}
            onPress={() => handleTabPress(item.value, index)}
            disabled={item.disabled}
            rippleColor={`${activeColor}1F`}
            accessibilityRole={'tab' as AccessibilityRole}
            accessibilityState={{ selected: isActive, disabled: item.disabled }}
            accessibilityLabel={item.label}
            style={styles.tabTouchable}
          >
            <View
              style={styles.tabContent}
              onLayout={(e) => {
                const { x, width } = e.nativeEvent.layout;
                handleTabLayout(index, x, width);
              }}
            >
              {item.icon && (
                <View style={styles.tabIcon}>{item.icon}</View>
              )}
              <Text
                variant="labelLarge"
                color={textColor}
              >
                {item.label}
              </Text>
            </View>
          </TouchableRipple>
        );
      })}

      {/* Sliding indicator */}
      {tabsReady && (
        <Animated.View
          style={[
            styles.indicator,
            { backgroundColor: activeColor },
            indicatorStyle,
          ]}
        />
      )}
    </View>
  );

  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <View style={styles.root}>
        {scrollable ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
          >
            {tabBar}
          </ScrollView>
        ) : (
          tabBar
        )}
        {children?.(value)}
      </View>
    </TabsContext.Provider>
  );
});

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
  },
  scrollView: {
    flexGrow: 0,
  },
  tabBar: {
    flexDirection: 'row',
    position: 'relative',
  },
  tabTouchable: {
    flex: 1,
    minHeight: 48,
  },
  tabContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
  },
  tabIcon: {
    marginBottom: 4,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 3,
    borderRadius: 1.5,
  },
});

export { Tabs };
