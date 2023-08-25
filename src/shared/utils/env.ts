import { EnvType, load } from 'ts-dotenv';
import { resolve } from 'path';
import fs from 'fs';

const schema = {
  // COMMON
  NODE_ENV: ['production', 'development', 'test'],
  // POSTGRES
  PG_USERNAME: String,
  PG_PASSWORD: String,
  PG_NAME: String,
  PG_HOST: String,
  PG_PORT: Number,
  // REDIS
  REDIS_HOST: String,
  REDIS_PORT: Number,
  REDIS_PASSWORD: String,
};

export type Env = EnvType<typeof schema>;

function getEnvPath(): string | undefined {
  const nodeEnv = process.env.NODE_ENV;
  const queue = [
    `.env.${nodeEnv}`,
    `.env.${nodeEnv}.local`,
    '.env.local',
    '.env',
  ];
  return queue.find((path) => fs.existsSync(path));
}

export const env: Env = load(schema, { path: getEnvPath() });
