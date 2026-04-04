import { useState, useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { API_BASE } from '../services/config';

export interface SubscriptionState {
  isActive: boolean;
  multiAgentEnabled: boolean;
  billingEnd: string | null;
  loading: boolean;
  error: string | null;
}

const TTL_MS = 60_000; // 60 s cache

/**
 * Fetches GET /subscriptions/me and caches the result for 60 s.
 * Re-fetches on screen focus.
 */
export function useSubscription(userToken: string): SubscriptionState & { refresh: () => void } {
  const [state, setState] = useState<SubscriptionState>({
    isActive: false,
    multiAgentEnabled: false,
    billingEnd: null,
    loading: true,
    error: null,
  });

  const lastFetchedAt = useRef<number>(0);

  const fetchSubscription = useCallback(async () => {
    const now = Date.now();
    if (now - lastFetchedAt.current < TTL_MS) return;

    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const resp = await fetch(`${API_BASE}/subscriptions/me`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}`);
      }

      const data = (await resp.json()) as {
        status: string;
        billingEnd: string | null;
        multiAgentEnabled: boolean;
      };

      lastFetchedAt.current = Date.now();

      setState({
        isActive: data.status === 'active',
        multiAgentEnabled: data.multiAgentEnabled,
        billingEnd: data.billingEnd,
        loading: false,
        error: null,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'NETWORK_ERROR';
      setState((prev) => ({ ...prev, loading: false, error: message }));
    }
  }, [userToken]);

  useFocusEffect(
    useCallback(() => {
      void fetchSubscription();
    }, [fetchSubscription]),
  );

  return { ...state, refresh: () => { lastFetchedAt.current = 0; void fetchSubscription(); } };
}
