import { Module } from '../types/module';
import Application from 'koa';
import { connection } from './connection';
import process from 'process';

export async function initModules(
  app: Application,
  modules: Module[],
): Promise<void> {
  const models = modules
    .map((m) => m.models)
    .filter(Boolean)
    .flat();
  connection.addModels(models);
  await connection.sync({ alter: true });

  const controllers = modules
    .map((m) => m.controllers)
    .filter(Boolean)
    .flat();
  controllers.forEach((router) => {
    app.use(router.routes());
    app.use(router.allowedMethods());
  });

  const inits = modules.map((m) => m.init).filter(Boolean);
  await Promise.all(inits.map((i) => i(app)));

  app.listen(5000, async () => {
    console.log(`App has been started in ${process.env.NODE_ENV} mode`);
  });
}
