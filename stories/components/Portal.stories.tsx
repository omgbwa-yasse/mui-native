import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Portal } from '../../src/components/Portal/Portal';
import { PortalHost } from '../../src/components/Portal/PortalHost';
import { Text } from '../../src/components/Text/Text';

function PortalDemo(): React.ReactElement {
  return (
    <PortalHost>
      <View style={{ flex: 1, padding: 24 }}>
        <Text variant="bodyLarge">App content (below portal)</Text>
        <Portal>
          <View
            style={{
              position: 'absolute',
              bottom: 24,
              left: 24,
              right: 24,
              padding: 16,
              borderRadius: 12,
              backgroundColor: 'rgba(0,0,0,0.75)',
            }}
          >
            <Text variant="bodyMedium" color="#fff">
              Rendered via Portal — above all siblings
            </Text>
          </View>
        </Portal>
      </View>
    </PortalHost>
  );
}

const meta: Meta = {
  title: 'Components/Portal',
  component: PortalDemo,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithOverlay: Story = {};
