import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { Pressable } from '../../../src/components/Pressable';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('Pressable', () => {
  it('renders children', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Pressable testID="p-root">
          <Text>Press me</Text>
        </Pressable>
      </Wrapper>,
    );
    expect(getByTestId('p-root')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Wrapper>
        <Pressable testID="p-press" onPress={onPress}>
          <Text>Press me</Text>
        </Pressable>
      </Wrapper>,
    );
    fireEvent.press(getByTestId('p-press'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('applies sx style', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Pressable testID="p-sx" sx={{ backgroundColor: 'purple' }} />
      </Wrapper>,
    );
    const el = getByTestId('p-sx');
    expect(el.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: 'purple' })]),
    );
  });

  it('merges sx with static style prop', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Pressable
          testID="p-merge"
          sx={{ backgroundColor: 'blue' }}
          style={{ backgroundColor: 'green' }}
        />
      </Wrapper>,
    );
    const el = getByTestId('p-merge');
    const flat = ([] as object[]).concat(...(el.props.style ?? []));
    const bg = flat.reduce((acc: any, s: any) => ({ ...acc, ...s }), {}).backgroundColor;
    expect(bg).toBe('green');
  });
});
