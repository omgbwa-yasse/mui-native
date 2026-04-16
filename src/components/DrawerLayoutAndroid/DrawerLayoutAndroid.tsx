import React, { memo } from 'react';
import { DrawerLayoutAndroid as RNDrawerLayoutAndroid } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { DrawerLayoutAndroidProps } from './types';

const DrawerLayoutAndroid = memo<DrawerLayoutAndroidProps>(function DrawerLayoutAndroid(
  rawProps: DrawerLayoutAndroidProps,
) {
  const props = useComponentDefaults('DrawerLayoutAndroid', rawProps);
  const { sx, style, children, ...rest } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  return (
    <RNDrawerLayoutAndroid style={[sxStyle, style]} {...rest}>
      {children}
    </RNDrawerLayoutAndroid>
  );
});

export { DrawerLayoutAndroid };
