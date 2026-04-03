import React from 'react';
import { View } from 'react-native';
import { Stack } from '../../src/components/Stack/Stack';
import { Text } from '../../src/components/Text/Text';

export default {
  title: 'Layout/Stack',
};

const Chip = ({ label, color = '#E3F2FD' }: { label: string; color?: string }) => (
  <View style={{ backgroundColor: color, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16 }}>
    <Text variant="bodyMedium">{label}</Text>
  </View>
);

const Sep = () => (
  <View style={{ height: 1, backgroundColor: '#BDBDBD' }} />
);

export const ColumnDefault = () => (
  <Stack spacing={2}>
    <Chip label="Item A" />
    <Chip label="Item B" color="#E8F5E9" />
    <Chip label="Item C" color="#FCE4EC" />
  </Stack>
);

export const RowDirection = () => (
  <Stack direction="row" spacing={2}>
    <Chip label="One" />
    <Chip label="Two" color="#E8F5E9" />
    <Chip label="Three" color="#FCE4EC" />
  </Stack>
);

export const LargeSpacing = () => (
  <Stack spacing={6}>
    <Chip label="Wide gap (24dp)" />
    <Chip label="Between items" color="#E8F5E9" />
  </Stack>
);

export const WithDivider = () => (
  <Stack spacing={0} divider={<Sep />}>
    <Chip label="Section 1" />
    <Chip label="Section 2" color="#E8F5E9" />
    <Chip label="Section 3" color="#FCE4EC" />
  </Stack>
);

export const FlexWrapRow = () => (
  <Stack direction="row" spacing={2} flexWrap="wrap">
    {(['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta'] as const).map((n) => (
      <Chip key={n} label={n} color="#E8F5E9" />
    ))}
  </Stack>
);

export const AlignItems = () => (
  <Stack direction="row" spacing={2} alignItems="flex-end">
    <View style={{ height: 32, width: 60, backgroundColor: '#E3F2FD', borderRadius: 4 }} />
    <View style={{ height: 56, width: 60, backgroundColor: '#E8F5E9', borderRadius: 4 }} />
    <View style={{ height: 48, width: 60, backgroundColor: '#FCE4EC', borderRadius: 4 }} />
  </Stack>
);
