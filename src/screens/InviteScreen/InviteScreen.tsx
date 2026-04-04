import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { send } from '../../services/invitationService';
import { useTheme } from '../../theme/ThemeContext';

// RN-DEVIATION: Screen-level file; not a library component. Uses React Navigation
// NativeStackNavigationProp shape — callers must pass the correct typed prop.
export interface InviteScreenProps {
  userToken: string;
  navigation?: {
    goBack?: () => void;
  };
}

type ScreenState =
  | { phase: 'idle' }
  | { phase: 'sending' }
  | { phase: 'success'; code: string; recipientEmail: string }
  | { phase: 'error'; message: string };

export function InviteScreen({ userToken, navigation }: InviteScreenProps) {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [state, setState] = useState<ScreenState>({ phase: 'idle' });

  const handleSend = useCallback(async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;
    setState({ phase: 'sending' });
    try {
      const result = await send(trimmed, userToken);
      setState({ phase: 'success', code: result.code, recipientEmail: trimmed });
    } catch (err) {
      setState({
        phase: 'error',
        message: (err as Error).message ?? 'Failed to send invitation.',
      });
    }
  }, [email, userToken]);

  const handleReset = useCallback(() => {
    setEmail('');
    setState({ phase: 'idle' });
  }, []);

  const isSending = state.phase === 'sending';
  const isSubmitDisabled = isSending || !email.trim();

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: theme.colorScheme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: theme.colorScheme.onBackground }]}>
          Invite Someone
        </Text>
        <Text style={[styles.subtitle, { color: theme.colorScheme.onSurfaceVariant }]}>
          Enter the email address to send a 7-digit access code.
        </Text>

        {state.phase === 'success' ? (
          <View
            style={[
              styles.successCard,
              {
                backgroundColor: theme.colorScheme.primaryContainer,
                borderColor: theme.colorScheme.primary,
              },
            ]}
            accessibilityRole="summary"
            accessibilityLabel="Invitation sent successfully"
          >
            <Text
              style={[styles.successTitle, { color: theme.colorScheme.onPrimaryContainer }]}
            >
              Invitation Sent!
            </Text>
            <Text
              style={[styles.successRecipient, { color: theme.colorScheme.onPrimaryContainer }]}
            >
              To: {state.recipientEmail}
            </Text>
            <Text
              style={[styles.codeLabel, { color: theme.colorScheme.onSurfaceVariant }]}
            >
              Access code (shown once):
            </Text>
            <Text
              style={[styles.codeDisplay, { color: theme.colorScheme.primary }]}
              accessibilityLabel={`Access code: ${state.code.split('').join(' ')}`}
            >
              {state.code}
            </Text>
            <Text
              style={[styles.codeNote, { color: theme.colorScheme.onSurfaceVariant }]}
            >
              Share this code securely. It will not be shown again.
            </Text>

            <TouchableOpacity
              style={[
                styles.resetButton,
                { borderColor: theme.colorScheme.primary, minHeight: 48 },
              ]}
              onPress={handleReset}
              accessibilityRole="button"
              accessibilityLabel="Send another invitation"
            >
              <Text style={[styles.resetLabel, { color: theme.colorScheme.primary }]}>
                Send Another
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TextInput
              style={[
                styles.emailInput,
                {
                  borderColor: theme.colorScheme.outline,
                  color: theme.colorScheme.onSurface,
                  backgroundColor: theme.colorScheme.surface,
                },
              ]}
              placeholder="Recipient email"
              placeholderTextColor={theme.colorScheme.onSurfaceVariant}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isSending}
              accessibilityLabel="Recipient email address"
            />

            {state.phase === 'error' ? (
              <Text
                style={[styles.errorText, { color: theme.colorScheme.error }]}
                accessibilityRole="alert"
              >
                {state.message}
              </Text>
            ) : null}

            <TouchableOpacity
              style={[
                styles.sendButton,
                {
                  backgroundColor: isSubmitDisabled
                    ? theme.colorScheme.surfaceVariant
                    : theme.colorScheme.primary,
                  minHeight: 48,
                },
              ]}
              onPress={handleSend}
              disabled={isSubmitDisabled}
              accessibilityRole="button"
              accessibilityLabel="Send invitation"
              accessibilityState={{ disabled: isSubmitDisabled }}
            >
              {isSending ? (
                <ActivityIndicator color={theme.colorScheme.onPrimary} />
              ) : (
                <Text
                  style={[
                    styles.sendLabel,
                    {
                      color: isSubmitDisabled
                        ? theme.colorScheme.onSurfaceVariant
                        : theme.colorScheme.onPrimary,
                    },
                  ]}
                >
                  Send Invitation
                </Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  emailInput: {
    borderWidth: 1.5,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 48,
  },
  errorText: {
    fontSize: 13,
  },
  sendButton: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  sendLabel: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 12,
  },
  successCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    gap: 8,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  successRecipient: {
    fontSize: 14,
  },
  codeLabel: {
    fontSize: 13,
    marginTop: 8,
  },
  codeDisplay: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 6,
    textAlign: 'center',
    marginVertical: 4,
  },
  codeNote: {
    fontSize: 12,
    textAlign: 'center',
  },
  resetButton: {
    borderWidth: 1.5,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  resetLabel: {
    fontSize: 15,
    fontWeight: '600',
    paddingVertical: 12,
  },
});
