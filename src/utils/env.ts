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
};

export type Env = EnvType<typeof schema>;

export function getEnvPath(): string | undefined {
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
