import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

// ─── Base ──────────────────────────────────────────────────────────────────────

export interface ChartBaseProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  /** Chart width in dp. Defaults to container width via onLayout. */
  width?: number;
  /** Chart height in dp. Default: 220. */
  height?: number;
  loading?: boolean;
}

// ─── Data series ──────────────────────────────────────────────────────────────

export interface ChartDataPoint {
  /** Displayed on the X-axis label. */
  label?: string;
  value: number;
  /** Formatted value shown in tooltip / on bar. If omitted, raw value is shown. */
  labelComponent?: React.ReactNode;
  /** Override bar/line color for this specific data point. */
  frontColor?: string;
  /** Optional top label shown above bar. */
  topLabelComponent?: React.ReactNode;
}

export interface ChartSeries {
  /** Series name shown in legend. */
  name: string;
  data: ChartDataPoint[];
  /** Primary color token key OR explicit hex. Use theme token whenever possible. */
  color?: string;
}

// ─── Axis ────────────────────────────────────────────────────────────────────

export interface ChartAxisConfig {
  label?: string;
  /** Minimum value (default: auto). */
  min?: number;
  /** Maximum value (default: auto). */
  max?: number;
  /** Number of horizontal grid lines. Default: 4. */
  noOfSections?: number;
}

// ─── Legend ──────────────────────────────────────────────────────────────────

export type ChartLegendPosition = 'top' | 'bottom' | 'none';

// ─── BarChart ────────────────────────────────────────────────────────────────

export interface BarChartProps extends ChartBaseProps {
  data: ChartSeries[];
  /** Renders multiple series side-by-side. Default: false. */
  grouped?: boolean;
  /** Bar border radius. Default: 4. */
  barBorderRadius?: number;
  xAxis?: ChartAxisConfig;
  yAxis?: ChartAxisConfig;
  showLegend?: ChartLegendPosition;
  /** Width of each bar in dp. Defaults to series-dependent heuristic. */
  barWidth?: number;
  /** Gap between bars / groups. Default: 4. */
  barGap?: number;
  /** Show value label on top of each bar. Default: false. */
  showValuesAsTopLabel?: boolean;
  horizontal?: boolean;
}

// ─── LineChart ───────────────────────────────────────────────────────────────

export interface LineChartProps extends ChartBaseProps {
  data: ChartSeries[];
  /** Render data points as circles. Default: true. */
  dataPointsVisible?: boolean;
  /** Use curved bezier lines. Default: false. */
  curved?: boolean;
  /** Fill area under the line. Default: false. */
  areaChart?: boolean;
  xAxis?: ChartAxisConfig;
  yAxis?: ChartAxisConfig;
  showLegend?: ChartLegendPosition;
}

// ─── GiftedCharts adapter shapes ─────────────────────────────────────────────
// These match the public API of react-native-gifted-charts bar/line data items.

export interface GiftedBarDataItem {
  value: number;
  label?: string;
  frontColor?: string;
  topLabelComponent?: React.ReactNode;
  labelComponent?: React.ReactNode;
}

export interface GiftedLineDataItem {
  value: number;
  label?: string;
  dataPointColor?: string;
  dataPointText?: string;
  customDataPoint?: React.ReactNode;
}
