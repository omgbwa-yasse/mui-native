import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme';
import { Text } from '../Text/Text';
import type { ImageListItemProps } from './types';

const ImageListItem = memo<ImageListItemProps & { _cellWidth?: number; _cellHeight?: number }>(
  function ImageListItem({ img, title, actionIcon, _cellWidth, _cellHeight }) {
    const { theme } = useTheme();
    const cs = theme.colorScheme;

    return (
      <View
        style={[
          styles.cell,
          { backgroundColor: cs.surfaceVariant },
          _cellWidth != null && { width: _cellWidth },
          _cellHeight != null && { height: _cellHeight },
        ]}
      >
        <Image
          source={img}
          style={styles.image}
          resizeMode="cover"
          accessibilityRole="image"
        />
        {title != null && (
          <View style={[styles.titleBar, { backgroundColor: cs.surface }]}>
            <Text
              variant="bodySmall"
              style={[styles.titleText, { color: cs.onSurface }]}
              numberOfLines={1}
            >
              {title}
            </Text>
            {actionIcon != null && (
              <View style={styles.actionIcon}>{actionIcon}</View>
            )}
          </View>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  cell: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    opacity: 0.87,
  },
  titleText: {
    flex: 1,
  },
  actionIcon: {
    marginStart: 4,
  },
});

export { ImageListItem };
