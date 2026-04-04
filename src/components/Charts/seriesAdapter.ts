/**
 * seriesAdapter — converts mui-native ChartSeries[] into the flat arrays
 * expected by react-native-gifted-charts BarChart / LineChart.
 *
 * @RN-DEVIATION gifted-charts does not have a grouped-bar API that accepts
 * an array of series objects.  For grouped bars we interleave data items with
 * explicit `spacing` overrides and inject a group spacer item between groups.
 */

import type {
  ChartDataPoint,
  ChartSeries,
  GiftedBarDataItem,
  GiftedLineDataItem,
} from './types';

// ─── Bar chart adapters ───────────────────────────────────────────────────────

function toGiftedBarItem(
  point: ChartDataPoint,
  color?: string,
): GiftedBarDataItem {
  return {
    value: point.value,
    label: point.label,
    frontColor: point.frontColor ?? color,
    topLabelComponent: point.topLabelComponent,
    labelComponent: point.labelComponent,
  };
}

/**
 * Single-series bar chart data.
 */
export function adaptBarSeries(
  series: ChartSeries[],
  fallbackColors: string[],
): GiftedBarDataItem[] {
  if (series.length === 0) return [];

  // Single series — flat array
  const s = series[0];
  const color = s.color ?? fallbackColors[0];
  return s.data.map((p) => toGiftedBarItem(p, color));
}

/**
 * Multi-series grouped bar chart data.
 * gifted-charts grouped bar accepts a flat array where each "group" is
 * represented by a set of items differentiated by `stacked` or by rendering
 * multiple BarChart components.  We use the `barData` array approach and
 * encode grouping via explicit `spacing` between groups.
 */
export function adaptGroupedBarSeries(
  series: ChartSeries[],
  fallbackColors: string[],
  barWidth: number,
  barGap: number,
): GiftedBarDataItem[] {
  if (series.length === 0) return [];

  const xLength = series[0].data.length;
  const result: GiftedBarDataItem[] = [];

  for (let xi = 0; xi < xLength; xi++) {
    for (let si = 0; si < series.length; si++) {
      const s = series[si];
      const point = s.data[xi];
      const color = s.color ?? fallbackColors[si % fallbackColors.length];
      const item: GiftedBarDataItem & { spacing?: number } = toGiftedBarItem(point, color);
      if (si === 0 && xi > 0) {
        // Add extra gap before the first bar of each group (except the first)
        (item as GiftedBarDataItem & { spacing?: number }).spacing = barGap * 3;
      } else if (si > 0) {
        (item as GiftedBarDataItem & { spacing?: number }).spacing = barGap;
      }
      result.push(item);
    }
  }
  return result;
}

// ─── Line chart adapters ──────────────────────────────────────────────────────

function toGiftedLineItem(
  point: ChartDataPoint,
  color?: string,
): GiftedLineDataItem {
  return {
    value: point.value,
    label: point.label,
    dataPointColor: point.frontColor ?? color,
    dataPointText: point.label,
  };
}

/**
 * gifted-charts LineChart accepts `data` (primary series) + `data2`, `data3`…
 * We adapt to a primary + secondary structure for the first two series;
 * additional series are dropped with a console.warn in DEV.
 */
export function adaptLineSeries(
  series: ChartSeries[],
  fallbackColors: string[],
): {
  data: GiftedLineDataItem[];
  data2?: GiftedLineDataItem[];
  color: string;
  color2?: string;
} {
  if (series.length === 0) {
    return { data: [], color: fallbackColors[0] ?? '#000000' };
  }

  if (__DEV__ && series.length > 2) {
    console.warn(
      '[mui-native Charts] LineChart: only 2 series are rendered. ' +
        'Additional series are ignored. Use BarChart for grouped multi-series display.',
    );
  }

  const s0 = series[0];
  const color0 = s0.color ?? fallbackColors[0];
  const result: ReturnType<typeof adaptLineSeries> = {
    data: s0.data.map((p) => toGiftedLineItem(p, color0)),
    color: color0,
  };

  if (series.length >= 2) {
    const s1 = series[1];
    const color1 = s1.color ?? fallbackColors[1];
    result.data2 = s1.data.map((p) => toGiftedLineItem(p, color1));
    result.color2 = color1;
  }

  return result;
}

// ─── Y-axis helpers ───────────────────────────────────────────────────────────

export function computeYBounds(
  series: ChartSeries[],
  configMin?: number,
  configMax?: number,
): { minValue: number; maxValue: number } {
  const allValues = series.flatMap((s) => s.data.map((p) => p.value));
  const dataMin = allValues.length > 0 ? Math.min(...allValues) : 0;
  const dataMax = allValues.length > 0 ? Math.max(...allValues) : 100;

  return {
    minValue: configMin ?? Math.floor(Math.min(0, dataMin)),
    maxValue: configMax ?? Math.ceil(dataMax * 1.05),
  };
}
