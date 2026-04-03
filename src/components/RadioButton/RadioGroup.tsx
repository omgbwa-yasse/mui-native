import React from 'react';
import { RadioButtonContext } from './RadioButtonContext';
import type { RadioGroupProps } from './types';

function RadioGroup({
  value,
  onValueChange,
  disabled,
  children,
  testID: _testID,
}: RadioGroupProps) {
  return (
    <RadioButtonContext.Provider value={{ value, onValueChange, disabled }}>
      <React.Fragment>{children}</React.Fragment>
    </RadioButtonContext.Provider>
  );
}

export { RadioGroup };
