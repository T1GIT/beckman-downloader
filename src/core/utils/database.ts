import { Sequelize } from 'sequelize-typescript';
import { env } from '../../shared/utils/env';

export const connection = new Sequelize({
  database: env.PG_NAME,
  dialect: 'postgres',
  username: env.PG_USERNAME,
  password: env.PG_PASSWORD,
  host: env.PG_HOST,
  port: env.PG_PORT,
});
