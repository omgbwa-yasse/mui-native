import React, { memo, useRef, useState, useCallback } from 'react';
import {
  View,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import type { ViewStyle, AccessibilityRole } from 'react-native';
import { Portal } from '../Portal/Portal';
import { Text } from '../Text/Text';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import { ActivityIndicator } from '../ActivityIndicator/ActivityIndicator';
import { useTheme } from '../../theme/ThemeContext';
import type { AutocompleteOption, AutocompleteProps } from './types';

const ITEM_HEIGHT = 48;
const MAX_DROPDOWN_HEIGHT = 256;

function defaultFilterOptions(
  options: AutocompleteOption[],
  inputValue: string
): AutocompleteOption[] {
  const lower = inputValue.toLowerCase();
  return options.filter((o) => o.label.toLowerCase().includes(lower));
}

export const Autocomplete = memo(function Autocomplete({
  value,
  onValueChange,
  options,
  filterOptions = defaultFilterOptions,
  getOptionLabel = (o) => o.label,
  inputValue: controlledInputValue,
  onInputChange,
  multiple = false,
  freeSolo = false,
  loading = false,
  disabled = false,
  placeholder,
  label,
  testID,
}: AutocompleteProps) {
  const { theme } = useTheme();
  const triggerRef = useRef<View>(null);
  const [open, setOpen] = useState(false);
  const [internalInput, setInternalInput] = useState('');
  const [dropdownStyle, setDropdownStyle] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const { colorScheme, shape, elevation } = theme;
  const inputVal =
    controlledInputValue !== undefined ? controlledInputValue : internalInput;

  const filtered = filterOptions(options, inputVal);

  function updateInput(text: string) {
    if (controlledInputValue === undefined) {
      setInternalInput(text);
    }
    onInputChange?.(text);
    if (!open && text.length > 0) {
      openDropdown();
    }
  }

  function openDropdown() {
    triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setDropdownStyle({ top: pageY + height, left: pageX, width });
      setOpen(true);
    });
  }

  function closeDropdown() {
    setOpen(false);
  }

  const handleSelect = useCallback(
    (option: AutocompleteOption) => {
      if (multiple) {
        const vals = Array.isArray(value) ? value : value ? [value] : [];
        const next = vals.includes(option.value)
          ? vals.filter((v) => v !== option.value)
          : [...vals, option.value];
        onValueChange(next);
        if (controlledInputValue === undefined) setInternalInput('');
        onInputChange?.('');
      } else {
        onValueChange(option.value);
        const lbl = getOptionLabel(option);
        if (controlledInputValue === undefined) setInternalInput(lbl);
        onInputChange?.(lbl);
        closeDropdown();
      }
    },
    [
      multiple,
      value,
      onValueChange,
      getOptionLabel,
      controlledInputValue,
      onInputChange,
    ]
  );

  function handleBlur() {
    if (freeSolo && !multiple && inputVal) {
      onValueChange(inputVal);
    }
    setTimeout(closeDropdown, 150);
  }

  return (
    <>
      <View ref={triggerRef} testID={testID}>
        {label ? (
          <Text
            variant="bodySmall"
            style={[styles.label, { color: colorScheme.onSurfaceVariant }]}
          >
            {label}
          </Text>
        ) : null}
        <View
          style={[
            styles.inputWrap,
            {
              borderColor: colorScheme.outline,
              borderRadius: shape.extraSmall ?? 4,
              backgroundColor: colorScheme.surface,
              opacity: disabled ? 0.38 : 1,
            },
          ]}
        >
          <TextInput
            value={inputVal}
            onChangeText={updateInput}
            onFocus={openDropdown}
            onBlur={handleBlur}
            placeholder={placeholder}
            placeholderTextColor={colorScheme.onSurfaceVariant}
            editable={!disabled}
            accessibilityRole="combobox"
            accessibilityState={{ expanded: open, disabled }}
            style={[
              styles.input,
              {
                color: colorScheme.onSurface,
                ...theme.typography.bodyLarge,
              },
            ]}
          />
          {loading && (
            <View style={styles.loadingWrap}>
              <ActivityIndicator size="small" />
            </View>
          )}
        </View>
      </View>

      {open && dropdownStyle && (
        <Portal>
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={closeDropdown}
            accessibilityRole="button"
            accessibilityLabel="Close suggestions"
          />
          <View
            style={[
              styles.dropdown,
              {
                top: dropdownStyle.top,
                left: dropdownStyle.left,
                width: dropdownStyle.width,
                backgroundColor: colorScheme.surface,
                borderRadius: shape.extraSmall ?? 4,
                borderColor: colorScheme.outline,
                maxHeight: MAX_DROPDOWN_HEIGHT,
                ...(Platform.select({
                  android: { elevation: elevation?.level2?.elevation ?? 3 },
                  ios: {
                    shadowColor: colorScheme.shadow,
                    shadowOpacity: 0.12,
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 3 },
                  },
                }) as ViewStyle),
              },
            ]}
            accessibilityRole="list"
          >
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.value}
              renderItem={({ item }: { item: AutocompleteOption }) => {
                const vals = multiple
                  ? Array.isArray(value)
                    ? value
                    : value
                      ? [value]
                      : []
                  : [];
                const selected = multiple
                  ? vals.includes(item.value)
                  : value === item.value;
                return (
                  <TouchableRipple
                    onPress={() => handleSelect(item)}
                    accessibilityRole={'option' as AccessibilityRole}
                    accessibilityState={{ selected }}
                    style={[
                      styles.option,
                      selected && {
                        backgroundColor: colorScheme.primaryContainer,
                      },
                    ]}
                  >
                    <Text
                      variant="bodyLarge"
                      style={{
                        color: selected
                          ? colorScheme.onPrimaryContainer
                          : colorScheme.onSurface,
                      }}
                    >
                      {getOptionLabel(item)}
                    </Text>
                  </TouchableRipple>
                );
              }}
              ListEmptyComponent={
                <View style={styles.option}>
                  <Text
                    variant="bodyMedium"
                    style={{ color: colorScheme.onSurfaceVariant }}
                  >
                    {loading ? 'Loading…' : 'No options'}
                  </Text>
                </View>
              }
              getItemLayout={(_data, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
            />
          </View>
        </Portal>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  inputWrap: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 56,
  },
  loadingWrap: {
    paddingEnd: 12,
  },
  dropdown: {
    position: 'absolute',
    borderWidth: 1,
    overflow: 'hidden',
  },
  option: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
