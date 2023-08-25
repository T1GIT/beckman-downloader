import { Module } from '../types/module';
import Application from 'koa';
import { connection } from './database';
import process from 'process';

export async function initModules(
  app: Application,
  modules: Module[],
): Promise<void> {
  const models = modules
    .map((m) => m.models)
    .filter(Boolean)
    .flat();
  const controllers = modules
    .map((m) => m.controllers)
    .filter(Boolean)
    .flat();

  connection.addModels(models);
  controllers.forEach((router) => {
    app.use(router.routes());
    app.use(router.allowedMethods());
  });

  await connection.sync({ alter: true });
  app.listen(5000, async () => {
    console.log(`App has been started in ${process.env.NODE_ENV} mode`);
  });
}
