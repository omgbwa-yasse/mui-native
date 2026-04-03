import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Rating } from '../../src/components/Rating/Rating';

export default {
  title: 'Components/Rating',
};

export const Default = () => {
  const [value, setValue] = useState(3);
  return (
    <View style={{ padding: 16 }}>
      <Rating value={value} onValueChange={setValue} />
    </View>
  );
};

export const HalfPrecision = () => {
  const [value, setValue] = useState(2.5);
  return (
    <View style={{ padding: 16 }}>
      <Rating value={value} onValueChange={setValue} precision={0.5} />
    </View>
  );
};

export const ReadOnly = () => (
  <View style={{ padding: 16 }}>
    <Rating value={4} readOnly />
  </View>
);

export const Disabled = () => (
  <View style={{ padding: 16 }}>
    <Rating value={2} disabled />
  </View>
);

export const SmallSize = () => (
  <View style={{ padding: 16 }}>
    <Rating value={3} size="small" onValueChange={() => {}} />
  </View>
);

export const LargeSize = () => (
  <View style={{ padding: 16 }}>
    <Rating value={3} size="large" onValueChange={() => {}} />
  </View>
);

export const MaxSeven = () => {
  const [value, setValue] = useState(5);
  return (
    <View style={{ padding: 16 }}>
      <Rating value={value} onValueChange={setValue} max={7} />
    </View>
  );
};

export const Uncontrolled = () => (
  <View style={{ padding: 16 }}>
    <Rating onValueChange={(v) => Alert.alert(`Selected: ${v}`)} />
  </View>
);
