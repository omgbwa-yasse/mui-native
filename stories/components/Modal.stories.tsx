import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { PortalHost } from '../../src/components/Portal';
import { Modal } from '../../src/components/Modal';

function ModalDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Open Modal" onPress={() => setVisible(true)} />
      <Modal visible={visible} onDismiss={() => setVisible(false)}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
          Modal Title
        </Text>
        <Text>Modal body content goes here.</Text>
        <View style={{ marginTop: 16, alignItems: 'flex-end' }}>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

export default {
  title: 'Overlay/Modal',
  component: Modal,
};

export const Default = () => (
  <PortalHost>
    <ModalDemo />
  </PortalHost>
);

export const NotDismissible = () => {
  const [visible, setVisible] = useState(false);
  return (
    <PortalHost>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Open Non-Dismissible Modal" onPress={() => setVisible(true)} />
        <Modal visible={visible} dismissible={false}>
          <Text>Can only be closed via the button.</Text>
          <Button title="Confirm" onPress={() => setVisible(false)} />
        </Modal>
      </View>
    </PortalHost>
  );
};
