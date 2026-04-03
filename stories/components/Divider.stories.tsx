import React from 'react';
import { View } from 'react-native';
import { Divider } from '../../src/components/Divider/Divider';
import { Text } from '../../src/components/Text/Text';

export default {
  title: 'Components/Divider',
};

export const Horizontal = () => (
  <View>
    <Text variant="bodyMedium">Above</Text>
    <Divider />
    <Text variant="bodyMedium">Below</Text>
  </View>
);

export const Bold = () => (
  <View>
    <Text variant="bodyMedium">Above</Text>
    <Divider bold />
    <Text variant="bodyMedium">Below</Text>
  </View>
);

export const Inset = () => (
  <View>
    <Text variant="bodyMedium">Above</Text>
    <Divider variant="inset" />
    <Text variant="bodyMedium">Below</Text>
  </View>
);

export const Middle = () => (
  <View>
    <Text variant="bodyMedium">Above</Text>
    <Divider variant="middle" />
    <Text variant="bodyMedium">Below</Text>
  </View>
);

export const Vertical = () => (
  <View style={{ flexDirection: 'row', height: 40, alignItems: 'center', gap: 8 }}>
    <Text variant="bodyMedium">Left</Text>
    <Divider orientation="vertical" />
    <Text variant="bodyMedium">Right</Text>
  </View>
);

export const VerticalBold = () => (
  <View style={{ flexDirection: 'row', height: 40, alignItems: 'center', gap: 8 }}>
    <Text variant="bodyMedium">Left</Text>
    <Divider orientation="vertical" bold />
    <Text variant="bodyMedium">Right</Text>
  </View>
);
