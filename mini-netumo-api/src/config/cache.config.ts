import { redisConfig } from './redis.config';
import * as redisStore from 'cache-manager-redis-store';
import { config } from 'dotenv';

config();

export type CacheStore = 'memory' | 'redis';

interface CacheStoreConfig {
  ttl: number | null;
  max: number | null;
}

export const cacheConfig = {
  defaultStore: (process.env.CACHE_STORE || 'redis') as CacheStore,

  stores: {
    memory: {
      ttl: null as number | null,
      max: null as number | null,
    } as CacheStoreConfig,

    redis: {
      store: redisStore,
      ...redisConfig.default,
    },
  },
};
