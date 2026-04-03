import React, { useState } from 'react';
import { View } from 'react-native';
import { PortalHost } from '../../src/components/Portal';
import { Autocomplete } from '../../src/components/Autocomplete';

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
];

export default {
  title: 'Form/Autocomplete',
  component: Autocomplete,
};

export const Default = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <PortalHost>
      <View style={{ padding: 24 }}>
        <Autocomplete
          value={value}
          onValueChange={(v) => setValue(v as string | null)}
          options={fruits}
          label="Fruit"
          placeholder="Type to search…"
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
        <Autocomplete
          value={value}
          onValueChange={(v) => setValue(v as string[])}
          options={fruits}
          label="Fruits"
          placeholder="Type to search…"
          multiple
        />
      </View>
    </PortalHost>
  );
};

export const FreeSolo = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <PortalHost>
      <View style={{ padding: 24 }}>
        <Autocomplete
          value={value}
          onValueChange={(v) => setValue(v as string | null)}
          options={fruits}
          label="Fruit (free-form allowed)"
          placeholder="Type any fruit…"
          freeSolo
        />
      </View>
    </PortalHost>
  );
};

export const Loading = () => (
  <PortalHost>
    <View style={{ padding: 24 }}>
      <Autocomplete
        value={null}
        onValueChange={() => {}}
        options={[]}
        label="Search"
        loading
      />
    </View>
  </PortalHost>
);

export const Disabled = () => (
  <PortalHost>
    <View style={{ padding: 24 }}>
      <Autocomplete
        value={null}
        onValueChange={() => {}}
        options={fruits}
        label="Fruit"
        disabled
      />
    </View>
  </PortalHost>
);
