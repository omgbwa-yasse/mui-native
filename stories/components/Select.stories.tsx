import React, { useState } from 'react';
import { View } from 'react-native';
import { PortalHost } from '../../src/components/Portal';
import { Select } from '../../src/components/Select';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

export default {
  title: 'Form/Select',
  component: Select,
};

export const Default = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <PortalHost>
      <View style={{ padding: 24 }}>
        <Select
          value={value}
          onValueChange={(v) => setValue(v as string)}
          options={options}
          label="Fruit"
          placeholder="Pick a fruit"
        />
      </View>
    </PortalHost>
  );
};

export const WithValue = () => {
  const [value, setValue] = useState<string>('banana');
  return (
    <PortalHost>
      <View style={{ padding: 24 }}>
        <Select
          value={value}
          onValueChange={(v) => setValue(v as string)}
          options={options}
          label="Fruit"
        />
      </View>
    </PortalHost>
  );
};

export const MultiSelect = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <PortalHost>
      <View style={{ padding: 24 }}>
        <Select
          value={value}
          onValueChange={(v) => setValue(v as string[])}
          options={options}
          label="Fruits"
          placeholder="Pick fruits"
          multiple
        />
      </View>
    </PortalHost>
  );
};

export const Disabled = () => (
  <PortalHost>
    <View style={{ padding: 24 }}>
      <Select
        value={null}
        onValueChange={() => {}}
        options={options}
        label="Fruit"
        disabled
      />
    </View>
  </PortalHost>
);
