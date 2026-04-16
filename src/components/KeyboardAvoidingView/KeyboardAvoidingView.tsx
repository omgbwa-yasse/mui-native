import React, { memo } from 'react';
import { KeyboardAvoidingView as RNKeyboardAvoidingView, Platform } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { KeyboardAvoidingViewProps } from './types';

const KeyboardAvoidingView = memo<KeyboardAvoidingViewProps>(function KeyboardAvoidingView(
  rawProps: KeyboardAvoidingViewProps,
) {
  const props = useComponentDefaults('KeyboardAvoidingView', rawProps);
  const { sx, style, children, behavior, ...rest } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  return (
    <RNKeyboardAvoidingView
      behavior={behavior ?? (Platform.OS === 'ios' ? 'padding' : 'height')}
      style={[sxStyle, style]}
      {...rest}
    >
      {children}
    </RNKeyboardAvoidingView>
  );
});

export { KeyboardAvoidingView };
