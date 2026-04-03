import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { FAB } from 'mui-native/components/FAB';

const meta: Meta<typeof FAB> = {
  title: 'Components/FAB',
  component: FAB,
  args: {
    icon: <></>,
    accessibilityLabel: 'Floating action button',
    onPress: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof FAB>;

export const Primary: Story = {
  args: { variant: 'primary', size: 'md' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md' },
};

export const Tertiary: Story = {
  args: { variant: 'tertiary', size: 'md' },
};

export const Surface: Story = {
  args: { variant: 'surface', size: 'md' },
};

export const Small: Story = {
  args: { variant: 'primary', size: 'sm' },
};

export const Large: Story = {
  args: { variant: 'primary', size: 'lg' },
};

export const Extended: Story = {
  args: { variant: 'primary', size: 'md', label: 'New Item' },
};
