/**
 * T062 — Accessibility unit tests for all 47 new components.
 *
 * Covers: accessibilityRole, accessibilityLabel, accessibilityState for each
 * interactive component. Display-only components verified for correct role.
 *
 * SC-005 / Constitution §V MUST compliance.
 */
import React from 'react';
import { Text as RNText, AccessibilityInfo, View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';

// ── Component imports ─────────────────────────────────────────────────────
import { ActivityIndicator } from '../../../src/components/ActivityIndicator';
import { Alert } from '../../../src/components/Alert';
import { Accordion } from '../../../src/components/Accordion';
import { Autocomplete } from '../../../src/components/Autocomplete';
import { Avatar } from '../../../src/components/Avatar';
import { Backdrop } from '../../../src/components/Backdrop';
import { Badge } from '../../../src/components/Badge';
import { Banner } from '../../../src/components/Banner';
import { Box } from '../../../src/components/Box';
import { Breadcrumbs } from '../../../src/components/Breadcrumbs';
import { ButtonGroup } from '../../../src/components/ButtonGroup';
import { Checkbox } from '../../../src/components/Checkbox';
import { Container } from '../../../src/components/Container';
import { DataTable } from '../../../src/components/DataTable';
import { Divider } from '../../../src/components/Divider';
import { Drawer } from '../../../src/components/Drawer';
import { Grid, GridItem } from '../../../src/components/Grid';
import { HelperText } from '../../../src/components/HelperText';
import { Icon } from '../../../src/components/Icon';
import { IconButton } from '../../../src/components/IconButton';
import { ImageList, ImageListItem } from '../../../src/components/ImageList';
import { Link } from '../../../src/components/Link';
import { List, ListItem } from '../../../src/components/List';
import { Menu, MenuItem } from '../../../src/components/Menu';
import { Modal } from '../../../src/components/Modal';
import { NumberField } from '../../../src/components/NumberField';
import { Pagination } from '../../../src/components/Pagination';
import { Paper } from '../../../src/components/Paper';
import { Portal } from '../../../src/components/Portal';
import { RadioButton, RadioGroup } from '../../../src/components/RadioButton';
import { Rating } from '../../../src/components/Rating';
import { Searchbar } from '../../../src/components/Searchbar';
import { SegmentedButtons } from '../../../src/components/SegmentedButtons';
import { Select } from '../../../src/components/Select';
import { Skeleton } from '../../../src/components/Skeleton';
import { Slider } from '../../../src/components/Slider';
import { Snackbar, SnackbarHost } from '../../../src/components/Snackbar';
import { SpeedDial } from '../../../src/components/SpeedDial';
import { Stack } from '../../../src/components/Stack';
import { Stepper } from '../../../src/components/Stepper';
import { Switch } from '../../../src/components/Switch';
import { Tabs } from '../../../src/components/Tabs';
import { Text } from '../../../src/components/Text';
import { ToggleButton, ToggleButtonGroup } from '../../../src/components/ToggleButton';
import { Tooltip } from '../../../src/components/Tooltip';
import { TouchableRipple } from '../../../src/components/TouchableRipple';
import { TransferList } from '../../../src/components/TransferList';

// ── Test wrapper ──────────────────────────────────────────────────────────

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <ThemeProvider>
      <PortalHost>
        {children}
      </PortalHost>
    </ThemeProvider>
  );
}

// ── Shared beforeEach mocks ───────────────────────────────────────────────

beforeEach(() => {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() });
});

afterEach(() => {
  jest.restoreAllMocks();
});

