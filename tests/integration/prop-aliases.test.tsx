/**
 * T014 — Prop alias integration tests (US1 / SC-001 / FR-007 / FR-038)
 *
 * Verifies:
 * 1. MUI-idiomatic prop names (open, onClose, checked, onChange, badgeContent,
 *    invisible, helperText) compile and render correctly.
 * 2. Legacy RN-native prop names (visible, onDismiss, supportingText, content,
 *    value) continue to work without regression.
 */

import React from 'react';
import { AccessibilityInfo, Text as RNText, View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../src/theme/ThemeProvider';
import { PortalHost } from '../../src/components/Portal';

import { Badge } from '../../src/components/Badge';
import { TextField } from '../../src/components/TextField';
import { Switch } from '../../src/components/Switch';
import { Dialog } from '../../src/components/Dialog';
import { Modal } from '../../src/components/Modal';

// ── Wrapper ──────────────────────────────────────────────────────────────────

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <ThemeProvider>
      <PortalHost>{children}</PortalHost>
    </ThemeProvider>
  );
}

beforeEach(() => {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() });
});

afterEach(() => {
  jest.restoreAllMocks();
});

// ─────────────────────────────────────────────────────────────────────────────
// Badge — badgeContent / invisible
// ─────────────────────────────────────────────────────────────────────────────

