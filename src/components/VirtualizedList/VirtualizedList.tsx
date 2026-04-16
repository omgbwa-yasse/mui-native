import React from 'react';
import { VirtualizedList as RNVirtualizedList } from 'react-native';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { VirtualizedListProps } from './types';

/**
 * VirtualizedList<T> — generic wrapper around React Native's VirtualizedList.
 *
 * NOTE: `useComponentDefaults` is intentionally omitted here because the
 * generic type parameter `T` is incompatible with the concrete key in
 * ComponentPropsMap. Use `VirtualizedListBaseProps` for theme overrides.
 */
function VirtualizedList<T>(props: VirtualizedListProps<T>): React.ReactElement {
  const { sx, style, contentSx, contentContainerStyle, ...rest } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const contentSxStyle = useSx(contentSx, theme);

  return (
    <RNVirtualizedList
      style={[sxStyle, style]}
      contentContainerStyle={[contentSxStyle, contentContainerStyle]}
      {...rest}
    />
  );
}

export { VirtualizedList };
