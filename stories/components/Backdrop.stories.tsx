import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { PortalHost } from '../../src/components/Portal';
import { Backdrop } from '../../src/components/Backdrop';

function BackdropDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Show Backdrop" onPress={() => setVisible(true)} />
      <Backdrop visible={visible} onDismiss={() => setVisible(false)} />
    </View>
  );
}

export default {
  title: 'Overlay/Backdrop',
  component: Backdrop,
};

export const Default = () => (
  <PortalHost>
    <BackdropDemo />
  </PortalHost>
);
