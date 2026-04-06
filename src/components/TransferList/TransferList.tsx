import React, { memo, useState } from 'react';
import {
  View,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Text } from '../Text/Text';
import { Checkbox } from '../Checkbox/Checkbox';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import type { TransferItem, TransferListProps } from './types';

const ITEM_HEIGHT = 48;

export const TransferList = memo(function TransferList(rawProps: TransferListProps) {
  const props = useComponentDefaults('TransferList', rawProps);
  const {
    left,
    right,
    onTransfer,
    leftTitle = 'Available',
    rightTitle = 'Selected',
    testID,
    color,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);
  const { colorScheme, shape } = theme;

  const [leftChecked, setLeftChecked] = useState<Set<string>>(new Set());
  const [rightChecked, setRightChecked] = useState<Set<string>>(new Set());

  function toggleLeft(id: string) {
    setLeftChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleRight(id: string) {
    setRightChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAllLeft() {
    if (leftChecked.size === left.length) {
      setLeftChecked(new Set());
    } else {
      setLeftChecked(new Set(left.map((i) => i.id)));
    }
  }

  function toggleAllRight() {
    if (rightChecked.size === right.length) {
      setRightChecked(new Set());
    } else {
      setRightChecked(new Set(right.map((i) => i.id)));
    }
  }

  /** Move checked left items → right */
  function moveRight() {
    const moving = left.filter((i) => leftChecked.has(i.id));
    const newLeft = left.filter((i) => !leftChecked.has(i.id));
    const newRight = [...right, ...moving];
    setLeftChecked(new Set());
    onTransfer(newLeft, newRight);
  }

  /** Move all left → right */
  function moveAllRight() {
    onTransfer([], [...right, ...left]);
    setLeftChecked(new Set());
  }

  /** Move checked right items → left */
  function moveLeft() {
    const moving = right.filter((i) => rightChecked.has(i.id));
    const newRight = right.filter((i) => !rightChecked.has(i.id));
    const newLeft = [...left, ...moving];
    setRightChecked(new Set());
    onTransfer(newLeft, newRight);
  }

  /** Move all right → left */
  function moveAllLeft() {
    onTransfer([...left, ...right], []);
    setRightChecked(new Set());
  }

  function renderItem(
    item: TransferItem,
    checked: Set<string>,
    onToggle: (id: string) => void
  ) {
    return (
      <Pressable
        key={item.id}
        onPress={() => onToggle(item.id)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: checked.has(item.id) }}
        style={[styles.row, { minHeight: ITEM_HEIGHT }]}
      >
        <Checkbox
          status={checked.has(item.id) ? 'checked' : 'unchecked'}
          onPress={() => onToggle(item.id)}
        />
        <Text
          variant="bodyMedium"
          style={[styles.rowLabel, { color: colorScheme.onSurface }]}
        >
          {item.label}
        </Text>
      </Pressable>
    );
  }

  const panelStyle = [
    styles.panel,
    {
      borderColor: colorScheme.outline,
      borderRadius: shape.extraSmall ?? 4,
      backgroundColor: colorScheme.surface,
    },
  ];

  return (
    <View style={[styles.root, sxStyle, style]} testID={testID}>
      {/* Left panel */}
      <View style={panelStyle}>
        <Pressable
          onPress={toggleAllLeft}
          style={[styles.header, { borderBottomColor: colorScheme.outline }]}
          accessibilityRole="checkbox"
          accessibilityState={{
            checked:
              left.length > 0 && leftChecked.size === left.length
                ? true
                : leftChecked.size > 0
                  ? 'mixed'
                  : false,
          }}
        >
          <Checkbox
            status={
              left.length > 0 && leftChecked.size === left.length
                ? 'checked'
                : leftChecked.size > 0
                  ? 'indeterminate'
                  : 'unchecked'
            }
            onPress={toggleAllLeft}
          />
          <Text variant="titleSmall" style={{ color: colorScheme.onSurface }}>
            {leftTitle}
            {'  '}
            <Text
              variant="bodySmall"
              style={{ color: colorScheme.onSurfaceVariant }}
            >
              {leftChecked.size}/{left.length}
            </Text>
          </Text>
        </Pressable>
        <FlatList
          data={left}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderItem(item, leftChecked, toggleLeft)}
          getItemLayout={(_data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          style={styles.list}
        />
      </View>

      {/* Action column */}
      <View style={styles.actions}>
        <ActionButton
          label="→→"
          onPress={moveAllRight}
          disabled={left.length === 0}
        />
        <ActionButton
          label="→"
          onPress={moveRight}
          disabled={leftChecked.size === 0}
        />
        <ActionButton
          label="←"
          onPress={moveLeft}
          disabled={rightChecked.size === 0}
        />
        <ActionButton
          label="←←"
          onPress={moveAllLeft}
          disabled={right.length === 0}
        />
      </View>

      {/* Right panel */}
      <View style={panelStyle}>
        <Pressable
          onPress={toggleAllRight}
          style={[styles.header, { borderBottomColor: colorScheme.outline }]}
          accessibilityRole="checkbox"
          accessibilityState={{
            checked:
              right.length > 0 && rightChecked.size === right.length
                ? true
                : rightChecked.size > 0
                  ? 'mixed'
                  : false,
          }}
        >
          <Checkbox
            status={
              right.length > 0 && rightChecked.size === right.length
                ? 'checked'
                : rightChecked.size > 0
                  ? 'indeterminate'
                  : 'unchecked'
            }
            onPress={toggleAllRight}
          />
          <Text variant="titleSmall" style={{ color: colorScheme.onSurface }}>
            {rightTitle}
            {'  '}
            <Text
              variant="bodySmall"
              style={{ color: colorScheme.onSurfaceVariant }}
            >
              {rightChecked.size}/{right.length}
            </Text>
          </Text>
        </Pressable>
        <FlatList
          data={right}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderItem(item, rightChecked, toggleRight)}
          getItemLayout={(_data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          style={styles.list}
        />
      </View>
    </View>
  );
});

function ActionButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled: boolean;
}) {
  const { theme } = useTheme();
  const { colorScheme, shape } = theme;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[
        styles.actionBtn,
        {
          borderColor: colorScheme.outline,
          borderRadius: shape.extraSmall ?? 4,
          backgroundColor: colorScheme.surface,
          opacity: disabled ? 0.38 : 1,
        },
      ]}
    >
      <Text
        variant="labelLarge"
        style={{ color: colorScheme.primary }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  panel: {
    flex: 1,
    borderWidth: 1,
    overflow: 'hidden',
    minHeight: 200,
    maxHeight: 400,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
  },
  list: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  rowLabel: {
    flex: 1,
    paddingStart: 8,
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  actionBtn: {
    borderWidth: 1,
    minWidth: 48,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});
