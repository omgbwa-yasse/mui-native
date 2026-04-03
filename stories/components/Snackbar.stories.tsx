import React from 'react';
import { Button, View } from 'react-native';
import { PortalHost } from '../../src/components/Portal';
import { SnackbarHost, useSnackbar } from '../../src/components/Snackbar';

function SnackbarTrigger() {
  const snackbar = useSnackbar();
  return (
    <View style={{ gap: 8, padding: 16 }}>
      <Button
        title="Short Snackbar"
        onPress={() => snackbar.show({ message: 'File saved successfully.' })}
      />
      <Button
        title="Long Snackbar"
        onPress={() =>
          snackbar.show({
            message: 'Your changes have been published.',
            duration: 'long',
          })
        }
      />
      <Button
        title="With Action"
        onPress={() =>
          snackbar.show({
            message: 'Email deleted.',
            action: { label: 'Undo', onPress: () => console.log('undone') },
          })
        }
      />
    </View>
  );
}

export default {
  title: 'Feedback/Snackbar',
};

export const Default = () => (
  <PortalHost>
    <SnackbarHost>
      <SnackbarTrigger />
    </SnackbarHost>
  </PortalHost>
);
