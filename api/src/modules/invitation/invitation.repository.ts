import { v4 as uuidv4 } from 'uuid';
import { getPool } from '../../db/index.js';

export type InvitationStatus = 'active' | 'revoked' | 'expired' | 'converted';

export interface Invitation {
  id: string;
  inviterId: string;
  recipientEmail: string;
  codeHash: string;
  loginCount: number;
  status: InvitationStatus;
  createdAt: Date;
  expiresAt: Date;
  revokedAt: Date | null;
  convertedAt: Date | null;
}

export interface InvitationFilters {
  status?: InvitationStatus;
  page?: number;
  pageSize?: number;
}

export interface PaginatedInvitations {
  data: Invitation[];
  total: number;
  page: number;
  pageSize: number;
}

function mapRow(row: Record<string, unknown>): Invitation {
  return {
    id: row.id as string,
    inviterId: row.inviter_id as string,
    recipientEmail: row.recipient_email as string,
    codeHash: row.code_hash as string,
    loginCount: row.login_count as number,
    status: row.status as InvitationStatus,
    createdAt: new Date(row.created_at as string),
    expiresAt: new Date(row.expires_at as string),
    revokedAt: row.revoked_at ? new Date(row.revoked_at as string) : null,
    convertedAt: row.converted_at ? new Date(row.converted_at as string) : null,
  };
}

export const invitationRepository = {
  async create(inviterId: string, recipientEmail: string, codeHash: string): Promise<Invitation> {
    const pool = getPool();
    const { rows } = await pool.query<Record<string, unknown>>(
      `INSERT INTO invitation (id, inviter_id, recipient_email, code_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [uuidv4(), inviterId, recipientEmail.toLowerCase(), codeHash],
    );
    return mapRow(rows[0]!);
  },

  /**
   * Finds an active invitation by recipient email.
   * Lazily transitions status → 'expired' if expiresAt < NOW() on first read (covers FR-008).
   */
  async findActiveByEmail(email: string): Promise<Invitation | null> {
    const pool = getPool();

    // First lazily expire any overdue active invitations for this email
    await pool.query(
      `UPDATE invitation
       SET status = 'expired'
       WHERE recipient_email = $1
         AND status = 'active'
         AND expires_at < now()`,
      [email.toLowerCase()],
    );

    const { rows } = await pool.query<Record<string, unknown>>(
      `SELECT * FROM invitation
       WHERE recipient_email = $1
         AND status = 'active'
       ORDER BY created_at DESC
       LIMIT 1`,
      [email.toLowerCase()],
    );

    return rows[0] ? mapRow(rows[0]) : null;
  },

  async findById(id: string): Promise<Invitation | null> {
    const pool = getPool();
    const { rows } = await pool.query<Record<string, unknown>>(
      'SELECT * FROM invitation WHERE id = $1',
      [id],
    );
    return rows[0] ? mapRow(rows[0]) : null;
  },

  /**
   * Atomically increments loginCount using SELECT … FOR UPDATE to prevent
   * concurrent 10th-use races. Must be called within a transaction via the
   * GuestAuthService.login flow.
   */
  async incrementLoginCount(
    id: string,
  ): Promise<{ loginCount: number; atLimit: boolean }> {
    const pool = getPool();
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const { rows } = await client.query<Record<string, unknown>>(
        'SELECT login_count, status FROM invitation WHERE id = $1 FOR UPDATE',
        [id],
      );
      const row = rows[0];
      if (!row) throw new Error(`Invitation ${id} not found`);

      const currentCount = row.login_count as number;
      if (currentCount >= 10) {
        await client.query('ROLLBACK');
        return { loginCount: currentCount, atLimit: true };
      }

      const newCount = currentCount + 1;
      const atLimit = newCount >= 10;

      await client.query(
        `UPDATE invitation
         SET login_count = $2,
             status = CASE WHEN $2 >= 10 THEN 'converted'::invitation_status ELSE status END
         WHERE id = $1`,
        [id, newCount],
      );

      await client.query('COMMIT');
      return { loginCount: newCount, atLimit };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },

  async setStatus(id: string, status: InvitationStatus): Promise<void> {
    const pool = getPool();
    const revokedAt = status === 'revoked' ? 'now()' : 'revoked_at';
    const convertedAt = status === 'converted' ? 'now()' : 'converted_at';
    await pool.query(
      `UPDATE invitation
       SET status = $2,
           revoked_at = ${revokedAt},
           converted_at = ${convertedAt}
       WHERE id = $1`,
      [id, status],
    );
  },

  async findByInviter(
    inviterId: string,
    filters: InvitationFilters = {},
  ): Promise<PaginatedInvitations> {
    const pool = getPool();
    const { status, page = 1, pageSize = 20 } = filters;
    const offset = (page - 1) * pageSize;

    const params: unknown[] = [inviterId];
    let whereClause = 'WHERE inviter_id = $1';
    if (status) {
      params.push(status);
      whereClause += ` AND status = $${params.length}`;
    }

    const [countResult, dataResult] = await Promise.all([
      pool.query<{ count: string }>(
        `SELECT COUNT(*)::text AS count FROM invitation ${whereClause}`,
        params,
      ),
      pool.query<Record<string, unknown>>(
        `SELECT * FROM invitation ${whereClause}
         ORDER BY created_at DESC
         LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
        [...params, pageSize, offset],
      ),
    ]);

    return {
      data: dataResult.rows.map(mapRow),
      total: parseInt(countResult.rows[0]?.count ?? '0', 10),
      page,
      pageSize,
    };
  },
};
