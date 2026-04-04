import type { Request, Response, NextFunction } from 'express';
import { verifyToken, type GuestTokenPayload } from '../shared/jwt.js';
import { getPool } from '../db/index.js';

export interface GuestAuthenticatedRequest extends Request {
  guestPayload: GuestTokenPayload;
}

/**
 * Middleware that verifies a guest JWT and checks that the underlying invitation
 * has not been revoked or expired. Rejects with 401 if the invitation status
 * is anything other than 'active'.
 *
 * Depends on: T011 (jwt.ts), T007 (db/index.ts)
 */
export async function guestRevocationGuard(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'UNAUTHORIZED' });
    return;
  }

  const token = authHeader.slice(7);
  let payload: GuestTokenPayload;

  try {
    const decoded = verifyToken(token);
    if (decoded.type !== 'guest') {
      res.status(401).json({ error: 'GUEST_TOKEN_REQUIRED' });
      return;
    }
    payload = decoded;
  } catch {
    res.status(401).json({ error: 'INVALID_TOKEN' });
    return;
  }

  // Check live invitation status
  const pool = getPool();
  const { rows } = await pool.query<{ status: string }>(
    'SELECT status FROM invitation WHERE id = $1',
    [payload.sub],
  );

  const invitation = rows[0];
  if (!invitation) {
    res.status(401).json({ error: 'INVITATION_NOT_FOUND' });
    return;
  }

  if (invitation.status === 'revoked') {
    res.status(401).json({ error: 'INVITATION_REVOKED' });
    return;
  }

  if (invitation.status === 'expired') {
    res.status(401).json({ error: 'INVITATION_EXPIRED' });
    return;
  }

  if (invitation.status === 'converted') {
    res.status(401).json({ error: 'INVITATION_CONVERTED' });
    return;
  }

  (req as GuestAuthenticatedRequest).guestPayload = payload;
  next();
}
