import React, { memo } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle, ImageStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';
import { useSx } from '../../hooks/useSx';
import { useTheme } from '../../theme';

export interface CardMediaSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
}

export interface CardMediaProps extends SlotPropsConfig<CardMediaSlots> {
  /** Image URI string. */
  image?: string;
  /** Accessibility label for the image. */
  alt?: string;
  /** Height in dp. Defaults to 194. */
  height?: number;
  /** Custom component to render instead of Image. */
  component?: React.ComponentType<any>;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const CardMedia = memo(function CardMedia(props: CardMediaProps) {
  const { image, alt, height = 194, component: Component, sx, style, testID } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  if (Component) {
    return <Component style={[{ height }, sxStyle, style]} testID={testID} />;
  }

  return (
    <View style={[{ height, overflow: 'hidden' }, sxStyle, style]} testID={testID}>
      {image != null && (
        <Image
          source={{ uri: image }}
          style={styles.image as ImageStyle}
          accessibilityLabel={alt}
          accessible={alt != null}
          accessibilityIgnoresInvertColors
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export { CardMedia };
