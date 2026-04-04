import { Router, type Request, type Response } from 'express';
import { authGuard, type AuthenticatedRequest } from '../../middleware/authGuard.js';
import { invitationService, InvitationNotFoundError, InvitationOwnershipError, InvitationAlreadyTerminalError } from './invitation.service.js';
import { z } from 'zod';

export const invitationRouter = Router();

const sendInvitationSchema = z.object({
  recipientEmail: z.string().email(),
});

/**
 * POST /api/v1/invitations
 * Send a new invitation to a recipient email.
 * Returns 201 with the invitation record + plain code (one-time display).
 */
invitationRouter.post('/', authGuard, async (req: Request, res: Response): Promise<void> => {
  const parsed = sendInvitationSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'VALIDATION_ERROR', details: parsed.error.issues });
    return;
  }

  const { recipientEmail } = parsed.data;
  const { userId } = req as AuthenticatedRequest;

  try {
    const { invitation, code } = await invitationService.sendInvitation(userId, recipientEmail);
    res.status(201).json({ invitation, code });
  } catch (err) {
    console.error('Failed to send invitation', err);
    res.status(500).json({ error: 'INTERNAL_ERROR' });
  }
});

/**
 * GET /api/v1/invitations
 * List all invitations sent by the authenticated user (paginated).
 * Query params: status, page, pageSize
 */
invitationRouter.get('/', authGuard, async (req: Request, res: Response): Promise<void> => {
  const { userId } = req as AuthenticatedRequest;
  const page = Math.max(1, parseInt((req.query.page as string) ?? '1', 10));
  const pageSize = Math.min(100, Math.max(1, parseInt((req.query.pageSize as string) ?? '20', 10)));
  const status = req.query.status as string | undefined;

  const validStatuses = ['active', 'revoked', 'expired', 'converted'];
  if (status && !validStatuses.includes(status)) {
    res.status(400).json({ error: 'INVALID_STATUS' });
    return;
  }

  try {
    const result = await invitationService.getByInviter(userId, {
      status: status as 'active' | 'revoked' | 'expired' | 'converted' | undefined,
      page,
      pageSize,
    });
    res.json(result);
  } catch (err) {
    console.error('Failed to list invitations', err);
    res.status(500).json({ error: 'INTERNAL_ERROR' });
  }
});

/**
 * DELETE /api/v1/invitations/:id
 * Revoke a specific invitation. Ownership enforced.
 */
invitationRouter.delete('/:id', authGuard, async (req: Request, res: Response): Promise<void> => {
  const { userId } = req as AuthenticatedRequest;
  const { id } = req.params;

  try {
    const updated = await invitationService.revoke(userId, id);
    res.json({ invitation: updated });
  } catch (err) {
    if (err instanceof InvitationNotFoundError) {
      res.status(404).json({ error: 'NOT_FOUND' });
    } else if (err instanceof InvitationOwnershipError) {
      res.status(403).json({ error: 'FORBIDDEN' });
    } else if (err instanceof InvitationAlreadyTerminalError) {
      res.status(409).json({ error: 'ALREADY_TERMINAL', message: (err as Error).message });
    } else {
      console.error('Failed to revoke invitation', err);
      res.status(500).json({ error: 'INTERNAL_ERROR' });
    }
  }
});
