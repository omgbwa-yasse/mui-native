import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { CodeInput } from '../../components/CodeInput/CodeInput';
import { useGuestSession } from '../../hooks/useGuestSession';
import { useTheme } from '../../theme/ThemeContext';

// RN-DEVIATION: Screen-level file; not a library component. Uses React Navigation
// NativeStackNavigationProp shape — callers must pass the correct typed prop.
export interface GuestLoginScreenProps {
  navigation: {
    navigate: (route: string, params?: Record<string, unknown>) => void;
    replace: (route: string, params?: Record<string, unknown>) => void;
  };
}

export function GuestLoginScreen({ navigation }: GuestLoginScreenProps) {
  const { theme } = useTheme();
  const { login } = useGuestSession();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearCountdown = useCallback(() => {
    if (countdownRef.current !== null) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  }, []);

  useEffect(() => () => clearCountdown(), [clearCountdown]);

  const startCountdown = useCallback(
    (secs: number) => {
      clearCountdown();
      setLockoutRemaining(secs);
      countdownRef.current = setInterval(() => {
        setLockoutRemaining((prev) => {
          if (prev <= 1) {
            clearCountdown();
            setErrorMessage(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [clearCountdown],
  );

  const handleSubmit = useCallback(async () => {
    if (!email.trim() || code.length < 7) return;
    setLoading(true);
    setErrorMessage(null);

    const result = await login(email.trim().toLowerCase(), code);
    setLoading(false);

    if (result.ok) {
      navigation.replace('Home');
      return;
    }

    const { error } = result;
    if (error.code === 'RATE_LIMITED') {
      startCountdown(error.retryAfterSecs);
      setErrorMessage(
        `Too many attempts. Try again in ${error.retryAfterSecs} seconds.`,
      );
    } else if (error.code === 'INVITATION_CONVERTED') {
      navigation.navigate('AccountCreation');
    } else if (error.code === 'NETWORK_ERROR') {
      setErrorMessage('Network error. Please check your connection and try again.');
    } else {
      setErrorMessage('Invalid email or code. Please try again.');
    }
  }, [email, code, login, navigation, startCountdown]);

  const isSubmitDisabled = loading || !email.trim() || code.length < 7 || lockoutRemaining > 0;

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
          Enter Access Code
        </Text>
        <Text style={[styles.subtitle, { color: theme.colorScheme.onSurfaceVariant }]}>
          Enter your email address and the 7-digit code you received.
        </Text>

        <TextInput
          style={[
            styles.emailInput,
            {
              borderColor: theme.colorScheme.outline,
              color: theme.colorScheme.onSurface,
              backgroundColor: theme.colorScheme.surface,
            },
          ]}
          placeholder="Email address"
          placeholderTextColor={theme.colorScheme.onSurfaceVariant}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
          accessibilityLabel="Email address"
        />

        <View style={styles.codeWrapper}>
          <CodeInput value={code} onChange={setCode} disabled={loading} />
        </View>

        {errorMessage ? (
          <Text
            style={[styles.errorText, { color: theme.colorScheme.error }]}
            accessibilityRole="alert"
          >
            {lockoutRemaining > 0
              ? `Too many attempts. Try again in ${lockoutRemaining}s.`
              : errorMessage}
          </Text>
        ) : null}

        <TouchableOpacity
          style={[
            styles.submitButton,
            {
              backgroundColor: isSubmitDisabled
                ? theme.colorScheme.surfaceVariant
                : theme.colorScheme.primary,
              minHeight: 48,
            },
          ]}
          onPress={handleSubmit}
          disabled={isSubmitDisabled}
          accessibilityRole="button"
          accessibilityLabel="Submit access code"
          accessibilityState={{ disabled: isSubmitDisabled }}
        >
          {loading ? (
            <ActivityIndicator color={theme.colorScheme.onPrimary} />
          ) : (
            <Text
              style={[
                styles.submitLabel,
                {
                  color: isSubmitDisabled
                    ? theme.colorScheme.onSurfaceVariant
                    : theme.colorScheme.onPrimary,
                },
              ]}
            >
              Access
            </Text>
          )}
        </TouchableOpacity>
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
  codeWrapper: {
    alignItems: 'center',
    marginVertical: 8,
  },
  errorText: {
    fontSize: 13,
    textAlign: 'center',
  },
  submitButton: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitLabel: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 12,
  },
});
