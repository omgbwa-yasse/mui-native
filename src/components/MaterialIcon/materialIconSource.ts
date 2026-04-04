import React from 'react';
import type { MaterialIconName } from './catalogue';
import type { IconSource } from '../Icon/types';
import type { IconVariant } from './types';
import {
  FilledIcons,
  OutlinedIcons,
  RoundedIcons,
  SharpIcons,
  TwoToneIcons,
} from './iconSets';

const ICON_SET_MAP = {
  filled: FilledIcons,
  outlined: OutlinedIcons,
  rounded: RoundedIcons,
  sharp: SharpIcons,
  'two-tone': TwoToneIcons,
} as const;

/**
 * materialIconSource — creates an `IconSource` function for use with the
 * generic `<Icon>` component.
 *
 * @param name    A valid `MaterialIconName` (e.g. `'star'`)
 * @param variant Icon style variant. Defaults to `'filled'`.
 * @returns An `IconSource` callback `({ size, color }) => ReactElement`
 *
 * @example
 * <Icon source={materialIconSource('home', 'outlined')} size={24} />
 */
export function materialIconSource(
  name: MaterialIconName,
  variant: IconVariant = 'filled',
): IconSource {
  const IconSet = ICON_SET_MAP[variant];
  return ({ size, color }) =>
    React.createElement(IconSet, { name, size, color });
}
