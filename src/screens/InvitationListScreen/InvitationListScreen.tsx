import React, { memo, useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Alert,
  Pressable,
  ListRenderItemInfo,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { InvitationStatusBadge } from '../../components/InvitationStatusBadge/InvitationStatusBadge';
import * as invitationService from '../../services/invitationService';
import type { Invitation } from '../../services/invitationService';

interface Props {
  userToken: string;
}

const PAGE_SIZE = 20;

const InvitationListScreen = memo(function InvitationListScreen({ userToken }: Props) {
  const { theme } = useTheme();
  const cs = theme.colorScheme;

  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(
    async (pageNum: number, replace: boolean) => {
      try {
        const res = await invitationService.list(userToken, {
          page: pageNum,
          pageSize: PAGE_SIZE,
        });
        setInvitations(prev => (replace ? res.invitations : [...prev, ...res.invitations]));
        setTotalCount(res.total);
        setPage(pageNum);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'LOAD_ERROR');
      }
    },
    [userToken],
  );

  React.useEffect(() => {
    setLoading(true);
    fetchPage(1, true).finally(() => setLoading(false));
  }, [fetchPage]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPage(1, true);
    setRefreshing(false);
  }, [fetchPage]);

  const handleLoadMore = useCallback(async () => {
    if (loading || invitations.length >= totalCount) return;
    await fetchPage(page + 1, false);
  }, [loading, invitations.length, totalCount, page, fetchPage]);

  const handleRevoke = useCallback(
    (item: Invitation) => {
      Alert.alert(
        'Revoke invitation?',
        `This will revoke the invitation for ${item.recipientEmail}.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Revoke',
            style: 'destructive',
            onPress: async () => {
              try {
                await invitationService.revoke(item.id, userToken);
                setInvitations(prev =>
                  prev.map(inv => (inv.id === item.id ? { ...inv, status: 'revoked' } : inv)),
                );
              } catch (err) {
                Alert.alert('Error', err instanceof Error ? err.message : 'REVOKE_ERROR');
              }
            },
          },
        ],
      );
    },
    [userToken],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Invitation>) => {
      const date = new Date(item.createdAt).toLocaleDateString();
      return (
        <View
          style={[styles.row, { borderBottomColor: cs.outlineVariant }]}
          accessible
          accessibilityLabel={`Invitation for ${item.recipientEmail}, status ${item.status}`}
        >
          <View style={styles.rowContent}>
            <Text style={[styles.email, { color: cs.onSurface }]} numberOfLines={1}>
              {item.recipientEmail}
            </Text>
            <Text style={[styles.meta, { color: cs.onSurfaceVariant }]}>
              {date} · {item.loginCount}/{item.maxLogins} logins
            </Text>
          </View>
          <InvitationStatusBadge status={item.status} />
          {item.status === 'active' && (
            <Pressable
              style={({ pressed }) => [
                styles.revokeBtn,
                { backgroundColor: cs.errorContainer, opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={() => handleRevoke(item)}
              accessibilityLabel={`Revoke invitation for ${item.recipientEmail}`}
              accessibilityRole="button"
            >
              <Text style={[styles.revokeBtnLabel, { color: cs.onErrorContainer }]}>Revoke</Text>
            </Pressable>
          )}
        </View>
      );
    },
    [cs, handleRevoke],
  );

  if (error) {
    return (
      <View style={[styles.centered, { backgroundColor: cs.background }]}>
        <Text style={[styles.errorText, { color: cs.error }]}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: cs.background }}
      data={invitations}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={cs.primary}
          colors={[cs.primary]}
        />
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.3}
      ListEmptyComponent={
        !loading ? (
          <View style={styles.centered}>
            <Text style={[styles.emptyText, { color: cs.onSurfaceVariant }]}>No invitations yet.</Text>
          </View>
        ) : null
      }
    />
  );
});

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 64,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowContent: { flex: 1, marginRight: 8 },
  email: { fontSize: 14, fontWeight: '600' },
  meta: { fontSize: 12, marginTop: 2 },
  revokeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minHeight: 36,
    justifyContent: 'center',
    marginLeft: 8,
  },
  revokeBtnLabel: { fontSize: 12, fontWeight: '700' },
  errorText: { fontSize: 14 },
  emptyText: { fontSize: 14 },
});

export default InvitationListScreen;
