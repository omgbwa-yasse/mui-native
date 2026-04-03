import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Tabs, TabPanel } from '../../src/components/Tabs';

export default {
  title: 'Navigation/Tabs',
  component: Tabs,
};

const ITEMS = [
  { value: 'home', label: 'Home' },
  { value: 'favourites', label: 'Favourites' },
  { value: 'settings', label: 'Settings' },
];

export const Standard = () => {
  const [value, setValue] = useState('home');
  return (
    <View style={{ flex: 1 }}>
      <Tabs items={ITEMS} value={value} onValueChange={setValue}>
        {() => (
          <>
            <TabPanel value="home">
              <Text style={{ padding: 16 }}>Home content</Text>
            </TabPanel>
            <TabPanel value="favourites">
              <Text style={{ padding: 16 }}>Favourites content</Text>
            </TabPanel>
            <TabPanel value="settings">
              <Text style={{ padding: 16 }}>Settings content</Text>
            </TabPanel>
          </>
        )}
      </Tabs>
    </View>
  );
};

export const Scrollable = () => {
  const [value, setValue] = useState('tab1');
  const items = Array.from({ length: 8 }, (_, i) => ({
    value: `tab${i + 1}`,
    label: `Tab ${i + 1}`,
  }));
  return (
    <View style={{ flex: 1 }}>
      <Tabs items={items} value={value} onValueChange={setValue} scrollable />
    </View>
  );
};

export const Secondary = () => {
  const [value, setValue] = useState('home');
  return (
    <View style={{ flex: 1 }}>
      <Tabs items={ITEMS} value={value} onValueChange={setValue} variant="secondary" />
    </View>
  );
};

export const WithDisabledTab = () => {
  const [value, setValue] = useState('home');
  const items = [
    { value: 'home', label: 'Home' },
    { value: 'locked', label: 'Locked', disabled: true },
    { value: 'settings', label: 'Settings' },
  ];
  return (
    <View style={{ flex: 1 }}>
      <Tabs items={items} value={value} onValueChange={setValue} />
    </View>
  );
};
