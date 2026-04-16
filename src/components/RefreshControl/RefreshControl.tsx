import React, { memo } from 'react';
import { RefreshControl as RNRefreshControl } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { RefreshControlProps } from './types';

const RefreshControl = memo<RefreshControlProps>(function RefreshControl(
  rawProps: RefreshControlProps,
) {
  const props = useComponentDefaults('RefreshControl', rawProps);
  const { sx, style, ...rest } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  return <RNRefreshControl style={[sxStyle, style]} {...rest} />;
});

export { RefreshControl };
