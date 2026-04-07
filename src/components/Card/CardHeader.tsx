import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';
import { useSx } from '../../hooks/useSx';

export interface CardHeaderSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
}

export interface CardHeaderProps extends SlotPropsConfig<CardHeaderSlots> {
  /** Avatar element rendered at the start. */
  avatar?: React.ReactNode;
  /** Primary title text or element. */
  title?: React.ReactNode;
  /** Secondary subheader text or element. */
  subheader?: React.ReactNode;
  /** Action element rendered at the end (e.g. icon button). */
  action?: React.ReactNode;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const CardHeader = memo(function CardHeader(props: CardHeaderProps) {
  const { avatar, title, subheader, action, sx, style, testID } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { typography, colorScheme } = theme;

  return (
    <View style={[styles.row, sxStyle, style]} testID={testID}>
      {avatar != null && <View style={styles.avatarWrapper}>{avatar}</View>}
      <View style={styles.textBlock}>
        {typeof title === 'string' ? (
          <Text style={[typography.titleMedium, { color: colorScheme.onSurface }]}>{title}</Text>
        ) : (
          title
        )}
        {subheader != null && (
          typeof subheader === 'string' ? (
            <Text style={[typography.bodyMedium, { color: colorScheme.onSurfaceVariant }]}>{subheader}</Text>
          ) : (
            subheader
          )
        )}
      </View>
      {action != null && <View style={styles.action}>{action}</View>}
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  avatarWrapper: { marginEnd: 16 },
  textBlock: { flex: 1 },
  action: { marginStart: 8 },
});

export { CardHeader };
