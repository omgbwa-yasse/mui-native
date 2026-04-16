import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { TextInput } from '../../../src/components/TextInput';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('TextInput', () => {
  it('renders with testID', () => {
    const { getByTestId } = render(
      <Wrapper>
        <TextInput testID="ti-root" />
      </Wrapper>,
    );
    expect(getByTestId('ti-root')).toBeTruthy();
  });

  it('passes placeholder through', () => {
    const { getByPlaceholderText } = render(
      <Wrapper>
        <TextInput placeholder="Type here..." />
      </Wrapper>,
    );
    expect(getByPlaceholderText('Type here...')).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(
      <Wrapper>
        <TextInput testID="ti-change" onChangeText={onChangeText} />
      </Wrapper>,
    );
    fireEvent.changeText(getByTestId('ti-change'), 'hello');
    expect(onChangeText).toHaveBeenCalledWith('hello');
  });

  it('applies sx style', () => {
    const { getByTestId } = render(
      <Wrapper>
        <TextInput testID="ti-sx" sx={{ borderWidth: 2 }} />
      </Wrapper>,
    );
    const el = getByTestId('ti-sx');
    expect(JSON.stringify(el.props.style)).toContain('2');
  });

  it('merges sx and style prop', () => {
    const { getByTestId } = render(
      <Wrapper>
        <TextInput
          testID="ti-merge"
          sx={{ borderWidth: 1 }}
          style={{ color: 'red' }}
        />
      </Wrapper>,
    );
    const el = getByTestId('ti-merge');
    expect(JSON.stringify(el.props.style)).toContain('red');
  });
});
