import React, { memo } from 'react';
import { Image as RNImage } from 'react-native';
import type { ImageSourcePropType, ImageStyle } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { ImageProps } from './types';

const Image = memo<ImageProps>(function Image(rawProps: ImageProps) {
  const props = useComponentDefaults('Image', rawProps);
  const { src, alt, width, height, sx, style, source, ...rest } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  const resolvedSource: ImageSourcePropType =
    src != null
      ? typeof src === 'string'
        ? { uri: src }
        : (src as ImageSourcePropType)
      : (source ?? { uri: '' });

  const sizeStyle: ImageStyle = {
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
  };

  return (
    <RNImage
      source={resolvedSource}
      accessibilityLabel={alt}
      style={[sizeStyle, sxStyle as ImageStyle | undefined, style]}
      {...rest}
    />
  );
});

export { Image };
