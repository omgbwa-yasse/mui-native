import React from 'react';
import { View } from 'react-native';
import { Paper } from '../../src/components/Paper/Paper';
import { Text } from '../../src/components/Text/Text';

export default {
  title: 'Layout/Paper',
};

const Content = ({ label }: { label: string }) => (
  <Text variant="bodyMedium" style={{ padding: 16 }}>{label}</Text>
);

export const Elevation0 = () => (
  <Paper elevation={0} style={{ margin: 16 }}>
    <Content label="elevation 0 — no shadow" />
  </Paper>
);

export const Elevation1 = () => (
  <Paper elevation={1} style={{ margin: 16 }}>
    <Content label="elevation 1" />
  </Paper>
);

export const Elevation2 = () => (
  <Paper elevation={2} style={{ margin: 16 }}>
    <Content label="elevation 2" />
  </Paper>
);

export const Elevation3 = () => (
  <Paper elevation={3} style={{ margin: 16 }}>
    <Content label="elevation 3" />
  </Paper>
);

export const Elevation4 = () => (
  <Paper elevation={4} style={{ margin: 16 }}>
    <Content label="elevation 4" />
  </Paper>
);

export const Elevation5 = () => (
  <Paper elevation={5} style={{ margin: 16 }}>
    <Content label="elevation 5 — highest" />
  </Paper>
);

export const FlatOutlined = () => (
  <Paper mode="flat" style={{ margin: 16 }}>
    <Content label="mode flat — outlined border" />
  </Paper>
);

export const Square = () => (
  <Paper elevation={2} square style={{ margin: 16 }}>
    <Content label="square — no border radius" />
  </Paper>
);

export const CustomRadius = () => (
  <Paper elevation={2} borderRadius={24} style={{ margin: 16 }}>
    <Content label="borderRadius 24dp" />
  </Paper>
);

export const AllElevations = () => (
  <View style={{ gap: 12, padding: 16 }}>
    {([0, 1, 2, 3, 4, 5] as const).map((e) => (
      <Paper key={e} elevation={e}>
        <Text variant="labelMedium" style={{ padding: 12 }}>Elevation {e}</Text>
      </Paper>
    ))}
  </View>
);
