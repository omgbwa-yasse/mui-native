import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import type { ChartSeries } from './types';

interface ChartLegendProps {
  series: ChartSeries[];
  fallbackColors: string[];
  testID?: string;
}

export function ChartLegend({
  series,
  fallbackColors,
  testID,
}: ChartLegendProps): React.ReactElement {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
          paddingHorizontal: 8,
          paddingVertical: 4,
        } as const,
        item: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        } as const,
        dot: {
          width: 10,
          height: 10,
          borderRadius: 5,
        } as const,
        label: {
          fontSize: 12,
          color: theme.colorScheme.onSurfaceVariant,
        } as const,
      }),
    [theme],
  );

  return (
    <View style={styles.container} testID={testID} accessibilityRole="list">
      {series.map((s, i) => {
        const color = s.color ?? fallbackColors[i % fallbackColors.length];
        return (
          <View
            key={s.name}
            style={styles.item}
            role="listitem"
            accessible={true}
            accessibilityLabel={s.name}
          >
            <View style={[styles.dot, { backgroundColor: color }]} />
            <Text style={styles.label}>{s.name}</Text>
          </View>
        );
      })}
    </View>
  );
}
