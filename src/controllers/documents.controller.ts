import Router from 'koa-router';
import { documentsService } from '../services/documents.service';

export const documentsController = new Router();

documentsController.get('/documents', async (ctx) => {
  const { offset, limit } = ctx.query;

  ctx.body = await documentsService.getAll(
    offset && Number(offset),
    limit && Number(limit),
  );
});
