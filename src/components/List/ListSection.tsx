import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Divider } from '../Divider/Divider';
import { Text } from '../Text/Text';
import type { ListSectionProps } from './types';

const ListSection = memo(function ListSection({
  title,
  children,
  testID,
}: ListSectionProps) {
  const { theme } = useTheme();

  return (
    <View testID={testID}>
      {title && (
        <View style={styles.header}>
          <Text
            variant="labelMedium"
            color={theme.colorScheme.onSurfaceVariant}
          >
            {title}
          </Text>
        </View>
      )}
      {children}
      <Divider />
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export { ListSection };
