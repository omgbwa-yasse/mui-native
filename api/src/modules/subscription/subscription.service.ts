import { getPool } from '../../db/index.js';
import { env } from '../../config/env.js';

export interface SubscriptionInfo {
  status: string;
  billingEnd: Date | null;
  multiAgentEnabled: boolean;
}

export async function getSubscription(userId: string): Promise<SubscriptionInfo | null> {
  const pool = getPool();
  const { rows } = await pool.query<{
    status: string;
    billing_end: Date | null;
    multi_agent_enabled: boolean;
  }>(
    `SELECT status, billing_end, multi_agent_enabled
       FROM subscription
      WHERE user_id = $1
      LIMIT 1`,
    [userId],
  );
  if (rows.length === 0) return null;
  const row = rows[0]!;
  return {
    status: row.status,
    billingEnd: row.billing_end,
    multiAgentEnabled: row.multi_agent_enabled,
  };
}

export async function isEligibleForMultiAgent(userId: string): Promise<boolean> {
  const sub = await getSubscription(userId);
  if (!sub) return false;
  return (
    sub.status === 'active' &&
    sub.multiAgentEnabled &&
    (sub.billingEnd === null || sub.billingEnd > new Date())
  );
}
