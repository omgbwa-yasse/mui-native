/**
 * Agent session controller.
 *
 * Routes:
 *  T039  POST   /api/v1/agent/sessions          — start session
 *  T040  GET    /api/v1/agent/sessions/:id/progress — SSE stream
 *  T041  GET    /api/v1/agent/sessions/:id          — poll status
 *  T042  GET    /api/v1/agent/sessions/:id/report   — humanization report
 */
import { Router, type Request, type Response, type NextFunction } from 'express';
import { Queue } from 'bullmq';
import { z } from 'zod';
import { env } from '../../config/env.js';
import { getRedis } from '../../shared/redis.js';
import { authGuard } from '../../middleware/authGuard.js';
import { subscriptionGuard } from '../../middleware/subscriptionGuard.js';
import * as agentSessionRepo from './agentSession.repository.js';
import * as workerAgentRepo from './workerAgent.repository.js';
import * as progressEmitter from './progressEmitter.js';
import { agentCountFromWordCount } from './agentCount.js';
import { detectSections } from './sectionDetector.js';
import { pool } from '../../db/index.js';

const router = Router();

// ---------------------------------------------------------------------------
// BullMQ queue (lazy-init to avoid connecting at module load time)
// ---------------------------------------------------------------------------
let agentQueue: Queue | null = null;

function getQueue(): Queue {
  if (!agentQueue) {
    agentQueue = new Queue(env.BULLMQ_QUEUE_NAME, {
      connection: getRedis(),
    });
  }
  return agentQueue;
}

// ---------------------------------------------------------------------------
// T039  POST /api/v1/agent/sessions
// ---------------------------------------------------------------------------
const submitSchema = z.object({
  document: z
    .string()
    .min(1, { message: 'DOCUMENT_EMPTY' })
    .max(50_000, { message: 'DOCUMENT_TOO_LONG' }),
});

router.post(
  '/sessions',
  authGuard,
  subscriptionGuard,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parse = submitSchema.safeParse(req.body);
      if (!parse.success) {
        const code = parse.error.issues[0]?.message ?? 'INVALID_BODY';
        const status = code === 'DOCUMENT_TOO_LONG' ? 400 : 400;
        res.status(status).json({ error: code });
        return;
      }

      const { document } = parse.data;
      const userId: string = (req as Request & { userId: string }).userId;

      // Determine session shape
      const sections = detectSections(document);
      const totalWordCount = sections.reduce((s, sec) => s + sec.wordCount, 0);
      const workerCount = agentCountFromWordCount(totalWordCount);

      // Persist session + worker rows
      const session = await agentSessionRepo.create(
        userId,
        document,
        totalWordCount,
        workerCount,
      );
      const workers = await workerAgentRepo.createBulk(session.id, sections.slice(0, workerCount));

      // Enqueue async orchestration
      await getQueue().add(
        'orchestrate',
        {
          sessionId: session.id,
          document,
          workerIds: workers.map((w) => w.id),
        },
        {
          attempts: 1,
          removeOnComplete: true,
          removeOnFail: false,
        },
      );

      res.status(202).json({
        sessionId: session.id,
        wordCount: totalWordCount,
        workerCount,
        status: session.status,
        startedAt: session.createdAt,
        progressStreamUrl: `/api/v1/agent/sessions/${session.id}/progress`,
      });
    } catch (err) {
      next(err);
    }
  },
);

// ---------------------------------------------------------------------------
// T040  GET /api/v1/agent/sessions/:id/progress  — SSE
// ---------------------------------------------------------------------------
router.get(
  '/sessions/:id/progress',
  authGuard,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId: string = (req as Request & { userId: string }).userId;

      const session = await agentSessionRepo.getById(id);
      if (!session) {
        res.status(404).json({ error: 'NOT_FOUND' });
        return;
      }
      if (session.userId !== userId) {
        res.status(403).json({ error: 'FORBIDDEN' });
        return;
      }
      if (session.status === 'completed') {
        res.status(410).json({ error: 'GONE' });
        return;
      }

      progressEmitter.subscribe(id, res);
      // Cleanup when the client disconnects is handled inside subscribe()
    } catch (err) {
      next(err);
    }
  },
);

// ---------------------------------------------------------------------------
// T041  GET /api/v1/agent/sessions/:id  — poll status
// ---------------------------------------------------------------------------
router.get(
  '/sessions/:id',
  authGuard,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId: string = (req as Request & { userId: string }).userId;

      const session = await agentSessionRepo.getById(id);
      if (!session) {
        res.status(404).json({ error: 'NOT_FOUND' });
        return;
      }
      if (session.userId !== userId) {
        res.status(403).json({ error: 'FORBIDDEN' });
        return;
      }

      const workers = await workerAgentRepo.getBySession(id);

      res.json({
        sessionId: session.id,
        wordCount: session.wordCount,
        workerCount: session.workerCount,
        status: session.status,
        startedAt: session.createdAt,
        completedAt: session.completedAt ?? null,
        workers: workers.map((w) => ({
          workerId: w.id,
          sectionIndex: w.sectionIndex,
          status: w.status,
          progressPercent: w.progressPercent,
        })),
      });
    } catch (err) {
      next(err);
    }
  },
);

// ---------------------------------------------------------------------------
// T042  GET /api/v1/agent/sessions/:id/report
// ---------------------------------------------------------------------------
router.get(
  '/sessions/:id/report',
  authGuard,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId: string = (req as Request & { userId: string }).userId;

      const session = await agentSessionRepo.getById(id);
      if (!session) {
        res.status(404).json({ error: 'NOT_FOUND' });
        return;
      }
      if (session.userId !== userId) {
        res.status(403).json({ error: 'FORBIDDEN' });
        return;
      }
      if (session.status !== 'completed') {
        res.status(409).json({ error: 'NOT_COMPLETE' });
        return;
      }

      const result = await pool.query<{
        id: string;
        agent_session_id: string;
        synthesized_document: string;
        flesch_kincaid_before: number;
        flesch_kincaid_after: number;
        readability_label: string;
        ai_risk_reduction_percent: number;
        transformations_applied: unknown;
        highlighted_sections: unknown;
        generated_at: Date;
      }>(
        `SELECT * FROM humanization_report WHERE agent_session_id = $1 LIMIT 1`,
        [id],
      );

      if (result.rows.length === 0) {
        res.status(404).json({ error: 'NOT_FOUND' });
        return;
      }

      const row = result.rows[0];
      res.json({
        reportId: row.id,
        sessionId: row.agent_session_id,
        synthesizedDocument: row.synthesized_document,
        fleschKincaidBefore: row.flesch_kincaid_before,
        fleschKincaidAfter: row.flesch_kincaid_after,
        readabilityLabel: row.readability_label,
        aiRiskReductionPercent: row.ai_risk_reduction_percent,
        transformationsApplied: row.transformations_applied,
        highlightedSections: row.highlighted_sections,
        generatedAt: row.generated_at,
      });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
