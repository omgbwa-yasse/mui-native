import { randomUUID } from 'crypto';
import { getPool } from '../../db/index.js';

export interface AgentSessionRow {
  id: string;
  userId: string;
  documentSnapshot: string;
  wordCount: number;
  workerCount: number;
  status: string;
  synthesizedDocument: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export async function create(
  userId: string,
  documentSnapshot: string,
  wordCount: number,
  workerCount: number,
): Promise<AgentSessionRow> {
  const pool = getPool();
  const id = randomUUID();
  const { rows } = await pool.query<AgentSessionRow>(
    `INSERT INTO agent_session
       (id, user_id, document_snapshot, word_count, worker_count, status, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, 'pending', NOW(), NOW())
     RETURNING
       id,
       user_id AS "userId",
       document_snapshot AS "documentSnapshot",
       word_count AS "wordCount",
       worker_count AS "workerCount",
       status,
       synthesized_document AS "synthesizedDocument",
       created_at AS "createdAt",
       updated_at AS "updatedAt"`,
    [id, userId, documentSnapshot, wordCount, workerCount],
  );
  return rows[0]!;
}

export async function updateStatus(id: string, status: string): Promise<void> {
  const pool = getPool();
  await pool.query(
    `UPDATE agent_session SET status = $2, updated_at = NOW() WHERE id = $1`,
    [id, status],
  );
}

export async function setComplete(id: string, synthesizedDocument: string): Promise<void> {
  const pool = getPool();
  await pool.query(
    `UPDATE agent_session
        SET status = 'completed', synthesized_document = $2, updated_at = NOW()
      WHERE id = $1`,
    [id, synthesizedDocument],
  );
}

export async function getById(id: string): Promise<AgentSessionRow | null> {
  const pool = getPool();
  const { rows } = await pool.query<AgentSessionRow>(
    `SELECT
       id,
       user_id AS "userId",
       document_snapshot AS "documentSnapshot",
       word_count AS "wordCount",
       worker_count AS "workerCount",
       status,
       synthesized_document AS "synthesizedDocument",
       created_at AS "createdAt",
       updated_at AS "updatedAt"
     FROM agent_session
     WHERE id = $1`,
    [id],
  );
  return rows[0] ?? null;
}
