import React, { memo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import { Text } from '../Text/Text';
import type { BreadcrumbsProps } from './types';

const Breadcrumbs = memo(function Breadcrumbs(rawProps: BreadcrumbsProps) {
  const props = useComponentDefaults('Breadcrumbs', rawProps);
  const {
    items,
    separator,
    maxItems = 0,
    testID,
    sx,
    style,
    slots,
    slotProps,
  } = props;

  const RootSlot = slots?.Root ?? ScrollView;
  const SeparatorSlot = slots?.Separator ?? View;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const [expanded, setExpanded] = useState(false);

  const separatorNode = separator ?? (
    <Text variant="bodyMedium" color={theme.colorScheme.onSurfaceVariant}>/</Text>
  );

  const shouldCollapse = maxItems > 0 && items.length > maxItems && !expanded;

  let visibleItems = items;
  if (shouldCollapse) {
    // Keep first and last items, collapse middle
    const firstItems = items.slice(0, 1);
    const lastItems = items.slice(items.length - 1);
    visibleItems = [...firstItems, { label: '…', onPress: () => setExpanded(true) }, ...lastItems];
  }

  return (
    <RootSlot
      horizontal
      showsHorizontalScrollIndicator={false}
      {...slotProps?.Root}
      style={[styles.scroll, sxStyle, style, slotProps?.Root?.style]}
      contentContainerStyle={styles.container}
      accessibilityRole="none"
      accessibilityLabel="breadcrumb"
      testID={testID}
    >
      {visibleItems.map((item, index) => {
        const isLast = index === visibleItems.length - 1;
        const isExpandButton = shouldCollapse && index === 1;

        const textColor = isLast
          ? theme.colorScheme.onSurface
          : bg;

        const itemNode = isLast ? (
          <View key={index} style={styles.item}>
            <Text variant="bodyMedium" color={theme.colorScheme.onSurface}>
              {item.label}
            </Text>
          </View>
        ) : (
          <TouchableRipple
            key={index}
            onPress={isExpandButton ? () => setExpanded(true) : item.onPress}
            borderless
            rippleColor={`${theme.colorScheme.onSurface}1F`}
            accessibilityRole="link"
            accessibilityLabel={isExpandButton ? 'Show more' : item.label}
            style={styles.item}
          >
            <View style={styles.itemInner}>
              {item.icon && <View style={styles.icon}>{item.icon}</View>}
              <Text variant="bodyMedium" color={textColor}>
                {item.label}
              </Text>
            </View>
          </TouchableRipple>
        );

        return (
          <React.Fragment key={index}>
            {itemNode}
            {!isLast && (
              <SeparatorSlot {...slotProps?.Separator} style={[styles.separator, slotProps?.Separator?.style]}>{separatorNode}</SeparatorSlot>
            )}
          </React.Fragment>
        );
      })}
    </RootSlot>
  );
});

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  item: {
    minHeight: 48,
    justifyContent: 'center',
  },
  itemInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    minHeight: 48,
  },
  icon: {
    marginEnd: 4,
  },
  separator: {
    marginHorizontal: 4,
    justifyContent: 'center',
  },
});

export { Breadcrumbs };
