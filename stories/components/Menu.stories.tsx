import React, { useRef, useState } from 'react';
import { Button, View } from 'react-native';
import { PortalHost } from '../../src/components/Portal';
import { Menu, MenuItem } from '../../src/components/Menu';

function MenuDemo() {
  const [visible, setVisible] = useState(false);
  const anchorRef = useRef<View>(null);

  return (
    <View style={{ padding: 16 }}>
      <View ref={anchorRef}>
        <Button title="Open Menu" onPress={() => setVisible(true)} />
      </View>
      <Menu
        visible={visible}
        anchor={anchorRef}
        onDismiss={() => setVisible(false)}
      >
        <MenuItem
          label="Edit"
          onPress={() => {
            console.log('edit');
            setVisible(false);
          }}
        />
        <MenuItem
          label="Duplicate"
          onPress={() => {
            console.log('duplicate');
            setVisible(false);
          }}
        />
        <MenuItem label="Delete (disabled)" disabled />
      </Menu>
    </View>
  );
}

export default {
  title: 'Overlay/Menu',
  component: Menu,
};

export const Default = () => (
  <PortalHost>
    <MenuDemo />
  </PortalHost>
);
