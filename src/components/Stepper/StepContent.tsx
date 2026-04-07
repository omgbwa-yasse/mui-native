import React, { memo, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { Collapse } from '../Collapse/Collapse';
import { StepContext } from './Step';
import type { StepContentProps } from './types';

const StepContent = memo(function StepContent({
  children,
  TransitionComponent,
  sx,
  style,
  ...rest
}: StepContentProps) {
  const { active } = useContext(StepContext);
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  const CollapseComponent = (TransitionComponent as typeof Collapse | undefined) ?? Collapse;

  return (
    <CollapseComponent in={active} unmountOnExit>
      <View
        style={[
          styles.root,
          { borderLeftColor: theme.colorScheme.outlineVariant },
          sxStyle,
          style,
        ]}
        {...rest}
      >
        {children}
      </View>
    </CollapseComponent>
  );
});

const styles = StyleSheet.create({
  root: {
    marginLeft: 16,
    paddingLeft: 20,
    paddingBottom: 16,
    borderLeftWidth: 1.5,
  },
});

export { StepContent };
