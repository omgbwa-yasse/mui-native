import React, { useMemo } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ListRenderItemInfo,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../catalogue/types';
import type { Category } from '../catalogue/types';
import { registry } from '../catalogue/registry';
import { useTheme, spacing, MaterialIcon } from '@mui-native';
import type { MaterialIconName } from '@mui-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { categories } = registry;
  const { theme } = useTheme();
  const colors = theme.colorScheme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        list: {
          padding: spacing[4],
          gap: spacing[3],
        },
        card: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.surface,
          borderRadius: spacing[3],
          padding: spacing[4],
          minHeight: 72,
          elevation: 2,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        iconContainer: {
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: colors.primaryContainer,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: spacing[4],
        },
        textContainer: {
          flex: 1,
        },
        label: {
          fontSize: 16,
          fontWeight: '600',
          color: colors.onSurface,
        },
        count: {
          fontSize: 13,
          color: colors.onSurfaceVariant,
          marginTop: spacing[1],
        },
        description: {
          fontSize: 12,
          color: colors.onSurfaceVariant,
          marginTop: spacing[1],
        },
      }),
    [colors],
  );

  function renderItem({ item }: ListRenderItemInfo<Category>) {
    const count = item.components.length;

    return (
      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate('CategoryList', { categoryId: item.id })}
        accessibilityLabel={`${item.label}, ${count} components`}
        accessibilityRole="button"
      >
        <View style={styles.iconContainer}>
          <MaterialIcon
            name={item.icon as MaterialIconName}
            size={24}
            color={colors.primary}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.count}>{count} components</Text>
          {item.description ? (
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
          ) : null}
        </View>
      </Pressable>
    );
  }

  return (
    <FlatList
      data={categories}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
}


