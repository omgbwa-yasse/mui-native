import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import type { ListProps } from './types';
import { useTheme } from '../../theme';

const List = memo(function List(rawProps: ListProps) {
  const props = useComponentDefaults('List', rawProps);
  const { color, sx, style, children, testID, slots, slotProps } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);
  const Root = slots?.Root ?? View;
  return (
    <Root {...slotProps?.Root} style={[styles.container, sxStyle, style, slotProps?.Root?.style]} accessibilityRole="list" testID={testID}>
      {children}
    </Root>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export { List };
