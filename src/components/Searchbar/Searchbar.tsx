import React, { memo, useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { ActivityIndicator } from '../ActivityIndicator/ActivityIndicator';
import type { SearchbarProps } from './types';

const Searchbar = memo(function Searchbar(rawProps: SearchbarProps) {
  const props = useComponentDefaults('Searchbar', rawProps);
  const {
    value,
    onChangeText,
    onSubmitEditing,
    onClearIconPress,
    placeholder = 'Search',
    loading = false,
    disabled = false,
    icon,
    clearIcon,
    testID,
    sx,
    style,
    slots,
    slotProps,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const inputRef = useRef<TextInput>(null);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colorScheme.surfaceVariant,
      borderRadius: theme.shape.full ?? 28,
      paddingHorizontal: 16,
      height: 56,
      opacity: disabled ? 0.38 : 1,
    },
    input: {
      flex: 1,
      ...theme.typography.bodyLarge,
      color: theme.colorScheme.onSurface,
      paddingVertical: 0,
      marginHorizontal: 8,
    },
    iconBox: {
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const SlotRoot = slots?.Root ?? View;
  const SlotInput = slots?.Input ?? TextInput;

  return (
    <SlotRoot
      {...slotProps?.Root}
      style={[styles.container, sxStyle, style, slotProps?.Root?.style]}
      accessibilityRole="search"
      accessible
      testID={testID}
    >
      {/* Leading search icon */}
      <View style={styles.iconBox}>
        {icon ?? (
          <View
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: theme.colorScheme.onSurfaceVariant,
            }}
          />
        )}
      </View>

      <SlotInput
        {...(inputRef as any)}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor={theme.colorScheme.onSurfaceVariant}
        editable={!disabled}
        returnKeyType="search"
        underlineColorAndroid="transparent"
        {...slotProps?.Input}
        style={[styles.input, slotProps?.Input?.style]}
      />

      {loading ? (
        <ActivityIndicator size="small" color={theme.colorScheme.onSurfaceVariant} />
      ) : value.length > 0 ? (
        <Pressable
          onPress={onClearIconPress ?? (() => onChangeText(''))}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={8}
        >
          <View style={[styles.iconBox]}>
            {clearIcon ?? (
              <View
                style={{
                  width: 12,
                  height: 2,
                  backgroundColor: theme.colorScheme.onSurfaceVariant,
                  transform: [{ rotate: '45deg' }],
                }}
              />
            )}
          </View>
        </Pressable>
      ) : null}
    </SlotRoot>
  );
});

export { Searchbar };
