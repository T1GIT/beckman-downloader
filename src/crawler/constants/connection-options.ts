import { ConnectionOptions, RedisOptions } from 'bullmq';
import { env } from '../../shared/utils/env';

export const connectionOptions: RedisOptions = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
};
