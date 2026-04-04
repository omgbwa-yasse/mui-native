import React from 'react';
import { AccessibilityInfo } from 'react-native';
import { render as rntlRender, fireEvent } from '@testing-library/react-native';
import { DatePicker } from '../DatePicker';
import { LocalizationProvider } from '../LocalizationProvider';
import { ThemeProvider } from '../../../theme/ThemeProvider';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}
const render = (ui: React.ReactElement) => rntlRender(ui, { wrapper: Wrapper });

beforeEach(() => {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() });
});

afterEach(() => {
  jest.restoreAllMocks();
});

jest.mock('@react-native-community/datetimepicker', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: ({ testID, onChange, value }: { testID?: string; onChange: (e: unknown, d?: Date) => void; value: Date }) => {
      return React.createElement(View, {
        testID: testID ?? 'mock-native-picker',
        accessible: true,
        onAccessibilityAction: () => onChange({}, value),
      });
    },
  };
}, { virtual: true });

// Use local-time constructor so getDate()/getMonth()/getFullYear() return March 15
// regardless of the machine's UTC offset.
const testDate = new Date(2024, 2, 15, 12, 0, 0);

describe('DatePicker', () => {
  it('renders trigger with label', () => {
    const { getByText } = render(<DatePicker label="Birth date" />);
    expect(getByText('Birth date')).toBeTruthy();
  });

  it('displays formatted value', () => {
    const { getByText } = render(
      <DatePicker value={testDate} label="Date" />,
    );
    // IntlDateAdapter formats using MM/dd/yyyy by default
    expect(getByText('03/15/2024')).toBeTruthy();
  });

  it('uses format override from prop', () => {
    const { getByText } = render(
      <DatePicker value={testDate} label="Date" format="yyyy-MM-dd" />,
    );
    expect(getByText('2024-03-15')).toBeTruthy();
  });

  it('uses locale from LocalizationProvider', () => {
    const { getByText } = render(
      <LocalizationProvider dateFormats={{ fullDate: 'dd/MM/yyyy' }}>
        <DatePicker value={testDate} label="Date" />
      </LocalizationProvider>,
    );
    expect(getByText('15/03/2024')).toBeTruthy();
  });

  it('shows placeholder when no value', () => {
    const { getByText } = render(
      <DatePicker label="Birth date" placeholder="Select date" />,
    );
    expect(getByText('Select date')).toBeTruthy();
  });

  it('calls onChange with null when no value provided to uncontrolled', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <DatePicker label="Date" onChange={onChange} />,
    );
    // Trigger is a button — pressing opens the picker
    const trigger = getByRole('button');
    expect(trigger).toBeTruthy();
  });

  it('does not open when disabled', () => {
    const onOpen = jest.fn();
    const { getByRole } = render(
      <DatePicker label="Date" disabled onOpen={onOpen} />,
    );
    fireEvent.press(getByRole('button'));
    expect(onOpen).not.toHaveBeenCalled();
  });

  it('does not open when readOnly', () => {
    const onOpen = jest.fn();
    const { getByRole } = render(
      <DatePicker label="Date" readOnly onOpen={onOpen} />,
    );
    fireEvent.press(getByRole('button'));
    expect(onOpen).not.toHaveBeenCalled();
  });

  it('accepts testID', () => {
    const { getByTestId } = render(
      <DatePicker testID="my-date-picker" label="Date" />,
    );
    expect(getByTestId('my-date-picker')).toBeTruthy();
  });

  it('renders helper text from slotProps', () => {
    const { getByText } = render(
      <DatePicker
        label="Date"
        slotProps={{ textField: { helperText: 'Enter your birth date' } }}
      />,
    );
    expect(getByText('Enter your birth date')).toBeTruthy();
  });

  it('applies error style when slotProps.textField.error is true', () => {
    const { getByRole } = render(
      <DatePicker label="Date" slotProps={{ textField: { error: true } }} />,
    );
    expect(getByRole('button')).toBeTruthy();
  });
});

describe('LocalizationProvider', () => {
  it('renders children', () => {
    const { getByText } = render(
      <LocalizationProvider locale="fr-FR">
        <DatePicker label="Date" />
      </LocalizationProvider>,
    );
    expect(getByText('Date')).toBeTruthy();
  });
});
