import React, { memo } from 'react';
import { SafeAreaView as RNSafeAreaView } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { SafeAreaViewProps } from './types';

const SafeAreaView = memo<SafeAreaViewProps>(function SafeAreaView(rawProps: SafeAreaViewProps) {
  const props = useComponentDefaults('SafeAreaView', rawProps);
  const { sx, style, children, ...rest } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  return (
    <RNSafeAreaView style={[sxStyle, style]} {...rest}>
      {children}
    </RNSafeAreaView>
  );
});

export { SafeAreaView };
