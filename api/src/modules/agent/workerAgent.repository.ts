import { randomUUID } from 'crypto';
import { getPool } from '../../db/index.js';
import type { Section } from './orchestrator.interface.js';

export interface WorkerAgentRow {
  id: string;
  agentSessionId: string;
  sectionIndex: number;
  status: string;
  progressPercent: number;
  partialOutput: string | null;
  finalOutput: string | null;
  error: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export async function createBulk(
  agentSessionId: string,
  sections: Section[],
): Promise<WorkerAgentRow[]> {
  const pool = getPool();
  const values: unknown[] = [];
  const placeholders = sections.map((section, i) => {
    const id = randomUUID();
    const base = i * 4;
    values.push(id, agentSessionId, section.index, 'pending');
    return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, NOW(), NOW())`;
  });

  const { rows } = await pool.query<WorkerAgentRow>(
    `INSERT INTO worker_agent
       (id, agent_session_id, section_index, status, created_at, updated_at)
     VALUES ${placeholders.join(', ')}
     RETURNING
       id,
       agent_session_id AS "agentSessionId",
       section_index AS "sectionIndex",
       status,
       progress_percent AS "progressPercent",
       partial_output AS "partialOutput",
       final_output AS "finalOutput",
       error,
       created_at AS "createdAt",
       updated_at AS "updatedAt"`,
    values,
  );
  return rows;
}

export async function updateProgress(
  id: string,
  progressPercent: number,
  partialOutput?: string,
): Promise<void> {
  const pool = getPool();
  await pool.query(
    `UPDATE worker_agent
        SET status = 'running',
            progress_percent = $2,
            partial_output = COALESCE($3, partial_output),
            updated_at = NOW()
      WHERE id = $1`,
    [id, progressPercent, partialOutput ?? null],
  );
}

export async function setComplete(id: string, finalOutput: string): Promise<void> {
  const pool = getPool();
  await pool.query(
    `UPDATE worker_agent
        SET status = 'completed', progress_percent = 100, final_output = $2, updated_at = NOW()
      WHERE id = $1`,
    [id, finalOutput],
  );
}

export async function setFailed(id: string, error: string): Promise<void> {
  const pool = getPool();
  await pool.query(
    `UPDATE worker_agent
        SET status = 'failed', error = $2, updated_at = NOW()
      WHERE id = $1`,
    [id, error],
  );
}

export async function getBySession(agentSessionId: string): Promise<WorkerAgentRow[]> {
  const pool = getPool();
  const { rows } = await pool.query<WorkerAgentRow>(
    `SELECT
       id,
       agent_session_id AS "agentSessionId",
       section_index AS "sectionIndex",
       status,
       progress_percent AS "progressPercent",
       partial_output AS "partialOutput",
       final_output AS "finalOutput",
       error,
       created_at AS "createdAt",
       updated_at AS "updatedAt"
     FROM worker_agent
     WHERE agent_session_id = $1
     ORDER BY section_index`,
    [agentSessionId],
  );
  return rows;
}
