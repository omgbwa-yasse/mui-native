import React, { useState } from 'react';
import { View } from 'react-native';
import { Searchbar } from '../../src/components/Searchbar';

export default {
  title: 'Form/Searchbar',
  component: Searchbar,
};

export const Default = () => {
  const [query, setQuery] = useState('');
  return (
    <View style={{ padding: 16 }}>
      <Searchbar value={query} onChangeText={setQuery} placeholder="Search…" />
    </View>
  );
};

export const WithValue = () => (
  <View style={{ padding: 16 }}>
    <Searchbar
      value="React Native"
      onChangeText={() => {}}
      placeholder="Search…"
    />
  </View>
);

export const Loading = () => (
  <View style={{ padding: 16 }}>
    <Searchbar
      value="Design"
      onChangeText={() => {}}
      placeholder="Search…"
      loading
    />
  </View>
);

export const Disabled = () => (
  <View style={{ padding: 16 }}>
    <Searchbar
      value=""
      onChangeText={() => {}}
      placeholder="Search…"
      disabled
    />
  </View>
);
