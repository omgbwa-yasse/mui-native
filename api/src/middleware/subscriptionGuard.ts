import type { NextFunction, Request, Response } from 'express';
import type { AuthenticatedRequest } from './authGuard.js';
import { isEligibleForMultiAgent } from '../modules/subscription/subscription.service.js';

export async function subscriptionGuard(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const userId = (req as AuthenticatedRequest).userId;
  if (!userId) {
    res.status(401).json({ code: 'UNAUTHENTICATED', message: 'Authentication required.' });
    return;
  }

  const eligible = await isEligibleForMultiAgent(userId);
  if (!eligible) {
    res.status(403).json({
      code: 'SUBSCRIPTION_REQUIRED',
      message: 'An active subscription with multi-agent access is required.',
    });
    return;
  }

  next();
}
