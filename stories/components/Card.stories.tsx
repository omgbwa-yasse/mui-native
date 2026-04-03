import React from 'react';
import { Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Card } from '../../src/components/Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  args: { variant: 'elevated' },
  argTypes: {
    variant: {
      options: ['elevated', 'filled', 'outlined'],
      control: { type: 'select' },
    },
    onPress: { action: 'pressed' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: <Text>Elevated Card Content</Text>,
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: <Text>Filled Card Content</Text>,
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: <Text>Outlined Card Content</Text>,
  },
};

export const Interactive: Story = {
  args: {
    variant: 'elevated',
    children: <Text>Tap me!</Text>,
  },
};
