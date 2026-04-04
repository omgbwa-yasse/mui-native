import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { LinearProgress } from 'mui-native/components/LinearProgress';

const meta: Meta<typeof LinearProgress> = {
  title: 'Components/LinearProgress',
  component: LinearProgress,
};

export default meta;
type Story = StoryObj<typeof LinearProgress>;

export const Indeterminate: Story = {
  args: { variant: 'indeterminate' },
};

export const Determinate: Story = {
  args: { variant: 'determinate', value: 50 },
};

export const Buffer: Story = {
  args: { variant: 'buffer', value: 60, valueBuffer: 80 },
};

export const Query: Story = {
  args: { variant: 'query' },
};
