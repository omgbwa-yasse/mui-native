import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ExamplesPlaceholder() {
  return (
    <View
      style={styles.container}
      accessibilityLabel="Examples coming soon for this component"
      accessibilityRole="text"
    >
      <Text style={styles.text}>Examples coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#9e9e9e',
    fontSize: 14,
  },
});
