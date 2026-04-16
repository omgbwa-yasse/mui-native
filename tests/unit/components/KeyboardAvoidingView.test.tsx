import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { KeyboardAvoidingView } from '../../../src/components/KeyboardAvoidingView';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('KeyboardAvoidingView', () => {
  it('renders children', () => {
    const { getByTestId } = render(
      <Wrapper>
        <KeyboardAvoidingView testID="kav-root">
          <Text testID="kav-child">Content</Text>
        </KeyboardAvoidingView>
      </Wrapper>,
    );
    expect(getByTestId('kav-root')).toBeTruthy();
    expect(getByTestId('kav-child')).toBeTruthy();
  });

  it('applies sx style', () => {
    const { getByTestId } = render(
      <Wrapper>
        <KeyboardAvoidingView testID="kav-sx" sx={{ flex: 1 }} />
      </Wrapper>,
    );
    const el = getByTestId('kav-sx');
    // KAV wraps style in a nested array; stringify to find the value
    expect(JSON.stringify(el.props.style)).toContain('"flex":1');
  });

  it('accepts explicit behavior override without throwing', () => {
    const { getByTestId } = render(
      <Wrapper>
        <KeyboardAvoidingView testID="kav-behavior" behavior="position" />
      </Wrapper>,
    );
    expect(getByTestId('kav-behavior')).toBeTruthy();
  });
});
