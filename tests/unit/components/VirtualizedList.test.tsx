import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { VirtualizedList } from '../../../src/components/VirtualizedList';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}

type Item = { id: string; label: string };

const DATA: Item[] = [
  { id: '1', label: 'First' },
  { id: '2', label: 'Second' },
];

describe('VirtualizedList', () => {
  it('renders items via renderItem', () => {
    const { getByText } = render(
      <Wrapper>
        <VirtualizedList<Item>
          data={DATA}
          getItem={(data, index) => (data as Item[])[index]}
          getItemCount={(data) => (data as Item[]).length}
          keyExtractor={(item) => (item as Item).id}
          renderItem={({ item }) => <Text>{(item as Item).label}</Text>}
        />
      </Wrapper>,
    );
    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
  });

  it('renders with testID', () => {
    const { getByTestId } = render(
      <Wrapper>
        <VirtualizedList<Item>
          testID="vl-root"
          data={DATA}
          getItem={(data, index) => (data as Item[])[index]}
          getItemCount={(data) => (data as Item[]).length}
          keyExtractor={(item) => (item as Item).id}
          renderItem={({ item }) => <Text>{(item as Item).label}</Text>}
        />
      </Wrapper>,
    );
    expect(getByTestId('vl-root')).toBeTruthy();
  });

  it('applies sx style', () => {
    const { getByTestId } = render(
      <Wrapper>
        <VirtualizedList<Item>
          testID="vl-sx"
          data={DATA}
          getItem={(data, index) => (data as Item[])[index]}
          getItemCount={(data) => (data as Item[]).length}
          keyExtractor={(item) => (item as Item).id}
          renderItem={({ item }) => <Text>{(item as Item).label}</Text>}
          sx={{ backgroundColor: 'red' }}
        />
      </Wrapper>,
    );
    const el = getByTestId('vl-sx');
    expect(el.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: 'red' })]),
    );
  });
});
