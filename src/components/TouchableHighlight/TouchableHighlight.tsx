import React, { memo } from 'react';
import { TouchableHighlight as RNTouchableHighlight } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { TouchableHighlightProps } from './types';

const TouchableHighlight = memo<TouchableHighlightProps>(function TouchableHighlight(
  rawProps: TouchableHighlightProps,
) {
  const props = useComponentDefaults('TouchableHighlight', rawProps);
  const { sx, style, children, ...rest } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  return (
    <RNTouchableHighlight style={[sxStyle, style]} {...rest}>
      {/* TouchableHighlight requires exactly one child */}
      <>{children}</>
    </RNTouchableHighlight>
  );
});

export { TouchableHighlight };
