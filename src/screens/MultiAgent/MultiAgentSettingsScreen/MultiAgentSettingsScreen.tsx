import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { useSubscription } from '../../../hooks/useSubscription';
import * as agentService from '../../../services/agentService';

interface Props {
  userToken: string;
  navigation?: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
  };
}

export default function MultiAgentSettingsScreen({ userToken, navigation }: Props) {
  const { theme } = useTheme();
  const cs = theme.colorScheme;
  const sub = useSubscription(userToken);

  const [enabled, setEnabled] = useState(false);
  const [document, setDocument] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!document.trim()) return;
    setSubmitting(true);
    try {
      const session = await agentService.submitDocument(document.trim(), userToken);
      navigation?.navigate('AgentProgress', { sessionId: session.sessionId, userToken });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'UNKNOWN_ERROR';
      Alert.alert('Submission failed', msg);
    } finally {
      setSubmitting(false);
    }
  }, [document, userToken, navigation]);

  if (sub.loading) {
    return (
      <View style={[styles.centered, { backgroundColor: cs.background }]}>
        <ActivityIndicator color={cs.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: cs.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.heading, { color: cs.onBackground }]}>Multi-Agent Processing</Text>

      {/* Toggle row */}
      <View style={[styles.row, { borderColor: cs.outline }]}>
        <View style={styles.rowText}>
          <Text style={[styles.rowTitle, { color: cs.onSurface }]}>Enable multi-agent mode</Text>
          {!sub.multiAgentEnabled && (
            <Text style={[styles.rowSubtitle, { color: cs.onSurfaceVariant }]}>
              Upgrade your subscription to unlock this feature.
            </Text>
          )}
        </View>
        <Switch
          value={sub.multiAgentEnabled ? enabled : false}
          onValueChange={setEnabled}
          disabled={!sub.multiAgentEnabled}
          accessibilityLabel="Enable multi-agent mode toggle"
          trackColor={{ false: cs.surfaceVariant, true: cs.primaryContainer }}
          thumbColor={enabled && sub.multiAgentEnabled ? cs.primary : cs.onSurfaceVariant}
        />
      </View>

      {/* Upgrade CTA — visible per FR-013 when not subscribed */}
      {!sub.multiAgentEnabled && (
        <TouchableOpacity
          style={[styles.ctaButton, { backgroundColor: cs.secondaryContainer, minHeight: 48 }]}
          onPress={() => navigation?.navigate('Upgrade')}
          accessibilityRole="button"
          accessibilityLabel="Upgrade subscription"
        >
          <Text style={[styles.ctaText, { color: cs.onSecondaryContainer }]}>
            Upgrade to unlock multi-agent
          </Text>
        </TouchableOpacity>
      )}

      {/* Document input — only when enabled */}
      {sub.multiAgentEnabled && enabled && (
        <>
          <TextInput
            style={[
              styles.documentInput,
              {
                borderColor: cs.outline,
                color: cs.onSurface,
                backgroundColor: cs.surfaceVariant,
              },
            ]}
            value={document}
            onChangeText={setDocument}
            placeholder="Paste your document here…"
            placeholderTextColor={cs.onSurfaceVariant}
            multiline
            textAlignVertical="top"
            accessibilityLabel="Document input"
            maxLength={50000}
          />
          <TouchableOpacity
            style={[
              styles.submitButton,
              {
                backgroundColor: document.trim() && !submitting ? cs.primary : cs.surfaceVariant,
                minHeight: 48,
              },
            ]}
            onPress={() => void handleSubmit()}
            disabled={!document.trim() || submitting}
            accessibilityRole="button"
            accessibilityLabel="Submit document for processing"
          >
            {submitting ? (
              <ActivityIndicator color={cs.onPrimary} />
            ) : (
              <Text
                style={[
                  styles.submitText,
                  { color: document.trim() ? cs.onPrimary : cs.onSurfaceVariant },
                ]}
              >
                Process document
              </Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { padding: 24 },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 24 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  rowText: { flex: 1, marginRight: 12 },
  rowTitle: { fontSize: 16, fontWeight: '600' },
  rowSubtitle: { fontSize: 13, marginTop: 4 },
  ctaButton: {
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  ctaText: { fontSize: 15, fontWeight: '600' },
  documentInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    height: 200,
    fontSize: 14,
    marginBottom: 16,
  },
  submitButton: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  submitText: { fontSize: 16, fontWeight: '600' },
});
