import type { Request, Response, NextFunction } from 'express';
import { getRedis } from '../shared/redis.js';
import { env } from '../config/env.js';

const LOCKOUT_AFTER = env.RATE_LIMIT_LOGIN_MAX;
const WINDOW_SECS = env.RATE_LIMIT_LOGIN_WINDOW_SECS;

/**
 * Returns the current failure count for the given email key.
 * Returns null if not currently rate-limited (no lockout).
 */
export async function checkRateLimit(email: string): Promise<{ limited: boolean; ttl: number }> {
  const redis = getRedis();
  const key = `ratelimit:login:${email.toLowerCase()}`;
  const [countStr, ttl] = await Promise.all([redis.get(key), redis.ttl(key)]);
  const count = countStr ? parseInt(countStr, 10) : 0;
  return { limited: count >= LOCKOUT_AFTER, ttl: Math.max(ttl, 0) };
}

/**
 * Records a failed login attempt. Returns the new count and whether user is now locked out.
 */
export async function recordFailedAttempt(
  email: string,
): Promise<{ count: number; lockoutTtl: number }> {
  const redis = getRedis();
  const key = `ratelimit:login:${email.toLowerCase()}`;

  const multi = redis.multi();
  multi.incr(key);
  multi.expire(key, WINDOW_SECS, 'NX'); // Only set expiry if not already set
  const results = await multi.exec();

  const count = results?.[0]?.[1] ? Number(results[0][1]) : 1;
  const ttl = await redis.ttl(key);

  return { count, lockoutTtl: count >= LOCKOUT_AFTER ? Math.max(ttl, 0) : 0 };
}

/**
 * Clears the rate-limit key on successful login.
 */
export async function clearRateLimit(email: string): Promise<void> {
  const redis = getRedis();
  await redis.del(`ratelimit:login:${email.toLowerCase()}`);
}

/**
 * Express middleware factory for rate-limiting a specific email field in request body.
 * For use with login endpoint.
 */
export function rateLimiterMiddleware() {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const email = (req.body as Record<string, unknown>).email;
    if (typeof email !== 'string') {
      res.status(400).json({ error: 'EMAIL_REQUIRED' });
      return;
    }

    const { limited, ttl } = await checkRateLimit(email);
    if (limited) {
      res.status(429).json({ error: 'RATE_LIMITED', retryAfterSecs: ttl });
      return;
    }
    next();
  };
}
