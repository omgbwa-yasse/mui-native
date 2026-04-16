import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { TouchableHighlight } from '../../../src/components/TouchableHighlight';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('TouchableHighlight', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Wrapper>
        <TouchableHighlight>
          <Text>Press me</Text>
        </TouchableHighlight>
      </Wrapper>,
    );
    expect(getByText('Press me')).toBeTruthy();
  });

  it('renders with testID', () => {
    const { getByTestId } = render(
      <Wrapper>
        <TouchableHighlight testID="th-root">
          <Text>content</Text>
        </TouchableHighlight>
      </Wrapper>,
    );
    expect(getByTestId('th-root')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Wrapper>
        <TouchableHighlight testID="th-press" onPress={onPress}>
          <Text>tap</Text>
        </TouchableHighlight>
      </Wrapper>,
    );
    fireEvent.press(getByTestId('th-press'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('applies sx style', () => {
    const { getByTestId } = render(
      <Wrapper>
        <TouchableHighlight testID="th-sx" sx={{ backgroundColor: 'purple' }}>
          <Text>content</Text>
        </TouchableHighlight>
      </Wrapper>,
    );
    const el = getByTestId('th-sx');
    expect(JSON.stringify(el.props.style)).toContain('purple');
  });

  it('merges sx and style prop', () => {
    const { getByTestId } = render(
      <Wrapper>
        <TouchableHighlight
          testID="th-merge"
          sx={{ backgroundColor: 'orange' }}
          style={{ borderRadius: 6 }}
        >
          <Text>content</Text>
        </TouchableHighlight>
      </Wrapper>,
    );
    const el = getByTestId('th-merge');
    const styleStr = JSON.stringify(el.props.style);
    expect(styleStr).toContain('orange');
    expect(styleStr).toContain('6');
  });
});
