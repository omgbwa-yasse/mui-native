import React, { useMemo } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  ListRenderItemInfo,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ComponentEntry, RootStackParamList } from '../catalogue/types';
import { registry } from '../catalogue/registry';
import { useTheme, spacing } from '@mui-native';

type Props = NativeStackScreenProps<RootStackParamList, 'CategoryList'>;

export default function CategoryListScreen({ navigation, route }: Props) {
  const { categoryId } = route.params;
  const category = registry.getCategory(categoryId);
  const components = category?.components ?? [];
  const { theme } = useTheme();
  const colors = theme.colorScheme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        list: {
          padding: spacing[4],
          gap: spacing[2],
        },
        row: {
          backgroundColor: colors.surface,
          borderRadius: spacing[2],
          padding: spacing[4],
          minHeight: 56,
          elevation: 1,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.06,
          shadowRadius: 2,
        },
        name: {
          fontSize: 15,
          fontWeight: '500',
          color: colors.onSurface,
        },
        description: {
          fontSize: 13,
          color: colors.onSurfaceVariant,
          marginTop: spacing[1],
        },
      }),
    [colors],
  );

  function renderItem({ item }: ListRenderItemInfo<ComponentEntry>) {
    return (
      <Pressable
        style={styles.row}
        onPress={() =>
          navigation.navigate('ComponentDetail', {
            categoryId,
            componentKey: item.componentKey,
          })
        }
        accessibilityLabel={`${item.name}. ${item.description}`}
        accessibilityRole="button"
      >
        <Text style={styles.name}>{item.name}</Text>
        {item.description ? (
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        ) : null}
      </Pressable>
    );
  }

  return (
    <FlatList
      data={components}
      keyExtractor={item => item.componentKey}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
}


