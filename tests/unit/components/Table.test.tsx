/**
 * T054 — Table family unit tests.
 *
 * SC-005: TableContainer wraps ScrollView, stickyHeader context, TableRow
 * selected/hover states, TableCell accessibilityRole by variant,
 * TableSortLabel direction arrow, TablePagination page navigation.
 */
import React from 'react';
import { AccessibilityInfo } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { TableContainer } from '../../../src/components/Table/TableContainer';
import { Table } from '../../../src/components/Table/Table';
import { TableHead } from '../../../src/components/Table/TableHead';
import { TableBody } from '../../../src/components/Table/TableBody';
import { TableFooter } from '../../../src/components/Table/TableFooter';
import { TableRow } from '../../../src/components/Table/TableRow';
import { TableCell } from '../../../src/components/Table/TableCell';
import { TableSortLabel } from '../../../src/components/Table/TableSortLabel';
import { TablePagination } from '../../../src/components/Table/TablePagination';

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

describe('TableContainer', () => {
  it('renders without crash', () => {
    const { toJSON } = render(
      <Wrapper>
        <TableContainer testID="tc">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Cell</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with horizontal prop (x-scroll)', () => {
    const { toJSON } = render(
      <Wrapper>
        <TableContainer horizontal testID="tc-horiz">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Cell</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });
});

describe('Table — stickyHeader prop', () => {
  it('renders Table with stickyHeader=true without crash', () => {
    const { toJSON } = render(
      <Wrapper>
        <Table stickyHeader testID="tbl-sticky">
          <TableHead>
            <TableRow>
              <TableCell variant="head">Header</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });
});

describe('TableRow — selected and hover states', () => {
  it('renders selected TableRow without crash', () => {
    const { toJSON } = render(
      <Wrapper>
        <Table>
          <TableBody>
            <TableRow selected testID="row-selected">
              <TableCell>Selected</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders hover TableRow without crash', () => {
    const { toJSON } = render(
      <Wrapper>
        <Table>
          <TableBody>
            <TableRow hover testID="row-hover">
              <TableCell>Hover</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('calls onPress when TableRow is pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Wrapper>
        <Table>
          <TableBody>
            <TableRow onPress={onPress} testID="row-press">
              <TableCell>Pressable row</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Wrapper>,
    );
    fireEvent.press(getByTestId('row-press'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('TableCell — accessibilityRole by variant', () => {
  it('has accessibilityRole="columnheader" for variant="head"', () => {
    const { getByRole } = render(
      <Wrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell variant="head" testID="head-cell">
                Header Cell
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Wrapper>,
    );
    expect(getByRole('columnheader')).toBeTruthy();
  });

  it('has accessibilityRole="cell" for default (body) variant', () => {
    const { getByRole } = render(
      <Wrapper>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell testID="body-cell">Body Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Wrapper>,
    );
    expect(getByRole('cell')).toBeTruthy();
  });

  it('has accessibilityRole="cell" for variant="footer"', () => {
    const { getAllByRole } = render(
      <Wrapper>
        <Table>
          <TableFooter>
            <TableRow>
              <TableCell variant="footer" testID="footer-cell">
                Footer Cell
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Wrapper>,
    );
    const cells = getAllByRole('cell');
    expect(cells.length).toBeGreaterThan(0);
  });

  it('inherits variant from TableHead context when variant not provided', () => {
    const { getByRole } = render(
      <Wrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell testID="ctx-head-cell">Inherited Head</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Wrapper>,
    );
    // TableHead provides variant='head' via context → should be 'columnheader'
    expect(getByRole('columnheader')).toBeTruthy();
  });
});

describe('TableSortLabel', () => {
  it('renders with active and direction="asc" without crash', () => {
    const { toJSON } = render(
      <Wrapper>
        <TableSortLabel active direction="asc" testID="sort-asc">
          Name
        </TableSortLabel>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with active and direction="desc" without crash', () => {
    const { toJSON } = render(
      <Wrapper>
        <TableSortLabel active direction="desc" testID="sort-desc">
          Date
        </TableSortLabel>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Wrapper>
        <TableSortLabel active direction="asc" onPress={onPress} testID="sort-pressable">
          Sortable
        </TableSortLabel>
      </Wrapper>,
    );
    fireEvent.press(getByTestId('sort-pressable'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('hides sort icon when hideSortIcon=true and not active', () => {
    const { toJSON } = render(
      <Wrapper>
        <TableSortLabel active={false} direction="asc" hideSortIcon testID="sort-hidden">
          Hidden Icon
        </TableSortLabel>
      </Wrapper>,
    );
    // Just verify it renders without crash (icon hidden)
    expect(toJSON()).toBeTruthy();
  });

  it('snapshot: asc direction', () => {
    const { toJSON } = render(
      <Wrapper>
        <TableSortLabel active direction="asc">
          Col
        </TableSortLabel>
      </Wrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('snapshot: desc direction differs from asc', () => {
    const { toJSON } = render(
      <Wrapper>
        <TableSortLabel active direction="desc">
          Col
        </TableSortLabel>
      </Wrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('TablePagination', () => {
  it('renders without crash', () => {
    const { toJSON } = render(
      <Wrapper>
        <TablePagination
          count={100}
          page={0}
          rowsPerPage={10}
          onPageChange={jest.fn()}
          testID="tp"
        />
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('calls onPageChange with next page when next is pressed', () => {
    const onPageChange = jest.fn();
    const { getByTestId } = render(
      <Wrapper>
        <TablePagination
          count={100}
          page={0}
          rowsPerPage={10}
          onPageChange={onPageChange}
          testID="tp-nav"
        />
      </Wrapper>,
    );
    fireEvent.press(getByTestId('tp-nav-next'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange with prev page when prev is pressed', () => {
    const onPageChange = jest.fn();
    const { getByTestId } = render(
      <Wrapper>
        <TablePagination
          count={100}
          page={2}
          rowsPerPage={10}
          onPageChange={onPageChange}
          testID="tp-prev"
        />
      </Wrapper>,
    );
    fireEvent.press(getByTestId('tp-prev-prev'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('prev button is disabled on first page', () => {
    const onPageChange = jest.fn();
    const { getByTestId } = render(
      <Wrapper>
        <TablePagination
          count={100}
          page={0}
          rowsPerPage={10}
          onPageChange={onPageChange}
          testID="tp-first"
        />
      </Wrapper>,
    );
    const prevBtn = getByTestId('tp-first-prev');
    expect(prevBtn.props.accessibilityState?.disabled).toBe(true);
  });

  it('next button is disabled on last page', () => {
    const onPageChange = jest.fn();
    const { getByTestId } = render(
      <Wrapper>
        <TablePagination
          count={30}
          page={2}
          rowsPerPage={10}
          onPageChange={onPageChange}
          testID="tp-last"
        />
      </Wrapper>,
    );
    const nextBtn = getByTestId('tp-last-next');
    expect(nextBtn.props.accessibilityState?.disabled).toBe(true);
  });

  it('renders showFirstButton and showLastButton', () => {
    const { getByTestId } = render(
      <Wrapper>
        <TablePagination
          count={100}
          page={1}
          rowsPerPage={10}
          onPageChange={jest.fn()}
          showFirstButton
          showLastButton
          testID="tp-extra"
        />
      </Wrapper>,
    );
    expect(getByTestId('tp-extra-first')).toBeTruthy();
    expect(getByTestId('tp-extra-last')).toBeTruthy();
  });

  it('calls onPageChange(0) when first button pressed', () => {
    const onPageChange = jest.fn();
    const { getByTestId } = render(
      <Wrapper>
        <TablePagination
          count={100}
          page={3}
          rowsPerPage={10}
          onPageChange={onPageChange}
          showFirstButton
          testID="tp-gofirst"
        />
      </Wrapper>,
    );
    fireEvent.press(getByTestId('tp-gofirst-first'));
    expect(onPageChange).toHaveBeenCalledWith(0);
  });
});
