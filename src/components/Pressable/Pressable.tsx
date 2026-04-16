import React, { memo } from 'react';
import { Pressable as RNPressable } from 'react-native';
import type { PressableStateCallbackType } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { PressableProps } from './types';

const Pressable = memo<PressableProps>(function Pressable(rawProps: PressableProps) {
  const props = useComponentDefaults('Pressable', rawProps);
  const { sx, style, children, ...rest } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  // `style` may be a static value or a dynamic callback `({ pressed }) => style`.
  // In both cases `sxStyle` is prepended as a static layer.
  const resolvedStyle =
    typeof style === 'function'
      ? (state: PressableStateCallbackType) => [sxStyle, style(state)]
      : [sxStyle, style];

  return (
    <RNPressable style={resolvedStyle} {...rest}>
      {children}
    </RNPressable>
  );
});

export { Pressable };
