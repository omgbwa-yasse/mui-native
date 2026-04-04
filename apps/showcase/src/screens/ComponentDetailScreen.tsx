import React, { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../catalogue/types';
import { registry } from '../catalogue/registry';
import { useTheme, spacing } from '@mui-native';
import CodeBlock from '../components/CodeBlock';
import ExampleGallery from '../components/ExampleGallery';
import ExamplesPlaceholder from '../components/ExamplesPlaceholder';
import LayoutToggle from '../components/LayoutToggle';

type Props = NativeStackScreenProps<RootStackParamList, 'ComponentDetail'>;

export default function ComponentDetailScreen({ navigation, route }: Props) {
  const { componentKey } = route.params;
  const entry = registry.getComponent(componentKey);
  const { theme } = useTheme();
  const colors = theme.colorScheme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background,
        },
        content: {
          padding: spacing[4],
          gap: spacing[4],
        },
        title: {
          fontSize: 22,
          fontWeight: '700',
          color: colors.onSurface,
        },
        description: {
          fontSize: 14,
          color: colors.onSurfaceVariant,
          lineHeight: 20,
        },
        notFound: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing[6],
        },
        notFoundText: {
          color: colors.onSurfaceVariant,
          fontSize: 15,
        },
      }),
    [colors],
  );

  useEffect(() => {
    if (entry) {
      navigation.setOptions({
        title: entry.name,
        headerRight: () => <LayoutToggle />,
      });
    }
  }, [navigation, entry]);

  if (!entry) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Component not found: {componentKey}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Header metadata */}
      <Text style={styles.title}>{entry.name}</Text>
      {entry.description ? (
        <Text style={styles.description}>{entry.description}</Text>
      ) : null}

      {/* [US2] CodeBlock */}
      {entry.sourceCode ? <CodeBlock code={entry.sourceCode} /> : null}

      {/* [US3] ExampleGallery / ExamplesPlaceholder */}
      {entry.hasFullExamples && entry.examples ? (
        <ExampleGallery examples={entry.examples} />
      ) : (
        <ExamplesPlaceholder />
      )}

      {/* [US4] LayoutToggle mounted in header above */}
    </ScrollView>
  );
}


