/**
 * T058 — Typography component unit tests.
 *
 * SC-006: All 13 MD2 variant names render correctly; MD2 and MD3 equivalents
 * produce identical output; TypeScript accepts MD2 names without errors.
 */
import React from 'react';
import { AccessibilityInfo } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { Text } from '../../../src/components/Text/Text';
import type { TypographyMD2Variant } from '../../../src/components/Text/types';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <ThemeProvider>
      <PortalHost>{children}</PortalHost>
    </ThemeProvider>
  );
}

beforeEach(() => {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
  jest
    .spyOn(AccessibilityInfo, 'addEventListener')
    .mockReturnValue({ remove: jest.fn() });
});

afterEach(() => {
  jest.restoreAllMocks();
});

const md2Variants: TypographyMD2Variant[] = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'subtitle1', 'subtitle2',
  'body1', 'body2',
  'caption', 'button', 'overline',
];

describe('Text — MD2 variant support', () => {
  it.each(md2Variants)('renders MD2 variant "%s" without crash', (variant) => {
    const { toJSON } = render(
      <Wrapper>
        <Text variant={variant}>MD2 text</Text>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders all 13 MD2 variants (snapshot)', () => {
    const { toJSON } = render(
      <Wrapper>
        {md2Variants.map((v) => (
          <Text key={v} variant={v} testID={`text-${v}`}>
            {v}
          </Text>
        ))}
      </Wrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('body1 and bodyLarge produce the same resolved style', () => {
    const { getByTestId: get1 } = render(
      <Wrapper>
        <Text variant="body1" testID="body1">text</Text>
      </Wrapper>,
    );
    const { getByTestId: get2 } = render(
      <Wrapper>
        <Text variant="bodyLarge" testID="bodyLarge">text</Text>
      </Wrapper>,
    );
    // Compare the flat style arrays — both should resolve to the same typography token
    const flatStyle1 = get1('body1').props.style;
    const flatStyle2 = get2('bodyLarge').props.style;
    // We compare JSON representations of the style arrays (typography token + color overlay)
    expect(JSON.stringify(flatStyle1)).toBe(JSON.stringify(flatStyle2));
  });

  it('h4 uses headlineLarge typography styles', () => {
    const { getByTestId: getH4 } = render(
      <Wrapper>
        <Text variant="h4" testID="h4">heading</Text>
      </Wrapper>,
    );
    const { getByTestId: getHL } = render(
      <Wrapper>
        <Text variant="headlineLarge" testID="hl">heading</Text>
      </Wrapper>,
    );
    const style1 = getH4('h4').props.style;
    const style2 = getHL('hl').props.style;
    expect(JSON.stringify(style1)).toBe(JSON.stringify(style2));
  });

  it('MD3 variants still render correctly (no regression)', () => {
    const { toJSON } = render(
      <Wrapper>
        <Text variant="bodyLarge">bodyLarge</Text>
        <Text variant="titleMedium">titleMedium</Text>
        <Text variant="displaySmall">displaySmall</Text>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('accepts MD2 variant props without TypeScript error (type check)', () => {
    // This test validates that TypographyMD2Variant is accepted by the variant prop.
    // If this compiles, TypeScript accepts MD2 names.
    const variant: TypographyMD2Variant = 'body1';
    const { toJSON } = render(
      <Wrapper>
        <Text variant={variant}>type check</Text>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });
});
