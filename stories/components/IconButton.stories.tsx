import React from 'react';
import { Alert, View } from 'react-native';
import { IconButton } from '../../src/components/IconButton/IconButton';

const StarIcon = ({ size, color }: { size: number; color: string }) => {
  const { Text } = require('react-native');
  return <Text style={{ fontSize: size, color }}>★</Text>;
};

const HeartIcon = ({ size, color }: { size: number; color: string }) => {
  const { Text } = require('react-native');
  return <Text style={{ fontSize: size, color }}>♥</Text>;
};

const PlusIcon = ({ size, color }: { size: number; color: string }) => {
  const { Text } = require('react-native');
  return <Text style={{ fontSize: size, color }}>＋</Text>;
};

export default {
  title: 'Components/IconButton',
};

export const Standard = () => (
  <IconButton
    icon={StarIcon}
    onPress={() => Alert.alert('pressed')}
    accessibilityLabel="Favourite"
  />
);

export const Filled = () => (
  <IconButton
    icon={HeartIcon}
    variant="filled"
    onPress={() => Alert.alert('pressed')}
    accessibilityLabel="Like"
  />
);

export const FilledTonal = () => (
  <IconButton
    icon={PlusIcon}
    variant="filled-tonal"
    onPress={() => Alert.alert('pressed')}
    accessibilityLabel="Add"
  />
);

export const Outlined = () => (
  <IconButton
    icon={StarIcon}
    variant="outlined"
    onPress={() => Alert.alert('pressed')}
    accessibilityLabel="Star"
  />
);

export const Selected = () => (
  <View style={{ flexDirection: 'row', gap: 12 }}>
    <IconButton icon={HeartIcon} variant="filled" selected accessibilityLabel="Liked" />
    <IconButton icon={HeartIcon} variant="filled-tonal" selected accessibilityLabel="Liked tonal" />
    <IconButton icon={HeartIcon} variant="outlined" selected accessibilityLabel="Liked outlined" />
    <IconButton icon={HeartIcon} variant="standard" selected accessibilityLabel="Liked standard" />
  </View>
);

export const Disabled = () => (
  <View style={{ flexDirection: 'row', gap: 12 }}>
    <IconButton icon={StarIcon} disabled accessibilityLabel="Disabled standard" />
    <IconButton icon={StarIcon} variant="filled" disabled accessibilityLabel="Disabled filled" />
    <IconButton icon={StarIcon} variant="outlined" disabled accessibilityLabel="Disabled outlined" />
  </View>
);
