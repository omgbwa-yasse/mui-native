import React, { useState } from 'react';
import { View } from 'react-native';
import { Checkbox } from '../../src/components/Checkbox';

export default {
  title: 'Form/Checkbox',
  component: Checkbox,
};

export const Unchecked = () => {
  const [status, setStatus] = useState<'checked' | 'unchecked' | 'indeterminate'>('unchecked');
  return (
    <Checkbox
      status={status}
      onPress={() => setStatus(status === 'checked' ? 'unchecked' : 'checked')}
    />
  );
};

export const Checked = () => <Checkbox status="checked" />;

export const Indeterminate = () => <Checkbox status="indeterminate" />;

export const Disabled = () => (
  <View style={{ flexDirection: 'row', gap: 16 }}>
    <Checkbox status="unchecked" disabled />
    <Checkbox status="checked" disabled />
    <Checkbox status="indeterminate" disabled />
  </View>
);

export const Interactive = () => {
  const [status, setStatus] = useState<'checked' | 'unchecked' | 'indeterminate'>('unchecked');
  return (
    <Checkbox
      status={status}
      onPress={() => setStatus(status === 'checked' ? 'unchecked' : 'checked')}
      accessibilityLabel="Accept terms"
    />
  );
};
