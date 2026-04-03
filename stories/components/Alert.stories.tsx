import React from 'react';
import { View } from 'react-native';
import { Alert } from '../../src/components/Alert';

export default {
  title: 'Feedback/Alert',
  component: Alert,
};

export const Error = () => (
  <View style={{ padding: 16 }}>
    <Alert severity="error" title="Error">
      Something went wrong. Please try again.
    </Alert>
  </View>
);

export const Warning = () => (
  <View style={{ padding: 16 }}>
    <Alert severity="warning" title="Warning">
      Your session will expire in 5 minutes.
    </Alert>
  </View>
);

export const Info = () => (
  <View style={{ padding: 16 }}>
    <Alert severity="info">A new version is available.</Alert>
  </View>
);

export const Success = () => (
  <View style={{ padding: 16 }}>
    <Alert severity="success" title="Success">
      Your changes have been saved.
    </Alert>
  </View>
);

export const WithCloseButton = () => (
  <View style={{ padding: 16 }}>
    <Alert severity="info" onClose={() => console.log('closed')}>
      Dismissible alert message.
    </Alert>
  </View>
);
