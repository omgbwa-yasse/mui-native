import React from 'react';
import { AccessibilityInfo } from 'react-native';
import { render as rntlRender } from '@testing-library/react-native';
import { BarChart } from '../BarChart';
import { LineChart } from '../LineChart';
import { ChartLegend } from '../ChartLegend';
import { adaptBarSeries, adaptLineSeries, computeYBounds } from '../seriesAdapter';
import type { ChartSeries } from '../types';
import { ThemeProvider } from '../../../theme/ThemeProvider';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}
const render = (ui: React.ReactElement) => rntlRender(ui, { wrapper: Wrapper });

beforeEach(() => {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() });
});

afterEach(() => {
  jest.restoreAllMocks();
});

// Mock gifted-charts as unavailable — tests exercise fallback path
jest.mock('react-native-gifted-charts', () => ({}), { virtual: true });

// ─── Fixtures ──────────────────────────────────────────────────────────────────

const SERIES: ChartSeries[] = [
  {
    name: 'Revenue',
    color: '#6750A4',
    data: [
      { label: 'Jan', value: 100 },
      { label: 'Feb', value: 150 },
      { label: 'Mar', value: 120 },
    ],
  },
  {
    name: 'Costs',
    color: '#958DA5',
    data: [
      { label: 'Jan', value: 60 },
      { label: 'Feb', value: 80 },
      { label: 'Mar', value: 70 },
    ],
  },
];

// ─── seriesAdapter unit tests ─────────────────────────────────────────────────

describe('seriesAdapter', () => {
  it('adaptBarSeries — returns flat array for single series', () => {
    const result = adaptBarSeries([SERIES[0]], ['#6750A4']);
    expect(result).toHaveLength(3);
    expect(result[0].value).toBe(100);
    expect(result[0].label).toBe('Jan');
    expect(result[0].frontColor).toBe('#6750A4');
  });

  it('adaptBarSeries — returns empty array for empty input', () => {
    expect(adaptBarSeries([], [])).toEqual([]);
  });

  it('adaptLineSeries — returns primary and secondary data', () => {
    const result = adaptLineSeries(SERIES, ['#6750A4', '#958DA5']);
    expect(result.data).toHaveLength(3);
    expect(result.data2).toHaveLength(3);
    expect(result.color).toBe('#6750A4');
    expect(result.color2).toBe('#958DA5');
  });

  it('adaptLineSeries — single series has no data2', () => {
    const result = adaptLineSeries([SERIES[0]], ['#6750A4']);
    expect(result.data2).toBeUndefined();
    expect(result.color2).toBeUndefined();
  });

  it('computeYBounds — auto bounds from data', () => {
    const bounds = computeYBounds(SERIES);
    expect(bounds.minValue).toBeLessThanOrEqual(0);
    expect(bounds.maxValue).toBeGreaterThan(150);
  });

  it('computeYBounds — respects explicit min/max', () => {
    const bounds = computeYBounds(SERIES, 10, 200);
    expect(bounds.minValue).toBe(10);
    expect(bounds.maxValue).toBe(200);
  });
});

// ─── BarChart render tests ───────────────────────────────────────────────────

describe('BarChart', () => {
  it('renders fallback when gifted-charts not installed', () => {
    const { getByText } = render(<BarChart data={SERIES} testID="bar" />);
    expect(getByText(/Install react-native-gifted-charts/)).toBeTruthy();
  });

  it('applies testID to container', () => {
    const { getByTestId } = render(<BarChart data={SERIES} testID="bar" />);
    expect(getByTestId('bar')).toBeTruthy();
  });

  it('renders legend when showLegend=bottom', () => {
    const { getByTestId } = render(
      <BarChart data={SERIES} showLegend="bottom" testID="bar" />,
    );
    expect(getByTestId('bar-legend')).toBeTruthy();
  });

  it('renders loading overlay when loading=true', () => {
    const { getByLabelText } = render(<BarChart data={SERIES} loading testID="bar" />);
    expect(getByLabelText('Loading chart')).toBeTruthy();
  });
});

// ─── LineChart render tests ──────────────────────────────────────────────────

describe('LineChart', () => {
  it('renders fallback when gifted-charts not installed', () => {
    const { getByText } = render(<LineChart data={SERIES} testID="line" />);
    expect(getByText(/Install react-native-gifted-charts/)).toBeTruthy();
  });

  it('applies testID to container', () => {
    const { getByTestId } = render(<LineChart data={SERIES} testID="line" />);
    expect(getByTestId('line')).toBeTruthy();
  });

  it('renders loading overlay when loading=true', () => {
    const { getByLabelText } = render(<LineChart data={SERIES} loading testID="line" />);
    expect(getByLabelText('Loading chart')).toBeTruthy();
  });
});

// ─── ChartLegend render tests ────────────────────────────────────────────────

describe('ChartLegend', () => {
  it('renders one item per series', () => {
    const { getAllByRole } = render(
      <ChartLegend series={SERIES} fallbackColors={['#6750A4', '#958DA5']} />,
    );
    expect(getAllByRole('listitem')).toHaveLength(2);
  });

  it('renders series names', () => {
    const { getByLabelText } = render(
      <ChartLegend series={SERIES} fallbackColors={['#6750A4', '#958DA5']} />,
    );
    expect(getByLabelText('Revenue')).toBeTruthy();
    expect(getByLabelText('Costs')).toBeTruthy();
  });
});
