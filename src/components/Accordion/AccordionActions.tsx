import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { AccordionActionsProps } from './types';

const AccordionActions = memo(function AccordionActions({
  children,
  disableSpacing = false,
  sx,
  style,
  ...rest
}: AccordionActionsProps) {
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  return (
    <View
      style={[
        styles.root,
        !disableSpacing && styles.spacing,
        { borderTopColor: theme.colorScheme.outlineVariant },
        sxStyle,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    paddingBottom: 8,
    borderTopWidth: 0,
  },
  spacing: {
    gap: 8,
  },
});

export { AccordionActions };
