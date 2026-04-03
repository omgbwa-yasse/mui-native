import React, { useState } from 'react';
import { Button, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Dialog } from 'rn-material/components/Dialog';

function DialogDemo(): React.ReactElement {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Button title="Open Dialog" onPress={() => setVisible(true)} />
      <Dialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        title="Basic Dialog"
        body="This is a sample dialog message."
        actions={[
          { label: 'Cancel', onPress: () => setVisible(false) },
          { label: 'OK', onPress: () => setVisible(false) },
        ]}
      />
    </View>
  );
}

const meta: Meta = {
  title: 'Components/Dialog',
  component: Dialog,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DialogDemo />,
};

export const WithIcon: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <View>
        <Button title="Open With Icon" onPress={() => setVisible(true)} />
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}
          title="Delete Item?"
          body="This action cannot be undone."
          actions={[
            { label: 'Cancel', onPress: () => setVisible(false) },
            { label: 'Delete', onPress: () => setVisible(false), variant: 'filled' },
          ]}
        />
      </View>
    );
  },
};
