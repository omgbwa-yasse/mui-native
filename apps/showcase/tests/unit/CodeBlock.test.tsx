/**
 * T042 — Unit tests for CodeBlock component
 */

jest.mock('react-native-syntax-highlighter', () => {
  const React = require('react');
  const { View } = require('react-native');
  return (props: { children: string }) =>
    React.createElement(View, { testID: 'syntax-highlighter' });
});

jest.mock('react-syntax-highlighter/styles/hljs', () => ({
  atomOneDark: {},
}));

import React from 'react';
import { render } from '@testing-library/react-native';
import CodeBlock from '../../src/components/CodeBlock';

describe('CodeBlock', () => {
  it('renders the syntax highlighter when code is non-empty', () => {
    const { getByTestId } = render(<CodeBlock code="const x = 1;" />);
    expect(getByTestId('syntax-highlighter')).toBeTruthy();
  });

  it('renders null (nothing) when code is an empty string', () => {
    const { toJSON } = render(<CodeBlock code="" />);
    expect(toJSON()).toBeNull();
  });
});
