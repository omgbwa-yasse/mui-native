import React, { memo } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { TextInputProps } from './types';

const TextInput = memo<TextInputProps>(function TextInput(rawProps: TextInputProps) {
  const props = useComponentDefaults('TextInput', rawProps);
  const { sx, style, ...rest } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  return <RNTextInput style={[sxStyle as any, style]} {...rest} />;
});

export { TextInput };
