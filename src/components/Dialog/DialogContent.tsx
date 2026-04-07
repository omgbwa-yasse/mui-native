import React, { memo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';
import { useSx } from '../../hooks/useSx';
import { useTheme } from '../../theme';
import { Divider } from '../Divider';

export interface DialogContentSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
}

export interface DialogContentProps extends SlotPropsConfig<DialogContentSlots> {
  children?: React.ReactNode;
  /** If true, renders a top and bottom Divider around the content area. */
  dividers?: boolean;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const DialogContent = memo(function DialogContent(props: DialogContentProps) {
  const { children, dividers = false, sx, style, testID } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  return (
    <View testID={testID}>
      {dividers && <Divider />}
      <ScrollView>
        <View style={[styles.content, sxStyle, style]}>
          {children}
        </View>
      </ScrollView>
      {dividers && <Divider />}
    </View>
  );
});

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
});

export { DialogContent };
