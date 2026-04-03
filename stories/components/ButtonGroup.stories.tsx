import React from 'react';
import { View } from 'react-native';
import { Text } from '../../src/components/Text';
import { ButtonGroup } from '../../src/components/ButtonGroup';
import { TouchableRipple } from '../../src/components/TouchableRipple';
import { useTheme } from '../../src/theme/ThemeContext';

function DemoButton({ label }: { label: string }) {
  const { theme } = useTheme();
  return (
    <TouchableRipple
      onPress={() => {}}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: theme.colorScheme.primary,
      }}
    >
      <Text variant="labelLarge" style={{ color: theme.colorScheme.onPrimary }}>
        {label}
      </Text>
    </TouchableRipple>
  );
}

export default {
  title: 'Form/ButtonGroup',
  component: ButtonGroup,
};

export const Horizontal = () => (
  <View style={{ padding: 24 }}>
    <ButtonGroup>
      <DemoButton label="One" />
      <DemoButton label="Two" />
      <DemoButton label="Three" />
    </ButtonGroup>
  </View>
);

export const Vertical = () => (
  <View style={{ padding: 24 }}>
    <ButtonGroup orientation="vertical">
      <DemoButton label="Top" />
      <DemoButton label="Middle" />
      <DemoButton label="Bottom" />
    </ButtonGroup>
  </View>
);

export const TwoButtons = () => (
  <View style={{ padding: 24 }}>
    <ButtonGroup>
      <DemoButton label="Cancel" />
      <DemoButton label="OK" />
    </ButtonGroup>
  </View>
);
