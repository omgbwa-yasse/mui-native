import React, { memo, useContext } from 'react';
import { View } from 'react-native';
import { TabsContext } from './TabsContext';

interface TabPanelProps {
  value: string;
  children: React.ReactNode;
  testID?: string;
}

const TabPanel = memo(function TabPanel({ value, children, testID }: TabPanelProps) {
  const ctx = useContext(TabsContext);
  const isActive = ctx ? ctx.value === value : false;

  if (!isActive) return null;

  return (
    <View
      accessibilityRole="none"
      testID={testID}
    >
      {children}
    </View>
  );
});

export { TabPanel };
