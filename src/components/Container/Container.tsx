import React, { memo } from 'react';
import { View } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import type { ContainerProps, ContainerMaxWidth } from './types';
import { useTheme } from '../../theme';

const CONTAINER_MAX_WIDTHS: Record<Exclude<ContainerMaxWidth, false>, number> = {
  xs: 444,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

const GUTTER = 16;

const Container = memo<ContainerProps>(function Container(rawProps: ContainerProps) {
  const props = useComponentDefaults('Container', rawProps);
  const { theme } = useTheme();
  const {
    maxWidth = 'lg',
    disableGutters = false,
    style,
    children,
    color,
    sx,
    ...rest
  } = props;
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);
  const maxWidthValue =
    maxWidth !== false ? CONTAINER_MAX_WIDTHS[maxWidth] : undefined;

  return (
    <View
      style={[
        {
          alignSelf: 'center',
          width: '100%',
          ...(maxWidthValue !== undefined && { maxWidth: maxWidthValue }),
          ...(!disableGutters && { paddingHorizontal: GUTTER }),
        },
        style,
        sxStyle,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
});

export { Container };
