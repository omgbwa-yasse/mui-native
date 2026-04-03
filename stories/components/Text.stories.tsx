import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { ScrollView, View } from 'react-native';
import { Text } from '../../src/components/Text/Text';
import type { TypeScaleVariant } from '../../src/components/Text/types';

const ALL_VARIANTS: TypeScaleVariant[] = [
  'displayLarge',
  'displayMedium',
  'displaySmall',
  'headlineLarge',
  'headlineMedium',
  'headlineSmall',
  'titleLarge',
  'titleMedium',
  'titleSmall',
  'bodyLarge',
  'bodyMedium',
  'bodySmall',
  'labelLarge',
  'labelMedium',
  'labelSmall',
];

function AllVariants(): React.ReactElement {
  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 8 }}>
      {ALL_VARIANTS.map(v => (
        <Text key={v} variant={v}>
          {v}: The quick brown fox
        </Text>
      ))}
    </ScrollView>
  );
}

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  args: {
    variant: 'bodyLarge',
    children: 'The quick brown fox jumps over the lazy dog',
  },
  argTypes: {
    variant: {
      options: ALL_VARIANTS,
      control: { type: 'select' },
    },
    align: {
      options: ['auto', 'left', 'center', 'right', 'justify'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const BodyLarge: Story = {
  args: { variant: 'bodyLarge' },
};

export const TitleLarge: Story = {
  args: { variant: 'titleLarge' },
};

export const DisplaySmall: Story = {
  args: { variant: 'displaySmall', children: 'Display Small' },
};

export const AllTypescale: Story = {
  render: () => <AllVariants />,
};

export const ColorOverride: Story = {
  args: { variant: 'bodyMedium', color: '#E91E63', children: 'Custom pink text' },
};

export const Centered: Story = {
  args: { variant: 'bodyMedium', align: 'center', children: 'Centered text' },
};
