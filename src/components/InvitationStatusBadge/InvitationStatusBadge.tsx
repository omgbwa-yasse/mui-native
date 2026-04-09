import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { InvitationStatus, InvitationStatusBadgeProps } from './types';

export type { InvitationStatus, InvitationStatusBadgeProps } from './types';

const LABELS: Record<InvitationStatus, string> = {
  active: 'Active',
  expired: 'Expired',
  revoked: 'Revoked',
  converted: 'Converted',
};

const InvitationStatusBadge = memo(function InvitationStatusBadge(rawProps: InvitationStatusBadgeProps) {
  const props = useComponentDefaults('InvitationStatusBadge', rawProps);
  const {
    status,
    testID,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  const bgColor = (() => {
    switch (status) {
      case 'active':
        return container;
      case 'expired':
        return theme.colorScheme.surfaceVariant;
      case 'revoked':
        return theme.colorScheme.errorContainer;
      case 'converted':
        return theme.colorScheme.tertiaryContainer;
    }
  })();

  const fgColor = (() => {
    switch (status) {
      case 'active':
        return onContainer;
      case 'expired':
        return theme.colorScheme.onSurfaceVariant;
      case 'revoked':
        return theme.colorScheme.onErrorContainer;
      case 'converted':
        return theme.colorScheme.onTertiaryContainer;
    }
  })();

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }, sxStyle, style]} testID={testID}>
      <Text
        style={[styles.label, { color: fgColor }]}
        accessibilityLabel={`Status: ${LABELS[status]}`}
        numberOfLines={1}
      >
        {LABELS[status]}
      </Text>
    </View>
  );
});

export { InvitationStatusBadge };

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
});
