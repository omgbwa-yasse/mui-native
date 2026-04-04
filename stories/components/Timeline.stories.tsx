import React from 'react';
import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Timeline } from 'mui-native/components/Timeline';
import { TimelineItem } from 'mui-native/components/Timeline';
import { TimelineSeparator } from 'mui-native/components/Timeline';
import { TimelineDot } from 'mui-native/components/Timeline';
import { TimelineConnector } from 'mui-native/components/Timeline';
import { TimelineContent } from 'mui-native/components/Timeline';
import { TimelineOppositeContent } from 'mui-native/components/Timeline';

function TimelineDemo({ position }: { position: 'left' | 'right' | 'alternate' }) {
  const events = ['Ordered', 'In Transit', 'Delivered'];
  return (
    <Timeline position={position} style={{ padding: 16 }}>
      {events.map((label, i) => (
        <TimelineItem key={i}>
          {position !== 'right' && (
            <TimelineOppositeContent>
              <Text style={{ color: '#888' }}>2024-0{i + 1}-01</Text>
            </TimelineOppositeContent>
          )}
          <TimelineSeparator>
            <TimelineDot color="primary" />
            {i < events.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Text style={{ fontWeight: 'bold' }}>{label}</Text>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

const meta: Meta<typeof TimelineDemo> = {
  title: 'Components/Timeline',
  component: TimelineDemo,
};

export default meta;
type Story = StoryObj<typeof TimelineDemo>;

export const Right: Story = { args: { position: 'right' } };
export const Left: Story = { args: { position: 'left' } };
export const Alternate: Story = { args: { position: 'alternate' } };
