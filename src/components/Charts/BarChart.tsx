import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ChartLegend } from './ChartLegend';
import { ChartLoadingOverlay } from './ChartLoadingOverlay';
import { adaptBarSeries, adaptGroupedBarSeries, computeYBounds } from './seriesAdapter';
import type { BarChartProps } from './types';

/**
 * @RN-DEVIATION react-native-gifted-charts animations run on the JS thread
 * (library constraint — not configurable). Animations are disabled via
 * `isAnimated={false}` when reduceMotion is active, and also when the lib
 * is not installed.
 */

// Attempt lazy load of gifted-charts
let GiftedBarChart: React.ComponentType<Record<string, unknown>> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  GiftedBarChart = require('react-native-gifted-charts').BarChart;
} catch {
  // package not installed — render fallback
}

const DEFAULT_HEIGHT = 220;
const DEFAULT_BAR_WIDTH = 30;
const DEFAULT_BAR_GAP = 4;
const DEFAULT_BAR_RADIUS = 4;
const DEFAULT_NO_OF_SECTIONS = 4;

export function BarChart({
  data,
  grouped = false,
  barBorderRadius = DEFAULT_BAR_RADIUS,
  xAxis,
  yAxis,
  showLegend = 'none',
  barWidth = DEFAULT_BAR_WIDTH,
  barGap = DEFAULT_BAR_GAP,
  showValuesAsTopLabel = false,
  horizontal = false,
  loading = false,
  style,
  width,
  height = DEFAULT_HEIGHT,
  testID,
  accessibilityLabel,
}: BarChartProps): React.ReactElement {
  const { theme } = useTheme();
  const [containerWidth, setContainerWidth] = useState(width ?? 0);

  const handleLayout = useCallback(
    (e: { nativeEvent: { layout: { width: number } } }) => {
      if (!width) {
        setContainerWidth(e.nativeEvent.layout.width);
      }
    },
    [width],
  );

  // Fallback colors using theme tokens
  const fallbackColors = useMemo(
    () => [
      theme.colorScheme.primary,
      theme.colorScheme.secondary,
      theme.colorScheme.tertiary,
      theme.colorScheme.error,
    ],
    [theme],
  );

  const barData = useMemo(() => {
    if (grouped && data.length > 1) {
      return adaptGroupedBarSeries(data, fallbackColors, barWidth, barGap);
    }
    return adaptBarSeries(data, fallbackColors);
  }, [data, grouped, fallbackColors, barWidth, barGap]);

  const { minValue, maxValue } = useMemo(
    () => computeYBounds(data, yAxis?.min, yAxis?.max),
    [data, yAxis],
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          position: 'relative',
          overflow: 'hidden',
        } as const,
        fallback: {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colorScheme.surfaceVariant,
          borderRadius: 8,
        } as const,
        fallbackText: {
          color: theme.colorScheme.onSurfaceVariant,
          textAlign: 'center',
          padding: 16,
          fontSize: 13,
        } as const,
      }),
    [theme],
  );

  const renderChart = () => {
    if (!GiftedBarChart || containerWidth === 0) {
      return (
        <View style={[styles.fallback, { width: containerWidth || '100%', height }]}>
          <Text style={styles.fallbackText}>
            {!GiftedBarChart
              ? 'Install react-native-gifted-charts to render charts.'
              : ''}
          </Text>
        </View>
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const ChartComponent = GiftedBarChart as React.ComponentType<Record<string, unknown>>;
    return (
      <ChartComponent
        data={barData}
        width={containerWidth}
        height={height}
        barWidth={barWidth}
        barBorderRadius={barBorderRadius}
        spacing={barGap}
        frontColor={fallbackColors[0]}
        isAnimated={false}
        noOfSections={yAxis?.noOfSections ?? DEFAULT_NO_OF_SECTIONS}
        minValue={minValue}
        maxValue={maxValue}
        showValuesAsTopLabel={showValuesAsTopLabel}
        isHorizontal={horizontal}
        xAxisLabel={xAxis?.label ?? ''}
        yAxisLabel={yAxis?.label ?? ''}
        yAxisTextStyle={{ color: theme.colorScheme.onSurfaceVariant, fontSize: 11 }}
        xAxisLabelTextStyle={{ color: theme.colorScheme.onSurfaceVariant, fontSize: 11 }}
        backgroundColor={theme.colorScheme.surface}
        rulesColor={theme.colorScheme.outlineVariant}
        xAxisColor={theme.colorScheme.outline}
        yAxisColor={theme.colorScheme.outline}
      />
    );
  };

  return (
    <View
      style={[styles.container, { height: height + (showLegend !== 'none' ? 32 : 0) }, style]}
      onLayout={handleLayout}
      testID={testID}
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? 'Bar chart'}
    >
      {showLegend === 'top' && (
        <ChartLegend series={data} fallbackColors={fallbackColors} testID={testID != null ? `${testID}-legend` : undefined} />
      )}

      {renderChart()}

      {showLegend === 'bottom' && (
        <ChartLegend series={data} fallbackColors={fallbackColors} testID={testID != null ? `${testID}-legend` : undefined} />
      )}

      {loading && <ChartLoadingOverlay />}
    </View>
  );
}
