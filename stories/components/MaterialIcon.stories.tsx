import type { Meta, StoryObj } from '@storybook/react-native';
import { MaterialIcon } from '../../src/components/MaterialIcon/MaterialIcon';

const meta: Meta<typeof MaterialIcon> = {
  title: 'Components/MaterialIcon',
  component: MaterialIcon,
  args: {
    name: 'star',
    size: 24,
  },
};

export default meta;
type Story = StoryObj<typeof MaterialIcon>;

export const Filled: Story = {
  args: {
    name: 'star',
    variant: 'filled',
    accessibilityLabel: 'Star icon (filled)',
  },
};

export const Outlined: Story = {
  args: {
    name: 'star',
    variant: 'outlined',
    accessibilityLabel: 'Star icon (outlined)',
  },
};

export const Rounded: Story = {
  args: {
    name: 'home',
    variant: 'rounded',
    accessibilityLabel: 'Home icon (rounded)',
  },
};

export const Sharp: Story = {
  args: {
    name: 'home',
    variant: 'sharp',
    accessibilityLabel: 'Home icon (sharp)',
  },
};

export const TwoTone: Story = {
  args: {
    name: 'favorite',
    variant: 'two-tone',
    accessibilityLabel: 'Favorite icon (two-tone)',
  },
};

export const LargeSize: Story = {
  args: {
    name: 'settings',
    variant: 'filled',
    size: 48,
    accessibilityLabel: 'Settings icon large',
  },
};

export const ExplicitColor: Story = {
  args: {
    name: 'check_circle',
    variant: 'filled',
    size: 32,
    color: '#4CAF50',
    accessibilityLabel: 'Check circle in green',
  },
};

export const NoAccessibilityLabel: Story = {
  args: {
    name: 'close',
    variant: 'filled',
    size: 24,
  },
};
