import Router from 'koa-router';
import { sourcesService } from '../services/sources.service';
import { sourceCreateSchema } from '../dto/source-create.dto';
import { sourceUpdateSchema } from '../dto/source-update.dto';
import { sourcePageableSchema } from '../dto/source-pageable.dto';
import { sourceSchema } from '../dto/source.dto';

export const sourcesController = new Router();

sourcesController.get('/sources', async (ctx) => {
  const { offset, limit } = ctx.query;

  const pageable = await sourcesService.getAll(
    offset && Number(offset),
    limit && Number(limit),
  );

  ctx.body = sourcePageableSchema.validate(pageable, {
    stripUnknown: true,
  }).value;
  ctx.status = 200;
});

sourcesController.post('/sources', async (ctx) => {
  const result = sourceCreateSchema.validate(ctx.request.body);
  if (result.error) {
    ctx.body = result.error.details;
    ctx.status = 400;
    return;
  }

  const created = await sourcesService.create(result.value);
  ctx.body = sourceSchema.validate(created, { stripUnknown: true });
  ctx.status = 201;
});

sourcesController.put('/sources/:sourceId', async (ctx) => {
  const result = sourceUpdateSchema.validate(ctx.request.body);
  if (result.error) {
    ctx.body = result.error.details;
    ctx.status = 400;
    return;
  }

  const { sourceId } = ctx.params;
  const updated = await sourcesService.update(Number(sourceId), result.value);

  ctx.body = sourceSchema.validate(updated, { stripUnknown: true });
  ctx.status = 200;
});

sourcesController.delete('/sources/:sourceId', async (ctx) => {
  const { sourceId } = ctx.params;
  await sourcesService.remove(Number(sourceId));

  ctx.status = 204;
});
