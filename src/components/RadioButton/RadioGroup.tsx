import React, { useState } from 'react';
import { View } from 'react-native';
import { RadioButtonContext } from './RadioButtonContext';
import { RadioGroupContext } from './RadioGroupContext';
import type { RadioGroupProps } from './types';

function RadioGroup({
  value: valueProp,
  defaultValue,
  onValueChange,
  onChange,
  name,
  row = false,
  disabled,
  children,
  testID: _testID,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState<string>(defaultValue ?? '');
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  function handleValueChange(newValue: string) {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
    onChange?.(undefined, newValue);
  }

  const radioButtonCtx = { value, onValueChange: handleValueChange, disabled };
  const radioGroupCtx = { name, value, onChange: (e: unknown, v: string) => handleValueChange(v), row, disabled };

  return (
    <RadioButtonContext.Provider value={radioButtonCtx}>
      <RadioGroupContext.Provider value={radioGroupCtx}>
        <View style={row ? { flexDirection: 'row' } : undefined}>
          {children}
        </View>
      </RadioGroupContext.Provider>
    </RadioButtonContext.Provider>
  );
}

export { RadioGroup };
