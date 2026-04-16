import React from 'react';
import { FlatList as RNFlatList } from 'react-native';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { FlatListProps } from './types';

/**
 * FlatList — themed wrapper around React Native FlatList.
 *
 * Adds `sx` / `contentSx` escape hatches while preserving the full generic API
 * (`data`, `renderItem`, `keyExtractor`, etc.).
 *
 * Note: `useComponentDefaults` is intentionally omitted because the generic
 * type parameter cannot be represented in ComponentPropsMap at call sites.
 */
function FlatList<T = unknown>(props: FlatListProps<T>): React.ReactElement {
  const { sx, contentSx, style, contentContainerStyle, ...rest } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const contentSxStyle = useSx(contentSx, theme);

  return (
    <RNFlatList<T>
      style={[sxStyle, style]}
      contentContainerStyle={[contentSxStyle, contentContainerStyle]}
      {...rest}
    />
  );
}

export { FlatList };
