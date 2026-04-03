import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Chip } from 'rn-material/components/Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  args: {
    label: 'Label',
    onPress: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Assist: Story = {
  args: { variant: 'assist', label: 'Assist Chip' },
};

export const Filter: Story = {
  args: { variant: 'filter', label: 'Filter' },
};

export const FilterSelected: Story = {
  args: { variant: 'filter', label: 'Selected', selected: true },
};

export const Input: Story = {
  args: { variant: 'input', label: 'React Native', onRemove: () => {} },
};

export const Suggestion: Story = {
  args: { variant: 'suggestion', label: 'Iced Coffee' },
};

export const Disabled: Story = {
  args: { variant: 'assist', label: 'Disabled', disabled: true },
};
