import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Breadcrumbs } from '../../src/components/Breadcrumbs';

export default {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
};

const ITEMS = [
  { label: 'Home', onPress: () => {} },
  { label: 'Category', onPress: () => {} },
  { label: 'Current Page' },
];

export const Default = () => (
  <View style={{ padding: 16 }}>
    <Breadcrumbs items={ITEMS} />
  </View>
);

export const CustomSeparator = () => (
  <View style={{ padding: 16 }}>
    <Breadcrumbs items={ITEMS} separator={<Text style={{ marginHorizontal: 4 }}>›</Text>} />
  </View>
);

export const Collapsed = () => (
  <View style={{ padding: 16 }}>
    <Breadcrumbs
      items={[
        { label: 'Home', onPress: () => {} },
        { label: 'Level 2', onPress: () => {} },
        { label: 'Level 3', onPress: () => {} },
        { label: 'Level 4', onPress: () => {} },
        { label: 'Current Page' },
      ]}
      maxItems={3}
    />
  </View>
);

export const LongPath = () => (
  <ScrollView>
    <View style={{ padding: 16 }}>
      <Breadcrumbs
        items={[
          { label: 'Root', onPress: () => {} },
          { label: 'Section A', onPress: () => {} },
          { label: 'Sub-section B', onPress: () => {} },
          { label: 'Topic C', onPress: () => {} },
          { label: 'Article Title' },
        ]}
      />
    </View>
  </ScrollView>
);
