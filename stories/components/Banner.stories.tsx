import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { Banner } from '../../src/components/Banner/Banner';

export default {
  title: 'Components/Banner',
};

export const WithActions = () => {
  const [visible, setVisible] = useState(true);
  return (
    <View style={{ padding: 16 }}>
      <Banner
        visible={visible}
        actions={[
          { label: 'Dismiss', onPress: () => setVisible(false) },
          { label: 'Learn more', onPress: () => {} },
        ]}
      >
        There was a problem with your connection. Check your internet and try again.
      </Banner>
      <Button title="Toggle Banner" onPress={() => setVisible((v) => !v)} />
    </View>
  );
};

export const SingleAction = () => {
  const [visible, setVisible] = useState(true);
  return (
    <View style={{ padding: 16 }}>
      <Banner
        visible={visible}
        actions={[{ label: 'Got it', onPress: () => setVisible(false) }]}
      >
        Your account has been updated successfully.
      </Banner>
      <Button title="Show Banner" onPress={() => setVisible(true)} />
    </View>
  );
};

export const Hidden = () => (
  <View style={{ padding: 16 }}>
    <Banner
      visible={false}
      actions={[{ label: 'OK', onPress: () => {} }]}
    >
      This banner is hidden.
    </Banner>
  </View>
);
