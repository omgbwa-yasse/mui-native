import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Button } from '../../src/components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    label: 'Button',
    variant: 'filled',
    disabled: false,
  },
  argTypes: {
    variant: {
      options: ['filled', 'tonal', 'outlined', 'text', 'elevated'],
      control: { type: 'select' },
    },
    disabled: { control: 'boolean' },
    onPress: { action: 'pressed' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Filled: Story = {
  args: { variant: 'filled', label: 'Filled Button' },
};

export const Tonal: Story = {
  args: { variant: 'tonal', label: 'Tonal Button' },
};

export const Outlined: Story = {
  args: { variant: 'outlined', label: 'Outlined Button' },
};

export const TextVariant: Story = {
  args: { variant: 'text', label: 'Text Button' },
};

export const Elevated: Story = {
  args: { variant: 'elevated', label: 'Elevated Button' },
};

export const Disabled: Story = {
  args: { variant: 'filled', label: 'Disabled Button', disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12, padding: 16 }}>
      <Button label="Filled" variant="filled" />
      <Button label="Tonal" variant="tonal" />
      <Button label="Outlined" variant="outlined" />
      <Button label="Text" variant="text" />
      <Button label="Elevated" variant="elevated" />
      <Button label="Disabled" variant="filled" disabled />
    </View>
  ),
};
