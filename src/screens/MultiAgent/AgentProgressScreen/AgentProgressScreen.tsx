import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { useAgentProgress } from '../../../hooks/useAgentProgress';
import WorkerAgentRow from '../../../components/WorkerAgentRow/WorkerAgentRow';
import type { WorkerState } from '../../../hooks/useAgentProgress';

interface Props {
  sessionId: string;
  userToken: string;
  navigation?: {
    replace: (screen: string, params?: Record<string, unknown>) => void;
  };
}

const SUPERVISOR_LABELS: Record<string, string> = {
  pending: 'Initializing…',
  analyzing: 'Analyzing document…',
  processing: 'Workers processing…',
  synthesizing: 'Synthesizing result…',
  completed: 'Processing complete',
  failed: 'Processing failed',
};

export default function AgentProgressScreen({ sessionId, userToken, navigation }: Props) {
  const { theme } = useTheme();
  const cs = theme.colorScheme;
  const { workers, supervisorStatus, isComplete, isFailed, errorCode } = useAgentProgress(
    sessionId,
    userToken,
  );

  React.useEffect(() => {
    if (isComplete) {
      navigation?.replace('HumanizationReport', { sessionId, userToken });
    }
  }, [isComplete, navigation, sessionId, userToken]);

  const renderWorker = ({ item }: { item: WorkerState }) => (
    <WorkerAgentRow
      workerId={item.workerId}
      sectionIndex={item.sectionIndex}
      status={item.status}
      progressPercent={item.progressPercent}
      key={item.workerId}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: cs.background }]}>
      {/* Supervisor status banner */}
      <View
        style={[
          styles.banner,
          {
            backgroundColor: isFailed ? cs.errorContainer : cs.primaryContainer,
          },
        ]}
        accessibilityRole="alert"
        accessibilityLabel={`Supervisor status: ${SUPERVISOR_LABELS[supervisorStatus] ?? supervisorStatus}`}
      >
        <Text
          style={[
            styles.bannerText,
            { color: isFailed ? cs.onErrorContainer : cs.onPrimaryContainer },
          ]}
        >
          {SUPERVISOR_LABELS[supervisorStatus] ?? supervisorStatus}
        </Text>
        {isFailed && errorCode && (
          <Text style={[styles.errorCode, { color: cs.onErrorContainer }]}>{errorCode}</Text>
        )}
        {!isFailed && !isComplete && (
          <ActivityIndicator
            color={cs.onPrimaryContainer}
            style={styles.spinner}
            accessibilityLabel="Loading"
          />
        )}
      </View>

      <FlatList<WorkerState>
        data={workers}
        renderItem={renderWorker}
        keyExtractor={(item) => item.workerId}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: cs.onSurfaceVariant }]}>
            Waiting for workers to start…
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginBottom: 8,
  },
  bannerText: { flex: 1, fontSize: 15, fontWeight: '600' },
  errorCode: { fontSize: 12, marginLeft: 8 },
  spinner: { marginLeft: 8 },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  emptyText: { textAlign: 'center', marginTop: 32, fontSize: 14 },
});
