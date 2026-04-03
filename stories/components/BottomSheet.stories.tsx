import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { BottomSheet } from 'rn-material/components/BottomSheet';

function BottomSheetDemo(): React.ReactElement {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Button title="Open Bottom Sheet" onPress={() => setVisible(true)} />
      <BottomSheet visible={visible} onDismiss={() => setVisible(false)}>
        <Text style={{ padding: 16 }}>Bottom Sheet Content</Text>
        <Button title="Close" onPress={() => setVisible(false)} />
      </BottomSheet>
    </View>
  );
}

const meta: Meta = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <BottomSheetDemo />,
};

export const NoHandle: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <View>
        <Button title="Open (No Handle)" onPress={() => setVisible(true)} />
        <BottomSheet visible={visible} onDismiss={() => setVisible(false)} showHandle={false}>
          <Text style={{ padding: 16 }}>No drag handle</Text>
          <Button title="Close" onPress={() => setVisible(false)} />
        </BottomSheet>
      </View>
    );
  },
};
