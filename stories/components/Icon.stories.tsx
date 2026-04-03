import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Icon } from '../../src/components/Icon/Icon';

// Simple SVG-free placeholder icon using a View square
const BoxIcon = ({ size, color }: { size: number; color: string }) => (
  <View
    style={{
      width: size,
      height: size,
      borderWidth: 2,
      borderColor: color,
      borderRadius: 4,
    }}
  />
);

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  args: {
    size: 24,
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    source: BoxIcon,
    accessibilityLabel: 'Box icon',
  },
};

export const Large: Story = {
  args: {
    source: BoxIcon,
    size: 48,
    accessibilityLabel: 'Large box icon',
  },
};

export const CustomColor: Story = {
  args: {
    source: BoxIcon,
    size: 32,
    color: '#E91E63',
    accessibilityLabel: 'Pink box icon',
  },
};

export const NoA11yLabel: Story = {
  args: {
    source: BoxIcon,
    size: 24,
  },
};
