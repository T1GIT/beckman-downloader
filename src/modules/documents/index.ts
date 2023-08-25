import Application from 'koa';
import { documentsController } from './controllers/documents.controller';
import { connection } from '../core/utils/database';
import { DocumentModel } from './models/document.model';

export function initDocumentsModule(app: Application) {
  const routers = [documentsController];
  routers.forEach((router) => {
    app.use(router.routes());
    app.use(router.allowedMethods());
  });

  const models = [DocumentModel];
  connection.addModels(models);
}
