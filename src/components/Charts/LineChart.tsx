import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ChartLegend } from './ChartLegend';
import { ChartLoadingOverlay } from './ChartLoadingOverlay';
import { adaptLineSeries, computeYBounds } from './seriesAdapter';
import type { LineChartProps } from './types';

/**
 * @RN-DEVIATION react-native-gifted-charts animations run on the JS thread
 * (library constraint — not configurable). Animations are disabled via
 * `isAnimated={false}` when reduceMotion is active, and also when the lib
 * is not installed.
 */

let GiftedLineChart: React.ComponentType<Record<string, unknown>> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  GiftedLineChart = require('react-native-gifted-charts').LineChart;
} catch {
  // package not installed — render fallback
}

const DEFAULT_HEIGHT = 220;
const DEFAULT_NO_OF_SECTIONS = 4;

export function LineChart({
  data,
  dataPointsVisible = true,
  curved = false,
  areaChart = false,
  xAxis,
  yAxis,
  showLegend = 'none',
  loading = false,
  style,
  width,
  height = DEFAULT_HEIGHT,
  testID,
  accessibilityLabel,
}: LineChartProps): React.ReactElement {
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

  const fallbackColors = useMemo(
    () => [
      theme.colorScheme.primary,
      theme.colorScheme.secondary,
      theme.colorScheme.tertiary,
      theme.colorScheme.error,
    ],
    [theme],
  );

  const adapted = useMemo(
    () => adaptLineSeries(data, fallbackColors),
    [data, fallbackColors],
  );

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
    if (!GiftedLineChart || containerWidth === 0) {
      return (
        <View style={[styles.fallback, { width: containerWidth || '100%', height }]}>
          <Text style={styles.fallbackText}>
            {!GiftedLineChart
              ? 'Install react-native-gifted-charts to render charts.'
              : ''}
          </Text>
        </View>
      );
    }

    const ChartComponent = GiftedLineChart as React.ComponentType<Record<string, unknown>>;
    return (
      <ChartComponent
        data={adapted.data}
        data2={adapted.data2}
        color={adapted.color}
        color2={adapted.color2}
        width={containerWidth}
        height={height}
        isAnimated={false}
        noOfSections={yAxis?.noOfSections ?? DEFAULT_NO_OF_SECTIONS}
        minValue={minValue}
        maxValue={maxValue}
        hideDataPoints={!dataPointsVisible}
        curved={curved}
        areaChart={areaChart}
        startFillColor={areaChart ? adapted.color : undefined}
        endFillColor={areaChart ? adapted.color + '22' : undefined}
        startOpacity={areaChart ? 0.8 : undefined}
        endOpacity={areaChart ? 0.1 : undefined}
        xAxisLabel={xAxis?.label ?? ''}
        yAxisLabel={yAxis?.label ?? ''}
        yAxisTextStyle={{ color: theme.colorScheme.onSurfaceVariant, fontSize: 11 }}
        xAxisLabelTextStyle={{ color: theme.colorScheme.onSurfaceVariant, fontSize: 11 }}
        backgroundColor={theme.colorScheme.surface}
        rulesColor={theme.colorScheme.outlineVariant}
        xAxisColor={theme.colorScheme.outline}
        yAxisColor={theme.colorScheme.outline}
        dataPointsColor={adapted.color}
        dataPointsColor2={adapted.color2}
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
      accessibilityLabel={accessibilityLabel ?? 'Line chart'}
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
