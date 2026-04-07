import React, { memo, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { Collapse } from '../Collapse/Collapse';
import { AccordionContext } from './AccordionContext';
import type { AccordionDetailsProps } from './types';

const AccordionDetails = memo(function AccordionDetails({
  children,
  sx,
  style,
  ...rest
}: AccordionDetailsProps) {
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { isExpanded } = useContext(AccordionContext);

  return (
    <Collapse in={isExpanded} unmountOnExit>
      <View
        style={[
          styles.root,
          { backgroundColor: theme.colorScheme.surface },
          sxStyle,
          style,
        ]}
        {...rest}
      >
        {children}
      </View>
    </Collapse>
  );
});

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export { AccordionDetails };
