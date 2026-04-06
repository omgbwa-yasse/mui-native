import React, { memo } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useReducedMotion } from 'react-native-reanimated';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import type { HumanizationScoreBarProps } from './types';

export type { HumanizationScoreBarProps } from './types';

const BAR_HEIGHT = 20;
const MAX_DEFAULT = 100;

const HumanizationScoreBar = memo(function HumanizationScoreBar(rawProps: HumanizationScoreBarProps) {
  const props = useComponentDefaults('HumanizationScoreBar', rawProps);
  const {
    fleschKincaidBefore,
    fleschKincaidAfter,
    maxScore = MAX_DEFAULT,
    color,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);
  const cs = theme.colorScheme;
  const { width } = useWindowDimensions();
  const reduceMotion = useReducedMotion();
  const trackWidth = width - 64; // 32px horizontal padding each side

  const beforePct = Math.min(100, Math.max(0, (fleschKincaidBefore / maxScore) * 100));
  const afterPct = Math.min(100, Math.max(0, (fleschKincaidAfter / maxScore) * 100));

  // Animated fill widths — worklet on UI thread
  const beforeFillStyle = useAnimatedStyle(() => {
    'worklet';
    const targetWidth = (beforePct / 100) * trackWidth;
    if (reduceMotion) {
      return { width: targetWidth };
    }
    return { width: withTiming(targetWidth, { duration: 500 }) };
  }, [beforePct, trackWidth, reduceMotion]);

  const afterFillStyle = useAnimatedStyle(() => {
    'worklet';
    const targetWidth = (afterPct / 100) * trackWidth;
    if (reduceMotion) {
      return { width: targetWidth };
    }
    return { width: withTiming(targetWidth, { duration: 500 }) };
  }, [afterPct, trackWidth, reduceMotion]);

  return (
    <View style={[styles.container, sxStyle, style]}>
      {/* Before */}
      <View style={styles.row}>
        <Text style={[styles.rowLabel, { color: cs.onSurfaceVariant }]}>Before</Text>
        <View
          style={[styles.track, { backgroundColor: cs.surfaceVariant, width: trackWidth }]}
          accessibilityRole="progressbar"
          accessibilityLabel={`Readability before: ${fleschKincaidBefore}`}
          accessibilityValue={{ min: 0, max: maxScore, now: fleschKincaidBefore }}
        >
          <Animated.View
            style={[styles.fill, { backgroundColor: cs.secondary }, beforeFillStyle]}
          />
        </View>
        <Text style={[styles.score, { color: cs.onSurface }]}>
          {fleschKincaidBefore.toFixed(1)}
        </Text>
      </View>

      {/* After */}
      <View style={styles.row}>
        <Text style={[styles.rowLabel, { color: cs.onSurfaceVariant }]}>After</Text>
        <View
          style={[styles.track, { backgroundColor: cs.surfaceVariant, width: trackWidth }]}
          accessibilityRole="progressbar"
          accessibilityLabel={`Readability after: ${fleschKincaidAfter}`}
          accessibilityValue={{ min: 0, max: maxScore, now: fleschKincaidAfter }}
        >
          <Animated.View
            style={[styles.fill, { backgroundColor: cs.primary }, afterFillStyle]}
          />
        </View>
        <Text style={[styles.score, { color: cs.onSurface }]}>
          {fleschKincaidAfter.toFixed(1)}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  rowLabel: {
    width: 48,
    fontSize: 12,
  },
  track: {
    height: BAR_HEIGHT,
    borderRadius: BAR_HEIGHT / 2,
    overflow: 'hidden',
    flex: 1,
  },
  fill: {
    height: '100%',
    borderRadius: BAR_HEIGHT / 2,
  },
  score: {
    width: 40,
    fontSize: 12,
    textAlign: 'right',
    marginLeft: 8,
  },
});

export default HumanizationScoreBar;
