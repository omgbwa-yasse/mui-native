import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { PortalHost } from '../../src/components/Portal';
import { Drawer } from '../../src/components/Drawer';

function DrawerDemo({ anchor = 'left' as 'left' | 'right' }) {
  const [open, setOpen] = useState(false);
  return (
    <PortalHost>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title={`Open ${anchor} Drawer`} onPress={() => setOpen(true)} />
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          anchor={anchor}
          variant="temporary"
        >
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
              Navigation
            </Text>
            <Text>Item 1</Text>
            <Text>Item 2</Text>
            <Text>Item 3</Text>
            <View style={{ marginTop: 24 }}>
              <Button title="Close" onPress={() => setOpen(false)} />
            </View>
          </View>
        </Drawer>
      </View>
    </PortalHost>
  );
}

export default {
  title: 'Navigation/Drawer',
  component: Drawer,
};

export const TemporaryLeft = () => <DrawerDemo anchor="left" />;

export const TemporaryRight = () => <DrawerDemo anchor="right" />;

export const Permanent = () => (
  <View style={{ flex: 1, flexDirection: 'row' }}>
    <Drawer open variant="permanent" drawerWidth={240}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
          Sidebar
        </Text>
        <Text>Dashboard</Text>
        <Text>Analytics</Text>
        <Text>Settings</Text>
      </View>
    </Drawer>
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Main content area</Text>
    </View>
  </View>
);

export const Persistent = () => {
  const [open, setOpen] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 8 }}>
        <Button title="Toggle Drawer" onPress={() => setOpen((v) => !v)} />
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {open && (
          <Drawer open={open} onClose={() => setOpen(false)} variant="persistent" drawerWidth={200}>
            <View style={{ padding: 16 }}>
              <Text>Persistent drawer</Text>
            </View>
          </Drawer>
        )}
        <View style={{ flex: 1, padding: 16 }}>
          <Text>Content shifts when drawer is open</Text>
        </View>
      </View>
    </View>
  );
};
