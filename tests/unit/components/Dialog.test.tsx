/**
 * T053 — Dialog unit tests.
 *
 * SC-005: open/onClose aliases, onClose reason codes, fullScreen styles,
 * sub-components inside Dialog, dividers on DialogContent.
 */
import React from 'react';
import { AccessibilityInfo } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { Dialog } from '../../../src/components/Dialog/Dialog';
import { DialogTitle } from '../../../src/components/Dialog/DialogTitle';
import { DialogContent } from '../../../src/components/Dialog/DialogContent';
import { DialogContentText } from '../../../src/components/Dialog/DialogContentText';
import { DialogActions } from '../../../src/components/Dialog/DialogActions';

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

describe('Dialog — open/visible aliases', () => {
  it('renders when visible=true', () => {
    const { getByText } = render(
      <Wrapper>
        <Dialog visible title="Test dialog" testID="dialog" />
      </Wrapper>,
    );
    expect(getByText('Test dialog')).toBeTruthy();
  });

  it('renders when open=true (MUI alias)', () => {
    const { getByText } = render(
      <Wrapper>
        <Dialog visible={false} open title="MUI Open dialog" testID="dialog-open" />
      </Wrapper>,
    );
    expect(getByText('MUI Open dialog')).toBeTruthy();
  });

  it('open prop takes precedence over visible=false', () => {
    const { getByText } = render(
      <Wrapper>
        <Dialog visible={false} open={true} title="Precedence test" />
      </Wrapper>,
    );
    expect(getByText('Precedence test')).toBeTruthy();
  });

  it('does not render content when visible=false and open=false', () => {
    const { queryByText } = render(
      <Wrapper>
        <Dialog visible={false} open={false} title="Hidden dialog" />
      </Wrapper>,
    );
    expect(queryByText('Hidden dialog')).toBeNull();
  });
});

describe('Dialog — onClose reason codes', () => {
  it('calls onClose with "backdropPress" reason when backdrop is pressed', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <Wrapper>
        <Dialog visible title="Backdrop test" onClose={onClose} testID="dlg-backdrop" />
      </Wrapper>,
    );
    // The backdrop is the outermost touchable; testID suffixed with "-backdrop"
    const backdrop = getByTestId('dlg-backdrop-backdrop');
    fireEvent.press(backdrop);
    expect(onClose).toHaveBeenCalledWith('backdropPress');
  });
});

describe('Dialog — fullScreen prop', () => {
  it('renders without crashing with fullScreen=true', () => {
    const { toJSON } = render(
      <Wrapper>
        <Dialog visible title="Fullscreen" fullScreen testID="dlg-fs" />
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('snapshot: fullScreen dialog', () => {
    const { toJSON } = render(
      <Wrapper>
        <Dialog visible title="Fullscreen dialog" fullScreen />
      </Wrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('Dialog — sub-components render', () => {
  it('renders DialogTitle inside Dialog', () => {
    const { getByText } = render(
      <Wrapper>
        <Dialog visible title="" testID="dlg-sub">
          <DialogTitle>Custom Title</DialogTitle>
        </Dialog>
      </Wrapper>,
    );
    expect(getByText('Custom Title')).toBeTruthy();
  });

  it('renders DialogContent inside Dialog', () => {
    const { getByText } = render(
      <Wrapper>
        <Dialog visible title="" testID="dlg-content">
          <DialogContent>
            <DialogContentText>Body text here</DialogContentText>
          </DialogContent>
        </Dialog>
      </Wrapper>,
    );
    expect(getByText('Body text here')).toBeTruthy();
  });

  it('renders DialogActions inside Dialog', () => {
    const { getByText } = render(
      <Wrapper>
        <Dialog visible title="">
          <DialogActions>
            <></>
          </DialogActions>
        </Dialog>
      </Wrapper>,
    );
    // Just verify it renders without crash
    expect(true).toBe(true);
  });

  it('renders full Dialog composition without crash', () => {
    const { getByText } = render(
      <Wrapper>
        <Dialog visible title="">
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>This action cannot be undone.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <></>
          </DialogActions>
        </Dialog>
      </Wrapper>,
    );
    expect(getByText('Are you sure?')).toBeTruthy();
    expect(getByText('This action cannot be undone.')).toBeTruthy();
  });
});

describe('Dialog — DialogContent dividers', () => {
  it('renders without crash when dividers=true', () => {
    const { toJSON } = render(
      <Wrapper>
        <Dialog visible title="">
          <DialogContent dividers>
            <DialogContentText>Content with dividers</DialogContentText>
          </DialogContent>
        </Dialog>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('snapshot: DialogContent with dividers', () => {
    const { toJSON } = render(
      <Wrapper>
        <Dialog visible title="">
          <DialogContent dividers testID="dc-dividers">
            <DialogContentText>Content</DialogContentText>
          </DialogContent>
        </Dialog>
      </Wrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('Dialog — scroll variants', () => {
  it('renders with scroll="paper" without crash', () => {
    const { toJSON } = render(
      <Wrapper>
        <Dialog visible title="Paper scroll" scroll="paper" />
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with scroll="body" without crash', () => {
    const { toJSON } = render(
      <Wrapper>
        <Dialog visible title="Body scroll" scroll="body" />
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });
});
