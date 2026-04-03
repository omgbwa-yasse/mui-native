import React, { useState } from 'react';
import { View } from 'react-native';
import { SegmentedButtons } from '../../src/components/SegmentedButtons';

const buttons = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

export default {
  title: 'Form/SegmentedButtons',
  component: SegmentedButtons,
};

export const Default = () => {
  const [value, setValue] = useState('day');
  return (
    <View style={{ padding: 24 }}>
      <SegmentedButtons
        value={value}
        onValueChange={(v) => setValue(v as string)}
        buttons={buttons}
      />
    </View>
  );
};

export const MultiSelect = () => {
  const [value, setValue] = useState<string[]>(['day']);
  return (
    <View style={{ padding: 24 }}>
      <SegmentedButtons
        value={value}
        onValueChange={(v) => setValue(v as string[])}
        buttons={buttons}
        multiSelect
      />
    </View>
  );
};

export const Dense = () => {
  const [value, setValue] = useState('day');
  return (
    <View style={{ padding: 24 }}>
      <SegmentedButtons
        value={value}
        onValueChange={(v) => setValue(v as string)}
        buttons={buttons}
        density="dense"
      />
    </View>
  );
};

export const WithDisabledItem = () => {
  const [value, setValue] = useState('day');
  return (
    <View style={{ padding: 24 }}>
      <SegmentedButtons
        value={value}
        onValueChange={(v) => setValue(v as string)}
        buttons={[
          { value: 'day', label: 'Day' },
          { value: 'week', label: 'Week', disabled: true },
          { value: 'month', label: 'Month' },
        ]}
      />
    </View>
  );
};
