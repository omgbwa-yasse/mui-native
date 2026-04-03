import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '../../src/components/Skeleton';

export default {
  title: 'Feedback/Skeleton',
  component: Skeleton,
};

export const Rectangular = () => (
  <Skeleton width={200} height={100} variant="rectangular" />
);

export const Circular = () => (
  <Skeleton width={48} height={48} variant="circular" />
);

export const TextVariant = () => (
  <View style={{ gap: 8, padding: 16 }}>
    <Skeleton width={300} height={16} variant="text" />
    <Skeleton width={260} height={16} variant="text" />
    <Skeleton width={200} height={16} variant="text" />
  </View>
);

export const PulseAnimation = () => (
  <Skeleton width={200} height={100} animation="pulse" />
);

export const NoAnimation = () => (
  <Skeleton width={200} height={100} animation={false} />
);
