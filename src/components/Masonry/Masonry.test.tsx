import React from 'react';
import { View } from 'react-native';
import { render, act } from '@testing-library/react-native';
import { Masonry } from './Masonry';

// Helper: simulate onLayout for all children in the rendered tree
function fireLayouts(getAllByTestId: ReturnType<typeof render>['getAllByTestId'], heights: number[]) {
  heights.forEach((h, i) => {
    const el = getAllByTestId(`child-${i}`)[0];
    act(() => {
      el.props.onLayout?.({ nativeEvent: { layout: { height: h, width: 100, x: 0, y: 0 } } });
    });
  });
}

describe('Masonry', () => {
  it('renders empty container for zero children without throwing', () => {
    const { toJSON } = render(<Masonry columns={3} />);
    expect(toJSON()).toBeTruthy();
  });

  it('uses defaultColumns before measurement', () => {
    const { UNSAFE_getAllByType } = render(
      <Masonry defaultColumns={3}>
        <View testID="a" />
        <View testID="b" />
        <View testID="c" />
      </Masonry>
    );
    // Should render 3 column Views (row + 3 column children)
    const cols = UNSAFE_getAllByType(View).filter(
      v => v.props.style && JSON.stringify(v.props.style).includes('"flexDirection":"column"')
    );
    expect(cols.length).toBe(3);
  });

  it('renders the correct number of columns', () => {
    const { UNSAFE_getAllByType } = render(
      <Masonry columns={2}>
        <View testID="a" />
        <View testID="b" />
      </Masonry>
    );
    const cols = UNSAFE_getAllByType(View).filter(
      v => v.props.style && JSON.stringify(v.props.style).includes('"flexDirection":"column"')
    );
    expect(cols.length).toBe(2);
  });

  it('renders all children', () => {
    const { getByTestId } = render(
      <Masonry columns={2}>
        <View testID="child-0" />
        <View testID="child-1" />
        <View testID="child-2" />
        <View testID="child-3" />
      </Masonry>
    );
    expect(getByTestId('child-0')).toBeTruthy();
    expect(getByTestId('child-1')).toBeTruthy();
    expect(getByTestId('child-2')).toBeTruthy();
    expect(getByTestId('child-3')).toBeTruthy();
  });

  it('applies spacing between column items', () => {
    const { UNSAFE_getAllByType } = render(
      <Masonry columns={2} spacing={8}>
        <View testID="child-0" />
        <View testID="child-1" />
        <View testID="child-2" />
        <View testID="child-3" />
      </Masonry>
    );
    // Column Views should have marginLeft: 8 (except first column)
    const views = UNSAFE_getAllByType(View);
    const colWithMargin = views.filter(
      v => v.props.style && JSON.stringify(v.props.style).includes('"marginLeft":8')
    );
    expect(colWithMargin.length).toBeGreaterThanOrEqual(1);
  });

  it('distributes columns using columns prop over defaultColumns', () => {
    const { UNSAFE_getAllByType } = render(
      <Masonry columns={4} defaultColumns={2}>
        <View />
        <View />
        <View />
        <View />
      </Masonry>
    );
    const cols = UNSAFE_getAllByType(View).filter(
      v => v.props.style && JSON.stringify(v.props.style).includes('"flexDirection":"column"')
    );
    expect(cols.length).toBe(4);
  });

  it('applies custom outer container style', () => {
    const { UNSAFE_getByType } = render(
      <Masonry columns={2} style={{ backgroundColor: 'red' }}>
        <View />
      </Masonry>
    );
    const outer = UNSAFE_getByType(View);
    const flatStyle = Array.isArray(outer.props.style)
      ? Object.assign({}, ...outer.props.style.map((s: object | null) => s ?? {}))
      : outer.props.style ?? {};
    expect(flatStyle).toMatchObject({ backgroundColor: 'red' });
  });

  it('renders single child without error', () => {
    const { getByTestId } = render(
      <Masonry columns={3}>
        <View testID="only-child" />
      </Masonry>
    );
    expect(getByTestId('only-child')).toBeTruthy();
  });
});
