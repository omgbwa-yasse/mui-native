import React from 'react';
import { View } from 'react-native';
import { Badge } from '../../src/components/Badge/Badge';
import { Text } from '../../src/components/Text/Text';

export default {
  title: 'Components/Badge',
};

const Box = () => (
  <View style={{ width: 40, height: 40, backgroundColor: '#6750A4', borderRadius: 4 }} />
);

export const DotBadge = () => (
  <Badge>
    <Box />
  </Badge>
);

export const NumericBadge = () => (
  <View style={{ flexDirection: 'row', gap: 24, padding: 16 }}>
    <Badge content={3}>
      <Box />
    </Badge>
    <Badge content={42}>
      <Box />
    </Badge>
    <Badge content={100}>
      <Box />
    </Badge>
    <Badge content={999} max={99}>
      <Box />
    </Badge>
  </View>
);

export const TextBadge = () => (
  <Badge content="NEW">
    <Box />
  </Badge>
);

export const Invisible = () => (
  <Badge content={5} visible={false}>
    <Box />
  </Badge>
);

export const BottomLeftAnchor = () => (
  <Badge
    content={7}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
  >
    <Box />
  </Badge>
);
