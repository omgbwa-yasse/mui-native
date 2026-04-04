import { API_BASE } from './config';
import { clearToken, storeToken } from './storage';

export interface GuestLoginResponse {
  token: string;
  loginAttemptNumber: number;
  scope: string[];
  expiresAt: string;
}

export interface GuestMeResponse {
  invitationId: string;
  loginAttemptNumber: number;
  scope: string[];
  expiresAt: string;
}

export interface RateLimitedError {
  code: 'RATE_LIMITED';
  retryAfterSecs: number;
}

export type LoginError =
  | { code: 'RATE_LIMITED'; retryAfterSecs: number }
  | { code: 'INVITATION_CONVERTED' }
  | { code: 'INVALID_CREDENTIALS' }
  | { code: 'NETWORK_ERROR'; message: string };

async function parseError(res: Response): Promise<LoginError> {
  try {
    const body = (await res.json()) as { code?: string; retryAfterSecs?: number };
    if (body.code === 'RATE_LIMITED') {
      return { code: 'RATE_LIMITED', retryAfterSecs: body.retryAfterSecs ?? 900 };
    }
    if (body.code === 'INVITATION_CONVERTED') {
      return { code: 'INVITATION_CONVERTED' };
    }
    return { code: 'INVALID_CREDENTIALS' };
  } catch {
    return { code: 'INVALID_CREDENTIALS' };
  }
}

export async function login(
  email: string,
  code: string,
): Promise<{ ok: true; data: GuestLoginResponse } | { ok: false; error: LoginError }> {
  try {
    const res = await fetch(`${API_BASE}/auth/guest/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });

    if (!res.ok) {
      return { ok: false, error: await parseError(res) };
    }

    const data = (await res.json()) as GuestLoginResponse;
    await storeToken(data.token);
    return { ok: true, data };
  } catch (err) {
    return {
      ok: false,
      error: { code: 'NETWORK_ERROR', message: (err as Error).message },
    };
  }
}

export async function getMe(token: string): Promise<GuestMeResponse> {
  const res = await fetch(`${API_BASE}/auth/guest/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`GET /auth/guest/me failed: ${res.status}`);
  }
  return (await res.json()) as GuestMeResponse;
}

export async function logout(): Promise<void> {
  await clearToken();
}
