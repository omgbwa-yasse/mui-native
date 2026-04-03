import React, { useState } from 'react';
import { View } from 'react-native';
import { NumberField } from '../../src/components/NumberField';

export default {
  title: 'Form/NumberField',
  component: NumberField,
};

export const Default = () => {
  const [value, setValue] = useState(0);
  return (
    <View style={{ padding: 24 }}>
      <NumberField value={value} onValueChange={setValue} label="Quantity" />
    </View>
  );
};

export const WithMinMax = () => {
  const [value, setValue] = useState(5);
  return (
    <View style={{ padding: 24 }}>
      <NumberField
        value={value}
        onValueChange={setValue}
        min={0}
        max={10}
        label="Rating (0–10)"
      />
    </View>
  );
};

export const WithStep = () => {
  const [value, setValue] = useState(0);
  return (
    <View style={{ padding: 24 }}>
      <NumberField
        value={value}
        onValueChange={setValue}
        step={5}
        label="Amount (step 5)"
      />
    </View>
  );
};

export const WithPrefixSuffix = () => {
  const [value, setValue] = useState(100);
  return (
    <View style={{ padding: 24 }}>
      <NumberField
        value={value}
        onValueChange={setValue}
        prefix="$"
        suffix="USD"
        label="Price"
        min={0}
        decimalScale={2}
      />
    </View>
  );
};

export const Disabled = () => (
  <View style={{ padding: 24 }}>
    <NumberField
      value={42}
      onValueChange={() => {}}
      label="Quantity"
      disabled
    />
  </View>
);
