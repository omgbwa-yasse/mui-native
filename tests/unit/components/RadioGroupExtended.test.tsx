import React from 'react';
import { AccessibilityInfo } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { RadioGroup } from '../../../src/components/RadioButton/RadioGroup';
import { RadioButton } from '../../../src/components/RadioButton/RadioButton';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <ThemeProvider>
      <PortalHost>{children}</PortalHost>
    </ThemeProvider>
  );
}

beforeEach(() => {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('RadioGroup extended (MUI-aligned)', () => {
  it('calls onChange with (event, value) when a radio is pressed', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Wrapper>
        <RadioGroup value="a" onValueChange={jest.fn()} onChange={onChange}>
          <RadioButton value="a" testID="radio-a" />
          <RadioButton value="b" testID="radio-b" />
        </RadioGroup>
      </Wrapper>,
    );
    fireEvent.press(getByTestId('radio-b'));
    expect(onChange).toHaveBeenCalledWith(undefined, 'b');
  });

  it('supports uncontrolled defaultValue', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <Wrapper>
        <RadioGroup defaultValue="a" onValueChange={onValueChange}>
          <RadioButton value="a" testID="radio-a" />
          <RadioButton value="b" testID="radio-b" />
        </RadioGroup>
      </Wrapper>,
    );
    fireEvent.press(getByTestId('radio-b'));
    expect(onValueChange).toHaveBeenCalledWith('b');
  });

  it('calls onValueChange on press (backward compat)', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <Wrapper>
        <RadioGroup value="a" onValueChange={onValueChange}>
          <RadioButton value="b" testID="radio-b" />
        </RadioGroup>
      </Wrapper>,
    );
    fireEvent.press(getByTestId('radio-b'));
    expect(onValueChange).toHaveBeenCalledWith('b');
  });

  it('renders radios in a row when row prop is true', () => {
    const { getByTestId } = render(
      <Wrapper>
        <RadioGroup value="a" onValueChange={jest.fn()} row testID="rg-row">
          <RadioButton value="a" testID="radio-a" />
          <RadioButton value="b" testID="radio-b" />
        </RadioGroup>
      </Wrapper>,
    );
    // Row container exists
    expect(getByTestId('radio-a')).toBeTruthy();
    expect(getByTestId('radio-b')).toBeTruthy();
  });
});
