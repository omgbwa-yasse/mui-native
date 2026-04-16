import React, { memo } from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { ScrollViewProps } from './types';

const ScrollView = memo<ScrollViewProps>(function ScrollView(rawProps: ScrollViewProps) {
  const props = useComponentDefaults('ScrollView', rawProps);
  const { sx, contentSx, style, contentContainerStyle, children, ...rest } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const contentSxStyle = useSx(contentSx, theme);

  return (
    <RNScrollView
      style={[sxStyle, style]}
      contentContainerStyle={[contentSxStyle, contentContainerStyle]}
      {...rest}
    >
      {children}
    </RNScrollView>
  );
});

export { ScrollView };
