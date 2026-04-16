import React, { memo } from 'react';
import { TouchableOpacity as RNTouchableOpacity } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { TouchableOpacityProps } from './types';

const TouchableOpacity = memo<TouchableOpacityProps>(function TouchableOpacity(
  rawProps: TouchableOpacityProps,
) {
  const props = useComponentDefaults('TouchableOpacity', rawProps);
  const { sx, style, children, ...rest } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  return (
    <RNTouchableOpacity style={[sxStyle, style]} {...rest}>
      {children}
    </RNTouchableOpacity>
  );
});

export { TouchableOpacity };
