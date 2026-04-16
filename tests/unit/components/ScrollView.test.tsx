import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { ScrollView } from '../../../src/components/ScrollView';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('ScrollView', () => {
  it('renders children', () => {
    const { getByTestId } = render(
      <Wrapper>
        <ScrollView testID="sv-root">
          <Text testID="sv-child">hello</Text>
        </ScrollView>
      </Wrapper>,
    );
    expect(getByTestId('sv-root')).toBeTruthy();
    expect(getByTestId('sv-child')).toBeTruthy();
  });

  it('applies sx style', () => {
    const { getByTestId } = render(
      <Wrapper>
        <ScrollView testID="sv-sx" sx={{ backgroundColor: 'blue' }} />
      </Wrapper>,
    );
    const el = getByTestId('sv-sx');
    expect(el.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: 'blue' })]),
    );
  });

  it('merges sx and style props (style wins)', () => {
    const { getByTestId } = render(
      <Wrapper>
        <ScrollView
          testID="sv-merge"
          sx={{ backgroundColor: 'blue' }}
          style={{ backgroundColor: 'green' }}
        />
      </Wrapper>,
    );
    const el = getByTestId('sv-merge');
    const flat = ([] as object[]).concat(...(el.props.style ?? []));
    const bg = flat.reduce((acc: any, s: any) => ({ ...acc, ...s }), {}).backgroundColor;
    expect(bg).toBe('green');
  });

  it('passes horizontal prop through', () => {
    const { getByTestId } = render(
      <Wrapper>
        <ScrollView testID="sv-h" horizontal />
      </Wrapper>,
    );
    expect(getByTestId('sv-h').props.horizontal).toBe(true);
  });
});
