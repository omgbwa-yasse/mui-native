import React from 'react';
import { View } from 'react-native';
import { HelperText } from '../../src/components/HelperText';

export default {
  title: 'Form/HelperText',
  component: HelperText,
};

export const Normal = () => (
  <View style={{ padding: 24 }}>
    <HelperText type="normal">This is some helper text for the field above.</HelperText>
  </View>
);

export const Error = () => (
  <View style={{ padding: 24 }}>
    <HelperText type="error">This field is required.</HelperText>
  </View>
);

export const Info = () => (
  <View style={{ padding: 24 }}>
    <HelperText type="info">Password must be at least 8 characters.</HelperText>
  </View>
);

export const Hidden = () => (
  <View style={{ padding: 24 }}>
    <HelperText type="error" visible={false}>
      This text should not appear.
    </HelperText>
  </View>
);

export const NoPadding = () => (
  <View style={{ padding: 24 }}>
    <HelperText type="normal" padding="none">
      No left padding applied.
    </HelperText>
  </View>
);
