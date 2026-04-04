import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { CircularProgress } from 'mui-native/components/CircularProgress';

const meta: Meta<typeof CircularProgress> = {
  title: 'Components/CircularProgress',
  component: CircularProgress,
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Indeterminate: Story = {
  args: { variant: 'indeterminate' },
};

export const Determinate: Story = {
  args: { variant: 'determinate', value: 65 },
};

export const SmallSize: Story = {
  args: { variant: 'indeterminate', size: 24 },
};

export const Colored: Story = {
  args: { variant: 'determinate', value: 80, color: '#1976D2' },
};
