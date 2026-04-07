import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { Avatar } from '../Avatar';
import type { AvatarGroupProps } from './types';

type SpacingValue = 'medium' | 'small' | number;

function resolveMarginLeft(spacing: SpacingValue): number {
  if (typeof spacing === 'number') return -spacing;
  return spacing === 'small' ? -4 : -8;
}

const AvatarGroup = memo(function AvatarGroup(props: AvatarGroupProps) {
  const {
    children,
    max = 5,
    total,
    spacing = 'medium',
    renderSurplus,
    sx,
    style,
    testID,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  const childArray = React.Children.toArray(children);
  const totalCount = total ?? childArray.length;
  const surplus = totalCount - max;
  const visibleChildren = surplus > 0 ? childArray.slice(0, max) : childArray;

  const marginLeft = resolveMarginLeft(spacing);

  return (
    <View style={[styles.row, sxStyle, style]} testID={testID}>
      {visibleChildren.map((child, index) => (
        <View
          key={index}
          style={[
            // First item no negative margin; subsequent items overlap
            index === 0 ? undefined : { marginLeft },
            // Higher zIndex for earlier items (first avatar on top)
            { zIndex: visibleChildren.length - index },
          ]}
        >
          {child as React.ReactElement}
        </View>
      ))}
      {surplus > 0 && (
        <View style={{ marginLeft, zIndex: 0 }}>
          {renderSurplus ? (
            renderSurplus(surplus)
          ) : (
            <Avatar
              label={`+${surplus}`}
              color={theme.colorScheme.surface}
              labelColor={theme.colorScheme.onSurface}
              testID="avatar-group-surplus"
            />
          )}
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export { AvatarGroup };
