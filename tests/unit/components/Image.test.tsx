import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { Image } from '../../../src/components/Image';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('Image', () => {
  it('renders with source prop', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Image testID="img-root" source={{ uri: 'https://example.com/img.png' }} />
      </Wrapper>,
    );
    expect(getByTestId('img-root')).toBeTruthy();
  });

  it('renders with src string shortcut', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Image testID="img-src" src="https://example.com/img.png" />
      </Wrapper>,
    );
    expect(getByTestId('img-src')).toBeTruthy();
  });

  it('applies sx style', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Image
          testID="img-sx"
          src="https://example.com/img.png"
          sx={{ borderRadius: 8 }}
        />
      </Wrapper>,
    );
    const el = getByTestId('img-sx');
    expect(el.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ borderRadius: 8 })]),
    );
  });

  it('applies width and height as style', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Image
          testID="img-size"
          src="https://example.com/img.png"
          width={100}
          height={80}
        />
      </Wrapper>,
    );
    const el = getByTestId('img-size');
    const flat = ([] as object[]).concat(...(el.props.style ?? []));
    const merged = flat.reduce((acc: any, s: any) => ({ ...acc, ...s }), {});
    expect(merged.width).toBe(100);
    expect(merged.height).toBe(80);
  });

  it('sets accessibilityLabel from alt prop', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Image testID="img-alt" src="https://example.com/img.png" alt="a dog" />
      </Wrapper>,
    );
    expect(getByTestId('img-alt').props.accessibilityLabel).toBe('a dog');
  });
});
