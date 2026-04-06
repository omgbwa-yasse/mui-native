import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../src/theme/ThemeProvider';
import { useComponentDefaults } from '../../src/hooks/useComponentDefaults';

interface TestProps {
  variant?: string;
  size?: string;
}

function TestComponent(instanceProps: TestProps): React.ReactElement {
  const merged = useComponentDefaults('TestComponent', instanceProps);
  return (
    <>
      <Text testID="variant">{merged.variant ?? 'none'}</Text>
      <Text testID="size">{merged.size ?? 'none'}</Text>
    </>
  );
}

describe('theme.components config integration', () => {
  it('applies defaultProps from theme.components when no instance prop is set', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={{ components: { TestComponent: { defaultProps: { variant: 'tonal', size: 'large' } } } } as any}>
        <TestComponent />
      </ThemeProvider>,
    );
    expect(getByTestId('variant').props.children).toBe('tonal');
    expect(getByTestId('size').props.children).toBe('large');
  });

  it('instance prop overrides defaultProps', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={{ components: { TestComponent: { defaultProps: { variant: 'tonal', size: 'large' } } } } as any}>
        <TestComponent variant="filled" />
      </ThemeProvider>,
    );
    expect(getByTestId('variant').props.children).toBe('filled');
    expect(getByTestId('size').props.children).toBe('large');
  });

  it('renders normally when theme has no components config', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent variant="outlined" />
      </ThemeProvider>,
    );
    expect(getByTestId('variant').props.children).toBe('outlined');
    expect(getByTestId('size').props.children).toBe('none');
  });
});
