import React from 'react';
import { Alert, View } from 'react-native';
import { Link } from '../../src/components/Link/Link';

export default {
  title: 'Components/Link',
};

export const Default = () => (
  <View style={{ padding: 16 }}>
    <Link onPress={() => Alert.alert('Link pressed')}>Click me</Link>
  </View>
);

export const NoUnderline = () => (
  <View style={{ padding: 16 }}>
    <Link underline="none" onPress={() => Alert.alert('pressed')}>
      No underline link
    </Link>
  </View>
);

export const ColorOverride = () => (
  <View style={{ padding: 16 }}>
    <Link color="#E91E63" onPress={() => Alert.alert('pressed')}>
      Custom pink link
    </Link>
  </View>
);

export const WithHref = () => (
  <View style={{ padding: 16 }}>
    <Link href="https://example.com">Open example.com</Link>
  </View>
);

export const InlineText = () => (
  <View style={{ padding: 16, flexDirection: 'row', flexWrap: 'wrap' }}>
    <Link onPress={() => {}}>Terms of service</Link>
  </View>
);
