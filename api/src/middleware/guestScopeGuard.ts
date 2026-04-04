import type { Request, Response, NextFunction } from 'express';
import { verifyToken, type GuestTokenPayload } from '../shared/jwt.js';

/**
 * Routes on which guest access is never permitted (FR-011b).
 * Any guest JWT presenting scope without these actions will be blocked.
 */
const PRIVILEGED_ROUTES: Array<{ method: string; pattern: RegExp }> = [
  { method: 'POST', pattern: /^\/api\/v1\/projects/ },
  { method: 'POST', pattern: /^\/api\/v1\/documents/ },
  { method: 'POST', pattern: /^\/api\/v1\/invitations/ },
];

/**
 * Middleware that enforces scope restrictions on guest JWTs (FR-011b).
 *
 * Reads the `scope` array from the decoded guest JWT. Returns 403 SCOPE_INSUFFICIENT
 * if the guest attempts to access privileged routes (project-create, document-upload,
 * invitation-send). Transparently passes through for non-guest tokens.
 *
 * Must be registered after authGuard or guestRevocationGuard for authenticated routes.
 * Can also be registered as a standalone global middleware early in the stack.
 *
 * Depends on: T011 (jwt.ts), T014 (guestRevocationGuard.ts)
 */
export function guestScopeGuard(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    next();
    return;
  }

  const token = authHeader.slice(7);
  let payload: GuestTokenPayload | null = null;
  try {
    const decoded = verifyToken(token);
    if (decoded.type !== 'guest') {
      // Not a guest token — scope guard does not apply
      next();
      return;
    }
    payload = decoded;
  } catch {
    // Invalid/expired token — let downstream middleware handle 401
    next();
    return;
  }

  const isPrivileged = PRIVILEGED_ROUTES.some(
    (r) => r.method === req.method && r.pattern.test(req.path),
  );

  if (isPrivileged) {
    res.status(403).json({ error: 'SCOPE_INSUFFICIENT' });
    return;
  }

  // Attach payload for downstream middleware
  (req as Request & { guestPayload: GuestTokenPayload }).guestPayload = payload;
  next();
}
