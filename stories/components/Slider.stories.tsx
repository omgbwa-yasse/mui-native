import React, { useState } from 'react';
import { View } from 'react-native';
import { Slider } from '../../src/components/Slider';

export default {
  title: 'Form/Slider',
  component: Slider,
};

export const Default = () => {
  const [value, setValue] = useState(50);
  return (
    <View style={{ padding: 24 }}>
      <Slider value={value} onValueChange={setValue} />
    </View>
  );
};

export const WithMinMax = () => {
  const [value, setValue] = useState(20);
  return (
    <View style={{ padding: 24 }}>
      <Slider value={value} onValueChange={setValue} min={0} max={100} />
    </View>
  );
};

export const WithStep = () => {
  const [value, setValue] = useState(25);
  return (
    <View style={{ padding: 24 }}>
      <Slider value={value} onValueChange={setValue} step={25} />
    </View>
  );
};

export const WithMarks = () => {
  const [value, setValue] = useState(0);
  return (
    <View style={{ padding: 24 }}>
      <Slider
        value={value}
        onValueChange={setValue}
        step={25}
        marks={[
          { value: 0, label: '0' },
          { value: 25, label: '25' },
          { value: 50, label: '50' },
          { value: 75, label: '75' },
          { value: 100, label: '100' },
        ]}
      />
    </View>
  );
};

export const Disabled = () => (
  <View style={{ padding: 24 }}>
    <Slider value={30} onValueChange={() => {}} disabled />
  </View>
);
