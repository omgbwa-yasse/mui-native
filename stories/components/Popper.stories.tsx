import React, { useRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Popper } from 'mui-native/components/Popper';

function PopperDemo() {
  const ref = useRef<View>(null);
  const [open, setOpen] = useState(false);
  return (
    <View style={{ padding: 40 }}>
      <View ref={ref}>
        <Pressable onPress={() => setOpen(v => !v)}>
          <Text>Toggle Popper</Text>
        </Pressable>
      </View>
      <Popper open={open} anchorRef={ref} placement="bottom">
        <View style={{ padding: 12, backgroundColor: '#fff', elevation: 4 }}>
          <Text>Popper Content</Text>
        </View>
      </Popper>
    </View>
  );
}

const meta: Meta = {
  title: 'Components/Popper',
  component: PopperDemo,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
