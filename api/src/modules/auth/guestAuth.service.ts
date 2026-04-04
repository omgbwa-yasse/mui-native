import { invitationRepository } from '../invitation/invitation.repository.js';
import { guestSessionRepository } from './guestSession.repository.js';
import { verifyCode } from '../../shared/crypto.js';
import { signGuestToken, verifyToken, type GuestTokenPayload } from '../../shared/jwt.js';
import {
  checkRateLimit,
  recordFailedAttempt,
  clearRateLimit,
} from '../../middleware/rateLimiter.js';

const DEFAULT_SCOPE = ['view', 'process', 'export'];

export class RateLimitedError extends Error {
  constructor(public readonly retryAfterSecs: number) {
    super('Too many failed attempts');
    this.name = 'RateLimitedError';
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid email or code');
    this.name = 'InvalidCredentialsError';
  }
}

export class InvitationConvertedError extends Error {
  constructor() {
    super('Invitation has been fully used. Please create an account.');
    this.name = 'InvitationConvertedError';
  }
}

export const guestAuthService = {
  /**
   * Authenticates a guest using email + code.
   * Uses SELECT ... FOR UPDATE (inside incrementLoginCount) to prevent concurrent 10th-use races.
   * Issues a guest JWT with scope from invitation's current access_scope.
   */
  async login(
    email: string,
    code: string,
  ): Promise<{ token: string; loginAttemptNumber: number; scope: string[]; expiresAt: Date }> {
    // 1. Rate limit check
    const { limited, ttl } = await checkRateLimit(email);
    if (limited) throw new RateLimitedError(ttl);

    // 2. Find active invitation for this email
    const invitation = await invitationRepository.findActiveByEmail(email.toLowerCase());
    if (!invitation) {
      await recordFailedAttempt(email);
      throw new InvalidCredentialsError();
    }

    // 3. Verify code
    const codeValid = await verifyCode(code, invitation.codeHash);
    if (!codeValid) {
      await recordFailedAttempt(email);
      throw new InvalidCredentialsError();
    }

    // 4. Atomically increment loginCount (SELECT ... FOR UPDATE inside)
    const { loginCount, atLimit } = await invitationRepository.incrementLoginCount(invitation.id);

    if (atLimit && loginCount > 10) {
      // The 11th+ attempt: invitation is now converted, block with account creation prompt
      throw new InvitationConvertedError();
    }

    // 5. Clear rate-limit on success
    await clearRateLimit(email);

    // 6. Issue guest JWT
    const scope = DEFAULT_SCOPE;
    const token = signGuestToken(invitation.id, loginCount, scope);

    // 7. Persist session record
    await guestSessionRepository.create(invitation.id, loginCount, token, scope);

    // Calculate expiry (24h from now)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    return { token, loginAttemptNumber: loginCount, scope, expiresAt };
  },

  /**
   * Decodes a guest token and returns its claims.
   * Does not check live revocation (guestRevocationGuard middleware handles that).
   */
  async getSession(token: string): Promise<GuestTokenPayload> {
    const payload = verifyToken(token);
    if (payload.type !== 'guest') {
      throw new InvalidCredentialsError();
    }
    return payload;
  },
};
