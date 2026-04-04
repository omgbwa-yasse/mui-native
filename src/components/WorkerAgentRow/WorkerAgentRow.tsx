import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';

export interface WorkerAgentRowProps {
  workerId: string;
  sectionIndex: number;
  status: string;
  progressPercent: number;
  /** Optional label for the section heading. */
  label?: string;
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  running: 'Running',
  completed: 'Complete',
  failed: 'Failed',
};

const WorkerAgentRow = memo(function WorkerAgentRow({
  workerId,
  sectionIndex,
  status,
  progressPercent,
  label,
}: WorkerAgentRowProps) {
  const { theme } = useTheme();
  const cs = theme.colorScheme;

  const clampedPct = Math.min(100, Math.max(0, progressPercent));

  // Reanimated worklet — runs on the UI thread
  const fillStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      width: withTiming(`${clampedPct}%` as `${number}%`, { duration: 300 }),
    };
  }, [clampedPct]);

  const isFailed = status === 'failed';
  const trackColor = isFailed ? cs.errorContainer : cs.surfaceVariant;
  const fillColor = isFailed ? cs.error : cs.primary;
  const labelColor = isFailed ? cs.onErrorContainer : cs.onSurface;

  return (
    <View
      style={[styles.row, { backgroundColor: cs.surface }]}
      accessibilityRole="progressbar"
      accessibilityLabel={`Section ${sectionIndex + 1} worker, ${STATUS_LABELS[status] ?? status}`}
      accessibilityValue={{ min: 0, max: 100, now: clampedPct }}
    >
      <View style={styles.header}>
        <Text style={[styles.sectionLabel, { color: labelColor }]}>
          {label ?? `Section ${sectionIndex + 1}`}
        </Text>
        <Text style={[styles.statusLabel, { color: cs.onSurfaceVariant }]}>
          {STATUS_LABELS[status] ?? status}
        </Text>
        <Text style={[styles.pctLabel, { color: cs.onSurface }]}>
          {clampedPct}%
        </Text>
      </View>

      {/* Progress track */}
      <View style={[styles.track, { backgroundColor: trackColor }]}>
        <Animated.View
          style={[styles.fill, { backgroundColor: fillColor }, fillStyle]}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  statusLabel: {
    fontSize: 12,
    marginRight: 8,
  },
  pctLabel: {
    fontSize: 12,
    minWidth: 36,
    textAlign: 'right',
  },
  track: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
});

export default WorkerAgentRow;
