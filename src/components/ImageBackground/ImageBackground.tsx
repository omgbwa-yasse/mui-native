import React, { memo } from 'react';
import { ImageBackground as RNImageBackground } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { ImageBackgroundProps } from './types';

const ImageBackground = memo<ImageBackgroundProps>(function ImageBackground(
  rawProps: ImageBackgroundProps,
) {
  const props = useComponentDefaults('ImageBackground', rawProps);
  const { sx, style, src, source, alt, width, height, children, ...rest } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  const resolvedSource =
    src != null ? { uri: src } : source ?? { uri: '' };

  const sizeStyle =
    width != null || height != null ? { width, height } : undefined;

  return (
    <RNImageBackground
      source={resolvedSource}
      accessibilityLabel={alt}
      style={[sxStyle, sizeStyle, style] as any}
      {...rest}
    >
      {children}
    </RNImageBackground>
  );
});

export { ImageBackground };
