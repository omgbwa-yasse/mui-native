import React from 'react';
import { View, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Masonry } from 'mui-native/components/Masonry';

const ITEMS = [80, 120, 60, 100, 140, 70, 90, 110, 75];

function MasonryDemo({ columns }: { columns: number }) {
  return (
    <Masonry columns={columns} spacing={8} style={{ padding: 8 }}>
      {ITEMS.map((h, i) => (
        <View
          key={i}
          style={{ height: h, backgroundColor: '#1976D2', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ color: '#fff' }}>{i + 1}</Text>
        </View>
      ))}
    </Masonry>
  );
}

const meta: Meta<typeof MasonryDemo> = {
  title: 'Components/Masonry',
  component: MasonryDemo,
};

export default meta;
type Story = StoryObj<typeof MasonryDemo>;

export const TwoColumns: Story = { args: { columns: 2 } };
export const ThreeColumns: Story = { args: { columns: 3 } };
export const FourColumns: Story = { args: { columns: 4 } };
