import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { TextField } from '../../src/components/TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  args: {
    label: 'Label',
    variant: 'filled',
  },
  argTypes: {
    variant: {
      options: ['filled', 'outlined'],
      control: { type: 'select' },
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const FilledVariant: Story = {
  args: { variant: 'filled', label: 'Email' },
  render: (args) => {
    const [val, setVal] = useState('');
    return <TextField {...args} value={val} onChangeText={setVal} />;
  },
};

export const OutlinedVariant: Story = {
  args: { variant: 'outlined', label: 'Username' },
  render: (args) => {
    const [val, setVal] = useState('');
    return <TextField {...args} value={val} onChangeText={setVal} />;
  },
};

export const WithError: Story = {
  args: { label: 'Email', error: 'Invalid email address' },
  render: (args) => {
    const [val, setVal] = useState('bad-email');
    return <TextField {...args} value={val} onChangeText={setVal} />;
  },
};

export const WithSupportingText: Story = {
  args: { label: 'Password', supportingText: 'At least 8 characters' },
  render: (args) => {
    const [val, setVal] = useState('');
    return <TextField {...args} value={val} onChangeText={setVal} secureTextEntry />;
  },
};

export const Disabled: Story = {
  args: { label: 'Disabled Field', disabled: true, value: 'Cannot edit' },
};
