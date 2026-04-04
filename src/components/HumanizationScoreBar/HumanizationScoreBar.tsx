import React, { memo } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useReducedMotion } from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';

export interface HumanizationScoreBarProps {
  fleschKincaidBefore: number;
  fleschKincaidAfter: number;
  /** Max score for bar scaling (default 100). */
  maxScore?: number;
}

const BAR_HEIGHT = 20;
const MAX_DEFAULT = 100;

const HumanizationScoreBar = memo(function HumanizationScoreBar({
  fleschKincaidBefore,
  fleschKincaidAfter,
  maxScore = MAX_DEFAULT,
}: HumanizationScoreBarProps) {
  const { theme } = useTheme();
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
    <View style={styles.container}>
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
