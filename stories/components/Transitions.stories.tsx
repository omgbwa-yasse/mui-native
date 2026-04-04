import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Fade } from 'mui-native/components/Fade';
import { Grow } from 'mui-native/components/Grow';
import { Slide } from 'mui-native/components/Slide';
import { Zoom } from 'mui-native/components/Zoom';
import { Collapse } from 'mui-native/components/Collapse';

function TransitionDemo() {
  const [show, setShow] = useState(true);
  return (
    <View style={{ padding: 16, gap: 16 }}>
      <Pressable onPress={() => setShow(v => !v)}>
        <Text>Toggle</Text>
      </Pressable>
      <Fade in={show}>
        <View style={{ padding: 8, backgroundColor: '#eee' }}><Text>Fade</Text></View>
      </Fade>
      <Grow in={show}>
        <View style={{ padding: 8, backgroundColor: '#eee' }}><Text>Grow</Text></View>
      </Grow>
      <Slide in={show} direction="up">
        <View style={{ padding: 8, backgroundColor: '#eee' }}><Text>Slide</Text></View>
      </Slide>
      <Zoom in={show}>
        <View style={{ padding: 8, backgroundColor: '#eee' }}><Text>Zoom</Text></View>
      </Zoom>
      <Collapse in={show}>
        <View style={{ padding: 8, backgroundColor: '#eee' }}><Text>Collapse</Text></View>
      </Collapse>
    </View>
  );
}

const meta: Meta = {
  title: 'Components/Transitions',
  component: TransitionDemo,
};

export default meta;
type Story = StoryObj;

export const AllTransitions: Story = {};
