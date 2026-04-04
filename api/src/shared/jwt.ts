import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export interface UserTokenPayload {
  sub: string; // userId
  type: 'user';
  iat: number;
  exp: number;
}

export interface GuestTokenPayload {
  sub: string; // invitationId
  type: 'guest';
  loginAttemptNumber: number;
  scope: string[];
  iat: number;
  exp: number;
}

export type TokenPayload = UserTokenPayload | GuestTokenPayload;

export function signUserToken(userId: string): string {
  return jwt.sign({ sub: userId, type: 'user' }, env.JWT_SECRET, {
    expiresIn: env.JWT_USER_EXPIRY,
  });
}

export function signGuestToken(
  invitationId: string,
  loginAttemptNumber: number,
  scope: string[],
): string {
  return jwt.sign(
    { sub: invitationId, type: 'guest', loginAttemptNumber, scope },
    env.JWT_SECRET,
    { expiresIn: env.JWT_GUEST_EXPIRY },
  );
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
}
