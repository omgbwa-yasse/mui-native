import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ListProps } from './types';

const List = memo(function List({ children, testID }: ListProps) {
  return (
    <View style={styles.container} accessibilityRole="list" testID={testID}>
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export { List };
