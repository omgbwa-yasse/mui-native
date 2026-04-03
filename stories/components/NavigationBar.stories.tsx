import React, { useState } from 'react';
import { Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { NavigationBar } from 'rn-material/components/NavigationBar';

const items = [
  { icon: <Text>🏠</Text>, label: 'Home', onPress: () => {} },
  { icon: <Text>🔍</Text>, label: 'Search', onPress: () => {} },
  { icon: <Text>❤️</Text>, label: 'Favorites', onPress: () => {} },
  { icon: <Text>👤</Text>, label: 'Profile', onPress: () => {} },
];

function NavigationBarDemo(): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  const interactiveItems = items.map((item, idx) => ({
    ...item,
    onPress: () => setActiveIndex(idx),
  }));
  return <NavigationBar activeIndex={activeIndex} items={interactiveItems} />;
}

const meta: Meta<typeof NavigationBar> = {
  title: 'Components/NavigationBar',
  component: NavigationBar,
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;

export const FourItems: Story = {
  render: () => <NavigationBarDemo />,
};

export const ThreeItems: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <NavigationBar
        activeIndex={active}
        items={items.slice(0, 3).map((item, idx) => ({
          ...item,
          onPress: () => setActive(idx),
        }))}
      />
    );
  },
};
