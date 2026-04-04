import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),

  // Database
  DATABASE_URL: z.string().url(),

  // Redis
  REDIS_URL: z.string().url(),

  // JWT
  JWT_SECRET: z.string().min(32),
  JWT_USER_EXPIRY: z.string().default('7d'),
  JWT_GUEST_EXPIRY: z.string().default('24h'),

  // Email
  EMAIL_FROM: z.string().email(),
  EMAIL_HOST: z.string().optional(),
  EMAIL_PORT: z.coerce.number().int().positive().optional(),
  EMAIL_USER: z.string().optional(),
  EMAIL_PASS: z.string().optional(),

  // AI
  AI_PROVIDER_API_KEY: z.string().min(1).optional(),
  AI_PROVIDER_URL: z.string().url().optional(),

  // Rate limiting
  RATE_LIMIT_LOGIN_MAX: z.coerce.number().int().positive().default(5),
  RATE_LIMIT_LOGIN_WINDOW_SECS: z.coerce.number().int().positive().default(900),

  // BullMQ
  BULLMQ_QUEUE_NAME: z.string().default('agent-sessions'),

  // Orchestrator
  AI_MAX_CONCURRENT_REQUESTS: z.coerce.number().int().positive().default(6),
  AI_WORKER_TIMEOUT_MS: z.coerce.number().int().positive().default(30000),
  AI_SESSION_TIMEOUT_MS: z.coerce.number().int().positive().default(180000),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const missing = result.error.issues
      .map((i) => `  ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(`Invalid environment configuration:\n${missing}`);
  }
  return result.data;
}

export const env: Env = loadEnv();
