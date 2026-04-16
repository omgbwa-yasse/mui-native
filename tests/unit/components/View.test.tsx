import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { View } from '../../../src/components/View';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('View', () => {
  it('renders children', () => {
    const { getByTestId } = render(
      <Wrapper>
        <View testID="view-root">
          {/* children */}
        </View>
      </Wrapper>,
    );
    expect(getByTestId('view-root')).toBeTruthy();
  });

  it('applies sx style', () => {
    const { getByTestId } = render(
      <Wrapper>
        <View testID="view-sx" sx={{ backgroundColor: 'red' }} />
      </Wrapper>,
    );
    const el = getByTestId('view-sx');
    expect(el.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: 'red' })]),
    );
  });

  it('merges sx and style props (style wins)', () => {
    const { getByTestId } = render(
      <Wrapper>
        <View
          testID="view-merge"
          sx={{ backgroundColor: 'blue' }}
          style={{ backgroundColor: 'green' }}
        />
      </Wrapper>,
    );
    const el = getByTestId('view-merge');
    const flat = ([] as object[]).concat(...(el.props.style ?? []));
    const bg = flat.reduce((acc: any, s: any) => ({ ...acc, ...s }), {}).backgroundColor;
    expect(bg).toBe('green');
  });

  it('passes standard ViewProps through (accessibilityLabel)', () => {
    const { getByA11yLabel } = render(
      <Wrapper>
        <View accessibilityLabel="my-view" />
      </Wrapper>,
    );
    expect(getByA11yLabel('my-view')).toBeTruthy();
  });
});
