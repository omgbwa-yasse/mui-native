import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CodeBlock from './CodeBlock';
import { useLayoutPreference } from '../context/LayoutPreferenceContext';
import type { ExampleConfig } from '../catalogue/types';

interface ExampleGalleryProps {
  examples: ExampleConfig[];
}

export default function ExampleGallery({ examples }: ExampleGalleryProps) {
  const { direction } = useLayoutPreference();
  const isHorizontal = direction === 'horizontal';

  return (
    <ScrollView
      horizontal={isHorizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.scrollContent,
        isHorizontal ? styles.rowContent : styles.columnContent,
      ]}
    >
      {examples.map((example, index) => (
        <View
          key={`${example.label}-${index}`}
          style={[styles.item, isHorizontal ? styles.itemHorizontal : styles.itemVertical]}
        >
          <Text style={styles.label}>{example.label}</Text>
          {example.description ? (
            <Text style={styles.description}>{example.description}</Text>
          ) : null}
          {example.code ? <CodeBlock code={example.code} language="tsx" /> : null}
          <View style={styles.preview}>{example.render()}</View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    gap: 16,
  },
  rowContent: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  columnContent: {
    flexDirection: 'column',
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  itemHorizontal: {
    width: 280,
  },
  itemVertical: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#777',
    marginBottom: 12,
  },
  preview: {
    marginTop: 8,
    alignItems: 'flex-start',
  },
});
