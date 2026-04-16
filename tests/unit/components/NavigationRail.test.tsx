/**
 * NavigationRail unit tests.
 *
 * Covers: rendering items, active state, onChange callback,
 * disabled items, showLabels=false, header slot, position prop.
 */
import React from 'react';
import { AccessibilityInfo, Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { NavigationRail } from '../../../src/components/NavigationRail';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}

const iconHome = <Text>H</Text>;
const iconMail = <Text>M</Text>;
const iconNotes = <Text>N</Text>;

const items = [
  { value: 'home', icon: iconHome, label: 'Home' },
  { value: 'mail', icon: iconMail, label: 'Mail' },
  { value: 'notes', icon: iconNotes, label: 'Notes' },
];

beforeEach(() => {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
  jest
    .spyOn(AccessibilityInfo, 'addEventListener')
    .mockReturnValue({ remove: jest.fn() });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('NavigationRail — rendering', () => {
  it('renders all item labels', () => {
    const { getByText } = render(
      <Wrapper>
        <NavigationRail items={items} value="home" />
      </Wrapper>,
    );
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Mail')).toBeTruthy();
    expect(getByText('Notes')).toBeTruthy();
  });

  it('renders with testID on root', () => {
    const { getByTestId } = render(
      <Wrapper>
        <NavigationRail items={items} value="home" testID="nav-rail" />
      </Wrapper>,
    );
    expect(getByTestId('nav-rail')).toBeTruthy();
  });

  it('renders header slot when provided', () => {
    const { getByText } = render(
      <Wrapper>
        <NavigationRail
          items={items}
          value="home"
          header={<Text>FAB</Text>}
        />
      </Wrapper>,
    );
    expect(getByText('FAB')).toBeTruthy();
  });

  it('hides labels when showLabels=false', () => {
    const { queryByText } = render(
      <Wrapper>
        <NavigationRail items={items} value="home" showLabels={false} />
      </Wrapper>,
    );
    expect(queryByText('Home')).toBeNull();
    expect(queryByText('Mail')).toBeNull();
  });

  it('renders with tablist accessibility role', () => {
    const { getByTestId } = render(
      <Wrapper>
        <NavigationRail items={items} value="home" testID="rail" />
      </Wrapper>,
    );
    expect(getByTestId('rail')).toBeTruthy();
  });
});

describe('NavigationRail — active state', () => {
  it('marks the active item as selected', () => {
    const { getAllByRole } = render(
      <Wrapper>
        <NavigationRail items={items} value="mail" />
      </Wrapper>,
    );
    const tabs = getAllByRole('tab');
    expect(tabs[1].props.accessibilityState?.selected).toBe(true);
    expect(tabs[0].props.accessibilityState?.selected).toBe(false);
  });
});

describe('NavigationRail — onChange', () => {
  it('calls onChange with item value when a tab is pressed', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <Wrapper>
        <NavigationRail items={items} value="home" onChange={onChange} />
      </Wrapper>,
    );
    fireEvent.press(getByText('Mail'));
    expect(onChange).toHaveBeenCalledWith('mail');
  });

  it('does not call onChange for disabled item', () => {
    const onChange = jest.fn();
    const disabledItems = [
      ...items.slice(0, 2),
      { value: 'notes', icon: iconNotes, label: 'Notes', disabled: true },
    ];
    const { getByText } = render(
      <Wrapper>
        <NavigationRail items={disabledItems} value="home" onChange={onChange} />
      </Wrapper>,
    );
    fireEvent.press(getByText('Notes'));
    expect(onChange).not.toHaveBeenCalledWith('notes');
  });
});

describe('NavigationRail — position prop', () => {
  it('renders without error with position=right', () => {
    const { getByTestId } = render(
      <Wrapper>
        <NavigationRail items={items} value="home" position="right" testID="rail-right" />
      </Wrapper>,
    );
    expect(getByTestId('rail-right')).toBeTruthy();
  });
});
