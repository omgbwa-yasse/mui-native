import React, { useRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Popover } from 'mui-native/components/Popover';

function PopoverDemo() {
  const ref = useRef<View>(null);
  const [open, setOpen] = useState(false);
  return (
    <View style={{ padding: 40 }}>
      <View ref={ref}>
        <Pressable onPress={() => setOpen(true)}>
          <Text>Open Popover</Text>
        </Pressable>
      </View>
      <Popover
        open={open}
        anchorRef={ref}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <View style={{ padding: 16 }}>
          <Text>Popover Content</Text>
        </View>
      </Popover>
    </View>
  );
}

const meta: Meta = {
  title: 'Components/Popover',
  component: PopoverDemo,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
