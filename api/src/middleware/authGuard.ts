import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../shared/jwt.js';

export interface AuthenticatedRequest extends Request {
  userId: string;
}

/**
 * Middleware that verifies a user JWT and attaches userId to the request.
 */
export function authGuard(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'UNAUTHORIZED' });
    return;
  }

  const token = authHeader.slice(7);
  try {
    const payload = verifyToken(token);
    if (payload.type !== 'user') {
      res.status(401).json({ error: 'USER_TOKEN_REQUIRED' });
      return;
    }
    (req as AuthenticatedRequest).userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ error: 'INVALID_TOKEN' });
  }
}
