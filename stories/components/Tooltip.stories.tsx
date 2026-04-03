import React from 'react';
import { Text, View } from 'react-native';
import { PortalHost } from '../../src/components/Portal/PortalHost';
import { Tooltip } from '../../src/components/Tooltip/Tooltip';
import { IconButton } from '../../src/components/IconButton/IconButton';

const InfoIcon = ({ size, color }: { size: number; color: string }) => (
  <Text style={{ fontSize: size, color }}>ℹ</Text>
);

const EditIcon = ({ size, color }: { size: number; color: string }) => (
  <Text style={{ fontSize: size, color }}>✎</Text>
);

const DeleteIcon = ({ size, color }: { size: number; color: string }) => (
  <Text style={{ fontSize: size, color }}>🗑</Text>
);

export default {
  title: 'Components/Tooltip',
};

export const TopPlacement = () => (
  <PortalHost>
    <View style={{ padding: 80, alignItems: 'center' }}>
      <Tooltip title="Additional information" placement="top">
        <IconButton icon={InfoIcon} accessibilityLabel="Info" />
      </Tooltip>
    </View>
  </PortalHost>
);

export const BottomPlacement = () => (
  <PortalHost>
    <View style={{ padding: 80, alignItems: 'center' }}>
      <Tooltip title="Long press for more" placement="bottom">
        <IconButton icon={InfoIcon} accessibilityLabel="Info" />
      </Tooltip>
    </View>
  </PortalHost>
);

export const LeftPlacement = () => (
  <PortalHost>
    <View style={{ padding: 80, alignItems: 'center' }}>
      <Tooltip title="Edit item" placement="left">
        <IconButton icon={EditIcon} accessibilityLabel="Edit" />
      </Tooltip>
    </View>
  </PortalHost>
);

export const RightPlacement = () => (
  <PortalHost>
    <View style={{ padding: 80, alignItems: 'center' }}>
      <Tooltip title="Delete item" placement="right">
        <IconButton icon={DeleteIcon} accessibilityLabel="Delete" />
      </Tooltip>
    </View>
  </PortalHost>
);

export const WithDelay = () => (
  <PortalHost>
    <View style={{ padding: 80, alignItems: 'center' }}>
      <Tooltip title="Delayed tooltip" enterDelay={800} leaveDelay={200}>
        <IconButton icon={InfoIcon} accessibilityLabel="Delayed info" />
      </Tooltip>
    </View>
  </PortalHost>
);
