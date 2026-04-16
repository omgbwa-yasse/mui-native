import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { ImageBackground } from '../../../src/components/ImageBackground';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('ImageBackground', () => {
  it('renders with source prop', () => {
    const { getByTestId } = render(
      <Wrapper>
        <ImageBackground testID="ib-root" source={{ uri: 'https://example.com/bg.png' }}>
          <Text>content</Text>
        </ImageBackground>
      </Wrapper>,
    );
    expect(getByTestId('ib-root')).toBeTruthy();
  });

  it('renders with src string shortcut', () => {
    const { getByTestId } = render(
      <Wrapper>
        <ImageBackground testID="ib-src" src="https://example.com/bg.png">
          <Text>content</Text>
        </ImageBackground>
      </Wrapper>,
    );
    expect(getByTestId('ib-src')).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(
      <Wrapper>
        <ImageBackground src="https://example.com/bg.png">
          <Text>hello world</Text>
        </ImageBackground>
      </Wrapper>,
    );
    expect(getByText('hello world')).toBeTruthy();
  });

  it('sets accessibilityLabel from alt prop', () => {
    const { getByTestId } = render(
      <Wrapper>
        <ImageBackground
          testID="ib-alt"
          src="https://example.com/bg.png"
          alt="a background"
        >
          <Text>content</Text>
        </ImageBackground>
      </Wrapper>,
    );
    expect(getByTestId('ib-alt').props.accessibilityLabel).toBe('a background');
  });

  it('applies sx style', () => {
    // RN's ImageBackground spreads testID to the inner Image, not the outer View
    // where style is applied — so we inspect the full tree JSON instead.
    const { toJSON } = render(
      <Wrapper>
        <ImageBackground
          src="https://example.com/bg.png"
          sx={{ backgroundColor: 'blue' }}
        >
          <Text>content</Text>
        </ImageBackground>
      </Wrapper>,
    );
    expect(JSON.stringify(toJSON())).toContain('blue');
  });

  it('applies width and height', () => {
    const { getByTestId } = render(
      <Wrapper>
        <ImageBackground
          testID="ib-size"
          src="https://example.com/bg.png"
          width={200}
          height={150}
        >
          <Text>content</Text>
        </ImageBackground>
      </Wrapper>,
    );
    const el = getByTestId('ib-size');
    const flat = ([] as object[]).concat(...(el.props.style ?? []));
    const merged = flat.reduce((acc: any, s: any) => ({ ...acc, ...s }), {});
    expect(merged.width).toBe(200);
    expect(merged.height).toBe(150);
  });
});
