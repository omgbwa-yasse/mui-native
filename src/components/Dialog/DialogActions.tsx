import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';
import { useSx } from '../../hooks/useSx';
import { useTheme } from '../../theme';

export interface DialogActionsSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
}

export interface DialogActionsProps extends SlotPropsConfig<DialogActionsSlots> {
  children?: React.ReactNode;
  /** If true, removes the default gap between action buttons. */
  disableSpacing?: boolean;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const DialogActions = memo(function DialogActions(props: DialogActionsProps) {
  const { children, disableSpacing = false, sx, style, testID } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  return (
    <View
      style={[styles.row, disableSpacing ? undefined : styles.gap, sxStyle, style]}
      testID={testID}
    >
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  gap: {
    gap: 8,
  },
});

export { DialogActions };
