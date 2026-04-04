/**
 * T044 — Unit tests for LayoutToggle component
 */

jest.mock('@mui-native', () => {
  const React = require('react');
  const { TouchableOpacity } = require('react-native');
  const materialIconSource = jest.fn((name: string) => name);
  return {
    IconButton: ({ onPress, accessibilityLabel }: { onPress: () => void; accessibilityLabel: string }) =>
      React.createElement(TouchableOpacity, {
        testID: 'icon-button',
        onPress,
        accessibilityLabel,
      }),
    materialIconSource,
  };
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LayoutToggle from '../../src/components/LayoutToggle';
import { LayoutPreferenceContext } from '../../src/context/LayoutPreferenceContext';

describe('LayoutToggle', () => {
  it('calls context.toggle() when the button is pressed', () => {
    const toggle = jest.fn();
    const { getByTestId } = render(
      <LayoutPreferenceContext.Provider value={{ direction: 'vertical', toggle }}>
        <LayoutToggle />
      </LayoutPreferenceContext.Provider>,
    );
    fireEvent.press(getByTestId('icon-button'));
    expect(toggle).toHaveBeenCalledTimes(1);
  });

  it('shows "Switch to horizontal layout" accessibilityLabel when direction is vertical', () => {
    const { getByLabelText } = render(
      <LayoutPreferenceContext.Provider value={{ direction: 'vertical', toggle: jest.fn() }}>
        <LayoutToggle />
      </LayoutPreferenceContext.Provider>,
    );
    expect(getByLabelText('Switch to horizontal layout')).toBeTruthy();
  });

  it('shows "Switch to vertical layout" accessibilityLabel when direction is horizontal', () => {
    const { getByLabelText } = render(
      <LayoutPreferenceContext.Provider value={{ direction: 'horizontal', toggle: jest.fn() }}>
        <LayoutToggle />
      </LayoutPreferenceContext.Provider>,
    );
    expect(getByLabelText('Switch to vertical layout')).toBeTruthy();
  });

  it('passes "view_agenda" icon name to materialIconSource when direction is vertical', () => {
    const { materialIconSource } = jest.requireMock('@mui-native') as { materialIconSource: jest.Mock };
    materialIconSource.mockClear();
    render(
      <LayoutPreferenceContext.Provider value={{ direction: 'vertical', toggle: jest.fn() }}>
        <LayoutToggle />
      </LayoutPreferenceContext.Provider>,
    );
    expect(materialIconSource).toHaveBeenCalledWith('view_agenda');
  });

  it('passes "view_week" icon name to materialIconSource when direction is horizontal', () => {
    const { materialIconSource } = jest.requireMock('@mui-native') as { materialIconSource: jest.Mock };
    materialIconSource.mockClear();
    render(
      <LayoutPreferenceContext.Provider value={{ direction: 'horizontal', toggle: jest.fn() }}>
        <LayoutToggle />
      </LayoutPreferenceContext.Provider>,
    );
    expect(materialIconSource).toHaveBeenCalledWith('view_week');
  });
});
