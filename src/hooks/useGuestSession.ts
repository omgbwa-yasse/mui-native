import { useCallback, useEffect, useState } from 'react';
import * as guestAuthService from '../services/guestAuthService';
import { clearToken, getStoredToken } from '../services/storage';

export interface GuestSession {
  invitationId: string;
  loginAttemptNumber: number;
  scope: string[];
  expiresAt: string;
}

export interface UseGuestSessionResult {
  token: string | null;
  session: GuestSession | null;
  isGuest: boolean;
  login: (
    email: string,
    code: string,
  ) => Promise<
    | { ok: true }
    | { ok: false; error: guestAuthService.LoginError }
  >;
  logout: () => Promise<void>;
}

export function useGuestSession(): UseGuestSessionResult {
  const [token, setToken] = useState<string | null>(null);
  const [session, setSession] = useState<GuestSession | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function restore() {
      const stored = await getStoredToken();
      if (!stored || cancelled) return;

      try {
        const me = await guestAuthService.getMe(stored);
        if (!cancelled) {
          setToken(stored);
          setSession({
            invitationId: me.invitationId,
            loginAttemptNumber: me.loginAttemptNumber,
            scope: me.scope,
            expiresAt: me.expiresAt,
          });
        }
      } catch {
        // Token expired or revoked — clear silently
        await clearToken();
      }
    }

    restore();
    return () => { cancelled = true; };
  }, []);

  const login = useCallback(
    async (email: string, code: string) => {
      const result = await guestAuthService.login(email, code);
      if (!result.ok) {
        return result;
      }
      const { data } = result;
      setToken(data.token);
      setSession({
        invitationId: '',
        loginAttemptNumber: data.loginAttemptNumber,
        scope: data.scope,
        expiresAt: data.expiresAt,
      });
      // Fetch full session details asynchronously
      guestAuthService.getMe(data.token).then((me) => {
        setSession({
          invitationId: me.invitationId,
          loginAttemptNumber: me.loginAttemptNumber,
          scope: me.scope,
          expiresAt: me.expiresAt,
        });
      }).catch(() => {/* ignore secondary fetch failure */});
      return { ok: true as const };
    },
    [],
  );

  const logout = useCallback(async () => {
    await guestAuthService.logout();
    setToken(null);
    setSession(null);
  }, []);

  return {
    token,
    session,
    isGuest: token !== null,
    login,
    logout,
  };
}