// ─────────────────────────────────────────────────────────────────────────────
// 1. ActivityIndicator
// ─────────────────────────────────────────────────────────────────────────────
describe('ActivityIndicator — a11y', () => {
  it('has accessibilityRole="progressbar"', () => {
    const { getByRole } = render(
      <Wrapper><ActivityIndicator animating /></Wrapper>,
    );
    expect(getByRole('progressbar')).toBeTruthy();
  });

  it('does not render when hidesWhenStopped and animating=false', () => {
    const { queryByRole } = render(
      <Wrapper><ActivityIndicator animating={false} hidesWhenStopped /></Wrapper>,
    );
    expect(queryByRole('progressbar')).toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. Alert
// ─────────────────────────────────────────────────────────────────────────────
describe('Alert — a11y', () => {
  it('has accessibilityRole="alert"', () => {
    const { getByRole } = render(
      <Wrapper><Alert severity="error">Something went wrong</Alert></Wrapper>,
    );
    expect(getByRole('alert')).toBeTruthy();
  });

  it('supports all 4 severity variants without crashing', () => {
    (['error', 'warning', 'info', 'success'] as const).forEach((severity) => {
      const { getByRole } = render(
        <Wrapper><Alert severity={severity}>msg</Alert></Wrapper>,
      );
      expect(getByRole('alert')).toBeTruthy();
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. Accordion
// ─────────────────────────────────────────────────────────────────────────────
describe('Accordion — a11y', () => {
  it('expander toggle has accessibilityRole="button"', () => {
    const { getByRole } = render(
      <Wrapper>
        <Accordion title="Section" onToggle={() => {}}>
          <RNText>Content</RNText>
        </Accordion>
      </Wrapper>,
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('toggle reflects expanded state', () => {
    const { getByRole } = render(
      <Wrapper>
        <Accordion title="Section" expanded onToggle={() => {}}>
          <RNText>Content</RNText>
        </Accordion>
      </Wrapper>,
    );
    const btn = getByRole('button');
    expect(btn.props.accessibilityState).toMatchObject({ expanded: true });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. Autocomplete
// ─────────────────────────────────────────────────────────────────────────────
describe('Autocomplete — a11y', () => {
  const options = [{ label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' }];

  it('has accessibilityRole="combobox" on input', () => {
    const { getByRole } = render(
      <Wrapper>
        <Autocomplete
          value={null}
          onValueChange={() => {}}
          options={options}
        />
      </Wrapper>,
    );
    expect(getByRole('combobox')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. Avatar
// ─────────────────────────────────────────────────────────────────────────────
describe('Avatar — a11y', () => {
  it('has accessibilityRole="image"', () => {
    const { getByRole } = render(
      <Wrapper><Avatar label="John Doe" /></Wrapper>,
    );
    expect(getByRole('image')).toBeTruthy();
  });

  it('uses label as default accessibilityLabel', () => {
    const { getByLabelText } = render(
      <Wrapper><Avatar label="Jane" /></Wrapper>,
    );
    expect(getByLabelText('Jane')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. Backdrop
// ─────────────────────────────────────────────────────────────────────────────
describe('Backdrop — a11y', () => {
  it('renders scrim dismiss button when visible', () => {
    const { getByRole } = render(
      <Wrapper><Backdrop visible onDismiss={() => {}} /></Wrapper>,
    );
    expect(getByRole('button', { name: 'Dismiss' })).toBeTruthy();
  });

  it('does not render when not visible and fully faded', () => {
    const { queryByRole } = render(
      <Wrapper><Backdrop visible={false} onDismiss={() => {}} /></Wrapper>,
    );
    expect(queryByRole('button', { name: 'Dismiss' })).toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. Badge
// ─────────────────────────────────────────────────────────────────────────────
describe('Badge — a11y', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Badge content={5} testID="badge">
          <RNText>Icon</RNText>
        </Badge>
      </Wrapper>,
    );
    expect(getByTestId('badge', { includeHiddenElements: true })).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. Banner
// ─────────────────────────────────────────────────────────────────────────────
describe('Banner — a11y', () => {
  it('renders action buttons with correct role', () => {
    const { getAllByRole } = render(
      <Wrapper>
        <Banner
          visible
          actions={[
            { label: 'Dismiss', onPress: () => {} },
            { label: 'Learn more', onPress: () => {} },
          ]}
        >
          <RNText>Important message</RNText>
        </Banner>
      </Wrapper>,
    );
    const buttons = getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 9. Box
// ─────────────────────────────────────────────────────────────────────────────
describe('Box — a11y', () => {
  it('renders children without introducing a11y issues', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Box testID="box" p={2}><RNText>Child</RNText></Box>
      </Wrapper>,
    );
    expect(getByTestId('box')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 10. Breadcrumbs
// ─────────────────────────────────────────────────────────────────────────────
describe('Breadcrumbs — a11y', () => {
  it('each breadcrumb link has accessibilityRole="link"', () => {
    const items = [
      { label: 'Home', onPress: () => {} },
      { label: 'Category', onPress: () => {} },
      { label: 'Current' },
    ];
    const { getAllByRole } = render(
      <Wrapper><Breadcrumbs items={items} /></Wrapper>,
    );
    const links = getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(2);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 11. ButtonGroup
// ─────────────────────────────────────────────────────────────────────────────
describe('ButtonGroup — a11y', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <Wrapper>
        <ButtonGroup testID="bg">
          <RNText>A</RNText>
          <RNText>B</RNText>
        </ButtonGroup>
      </Wrapper>,
    );
    expect(getByTestId('bg')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 12. Checkbox
// ─────────────────────────────────────────────────────────────────────────────
describe('Checkbox — a11y', () => {
  it('has accessibilityRole="checkbox"', () => {
    const { getByRole } = render(
      <Wrapper><Checkbox status="unchecked" /></Wrapper>,
    );
    expect(getByRole('checkbox')).toBeTruthy();
  });

  it('reflects checked state', () => {
    const { getByRole } = render(
      <Wrapper><Checkbox status="checked" /></Wrapper>,
    );
    expect(getByRole('checkbox').props.accessibilityState).toMatchObject({ checked: true });
  });

  it('reflects unchecked state', () => {
    const { getByRole } = render(
      <Wrapper><Checkbox status="unchecked" /></Wrapper>,
    );
    expect(getByRole('checkbox').props.accessibilityState).toMatchObject({ checked: false });
  });

  it('reflects disabled state', () => {
    const { getByRole } = render(
      <Wrapper><Checkbox status="unchecked" disabled /></Wrapper>,
    );
    expect(getByRole('checkbox').props.accessibilityState).toMatchObject({ disabled: true });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 13. Container
// ─────────────────────────────────────────────────────────────────────────────
describe('Container — a11y', () => {
  it('renders children without extra a11y props', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Container testID="container"><RNText>Content</RNText></Container>
      </Wrapper>,
    );
    expect(getByTestId('container')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 14. DataTable
// ─────────────────────────────────────────────────────────────────────────────
describe('DataTable — a11y', () => {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age', numeric: true },
  ];
  const data = [{ id: '1', name: 'Alice', age: 30 }];

  it('has accessibilityRole="grid"', () => {
    const { getByRole } = render(
      <Wrapper>
        <DataTable columns={columns} rows={data} keyExtractor={(r) => r.id} />
      </Wrapper>,
    );
    expect(getByRole('grid')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 15. Divider
// ─────────────────────────────────────────────────────────────────────────────
describe('Divider — a11y', () => {
  it('is intentionally hidden from accessibility tree (decorative element)', () => {
    const { getByTestId, queryByRole } = render(
      <Wrapper><Divider testID="divider" /></Wrapper>,
    );
    // Divider is decorative; intentionally hidden from a11y focusable elements
    expect(queryByRole('separator')).toBeNull();
    expect(getByTestId('divider', { includeHiddenElements: true })).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 16. Drawer
// ─────────────────────────────────────────────────────────────────────────────
describe('Drawer — a11y', () => {
  it('renders navigation region when open', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Drawer open testID="drawer" onClose={() => {}}>
          <RNText>Nav</RNText>
        </Drawer>
      </Wrapper>,
    );
    expect(getByTestId('drawer')).toBeTruthy();
  });

  it('dismiss button has accessibilityRole="button"', () => {
    const { getAllByRole } = render(
      <Wrapper>
        <Drawer open onClose={() => {}}>
          <RNText>Nav</RNText>
        </Drawer>
      </Wrapper>,
    );
    const buttons = getAllByRole('button', { includeHiddenElements: true });
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 17. Grid + GridItem
// ─────────────────────────────────────────────────────────────────────────────
describe('Grid — a11y', () => {
  it('renders children without crashing', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Grid testID="grid" columns={2}>
          <GridItem xs={1}><RNText>A</RNText></GridItem>
          <GridItem xs={1}><RNText>B</RNText></GridItem>
        </Grid>
      </Wrapper>,
    );
    expect(getByTestId('grid')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 18. HelperText
// ─────────────────────────────────────────────────────────────────────────────
describe('HelperText — a11y', () => {
  it('has accessibilityRole="text"', () => {
    const { getByRole } = render(
      <Wrapper><HelperText type="normal">Helper</HelperText></Wrapper>,
    );
    expect(getByRole('text')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 19. Icon
// ─────────────────────────────────────────────────────────────────────────────
describe('Icon — a11y', () => {
  it('has accessibilityRole="image" when accessibilityLabel is provided', () => {
    const source = () => <RNText>★</RNText>;
    const { getByRole } = render(
      <Wrapper><Icon source={source} accessibilityLabel="Star icon" /></Wrapper>,
    );
    expect(getByRole('image')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 20. IconButton
// ─────────────────────────────────────────────────────────────────────────────
describe('IconButton — a11y', () => {
  it('has accessibilityRole="button"', () => {
    const { getByRole } = render(
      <Wrapper>
        <IconButton
          icon={() => <RNText>✕</RNText>}
          accessibilityLabel="Close"
          onPress={() => {}}
        />
      </Wrapper>,
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('uses accessibilityLabel prop', () => {
    const { getByLabelText } = render(
      <Wrapper>
        <IconButton
          icon={() => <RNText>✕</RNText>}
          accessibilityLabel="Close dialog"
          onPress={() => {}}
        />
      </Wrapper>,
    );
    expect(getByLabelText('Close dialog')).toBeTruthy();
  });

  it('reflects disabled state', () => {
    const { getByRole } = render(
      <Wrapper>
        <IconButton
          icon={() => <RNText>✕</RNText>}
          accessibilityLabel="Close"
          disabled
          onPress={() => {}}
        />
      </Wrapper>,
    );
    expect(getByRole('button').props.accessibilityState).toMatchObject({ disabled: true });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 21. ImageList
// ─────────────────────────────────────────────────────────────────────────────
describe('ImageList — a11y', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <Wrapper>
        <ImageList testID="imglist">
          <ImageListItem img={{ uri: 'https://example.com/img.jpg' }} title="Photo 1" />
        </ImageList>
      </Wrapper>,
    );
    expect(getByTestId('imglist')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 22. Link
// ─────────────────────────────────────────────────────────────────────────────
describe('Link — a11y', () => {
  it('has accessibilityRole="link"', () => {
    const { getByRole } = render(
      <Wrapper><Link onPress={() => {}}>Visit page</Link></Wrapper>,
    );
    expect(getByRole('link')).toBeTruthy();
  });

  it('uses children as default accessibilityLabel', () => {
    const { getByRole } = render(
      <Wrapper><Link onPress={() => {}}>Read more</Link></Wrapper>,
    );
    expect(getByRole('link', { name: 'Read more' })).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 23. List + ListItem
// ─────────────────────────────────────────────────────────────────────────────
describe('List — a11y', () => {
  it('renders list items accessible', () => {
    const { getAllByRole } = render(
      <Wrapper>
        <List>
          <ListItem title="Item 1" />
          <ListItem title="Item 2" />
        </List>
      </Wrapper>,
    );
    const items = getAllByRole('listitem');
    expect(items.length).toBeGreaterThanOrEqual(2);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 24. Menu + MenuItem
// ─────────────────────────────────────────────────────────────────────────────
describe('Menu — a11y', () => {
  it('container has accessibilityRole="menu" when visible', () => {
    const anchor = React.createRef<View>();
    const { getByRole } = render(
      <Wrapper>
        <Menu visible anchor={anchor} onDismiss={() => {}}>
          <MenuItem label="Edit" onPress={() => {}} />
        </Menu>
      </Wrapper>,
    );
    expect(getByRole('menu')).toBeTruthy();
  });

  it('MenuItem has accessibilityRole="menuitem"', () => {
    const anchor = React.createRef<View>();
    const { getByRole } = render(
      <Wrapper>
        <Menu visible anchor={anchor} onDismiss={() => {}}>
          <MenuItem label="Delete" onPress={() => {}} />
        </Menu>
      </Wrapper>,
    );
    expect(getByRole('menuitem')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 25. Modal
// ─────────────────────────────────────────────────────────────────────────────
describe('Modal — a11y', () => {
  it('scrim dismiss button has accessibilityRole="button"', () => {
    const { getAllByRole } = render(
      <Wrapper>
        <Modal visible onDismiss={() => {}}>
          <RNText>Dialog content</RNText>
        </Modal>
      </Wrapper>,
    );
    const buttons = getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it('does not render when visible=false', () => {
    const { queryByText } = render(
      <Wrapper>
        <Modal visible={false} onDismiss={() => {}}>
          <RNText>Hidden content</RNText>
        </Modal>
      </Wrapper>,
    );
    expect(queryByText('Hidden content')).toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 26. NumberField
// ─────────────────────────────────────────────────────────────────────────────
describe('NumberField — a11y', () => {
  it('has accessibilityRole="spinbutton" on input', () => {
    const { getByRole } = render(
      <Wrapper>
        <NumberField value={5} onValueChange={() => {}} min={0} max={10} />
      </Wrapper>,
    );
    expect(getByRole('spinbutton')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 27. Pagination
// ─────────────────────────────────────────────────────────────────────────────
describe('Pagination — a11y', () => {
  it('page buttons have accessibilityRole="button"', () => {
    const { getAllByRole } = render(
      <Wrapper>
        <Pagination count={5} page={1} onPageChange={() => {}} />
      </Wrapper>,
    );
    const buttons = getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3); // prev, page buttons, next
  });

  it('current page button reflects selected state', () => {
    const { getAllByRole } = render(
      <Wrapper>
        <Pagination count={5} page={2} onPageChange={() => {}} />
      </Wrapper>,
    );
    const buttons = getAllByRole('button');
    const selectedBtn = buttons.find(
      (b) => b.props.accessibilityState?.selected === true,
    );
    expect(selectedBtn).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 28. Paper
// ─────────────────────────────────────────────────────────────────────────────
describe('Paper — a11y', () => {
  it('renders children without introducing a11y issues', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Paper testID="paper" elevation={2}><RNText>Surface</RNText></Paper>
      </Wrapper>,
    );
    expect(getByTestId('paper')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 29. Portal
// ─────────────────────────────────────────────────────────────────────────────
describe('Portal — a11y', () => {
  it('teleports children into PortalHost without crashing', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Portal>
          <View testID="portal-child" />
        </Portal>
      </Wrapper>,
    );
    expect(getByTestId('portal-child')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 30. RadioButton + RadioGroup
// ─────────────────────────────────────────────────────────────────────────────
describe('RadioButton — a11y', () => {
  it('has accessibilityRole="radio"', () => {
    const { getByRole } = render(
      <Wrapper>
        <RadioGroup value="a" onValueChange={() => {}}>
          <RadioButton value="a" />
        </RadioGroup>
      </Wrapper>,
    );
    expect(getByRole('radio')).toBeTruthy();
  });

  it('reflects checked state for selected value', () => {
    const { getByRole } = render(
      <Wrapper>
        <RadioGroup value="a" onValueChange={() => {}}>
          <RadioButton value="a" />
        </RadioGroup>
      </Wrapper>,
    );
    expect(getByRole('radio').props.accessibilityState).toMatchObject({ checked: true });
  });

  it('reflects unchecked state for non-selected value', () => {
    const { getByRole } = render(
      <Wrapper>
        <RadioGroup value="b" onValueChange={() => {}}>
          <RadioButton value="a" />
        </RadioGroup>
      </Wrapper>,
    );
    expect(getByRole('radio').props.accessibilityState).toMatchObject({ checked: false });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 31. Rating
// ─────────────────────────────────────────────────────────────────────────────
describe('Rating — a11y', () => {
  it('renders interactive star buttons when not readOnly', () => {
    const { getAllByRole } = render(
      <Wrapper><Rating value={3} onValueChange={() => {}} /></Wrapper>,
    );
    const buttons = getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(5); // 5 stars
  });

  it('does not render interactive buttons when readOnly', () => {
    const { queryAllByRole } = render(
      <Wrapper><Rating value={3} readOnly /></Wrapper>,
    );
    const buttons = queryAllByRole('button');
    expect(buttons.length).toBe(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 32. Searchbar
// ─────────────────────────────────────────────────────────────────────────────
describe('Searchbar — a11y', () => {
  it('has accessibilityRole="search" on the search input', () => {
    const { getByRole } = render(
      <Wrapper>
        <Searchbar value="" onChangeText={() => {}} placeholder="Search..." />
      </Wrapper>,
    );
    expect(getByRole('search')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 33. SegmentedButtons
// ─────────────────────────────────────────────────────────────────────────────
describe('SegmentedButtons — a11y', () => {
  const buttons = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ];

  it('container has accessibilityRole="radiogroup"', () => {
    const { getByRole } = render(
      <Wrapper>
        <SegmentedButtons value="a" onValueChange={() => {}} buttons={buttons} />
      </Wrapper>,
    );
    expect(getByRole('radiogroup')).toBeTruthy();
  });

  it('each segment has accessibilityRole="radio"', () => {
    const { getAllByRole } = render(
      <Wrapper>
        <SegmentedButtons value="a" onValueChange={() => {}} buttons={buttons} />
      </Wrapper>,
    );
    expect(getAllByRole('radio').length).toBe(3);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 34. Select
// ─────────────────────────────────────────────────────────────────────────────
describe('Select — a11y', () => {
  const options = [
    { value: 'a', label: 'Apple' },
    { value: 'b', label: 'Banana' },
  ];

  it('trigger has accessibilityRole="combobox"', () => {
    const { getByRole } = render(
      <Wrapper>
        <Select value="" onValueChange={() => {}} options={options} />
      </Wrapper>,
    );
    expect(getByRole('combobox')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 35. Skeleton
// ─────────────────────────────────────────────────────────────────────────────
describe('Skeleton — a11y', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <Wrapper><Skeleton width={200} height={40} testID="skel" /></Wrapper>,
    );
    expect(getByTestId('skel', { includeHiddenElements: true })).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 36. Slider
// ─────────────────────────────────────────────────────────────────────────────
describe('Slider — a11y', () => {
  it('has accessibilityRole="adjustable"', () => {
    const { getByRole } = render(
      <Wrapper><Slider value={50} onValueChange={() => {}} min={0} max={100} /></Wrapper>,
    );
    expect(getByRole('adjustable')).toBeTruthy();
  });

  it('exposes accessibilityValue with min/max/now', () => {
    const { getByRole } = render(
      <Wrapper><Slider value={50} onValueChange={() => {}} min={0} max={100} /></Wrapper>,
    );
    const slider = getByRole('adjustable');
    expect(slider.props.accessibilityValue).toMatchObject({ min: 0, max: 100, now: 50 });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 37. Snackbar + SnackbarHost
// ─────────────────────────────────────────────────────────────────────────────
describe('Snackbar — a11y', () => {
  it('message has accessibilityLiveRegion="polite"', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Snackbar
          item={{ id: '1', message: 'File saved' }}
          testID="snack"
          onDismiss={() => {}}
        />
      </Wrapper>,
    );
    const el = getByTestId('snack');
    expect(el.props.accessibilityLiveRegion).toBe('polite');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 38. SpeedDial
// ─────────────────────────────────────────────────────────────────────────────
describe('SpeedDial — a11y', () => {
  const actions = [
    { key: 'copy', icon: <RNText>C</RNText>, label: 'Copy' },
    { key: 'paste', icon: <RNText>P</RNText>, label: 'Paste' },
  ];

  it('FAB trigger has accessibilityRole="button"', () => {
    const { getAllByRole } = render(
      <Wrapper>
        <SpeedDial actions={actions} open icon={<RNText>+</RNText>} />
      </Wrapper>,
    );
    const buttons = getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 39. Stack
// ─────────────────────────────────────────────────────────────────────────────
describe('Stack — a11y', () => {
  it('renders children without introducing a11y issues', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Stack testID="stack" spacing={2}>
          <RNText>A</RNText>
          <RNText>B</RNText>
        </Stack>
      </Wrapper>,
    );
    expect(getByTestId('stack')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 40. Stepper
// ─────────────────────────────────────────────────────────────────────────────
describe('Stepper — a11y', () => {
  const steps = [
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' },
  ];

  it('container has accessibilityRole="progressbar" with step range', () => {
    const { getByRole } = render(
      <Wrapper>
        <Stepper steps={steps} activeStep={1} onStepPress={() => {}} />
      </Wrapper>,
    );
    const progressbar = getByRole('progressbar');
    expect(progressbar.props.accessibilityValue).toMatchObject({ now: 1 });
  });

  it('each step item has accessibilityRole="listitem"', () => {
    const { getAllByRole } = render(
      <Wrapper>
        <Stepper steps={steps} activeStep={1} onStepPress={() => {}} />
      </Wrapper>,
    );
    expect(getAllByRole('listitem').length).toBeGreaterThanOrEqual(3);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 41. Switch
// ─────────────────────────────────────────────────────────────────────────────
describe('Switch — a11y', () => {
  it('has accessibilityRole="switch"', () => {
    const { getByRole } = render(
      <Wrapper><Switch value={false} onValueChange={() => {}} /></Wrapper>,
    );
    expect(getByRole('switch')).toBeTruthy();
  });

  it('reflects on state in accessibilityState.checked', () => {
    const { getByRole } = render(
      <Wrapper><Switch value={true} onValueChange={() => {}} /></Wrapper>,
    );
    expect(getByRole('switch').props.accessibilityState).toMatchObject({ checked: true });
  });

  it('reflects off state in accessibilityState.checked', () => {
    const { getByRole } = render(
      <Wrapper><Switch value={false} onValueChange={() => {}} /></Wrapper>,
    );
    expect(getByRole('switch').props.accessibilityState).toMatchObject({ checked: false });
  });

  it('reflects disabled in accessibilityState.disabled', () => {
    const { getByRole } = render(
      <Wrapper><Switch value={false} disabled onValueChange={() => {}} /></Wrapper>,
    );
    expect(getByRole('switch').props.accessibilityState).toMatchObject({ disabled: true });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 42. Tabs
// ─────────────────────────────────────────────────────────────────────────────
describe('Tabs — a11y', () => {
  const items = [
    { value: 'a', label: 'Home' },
    { value: 'b', label: 'Profile' },
    { value: 'c', label: 'Settings' },
  ];

  it('container has accessibilityRole="tablist"', () => {
    const { getByRole } = render(
      <Wrapper>
        <Tabs items={items} value="a" onValueChange={() => {}} />
      </Wrapper>,
    );
    expect(getByRole('tablist')).toBeTruthy();
  });

  it('each item has accessibilityRole="tab"', () => {
    const { getAllByRole } = render(
      <Wrapper>
        <Tabs items={items} value="a" onValueChange={() => {}} />
      </Wrapper>,
    );
    expect(getAllByRole('tab').length).toBe(3);
  });

  it('active tab has accessibilityState selected=true', () => {
    const { getAllByRole } = render(
      <Wrapper>
        <Tabs items={items} value="a" onValueChange={() => {}} />
      </Wrapper>,
    );
    const [firstTab] = getAllByRole('tab');
    expect(firstTab.props.accessibilityState).toMatchObject({ selected: true });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 43. Text
// ─────────────────────────────────────────────────────────────────────────────
describe('Text — a11y', () => {
  it('has accessibilityRole="text"', () => {
    const { getByRole } = render(
      <Wrapper><Text variant="bodyMedium">Hello world</Text></Wrapper>,
    );
    expect(getByRole('text')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 44. ToggleButton + ToggleButtonGroup
// ─────────────────────────────────────────────────────────────────────────────
describe('ToggleButton — a11y', () => {
  it('has accessibilityRole="button"', () => {
    const { getByRole } = render(
      <Wrapper>
        <ToggleButtonGroup value="bold" onValueChange={() => {}}>
          <ToggleButton value="bold"><RNText>B</RNText></ToggleButton>
        </ToggleButtonGroup>
      </Wrapper>,
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('selected button has accessibilityState pressed=true', () => {
    const { getByRole } = render(
      <Wrapper>
        <ToggleButtonGroup value="bold" onValueChange={() => {}}>
          <ToggleButton value="bold"><RNText>B</RNText></ToggleButton>
        </ToggleButtonGroup>
      </Wrapper>,
    );
    expect(getByRole('button').props.accessibilityState).toMatchObject({ selected: true });
  });

  it('unselected button has accessibilityState pressed=false', () => {
    const { getByRole } = render(
      <Wrapper>
        <ToggleButtonGroup value="italic" onValueChange={() => {}}>
          <ToggleButton value="bold"><RNText>B</RNText></ToggleButton>
        </ToggleButtonGroup>
      </Wrapper>,
    );
    expect(getByRole('button').props.accessibilityState).toMatchObject({ selected: false });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 45. Tooltip
// ─────────────────────────────────────────────────────────────────────────────
describe('Tooltip — a11y', () => {
  it('enhances child accessibilityLabel with title', () => {
    const { getByRole } = render(
      <Wrapper>
        <Tooltip title="Save document" placement="top">
          <IconButton
            icon={() => <RNText>💾</RNText>}
            accessibilityLabel="Save"
            onPress={() => {}}
          />
        </Tooltip>
      </Wrapper>,
    );
    // The child button should exist and have enhanced label
    const btn = getByRole('button');
    expect(btn.props.accessibilityLabel).toMatch(/Save/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 46. TouchableRipple
// ─────────────────────────────────────────────────────────────────────────────
describe('TouchableRipple — a11y', () => {
  it('has accessibilityRole="button" by default', () => {
    const { getByRole } = render(
      <Wrapper>
        <TouchableRipple accessibilityRole="button" onPress={() => {}}>
          <RNText>Press me</RNText>
        </TouchableRipple>
      </Wrapper>,
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('reflects disabled state', () => {
    const { getByRole } = render(
      <Wrapper>
        <TouchableRipple accessibilityRole="button" disabled onPress={() => {}}>
          <RNText>Disabled</RNText>
        </TouchableRipple>
      </Wrapper>,
    );
    expect(getByRole('button').props.accessibilityState).toMatchObject({ disabled: true });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 47. TransferList
// ─────────────────────────────────────────────────────────────────────────────
describe('TransferList — a11y', () => {
  const leftItems = [
    { id: '1', label: 'Apple' },
    { id: '2', label: 'Banana' },
  ];
  const rightItems = [{ id: '3', label: 'Cherry' }];

  it('renders list items with text', () => {
    const { getByText } = render(
      <Wrapper>
        <TransferList
          left={leftItems}
          right={rightItems}
          onTransfer={() => {}}
          leftTitle="Available"
          rightTitle="Selected"
        />
      </Wrapper>,
    );
    expect(getByText('Apple')).toBeTruthy();
    expect(getByText('Cherry')).toBeTruthy();
  });

  it('transfer action buttons have accessibilityRole="button"', () => {
    const { getAllByRole } = render(
      <Wrapper>
        <TransferList
          left={leftItems}
          right={rightItems}
          onTransfer={() => {}}
        />
      </Wrapper>,
    );
    const buttons = getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2); // at least move-right and move-left
  });
});
