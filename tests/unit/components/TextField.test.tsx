/**
 * T025 — TextField unit tests.
 *
 * Covers: standard variant, multiline + rows, fullWidth, required (asterisk),
 * error state, helperText, select mode.
 */
import React from 'react';
import { AccessibilityInfo } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { TextField } from '../../../src/components/TextField';

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

describe('TextField — standard variant', () => {
  it('renders without crashing with variant=standard', () => {
    const { getByDisplayValue } = render(
      <Wrapper>
        <TextField label="Name" variant="standard" value="hello" />
      </Wrapper>,
    );
    expect(getByDisplayValue('hello')).toBeTruthy();
  });

  it('snapshot matches for standard variant', () => {
    const { toJSON } = render(
      <Wrapper>
        <TextField label="Email" variant="standard" value="" />
      </Wrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('TextField — filled and outlined variants', () => {
  it('renders filled variant', () => {
    const { getByDisplayValue } = render(
      <Wrapper>
        <TextField label="Filled" variant="filled" value="test" />
      </Wrapper>,
    );
    expect(getByDisplayValue('test')).toBeTruthy();
  });

  it('renders outlined variant', () => {
    const { getByDisplayValue } = render(
      <Wrapper>
        <TextField label="Outlined" variant="outlined" value="value" />
      </Wrapper>,
    );
    expect(getByDisplayValue('value')).toBeTruthy();
  });
});

describe('TextField — multiline + rows', () => {
  it('renders multiline TextInput when multiline=true', () => {
    const { getByTestId } = render(
      <Wrapper>
        <TextField label="Bio" multiline value="text" testID="bio-field" />
      </Wrapper>,
    );
    expect(getByTestId('bio-field')).toBeTruthy();
  });

  it('passes numberOfLines when rows is set', () => {
    const { getByTestId } = render(
      <Wrapper>
        <TextField label="Notes" multiline rows={4} value="" testID="notes-field" />
      </Wrapper>,
    );
    const input = getByTestId('notes-field');
    expect(input.props.numberOfLines).toBe(4);
  });
});

describe('TextField — fullWidth', () => {
  it('applies width:100% style to wrapper when fullWidth=true', () => {
    const { UNSAFE_root } = render(
      <Wrapper>
        <TextField label="Full" fullWidth value="" />
      </Wrapper>,
    );
    // Find any View that has width: '100%' in its style
    const allViews = UNSAFE_root.findAll((n: any) => n.type === 'View');
    const fullWidthView = allViews.find((v: any) => {
      const vs = v.props.style as any;
      if (!vs) return false;
      const flat: any[] = Array.isArray(vs) ? vs : [vs];
      return flat.some((s: any) => s && typeof s === 'object' && s.width === '100%');
    });
    expect(fullWidthView).toBeDefined();
  });
});

describe('TextField — required', () => {
  it('appends asterisk to label text when required=true', () => {
    const { getByText } = render(
      <Wrapper>
        <TextField label="Email" required value="" />
      </Wrapper>,
    );
    expect(getByText('Email *')).toBeTruthy();
  });

  it('does not append asterisk when required is not set', () => {
    const { getByText } = render(
      <Wrapper>
        <TextField label="Email" value="" />
      </Wrapper>,
    );
    expect(getByText('Email')).toBeTruthy();
  });
});

describe('TextField — error state', () => {
  it('renders boolean error flag without crashing', () => {
    const { toJSON } = render(
      <Wrapper>
        <TextField label="Field" error value="" />
      </Wrapper>,
    );
    expect(toJSON()).not.toBeNull();
  });

  it('renders error=string as helper text', () => {
    const { getByText } = render(
      <Wrapper>
        <TextField label="Field" error="Required field" value="" />
      </Wrapper>,
    );
    expect(getByText('Required field')).toBeTruthy();
  });

  it('helperText takes precedence over error string', () => {
    const { getByText, queryByText } = render(
      <Wrapper>
        <TextField label="Field" error="Error msg" helperText="Helper wins" value="" />
      </Wrapper>,
    );
    expect(getByText('Helper wins')).toBeTruthy();
    expect(queryByText('Error msg')).toBeNull();
  });
});

describe('TextField — onChangeText callback', () => {
  it('fires onChangeText when user types', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Wrapper>
        <TextField label="Field" value="" onChangeText={onChange} testID="tf" />
      </Wrapper>,
    );
    fireEvent.changeText(getByTestId('tf'), 'new value');
    expect(onChange).toHaveBeenCalledWith('new value');
  });
});

describe('TextField — select mode', () => {
  it('renders Select component when select=true', () => {
    const { toJSON } = render(
      <Wrapper>
        <TextField
          label="Country"
          select
          value="us"
          options={[
            { label: 'United States', value: 'us' },
            { label: 'Canada', value: 'ca' },
          ]}
        />
      </Wrapper>,
    );
    // Should not crash; tree should contain the select renderer
    expect(toJSON()).not.toBeNull();
  });
});
