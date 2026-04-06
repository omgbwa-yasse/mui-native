import React, { Children, cloneElement, isValidElement, memo } from 'react';
import { View } from 'react-native';
import { spacing } from '../../tokens/spacing';
import type { SpacingKey } from '../../tokens/spacing';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import type { StackProps } from './types';
import { useTheme } from '../../theme';

function resolveGap(s: SpacingKey | number | undefined): number {
  if (s === undefined) return 0;
  if (typeof s === 'number') {
    // If it's a valid SpacingKey (integer), look it up; otherwise treat as raw dp
    return (spacing as Record<number, number>)[s] ?? s;
  }
  return spacing[s];
}

const Stack = memo<StackProps>(function Stack(rawProps: StackProps) {
  const props = useComponentDefaults('Stack', rawProps);
  const { theme } = useTheme();
  const {
    direction = 'column',
    spacing: spacingProp,
    divider,
    flexWrap = 'nowrap',
    alignItems,
    justifyContent,
    style,
    children,
    color,
    sx,
    ...rest
  } = props;
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);
  const gap = resolveGap(spacingProp);
  const isRow = direction === 'row' || direction === 'row-reverse';
  const marginProp = isRow ? 'marginEnd' : 'marginBottom';

  const childArray = Children.toArray(children).filter(Boolean);

  const items: React.ReactNode[] = [];
  childArray.forEach((child, index) => {
    const isLast = index === childArray.length - 1;

    if (isValidElement(child)) {
      if (divider) {
        items.push(child);
        if (!isLast) {
          items.push(cloneElement(divider, { key: `divider-${index}` }));
        }
      } else {
        items.push(
          cloneElement(child as React.ReactElement, {
            key: (child as React.ReactElement).key ?? index,
            style: [
              (child as React.ReactElement).props.style,
              !isLast && gap > 0 ? { [marginProp]: gap } : undefined,
            ],
          })
        );
      }
    } else {
      items.push(child);
    }
  });

  return (
    <View
      style={[
        {
          flexDirection: direction,
          flexWrap,
          ...(alignItems !== undefined && { alignItems }),
          ...(justifyContent !== undefined && { justifyContent }),
          ...(divider !== undefined && gap > 0
            ? { gap }
            : {}),
        },
        style,
      , sxStyle, style]}
      {...rest}
    >
      {items}
    </View>
  );
});

export { Stack };
