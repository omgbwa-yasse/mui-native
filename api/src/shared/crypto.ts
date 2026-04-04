import bcrypt from 'bcrypt';
import { randomInt } from 'crypto';

const BCRYPT_COST = 12;
const CODE_MIN = 1_000_000;
const CODE_MAX = 9_999_999;

/**
 * Generates a 7-digit cryptographically random invitation code
 * as a zero-padded string (e.g. "1234567").
 */
export function generateInvitationCode(): string {
  return String(randomInt(CODE_MIN, CODE_MAX + 1)).padStart(7, '0');
}

/**
 * Hashes a 7-digit invitation code using bcrypt cost=12.
 */
export async function hashCode(code: string): Promise<string> {
  return bcrypt.hash(code, BCRYPT_COST);
}

/**
 * Verifies a plain-text code against a bcrypt hash.
 */
export async function verifyCode(code: string, hash: string): Promise<boolean> {
  return bcrypt.compare(code, hash);
}
