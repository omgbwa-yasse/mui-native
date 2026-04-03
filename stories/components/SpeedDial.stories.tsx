import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { PortalHost } from '../../src/components/Portal';
import { SpeedDial } from '../../src/components/SpeedDial';

const ACTIONS = [
  { key: 'copy', icon: <Text>⎘</Text>, label: 'Copy' },
  { key: 'save', icon: <Text>💾</Text>, label: 'Save' },
  { key: 'print', icon: <Text>🖨️</Text>, label: 'Print' },
];

function SpeedDialDemo({ direction = 'up' as 'up' | 'down' | 'left' | 'right' }) {
  const [open, setOpen] = useState(false);
  return (
    <PortalHost>
      <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', padding: 24 }}>
        <SpeedDial
          actions={ACTIONS}
          icon={<Text style={{ fontSize: 24 }}>+</Text>}
          openIcon={<Text style={{ fontSize: 24 }}>×</Text>}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          direction={direction}
        />
      </View>
    </PortalHost>
  );
}

export default {
  title: 'Navigation/SpeedDial',
  component: SpeedDial,
};

export const DirectionUp = () => <SpeedDialDemo direction="up" />;

export const DirectionLeft = () => <SpeedDialDemo direction="left" />;

export const DirectionDown = () => <SpeedDialDemo direction="down" />;

export const Uncontrolled = () => (
  <PortalHost>
    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', padding: 24 }}>
      <SpeedDial
        actions={ACTIONS}
        icon={<Text style={{ fontSize: 24 }}>+</Text>}
      />
    </View>
  </PortalHost>
);

export const WithDisabledAction = () => (
  <PortalHost>
    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', padding: 24 }}>
      <SpeedDial
        actions={[
          { key: 'copy', icon: <Text>⎘</Text>, label: 'Copy' },
          { key: 'disabled', icon: <Text>🔒</Text>, label: 'Locked', disabled: true },
          { key: 'save', icon: <Text>💾</Text>, label: 'Save' },
        ]}
        icon={<Text style={{ fontSize: 24 }}>+</Text>}
      />
    </View>
  </PortalHost>
);
