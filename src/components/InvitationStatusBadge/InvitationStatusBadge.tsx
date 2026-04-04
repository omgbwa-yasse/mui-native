import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export type InvitationStatus = 'active' | 'expired' | 'revoked' | 'converted';

interface InvitationStatusBadgeProps {
  status: InvitationStatus;
  testID?: string;
}

const LABELS: Record<InvitationStatus, string> = {
  active: 'Active',
  expired: 'Expired',
  revoked: 'Revoked',
  converted: 'Converted',
};

const InvitationStatusBadge = memo(function InvitationStatusBadge({
  status,
  testID,
}: InvitationStatusBadgeProps) {
  const { theme } = useTheme();

  const bgColor = (() => {
    switch (status) {
      case 'active':
        return theme.colorScheme.primaryContainer;
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
        return theme.colorScheme.onPrimaryContainer;
      case 'expired':
        return theme.colorScheme.onSurfaceVariant;
      case 'revoked':
        return theme.colorScheme.onErrorContainer;
      case 'converted':
        return theme.colorScheme.onTertiaryContainer;
    }
  })();

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }]} testID={testID}>
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
