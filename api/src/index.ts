import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { invitationRouter } from './modules/invitation/invitation.controller.js';
import { guestAuthRouter } from './modules/auth/guestAuth.controller.js';
import agentRouter from './modules/agent/agent.controller.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});

// Routes
app.use('/api/v1/invitations', invitationRouter);
app.use('/api/v1/auth/guest', guestAuthRouter);
app.use('/api/v1/agent', agentRouter);

// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'NOT_FOUND' });
});

app.listen(env.PORT, () => {
  console.log(`[api] listening on http://localhost:${env.PORT}`);
});

export default app;
