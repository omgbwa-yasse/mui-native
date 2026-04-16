import React from 'react';
import { SectionList as RNSectionList } from 'react-native';
import type { DefaultSectionT } from 'react-native';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { SectionListProps } from './types';

/**
 * SectionList — themed wrapper around React Native SectionList.
 *
 * Adds `sx` / `contentSx` escape hatches while preserving the full generic API
 * (`sections`, `renderItem`, `renderSectionHeader`, etc.).
 *
 * Note: `useComponentDefaults` is intentionally omitted because the generic
 * type parameter cannot be represented in ComponentPropsMap at call sites.
 */
function SectionList<ItemT = unknown, SectionT = DefaultSectionT>(
  props: SectionListProps<ItemT, SectionT>,
): React.ReactElement {
  const { sx, contentSx, style, contentContainerStyle, ...rest } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const contentSxStyle = useSx(contentSx, theme);

  return (
    <RNSectionList<ItemT, SectionT>
      style={[sxStyle, style]}
      contentContainerStyle={[contentSxStyle, contentContainerStyle]}
      {...rest}
    />
  );
}

export { SectionList };
