import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { AppBar } from 'rn-material/components/AppBar';

const meta: Meta<typeof AppBar> = {
  title: 'Components/AppBar',
  component: AppBar,
  args: {
    title: 'App Title',
  },
};

export default meta;
type Story = StoryObj<typeof AppBar>;

export const CenterAligned: Story = {
  args: { variant: 'center', title: 'Center Aligned' },
};

export const Small: Story = {
  args: { variant: 'small', title: 'Small App Bar' },
};

export const Medium: Story = {
  args: { variant: 'medium', title: 'Medium App Bar' },
};

export const Large: Story = {
  args: { variant: 'large', title: 'Large App Bar' },
};

export const WithNavigationIcon: Story = {
  args: {
    variant: 'small',
    title: 'With Nav Icon',
    navigationIcon: <></>,
  },
};
