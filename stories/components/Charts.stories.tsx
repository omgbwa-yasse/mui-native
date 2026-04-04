import React, { useState } from 'react';
import { View } from 'react-native';
import { BarChart } from '../../src/components/Charts/BarChart';
import { LineChart } from '../../src/components/Charts/LineChart';
import { Text } from '../../src/components/Text/Text';
import type { ChartSeries } from '../../src/components/Charts/types';

export default {
  title: 'Advanced/Charts',
};

// ─── Fixtures ────────────────────────────────────────────────────────────────

const MONTHLY_REVENUE: ChartSeries[] = [
  {
    name: 'Revenue',
    color: '#6750A4',
    data: [
      { label: 'Jan', value: 4200 },
      { label: 'Feb', value: 5800 },
      { label: 'Mar', value: 5100 },
      { label: 'Apr', value: 6300 },
      { label: 'May', value: 7100 },
      { label: 'Jun', value: 6500 },
    ],
  },
  {
    name: 'Costs',
    color: '#958DA5',
    data: [
      { label: 'Jan', value: 2800 },
      { label: 'Feb', value: 3200 },
      { label: 'Mar', value: 3000 },
      { label: 'Apr', value: 3800 },
      { label: 'May', value: 4100 },
      { label: 'Jun', value: 3900 },
    ],
  },
];

const DAILY_VISITORS: ChartSeries[] = [
  {
    name: 'Web',
    color: '#6750A4',
    data: [
      { label: 'Mon', value: 1200 },
      { label: 'Tue', value: 1900 },
      { label: 'Wed', value: 1700 },
      { label: 'Thu', value: 2100 },
      { label: 'Fri', value: 2400 },
      { label: 'Sat', value: 1100 },
      { label: 'Sun', value: 800 },
    ],
  },
  {
    name: 'Mobile',
    color: '#B4A7D6',
    data: [
      { label: 'Mon', value: 800 },
      { label: 'Tue', value: 1100 },
      { label: 'Wed', value: 1000 },
      { label: 'Thu', value: 1300 },
      { label: 'Fri', value: 1600 },
      { label: 'Sat', value: 700 },
      { label: 'Sun', value: 500 },
    ],
  },
];

// ─── Stories ─────────────────────────────────────────────────────────────────

export const BarChartBasic = () => (
  <View style={{ padding: 16 }}>
    <Text variant="titleMedium" style={{ marginBottom: 8 }}>Monthly Revenue vs Costs</Text>
    <BarChart data={MONTHLY_REVENUE} height={280} showLegend="bottom" />
  </View>
);

export const BarChartLoading = () => {
  const [loading, setLoading] = useState(true);
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text
        variant="bodySmall"
        onPress={() => setLoading(l => !l)}
        style={{ color: '#6750A4' }}
      >
        Tap to toggle loading
      </Text>
      <BarChart data={MONTHLY_REVENUE} height={280} loading={loading} showLegend="top" />
    </View>
  );
};

export const LineChartBasic = () => (
  <View style={{ padding: 16 }}>
    <Text variant="titleMedium" style={{ marginBottom: 8 }}>Daily Visitors (Web vs Mobile)</Text>
    <LineChart data={DAILY_VISITORS} height={280} showLegend="bottom" />
  </View>
);

export const LineChartArea = () => (
  <View style={{ padding: 16 }}>
    <Text variant="titleMedium" style={{ marginBottom: 8 }}>Area Chart</Text>
    <LineChart data={DAILY_VISITORS} height={280} areaChart showLegend="bottom" />
  </View>
);

export const LineChartLoading = () => {
  const [loading, setLoading] = useState(true);
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text
        variant="bodySmall"
        onPress={() => setLoading(l => !l)}
        style={{ color: '#6750A4' }}
      >
        Tap to toggle loading
      </Text>
      <LineChart data={DAILY_VISITORS} height={280} loading={loading} showLegend="bottom" />
    </View>
  );
};
