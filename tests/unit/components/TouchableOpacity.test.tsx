import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { TouchableOpacity } from '../../../src/components/TouchableOpacity';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('TouchableOpacity', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Wrapper>
        <TouchableOpacity>
          <Text>Press me</Text>
        </TouchableOpacity>
      </Wrapper>,
    );
    expect(getByText('Press me')).toBeTruthy();
  });

  it('renders with testID', () => {
    const { getByTestId } = render(
      <Wrapper>
        <TouchableOpacity testID="to-root">
          <Text>content</Text>
        </TouchableOpacity>
      </Wrapper>,
    );
    expect(getByTestId('to-root')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Wrapper>
        <TouchableOpacity testID="to-press" onPress={onPress}>
          <Text>tap</Text>
        </TouchableOpacity>
      </Wrapper>,
    );
    fireEvent.press(getByTestId('to-press'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('applies sx style', () => {
    const { getByTestId } = render(
      <Wrapper>
        <TouchableOpacity testID="to-sx" sx={{ backgroundColor: 'green' }}>
          <Text>content</Text>
        </TouchableOpacity>
      </Wrapper>,
    );
    const el = getByTestId('to-sx');
    expect(JSON.stringify(el.props.style)).toContain('green');
  });

  it('merges sx and style prop', () => {
    const { getByTestId } = render(
      <Wrapper>
        <TouchableOpacity
          testID="to-merge"
          sx={{ backgroundColor: 'blue' }}
          style={{ borderRadius: 4 }}
        >
          <Text>content</Text>
        </TouchableOpacity>
      </Wrapper>,
    );
    const el = getByTestId('to-merge');
    const styleStr = JSON.stringify(el.props.style);
    expect(styleStr).toContain('blue');
    expect(styleStr).toContain('4');
  });
});
