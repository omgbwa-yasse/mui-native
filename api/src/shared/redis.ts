import Redis from 'ioredis';
import { env } from '../config/env.js';

let redisClient: Redis | null = null;

export function getRedis(): Redis {
  if (!redisClient) {
    redisClient = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      lazyConnect: false,
    });

    redisClient.on('error', (err: Error) => {
      console.error('Redis client error', err);
    });

    redisClient.on('connect', () => {
      console.info('Redis connected');
    });
  }
  return redisClient;
}

export async function closeRedis(): Promise<void> {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
  }
}
