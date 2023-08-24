import Koa from 'koa';
import * as process from 'process';
import { documentsController } from './controllers/documents.controller';
import { DocumentModel } from './models/document.model';
import { connection } from './utils/database';

const app = new Koa();

const models = [DocumentModel];
connection.addModels(models);

const routers = [documentsController];
routers.forEach((router) => {
  app.use(router.routes());
  app.use(router.allowedMethods());
});

async function start() {
  await connection.sync({ alter: true });

  app.listen(5000, async () => {
    console.log(`App has been started in ${process.env.NODE_ENV} mode`);
  });
}

start();
