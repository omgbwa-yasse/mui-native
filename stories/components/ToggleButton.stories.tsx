import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from '../../src/components/Text';
import { ToggleButton, ToggleButtonGroup } from '../../src/components/ToggleButton';

export default {
  title: 'Form/ToggleButton',
  component: ToggleButton,
};

export const Default = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <View style={{ padding: 24 }}>
      <ToggleButtonGroup value={value} onValueChange={setValue}>
        <ToggleButton value="bold">
          <Text variant="labelLarge">B</Text>
        </ToggleButton>
        <ToggleButton value="italic">
          <Text variant="labelLarge" style={{ fontStyle: 'italic' }}>I</Text>
        </ToggleButton>
        <ToggleButton value="underline">
          <Text variant="labelLarge" style={{ textDecorationLine: 'underline' }}>U</Text>
        </ToggleButton>
      </ToggleButtonGroup>
    </View>
  );
};

export const MultiSelect = () => {
  const [value, setValue] = useState<string[]>([]);
  function toggle(v: string) {
    setValue((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  }
  return (
    <View style={{ padding: 24 }}>
      <ToggleButtonGroup value={value} onValueChange={toggle}>
        <ToggleButton value="bold">
          <Text variant="labelLarge">B</Text>
        </ToggleButton>
        <ToggleButton value="italic">
          <Text variant="labelLarge" style={{ fontStyle: 'italic' }}>I</Text>
        </ToggleButton>
        <ToggleButton value="underline">
          <Text variant="labelLarge" style={{ textDecorationLine: 'underline' }}>U</Text>
        </ToggleButton>
      </ToggleButtonGroup>
    </View>
  );
};

export const Disabled = () => (
  <View style={{ padding: 24 }}>
    <ToggleButtonGroup value="bold" onValueChange={() => {}} disabled>
      <ToggleButton value="bold">
        <Text variant="labelLarge">B</Text>
      </ToggleButton>
      <ToggleButton value="italic">
        <Text variant="labelLarge" style={{ fontStyle: 'italic' }}>I</Text>
      </ToggleButton>
    </ToggleButtonGroup>
  </View>
);
