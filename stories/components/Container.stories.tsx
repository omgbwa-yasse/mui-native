import React from 'react';
import { View } from 'react-native';
import { Container } from '../../src/components/Container/Container';
import { Text } from '../../src/components/Text/Text';

export default {
  title: 'Layout/Container',
};

const Inner = ({ label }: { label: string }) => (
  <View style={{ backgroundColor: '#E3F2FD', padding: 12, borderRadius: 4 }}>
    <Text variant="bodyMedium">{label}</Text>
  </View>
);

export const ExtraSmall = () => (
  <Container maxWidth="xs">
    <Inner label="maxWidth xs (444dp)" />
  </Container>
);

export const Small = () => (
  <Container maxWidth="sm">
    <Inner label="maxWidth sm (600dp)" />
  </Container>
);

export const Medium = () => (
  <Container maxWidth="md">
    <Inner label="maxWidth md (900dp)" />
  </Container>
);

export const Large = () => (
  <Container maxWidth="lg">
    <Inner label="maxWidth lg — default (1200dp)" />
  </Container>
);

export const ExtraLarge = () => (
  <Container maxWidth="xl">
    <Inner label="maxWidth xl (1536dp)" />
  </Container>
);

export const NoMaxWidth = () => (
  <Container maxWidth={false}>
    <Inner label="maxWidth false — full width" />
  </Container>
);

export const DisableGutters = () => (
  <Container maxWidth="sm" disableGutters>
    <View style={{ backgroundColor: '#FCE4EC', padding: 12, borderRadius: 4 }}>
      <Text variant="bodyMedium">disableGutters — no horizontal padding</Text>
    </View>
  </Container>
);
