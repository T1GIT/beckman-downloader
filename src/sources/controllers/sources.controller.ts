import Router from 'koa-router';
import { sourcesService } from '../services/sources.service';

export const sourcesController = new Router();

sourcesController.get('/sources', async (ctx) => {
  const { offset, limit } = ctx.query;

  const documents = await sourcesService.getAll(
    offset && Number(offset),
    limit && Number(limit),
  );

  ctx.body = documents;
  ctx.status = 200;
});
