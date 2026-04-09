import React, { memo, useRef, useState } from 'react';
import {
  View,
  Pressable,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import type { ViewStyle, AccessibilityRole } from 'react-native';
import { Portal } from '../Portal/Portal';
import { Text } from '../Text/Text';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { SelectOption, SelectProps } from './types';

const ITEM_HEIGHT = 48;
const MAX_DROPDOWN_HEIGHT = 256;

export const Select = memo(function Select(rawProps: SelectProps) {
  const props = useComponentDefaults('Select', rawProps);
  const {
    value,
    onValueChange,
    options,
    label,
    placeholder = 'Select…',
    disabled = false,
    multiple = false,
    testID,
    sx,
    style,
    slots,
    slotProps,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const triggerRef = useRef<View>(null);
  const [open, setOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const { colorScheme, shape, elevation } = theme;
  const SlotRoot = slots?.Root ?? View;
  const SlotTrigger = slots?.Trigger ?? View;
  const SlotDropdown = slots?.Dropdown ?? View;
  const SlotOption = slots?.Option ?? View;

  function getLabel(): string {
    if (multiple) {
      const vals = Array.isArray(value) ? value : value ? [value] : [];
      if (vals.length === 0) return '';
      return options
        .filter((o) => vals.includes(o.value))
        .map((o) => o.label)
        .join(', ');
    }
    const found = options.find((o) => o.value === value);
    return found ? found.label : '';
  }

  function openDropdown() {
    if (disabled) return;
    triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setDropdownStyle({ top: pageY + height, left: pageX, width });
      setOpen(true);
    });
  }

  function closeDropdown() {
    setOpen(false);
  }

  function handleSelect(optionValue: string) {
    if (multiple) {
      const vals = Array.isArray(value) ? value : value ? [value] : [];
      const next = vals.includes(optionValue)
        ? vals.filter((v) => v !== optionValue)
        : [...vals, optionValue];
      onValueChange(next);
    } else {
      onValueChange(optionValue);
      closeDropdown();
    }
  }

  function isSelected(optionValue: string): boolean {
    if (multiple) {
      const vals = Array.isArray(value) ? value : value ? [value] : [];
      return vals.includes(optionValue);
    }
    return value === optionValue;
  }

  const displayLabel = getLabel();

  return (
    <>
      <View ref={triggerRef}>
      <SlotRoot testID={testID} {...slotProps?.Root} style={[sxStyle, style, slotProps?.Root?.style]}>
        <TouchableRipple
          onPress={openDropdown}
          disabled={disabled}
          accessibilityRole="combobox"
          accessibilityState={{ expanded: open, disabled }}
          accessibilityLabel={label}
          style={[
            styles.trigger,
            {
              borderColor: colorScheme.outline,
              borderRadius: shape.extraSmall ?? 4,
              backgroundColor: colorScheme.surface,
              opacity: disabled ? 0.38 : 1,
            },
          ]}
        >
          <SlotTrigger {...slotProps?.Trigger} style={[styles.triggerInner, slotProps?.Trigger?.style]}>
            {label ? (
              <Text
                variant="bodySmall"
                style={[styles.fieldLabel, { color: colorScheme.onSurfaceVariant }]}
              >
                {label}
              </Text>
            ) : null}
            <Text
              variant="bodyLarge"
              style={{
                color: displayLabel
                  ? colorScheme.onSurface
                  : colorScheme.onSurfaceVariant,
              }}
            >
              {displayLabel || placeholder}
            </Text>
          </SlotTrigger>
        </TouchableRipple>
      </SlotRoot>
      </View>

      {open && dropdownStyle && (
        <Portal>
          {/* Scrim */}
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={closeDropdown}
            accessibilityLabel="Close dropdown"
          />
          {/* Dropdown */}
          <SlotDropdown
            {...slotProps?.Dropdown}
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
              slotProps?.Dropdown?.style,
            ]}
            accessibilityRole="list"
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }: { item: SelectOption }) => {
                const selected = isSelected(item.value);
                return (
                  <SlotOption {...slotProps?.Option} style={[slotProps?.Option?.style]}>
                    <TouchableRipple
                      onPress={() => !item.disabled && handleSelect(item.value)}
                      disabled={item.disabled}
                      accessibilityRole={'option' as AccessibilityRole}
                      accessibilityState={{
                        selected,
                        disabled: item.disabled,
                      }}
                      style={[
                        styles.option,
                        selected && {
                          backgroundColor: container,
                        },
                      ]}
                    >
                      <Text
                        variant="bodyLarge"
                        style={{
                          color: item.disabled
                            ? colorScheme.onSurface + '61'
                            : selected
                              ? onContainer
                              : colorScheme.onSurface,
                        }}
                      >
                        {item.label}
                      </Text>
                    </TouchableRipple>
                  </SlotOption>
                );
              }}
              getItemLayout={(_data, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
            />
          </SlotDropdown>
        </Portal>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  trigger: {
    borderWidth: 1,
    minHeight: 56,
    justifyContent: 'center',
  },
  triggerInner: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  fieldLabel: {
    marginBottom: 2,
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
