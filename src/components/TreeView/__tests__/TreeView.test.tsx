import React from 'react';
import { AccessibilityInfo } from 'react-native';
import { fireEvent, render as rntlRender } from '@testing-library/react-native';
import { SimpleTreeView } from '../SimpleTreeView';
import { TreeItem } from '../TreeItem';
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

// ─── Fixtures ──────────────────────────────────────────────────────────────────

function BasicTree() {
  return (
    <SimpleTreeView testID="tree">
      <TreeItem itemId="a" label="Parent A" testID="item-a">
        <TreeItem itemId="a1" label="Child A1" testID="item-a1" />
        <TreeItem itemId="a2" label="Child A2" testID="item-a2" />
      </TreeItem>
      <TreeItem itemId="b" label="Parent B" testID="item-b">
        <TreeItem itemId="b1" label="Child B1" testID="item-b1" />
      </TreeItem>
      <TreeItem itemId="c" label="Leaf C" testID="item-c" />
    </SimpleTreeView>
  );
}

// ─── Rendering tests ─────────────────────────────────────────────────────────

describe('SimpleTreeView — rendering', () => {
  it('renders the tree root with accessibilityRole=list', () => {
    const { getByTestId } = render(<BasicTree />);
    // ScrollView exposes accessibilityRole but RNTL getByRole doesn't traverse RCTScrollView;
    // verify via testID prop instead.
    expect(getByTestId('tree').props.accessibilityRole).toBe('list');
  });

  it('renders all top-level items', () => {
    const { getByLabelText } = render(<BasicTree />);
    expect(getByLabelText('Parent A')).toBeTruthy();
    expect(getByLabelText('Parent B')).toBeTruthy();
    expect(getByLabelText('Leaf C')).toBeTruthy();
  });

  it('parent items have accessibilityState.expanded=false initially', () => {
    const { getByLabelText } = render(<BasicTree />);
    const parentA = getByLabelText('Parent A');
    expect(parentA.props.accessibilityState?.expanded).toBe(false);
  });

  it('leaf items do not have expanded in accessibilityState', () => {
    const { getByLabelText } = render(<BasicTree />);
    const leaf = getByLabelText('Leaf C');
    expect(leaf.props.accessibilityState?.expanded).toBeUndefined();
  });
});

// ─── Expand / collapse ────────────────────────────────────────────────────────

describe('SimpleTreeView — expand/collapse', () => {
  it('toggling a parent updates accessibilityState.expanded to true', () => {
    const { getByLabelText } = render(<BasicTree />);
    const parentA = getByLabelText('Parent A');
    fireEvent.press(parentA);
    expect(getByLabelText('Parent A').props.accessibilityState?.expanded).toBe(true);
  });

  it('pressing again collapses the parent', () => {
    const { getByLabelText } = render(<BasicTree />);
    const parentA = getByLabelText('Parent A');
    fireEvent.press(parentA);
    fireEvent.press(getByLabelText('Parent A'));
    expect(getByLabelText('Parent A').props.accessibilityState?.expanded).toBe(false);
  });

  it('fires onExpandedItemsChange with updated IDs', () => {
    const onExpand = jest.fn();
    const { getByLabelText } = render(
      <SimpleTreeView onExpandedItemsChange={onExpand}>
        <TreeItem itemId="x" label="X">
          <TreeItem itemId="x1" label="X1" />
        </TreeItem>
      </SimpleTreeView>,
    );
    fireEvent.press(getByLabelText('X'));
    expect(onExpand).toHaveBeenCalledWith(['x']);
  });

  it('defaultExpandedItems pre-expands items', () => {
    const { getByLabelText } = render(
      <SimpleTreeView defaultExpandedItems={['a']}>
        <TreeItem itemId="a" label="A">
          <TreeItem itemId="a1" label="A1" />
        </TreeItem>
      </SimpleTreeView>,
    );
    expect(getByLabelText('A').props.accessibilityState?.expanded).toBe(true);
  });
});

// ─── Selection ───────────────────────────────────────────────────────────────

describe('SimpleTreeView — selection', () => {
  it('pressing a leaf selects it', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <SimpleTreeView onSelectedItemsChange={onSelect}>
        <TreeItem itemId="leaf" label="Leaf" />
      </SimpleTreeView>,
    );
    fireEvent.press(getByLabelText('Leaf'));
    expect(onSelect).toHaveBeenCalledWith(['leaf']);
  });

  it('single-select mode clears previous selection', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <SimpleTreeView multiSelect={false} onSelectedItemsChange={onSelect}>
        <TreeItem itemId="l1" label="L1" />
        <TreeItem itemId="l2" label="L2" />
      </SimpleTreeView>,
    );
    fireEvent.press(getByLabelText('L1'));
    fireEvent.press(getByLabelText('L2'));
    // Last call should contain only L2
    const lastCall = onSelect.mock.calls[onSelect.mock.calls.length - 1][0];
    expect(lastCall).toEqual(['l2']);
  });

  it('multiSelect mode accumulates selected items', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <SimpleTreeView multiSelect onSelectedItemsChange={onSelect}>
        <TreeItem itemId="l1" label="L1" />
        <TreeItem itemId="l2" label="L2" />
      </SimpleTreeView>,
    );
    fireEvent.press(getByLabelText('L1'));
    fireEvent.press(getByLabelText('L2'));
    const lastCall = onSelect.mock.calls[onSelect.mock.calls.length - 1][0];
    expect(lastCall).toContain('l1');
    expect(lastCall).toContain('l2');
  });
});

// ─── Disabled items ───────────────────────────────────────────────────────────

describe('SimpleTreeView — disabled items', () => {
  it('disabled item has accessibilityState.disabled=true', () => {
    const { getByLabelText } = render(
      <SimpleTreeView disabledItems={['dis']}>
        <TreeItem itemId="dis" label="Disabled" />
      </SimpleTreeView>,
    );
    expect(getByLabelText('Disabled').props.accessibilityState?.disabled).toBe(true);
  });

  it('pressing a disabled item does not call onSelectedItemsChange', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <SimpleTreeView disabledItems={['dis']} onSelectedItemsChange={onSelect}>
        <TreeItem itemId="dis" label="Disabled" />
      </SimpleTreeView>,
    );
    fireEvent.press(getByLabelText('Disabled'));
    expect(onSelect).not.toHaveBeenCalled();
  });
});
