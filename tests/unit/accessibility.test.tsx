import React from 'react';
import { Text, AccessibilityInfo } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../src/theme/ThemeProvider';
import { Button } from '../../src/components/Button';
import { Card } from '../../src/components/Card';
import { FAB } from '../../src/components/FAB';
import { NavigationBar } from '../../src/components/NavigationBar';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('US5 – Accessibility', () => {
  beforeEach(() => {
    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
    jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Button', () => {
    it('has accessibilityRole="button"', () => {
      const { getByRole } = render(
        <Wrapper><Button label="Save" onPress={() => {}} /></Wrapper>,
      );
      expect(getByRole('button')).toBeTruthy();
    });

    it('uses label as default accessibilityLabel', () => {
      const { getByLabelText } = render(
        <Wrapper><Button label="Save Changes" onPress={() => {}} /></Wrapper>,
      );
      expect(getByLabelText('Save Changes')).toBeTruthy();
    });

    it('respects custom accessibilityLabel', () => {
      const { getByLabelText } = render(
        <Wrapper>
          <Button label="OK" accessibilityLabel="Confirm action" onPress={() => {}} />
        </Wrapper>,
      );
      expect(getByLabelText('Confirm action')).toBeTruthy();
    });

    it('sets accessibilityState disabled when disabled prop is true', () => {
      const { getByRole } = render(
        <Wrapper><Button label="Disabled" disabled onPress={() => {}} /></Wrapper>,
      );
      const btn = getByRole('button');
      expect(btn.props.accessibilityState).toMatchObject({ disabled: true });
    });
  });

  describe('FAB', () => {
    it('has accessibilityRole="button"', () => {
      const { getByRole } = render(
        <Wrapper>
          <FAB icon={<Text>+</Text>} accessibilityLabel="Create item" onPress={() => {}} />
        </Wrapper>,
      );
      expect(getByRole('button')).toBeTruthy();
    });

    it('uses accessibilityLabel prop', () => {
      const { getByLabelText } = render(
        <Wrapper>
          <FAB icon={<Text>+</Text>} accessibilityLabel="Add new entry" onPress={() => {}} />
        </Wrapper>,
      );
      expect(getByLabelText('Add new entry')).toBeTruthy();
    });
  });

  describe('Card', () => {
    it('is accessible as button when onPress is provided', () => {
      const { getByRole } = render(
        <Wrapper><Card onPress={() => {}} accessibilityLabel="Open details"><Text>Content</Text></Card></Wrapper>,
      );
      expect(getByRole('button')).toBeTruthy();
    });
  });

  describe('NavigationBar', () => {
    it('each tab item has accessibilityRole="tab"', () => {
      const items = [
        { icon: <Text>🏠</Text>, label: 'Home', onPress: () => {} },
        { icon: <Text>🔍</Text>, label: 'Search', onPress: () => {} },
      ];
      const { getAllByRole } = render(
        <Wrapper><NavigationBar activeIndex={0} items={items} /></Wrapper>,
      );
      const tabs = getAllByRole('tab');
      expect(tabs).toHaveLength(2);
    });

    it('active tab has accessibilityState selected=true', () => {
      const items = [
        { icon: <Text>🏠</Text>, label: 'Home', onPress: () => {} },
        { icon: <Text>🔍</Text>, label: 'Search', onPress: () => {} },
      ];
      const { getAllByRole } = render(
        <Wrapper><NavigationBar activeIndex={0} items={items} /></Wrapper>,
      );
      const [firstTab] = getAllByRole('tab');
      expect(firstTab.props.accessibilityState).toMatchObject({ selected: true });
    });

    it('inactive tabs have accessibilityState selected=false', () => {
      const items = [
        { icon: <Text>🏠</Text>, label: 'Home', onPress: () => {} },
        { icon: <Text>🔍</Text>, label: 'Search', onPress: () => {} },
      ];
      const { getAllByRole } = render(
        <Wrapper><NavigationBar activeIndex={0} items={items} /></Wrapper>,
      );
      const tabs = getAllByRole('tab');
      expect(tabs[1].props.accessibilityState).toMatchObject({ selected: false });
    });
  });
});
