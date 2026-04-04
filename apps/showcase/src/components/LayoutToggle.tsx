import React from 'react';
import { IconButton } from '@mui-native';
import { materialIconSource } from '@mui-native';
import { useLayoutPreference } from '../context/LayoutPreferenceContext';

export default function LayoutToggle() {
  const { direction, toggle } = useLayoutPreference();
  const isVertical = direction === 'vertical';

  return (
    <IconButton
      icon={materialIconSource(isVertical ? 'view_agenda' : 'view_week')}
      onPress={toggle}
      accessibilityLabel={
        isVertical ? 'Switch to horizontal layout' : 'Switch to vertical layout'
      }
    />
  );
}
