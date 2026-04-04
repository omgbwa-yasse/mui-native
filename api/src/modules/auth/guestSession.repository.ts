import { v4 as uuidv4 } from 'uuid';
import { getPool } from '../../db/index.js';

export interface GuestSession {
  id: string;
  invitationId: string;
  loginAttemptNumber: number;
  sessionToken: string | null;
  createdAt: Date;
  expiresAt: Date;
  revokedAt: Date | null;
  accessScope: string[];
}

function mapRow(row: Record<string, unknown>): GuestSession {
  return {
    id: row.id as string,
    invitationId: row.invitation_id as string,
    loginAttemptNumber: row.login_attempt_number as number,
    sessionToken: (row.session_token as string | null) ?? null,
    createdAt: new Date(row.created_at as string),
    expiresAt: new Date(row.expires_at as string),
    revokedAt: row.revoked_at ? new Date(row.revoked_at as string) : null,
    accessScope: row.access_scope as string[],
  };
}

export const guestSessionRepository = {
  async create(
    invitationId: string,
    loginAttemptNumber: number,
    sessionToken: string,
    accessScope: string[] = ['view', 'process', 'export'],
  ): Promise<GuestSession> {
    const pool = getPool();
    const { rows } = await pool.query<Record<string, unknown>>(
      `INSERT INTO guest_session
         (id, invitation_id, login_attempt_number, session_token, access_scope)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [uuidv4(), invitationId, loginAttemptNumber, sessionToken, accessScope],
    );
    return mapRow(rows[0]!);
  },

  async revokeByInvitationId(invitationId: string): Promise<void> {
    const pool = getPool();
    await pool.query(
      `UPDATE guest_session
       SET revoked_at = now()
       WHERE invitation_id = $1
         AND revoked_at IS NULL`,
      [invitationId],
    );
  },
};
