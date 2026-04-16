import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { SafeAreaView } from '../../../src/components/SafeAreaView';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('SafeAreaView', () => {
  it('renders children', () => {
    const { getByTestId } = render(
      <Wrapper>
        <SafeAreaView testID="sav-root">
          <Text testID="sav-child">Safe content</Text>
        </SafeAreaView>
      </Wrapper>,
    );
    expect(getByTestId('sav-root')).toBeTruthy();
    expect(getByTestId('sav-child')).toBeTruthy();
  });

  it('applies sx style', () => {
    const { getByTestId } = render(
      <Wrapper>
        <SafeAreaView testID="sav-sx" sx={{ flex: 1 }} />
      </Wrapper>,
    );
    const el = getByTestId('sav-sx');
    expect(el.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ flex: 1 })]),
    );
  });

  it('merges sx and style props (style wins)', () => {
    const { getByTestId } = render(
      <Wrapper>
        <SafeAreaView
          testID="sav-merge"
          sx={{ backgroundColor: 'blue' }}
          style={{ backgroundColor: 'green' }}
        />
      </Wrapper>,
    );
    const el = getByTestId('sav-merge');
    const flat = ([] as object[]).concat(...(el.props.style ?? []));
    const bg = flat.reduce((acc: any, s: any) => ({ ...acc, ...s }), {}).backgroundColor;
    expect(bg).toBe('green');
  });

  it('passes accessibilityLabel through', () => {
    const { getByTestId } = render(
      <Wrapper>
        <SafeAreaView testID="sav-a11y" accessibilityLabel="safe-wrapper" />
      </Wrapper>,
    );
    expect(getByTestId('sav-a11y').props.accessibilityLabel).toBe('safe-wrapper');
  });
});
