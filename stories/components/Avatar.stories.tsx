import React from 'react';
import { View } from 'react-native';
import { Avatar } from '../../src/components/Avatar/Avatar';

export default {
  title: 'Components/Avatar',
};

export const ImageAvatar = () => (
  <Avatar
    source={{ uri: 'https://i.pravatar.cc/150?img=1' }}
    size={56}
    accessibilityLabel="User avatar"
  />
);

export const InitialsFallback = () => (
  <View style={{ flexDirection: 'row', gap: 12 }}>
    <Avatar label="Alice Smith" size={40} />
    <Avatar label="Bob" size={56} />
    <Avatar label="CJ" size={72} />
  </View>
);

export const Sizes = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
    <Avatar label="SM" size={24} />
    <Avatar label="MD" size={40} />
    <Avatar label="LG" size={56} />
    <Avatar label="XL" size={72} />
  </View>
);

export const ImageWithFallback = () => (
  <View style={{ flexDirection: 'row', gap: 12 }}>
    <Avatar
      source={{ uri: 'https://broken-url.example/img.png' }}
      label="Fallback"
      size={48}
    />
    <Avatar label="AB" size={48} color="#6750A4" labelColor="#FFFFFF" />
  </View>
);

export const NoContent = () => (
  <Avatar size={48} accessibilityLabel="No content avatar" />
);
