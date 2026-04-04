import React, { memo, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import HumanizationScoreBar from '../../../components/HumanizationScoreBar/HumanizationScoreBar';
import * as agentService from '../../../services/agentService';
import type { HumanizationReport } from '../../../services/agentService';

interface Props {
  sessionId: string;
  userToken: string;
}

const HumanizationReportScreen = memo(function HumanizationReportScreen({
  sessionId,
  userToken,
}: Props) {
  const { theme } = useTheme();
  const cs = theme.colorScheme;

  const [report, setReport] = useState<HumanizationReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    agentService
      .getReport(sessionId, userToken)
      .then(setReport)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'LOAD_ERROR');
      })
      .finally(() => setLoading(false));
  }, [sessionId, userToken]);

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: cs.background }]}>
        <ActivityIndicator color={cs.primary} />
      </View>
    );
  }

  if (error || !report) {
    return (
      <View style={[styles.centered, { backgroundColor: cs.background }]}>
        <Text style={[styles.errorText, { color: cs.error }]}>{error ?? 'No report found.'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: cs.background }} contentContainerStyle={styles.content}>
      {/* Summary card */}
      <View style={[styles.card, { backgroundColor: cs.surface }]}>
        <Text style={[styles.cardHeading, { color: cs.onSurface }]}>Readability Scores</Text>
        <HumanizationScoreBar
          fleschKincaidBefore={report.fleschKincaidBefore}
          fleschKincaidAfter={report.fleschKincaidAfter}
        />
        <View style={styles.metricRow}>
          <Text style={[styles.metricLabel, { color: cs.onSurfaceVariant }]}>
            AI risk reduction
          </Text>
          <Text style={[styles.metricValue, { color: cs.primary }]}>
            {report.aiRiskReductionPercent.toFixed(1)}%
          </Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={[styles.metricLabel, { color: cs.onSurfaceVariant }]}>
            Readability label
          </Text>
          <Text style={[styles.metricValue, { color: cs.onSurface }]}>{report.readabilityLabel}</Text>
        </View>
      </View>

      {/* Transformations */}
      <View style={[styles.card, { backgroundColor: cs.surface }]}>
        <Text style={[styles.cardHeading, { color: cs.onSurface }]}>Transformations Applied</Text>
        {report.transformationsApplied.map((t, i) => (
          <View key={i} style={[styles.transformRow, { borderColor: cs.outlineVariant }]}>
            <Text style={[styles.transformType, { color: cs.secondary }]}>{t.type}</Text>
            <Text style={[styles.transformDesc, { color: cs.onSurfaceVariant }]}>{t.description}</Text>
            <Text style={[styles.transformCount, { color: cs.onSurface }]}>×{t.count}</Text>
          </View>
        ))}
      </View>

      {/* Highlighted sections */}
      {report.highlightedSections.length > 0 && (
        <View style={[styles.card, { backgroundColor: cs.surface }]}>
          <Text style={[styles.cardHeading, { color: cs.onSurface }]}>Highlighted Sections</Text>
          {report.highlightedSections.map((s, i) => (
            <View key={i} style={[styles.transformRow, { borderColor: cs.outlineVariant }]}>
              <Text style={[styles.transformType, { color: cs.tertiary }]}>
                Section {s.sectionIndex + 1}
              </Text>
              <Text style={[styles.transformDesc, { color: cs.onSurfaceVariant }]}>
                {s.changeType} changes
              </Text>
              <Text style={[styles.transformCount, { color: cs.onSurface }]}>
                {s.changeCount} words
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Synthesized document */}
      <View style={[styles.card, { backgroundColor: cs.surface }]}>
        <Text style={[styles.cardHeading, { color: cs.onSurface }]}>Synthesized Document</Text>
        <Text style={[styles.documentText, { color: cs.onSurface }]}>
          {report.synthesizedDocument}
        </Text>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { padding: 16, gap: 16 },
  card: {
    borderRadius: 12,
    padding: 16,
  },
  cardHeading: { fontSize: 17, fontWeight: '700', marginBottom: 12 },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  metricLabel: { fontSize: 13 },
  metricValue: { fontSize: 13, fontWeight: '600' },
  transformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 8,
  },
  transformType: { width: 160, fontSize: 13, fontWeight: '600' },
  transformDesc: { flex: 1, fontSize: 12 },
  transformCount: { fontSize: 13, fontWeight: '700', marginLeft: 8 },
  documentText: { fontSize: 14, lineHeight: 22 },
  errorText: { fontSize: 14 },
});

export default HumanizationReportScreen;