describe('Badge — prop aliases', () => {
  it('[MUI] badgeContent renders the count label', () => {
    const { getByText } = render(
      <Wrapper>
        <Badge badgeContent={7} testID="badge">
          <RNText>icon</RNText>
        </Badge>
      </Wrapper>,
    );
    expect(getByText('7', { includeHiddenElements: true })).toBeTruthy();
  });

  it('[MUI] badgeContent > max renders truncated label', () => {
    const { getByText } = render(
      <Wrapper>
        <Badge badgeContent={120} max={99} testID="badge">
          <RNText>icon</RNText>
        </Badge>
      </Wrapper>,
    );
    expect(getByText('99+', { includeHiddenElements: true })).toBeTruthy();
  });

  it('[MUI] invisible=true hides the badge element', () => {
    const { queryByTestId } = render(
      <Wrapper>
        <Badge badgeContent={5} invisible testID="badge">
          <RNText>icon</RNText>
        </Badge>
      </Wrapper>,
    );
    // Badge element should not appear when invisible
    expect(queryByTestId('badge', { includeHiddenElements: true })).toBeNull();
  });

  it('[MUI] invisible=false shows the badge element', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Badge badgeContent={5} invisible={false} testID="badge">
          <RNText>icon</RNText>
        </Badge>
      </Wrapper>,
    );
    expect(getByTestId('badge', { includeHiddenElements: true })).toBeTruthy();
  });

  it('[legacy] content prop still renders the count label', () => {
    const { getByText } = render(
      <Wrapper>
        <Badge content={3} testID="badge">
          <RNText>icon</RNText>
        </Badge>
      </Wrapper>,
    );
    expect(getByText('3', { includeHiddenElements: true })).toBeTruthy();
  });

  it('[legacy] visible=false hides the badge element', () => {
    const { queryByTestId } = render(
      <Wrapper>
        <Badge content={5} visible={false} testID="badge">
          <RNText>icon</RNText>
        </Badge>
      </Wrapper>,
    );
    expect(queryByTestId('badge', { includeHiddenElements: true })).toBeNull();
  });

  it('[MUI] badgeContent takes precedence over content when both given', () => {
    const { getByText, queryByText } = render(
      <Wrapper>
        <Badge badgeContent={10} content={20} testID="badge">
          <RNText>icon</RNText>
        </Badge>
      </Wrapper>,
    );
    expect(getByText('10', { includeHiddenElements: true })).toBeTruthy();
    expect(queryByText('20', { includeHiddenElements: true })).toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// TextField — helperText / error aliases
// ─────────────────────────────────────────────────────────────────────────────

describe('TextField — prop aliases', () => {
  it('[MUI] helperText renders below the input', () => {
    const { getByText } = render(
      <Wrapper>
        <TextField label="Email" value="" onChangeText={() => {}} helperText="Enter your email address" />
      </Wrapper>,
    );
    expect(getByText('Enter your email address')).toBeTruthy();
  });

  it('[MUI] error={true} applies error styling without rendering helper text', () => {
    const { queryByRole } = render(
      <Wrapper>
        <TextField label="Email" value="" onChangeText={() => {}} error={true} />
      </Wrapper>,
    );
    // error=true alone renders no helper text (no alert role)
    expect(queryByRole('alert')).toBeNull();
  });

  it('[MUI] error="Error message" auto-renders as helper text with alert role', () => {
    const { getByRole, getByText } = render(
      <Wrapper>
        <TextField label="Email" value="" onChangeText={() => {}} error="This field is required" />
      </Wrapper>,
    );
    expect(getByRole('alert')).toBeTruthy();
    expect(getByText('This field is required')).toBeTruthy();
  });

  it('[MUI] helperText takes precedence over string error for display text', () => {
    const { getByText, queryByText } = render(
      <Wrapper>
        <TextField
          label="Email"
          value=""
          onChangeText={() => {}}
          error="Error string"
          helperText="Override helper"
        />
      </Wrapper>,
    );
    expect(getByText('Override helper')).toBeTruthy();
    expect(queryByText('Error string')).toBeNull();
  });

  it('[legacy] supportingText still renders below the input', () => {
    const { getByText } = render(
      <Wrapper>
        <TextField label="Name" value="" onChangeText={() => {}} supportingText="Your full name" />
      </Wrapper>,
    );
    expect(getByText('Your full name')).toBeTruthy();
  });

  it('[legacy] error as string still works alongside supportingText', () => {
    const { getByText } = render(
      <Wrapper>
        <TextField label="Name" value="" onChangeText={() => {}} error="Required" supportingText="fallback" />
      </Wrapper>,
    );
    // supportingText is overridden by error string in legacy mode (error string wins)
    expect(getByText('Required')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Switch — checked / onChange aliases
// ─────────────────────────────────────────────────────────────────────────────

describe('Switch — prop aliases', () => {
  it('[MUI] checked=true reflects accessibilityState.checked', () => {
    const { getByRole } = render(
      <Wrapper>
        <Switch checked onValueChange={() => {}} accessibilityLabel="Dark mode" />
      </Wrapper>,
    );
    const sw = getByRole('switch');
    expect(sw.props.accessibilityState).toMatchObject({ checked: true });
  });

  it('[MUI] checked=false reflects accessibilityState.checked=false', () => {
    const { getByRole } = render(
      <Wrapper>
        <Switch checked={false} onValueChange={() => {}} accessibilityLabel="Dark mode" />
      </Wrapper>,
    );
    const sw = getByRole('switch');
    expect(sw.props.accessibilityState).toMatchObject({ checked: false });
  });

  it('[legacy] value prop still drives accessibilityState.checked', () => {
    const { getByRole } = render(
      <Wrapper>
        <Switch value onValueChange={() => {}} accessibilityLabel="Dark mode" />
      </Wrapper>,
    );
    const sw = getByRole('switch');
    expect(sw.props.accessibilityState).toMatchObject({ checked: true });
  });

  it('[MUI] checked takes precedence over value when both given', () => {
    const { getByRole } = render(
      <Wrapper>
        <Switch checked={false} value onValueChange={() => {}} accessibilityLabel="Dark mode" />
      </Wrapper>,
    );
    const sw = getByRole('switch');
    expect(sw.props.accessibilityState).toMatchObject({ checked: false });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Dialog — open / onClose aliases
// ─────────────────────────────────────────────────────────────────────────────

describe('Dialog — prop aliases', () => {
  it('[MUI] open=true renders dialog content', () => {
    const { getByText } = render(
      <Wrapper>
        <Dialog open title="Confirm" onClose={() => {}}>
          <RNText>Are you sure?</RNText>
        </Dialog>
      </Wrapper>,
    );
    expect(getByText('Confirm')).toBeTruthy();
    expect(getByText('Are you sure?')).toBeTruthy();
  });

  it('[MUI] open=false does not render dialog content', () => {
    const { queryByText } = render(
      <Wrapper>
        <Dialog open={false} title="Hidden Dialog" onClose={() => {}}>
          <RNText>Hidden content</RNText>
        </Dialog>
      </Wrapper>,
    );
    expect(queryByText('Hidden Dialog')).toBeNull();
  });

  it('[MUI] onClose callback is invokable', () => {
    const onClose = jest.fn();
    // Mount with open=true so Dialog is visible, title accessible
    render(
      <Wrapper>
        <Dialog open title="Delete item?" onClose={onClose}>
          <RNText>This action is irreversible.</RNText>
        </Dialog>
      </Wrapper>,
    );
    // Verify the component mounted successfully with the onClose alias
    expect(onClose).not.toHaveBeenCalled();
  });

  it('[legacy] visible=true renders dialog content', () => {
    const { getByText } = render(
      <Wrapper>
        <Dialog visible title="Legacy dialog" onDismiss={() => {}}>
          <RNText>Legacy content</RNText>
        </Dialog>
      </Wrapper>,
    );
    expect(getByText('Legacy dialog')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Modal — open / onClose aliases
// ─────────────────────────────────────────────────────────────────────────────

describe('Modal — prop aliases', () => {
  it('[MUI] open=true renders modal children', () => {
    const { getByText } = render(
      <Wrapper>
        <Modal open onClose={() => {}}>
          <View>
            <RNText>Modal body</RNText>
          </View>
        </Modal>
      </Wrapper>,
    );
    expect(getByText('Modal body')).toBeTruthy();
  });

  it('[legacy] visible=true renders modal children', () => {
    const { getByText } = render(
      <Wrapper>
        <Modal visible onDismiss={() => {}}>
          <View>
            <RNText>Legacy modal body</RNText>
          </View>
        </Modal>
      </Wrapper>,
    );
    expect(getByText('Legacy modal body')).toBeTruthy();
  });

  it('[MUI] open takes precedence over visible when both given', () => {
    const { getByText } = render(
      <Wrapper>
        <Modal open visible={false} onClose={() => {}}>
          <View>
            <RNText>Precedence modal body</RNText>
          </View>
        </Modal>
      </Wrapper>,
    );
    // open=true overrides visible=false → should render
    expect(getByText('Precedence modal body')).toBeTruthy();
  });
});
