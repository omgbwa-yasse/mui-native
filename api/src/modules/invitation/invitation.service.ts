import { invitationRepository, type InvitationFilters, type PaginatedInvitations, type Invitation } from './invitation.repository.js';
import { guestSessionRepository } from '../auth/guestSession.repository.js';
import { generateInvitationCode, hashCode } from '../../shared/crypto.js';
import { sendInvitationEmail } from '../../shared/email.js';

export class InvitationNotFoundError extends Error {
  constructor(id: string) {
    super(`Invitation ${id} not found`);
    this.name = 'InvitationNotFoundError';
  }
}

export class InvitationOwnershipError extends Error {
  constructor() {
    super('You do not own this invitation');
    this.name = 'InvitationOwnershipError';
  }
}

export class InvitationAlreadyTerminalError extends Error {
  constructor(status: string) {
    super(`Invitation is already ${status}`);
    this.name = 'InvitationAlreadyTerminalError';
  }
}

export const invitationService = {
  /**
   * Generates a 7-digit code, hashes it, persists the invitation and sends the email.
   * Returns the plain code so the inviter can show it once in the UI.
   */
  async sendInvitation(
    inviterId: string,
    recipientEmail: string,
  ): Promise<{ invitation: Invitation; code: string }> {
    const code = generateInvitationCode();
    const codeHash = await hashCode(code);
    const invitation = await invitationRepository.create(inviterId, recipientEmail, codeHash);
    await sendInvitationEmail(recipientEmail, code);
    return { invitation, code };
  },

  /**
   * Returns a paginated list of invitations sent by the given inviter.
   */
  async getByInviter(inviterId: string, filters: InvitationFilters = {}): Promise<PaginatedInvitations> {
    return invitationRepository.findByInviter(inviterId, filters);
  },

  /**
   * Revokes an invitation by ID. Checks ownership before revoking.
   * Also revokes all active guest sessions tied to this invitation.
   */
  async revoke(inviterId: string, invitationId: string): Promise<Invitation> {
    const invitation = await invitationRepository.findById(invitationId);
    if (!invitation) throw new InvitationNotFoundError(invitationId);
    if (invitation.inviterId !== inviterId) throw new InvitationOwnershipError();
    if (invitation.status !== 'active') throw new InvitationAlreadyTerminalError(invitation.status);

    await Promise.all([
      invitationRepository.setStatus(invitationId, 'revoked'),
      guestSessionRepository.revokeByInvitationId(invitationId),
    ]);

    return { ...invitation, status: 'revoked', revokedAt: new Date() };
  },
};
