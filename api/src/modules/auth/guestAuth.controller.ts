import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import { guestAuthService, RateLimitedError, InvalidCredentialsError, InvitationConvertedError } from './guestAuth.service.js';
import { guestRevocationGuard, type GuestAuthenticatedRequest } from '../../middleware/guestRevocationGuard.js';

export const guestAuthRouter = Router();

const loginSchema = z.object({
  email: z.string().email(),
  code: z.string().length(7).regex(/^\d{7}$/),
});

/**
 * POST /api/v1/auth/guest/login
 * Authenticate with email + 7-digit invitation code.
 *
 * Error codes:
 * - 429 RATE_LIMITED with retryAfterSecs
 * - 401 INVITATION_CONVERTED — 11th attempt; prompt account creation
 * - 401 INVALID_CREDENTIALS — generic failure (wrong email/code)
 */
guestAuthRouter.post('/login', async (req: Request, res: Response): Promise<void> => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'VALIDATION_ERROR', details: parsed.error.issues });
    return;
  }

  const { email, code } = parsed.data;

  try {
    const result = await guestAuthService.login(email, code);
    res.json({
      token: result.token,
      loginAttemptNumber: result.loginAttemptNumber,
      scope: result.scope,
      expiresAt: result.expiresAt.toISOString(),
    });
  } catch (err) {
    if (err instanceof RateLimitedError) {
      res.status(429).json({ error: 'RATE_LIMITED', retryAfterSecs: err.retryAfterSecs });
    } else if (err instanceof InvitationConvertedError) {
      res.status(401).json({ error: 'INVITATION_CONVERTED' });
    } else if (err instanceof InvalidCredentialsError) {
      res.status(401).json({ error: 'INVALID_CREDENTIALS' });
    } else {
      console.error('Guest login error', err);
      res.status(500).json({ error: 'INTERNAL_ERROR' });
    }
  }
});

/**
 * GET /api/v1/auth/guest/me
 * Returns email, loginAttemptNumber, scope, expiresAt from JWT claims.
 * Protected by guestRevocationGuard (checks live invitation status).
 */
guestAuthRouter.get('/me', guestRevocationGuard, (req: Request, res: Response): void => {
  const { guestPayload } = req as GuestAuthenticatedRequest;
  const expiresAt = new Date(guestPayload.exp * 1000).toISOString();
  res.json({
    invitationId: guestPayload.sub,
    loginAttemptNumber: guestPayload.loginAttemptNumber,
    scope: guestPayload.scope,
    expiresAt,
  });
});
