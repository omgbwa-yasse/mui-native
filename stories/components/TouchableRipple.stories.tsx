import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { TouchableRipple } from '../../src/components/TouchableRipple/TouchableRipple';
import { Text } from '../../src/components/Text/Text';

const meta: Meta<typeof TouchableRipple> = {
  title: 'Components/TouchableRipple',
  component: TouchableRipple,
  argTypes: {
    disabled: { control: 'boolean' },
    borderless: { control: 'boolean' },
    onPress: { action: 'pressed' },
    onLongPress: { action: 'long-pressed' },
  },
};

export default meta;
type Story = StoryObj<typeof TouchableRipple>;

export const Default: Story = {
  args: {
    accessibilityRole: 'button',
    accessibilityLabel: 'Press me',
    children: (
      <View style={{ padding: 16 }}>
        <Text variant="labelLarge">Press me</Text>
      </View>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    accessibilityRole: 'button',
    accessibilityLabel: 'Disabled button',
    children: (
      <View style={{ padding: 16 }}>
        <Text variant="labelLarge" color="#999">Disabled</Text>
      </View>
    ),
  },
};

export const Borderless: Story = {
  args: {
    borderless: true,
    accessibilityRole: 'button',
    accessibilityLabel: 'Borderless ripple',
    children: (
      <View style={{ padding: 16 }}>
        <Text variant="labelLarge">Borderless ripple</Text>
      </View>
    ),
  },
};

export const WithLongPress: Story = {
  args: {
    accessibilityRole: 'button',
    accessibilityLabel: 'Long press me',
    children: (
      <View style={{ padding: 16 }}>
        <Text variant="labelLarge">Long press me</Text>
      </View>
    ),
  },
};
