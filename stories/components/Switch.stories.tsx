import React, { useState } from 'react';
import { View } from 'react-native';
import { Switch } from '../../src/components/Switch';

export default {
  title: 'Form/Switch',
  component: Switch,
};

export const Default = () => {
  const [value, setValue] = useState(false);
  return <Switch value={value} onValueChange={setValue} />;
};

export const On = () => <Switch value={true} onValueChange={() => {}} />;

export const Off = () => <Switch value={false} onValueChange={() => {}} />;

export const Disabled = () => (
  <View style={{ flexDirection: 'row', gap: 16 }}>
    <Switch value={false} onValueChange={() => {}} disabled />
    <Switch value={true} onValueChange={() => {}} disabled />
  </View>
);

export const CustomColor = () => {
  const [value, setValue] = useState(true);
  return <Switch value={value} onValueChange={setValue} color="#E91E63" />;
};
