import Router from 'koa-router';
import { documentsService } from '../services/documents.service';

export const documentsController = new Router();

documentsController.get('/documents', async (ctx) => {
  const { offset, limit } = ctx.query;

  const documents = await documentsService.getAll(
    offset && Number(offset),
    limit && Number(limit),
  );

  ctx.body = documents;
  ctx.status = 200;
});
