import React, { memo } from 'react';
import { View } from 'react-native';
import type { ContainerProps, ContainerMaxWidth } from './types';

const CONTAINER_MAX_WIDTHS: Record<Exclude<ContainerMaxWidth, false>, number> = {
  xs: 444,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

const GUTTER = 16;

const Container = memo<ContainerProps>(function Container({
  maxWidth = 'lg',
  disableGutters = false,
  style,
  children,
  ...rest
}) {
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
      ]}
      {...rest}
    >
      {children}
    </View>
  );
});

export { Container };
