import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from '../../src/components/ActivityIndicator';

export default {
  title: 'Feedback/ActivityIndicator',
  component: ActivityIndicator,
};

export const Default = () => <ActivityIndicator />;

export const Small = () => <ActivityIndicator size="small" />;

export const Large = () => <ActivityIndicator size="large" />;

export const Stopped = () => (
  <ActivityIndicator animating={false} hidesWhenStopped={false} />
);

export const HidesWhenStopped = () => (
  <View>
    <ActivityIndicator animating={false} hidesWhenStopped />
  </View>
);

export const CustomColor = () => (
  <ActivityIndicator color="#E91E63" size="large" />
);
