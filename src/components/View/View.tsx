import React, { memo } from 'react';
import { View as RNView } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { ViewProps } from './types';

const View = memo<ViewProps>(function View(rawProps: ViewProps) {
  const props = useComponentDefaults('View', rawProps);
  const { sx, style, children, ...rest } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx as never, theme);

  return (
    <RNView style={[sxStyle, style]} {...rest}>
      {children}
    </RNView>
  );
});

export { View };
