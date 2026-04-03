import React, { useState } from 'react';
import { View } from 'react-native';
import { RadioButton, RadioGroup } from '../../src/components/RadioButton';

export default {
  title: 'Form/RadioButton',
  component: RadioButton,
};

export const Default = () => {
  const [value, setValue] = useState('a');
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <View style={{ gap: 8 }}>
        <RadioButton value="a" accessibilityLabel="Option A" />
        <RadioButton value="b" accessibilityLabel="Option B" />
        <RadioButton value="c" accessibilityLabel="Option C" />
      </View>
    </RadioGroup>
  );
};

export const Disabled = () => (
  <RadioGroup value="a" onValueChange={() => {}}>
    <View style={{ gap: 8 }}>
      <RadioButton value="a" disabled />
      <RadioButton value="b" disabled />
    </View>
  </RadioGroup>
);

export const GroupDisabled = () => {
  const [value, setValue] = useState('a');
  return (
    <RadioGroup value={value} onValueChange={setValue} disabled>
      <View style={{ gap: 8 }}>
        <RadioButton value="a" accessibilityLabel="Option A" />
        <RadioButton value="b" accessibilityLabel="Option B" />
      </View>
    </RadioGroup>
  );
};
