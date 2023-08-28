import Router from 'koa-router';
import { documentsService } from '../services/documents.service';
import Joi from 'joi';
import { documentSchema } from '../dto/document.dto';
import { documentPageableSchema } from '../dto/document-pageable.dto';
import { sourcesService } from '../../sources/services/sources.service';

export const documentsController = new Router();

documentsController.get('/documents', async (ctx) => {
  const { offset, limit } = ctx.query;

  const documents = await documentsService.getAll(
    offset && Number(offset),
    limit && Number(limit),
  );

  ctx.body = documentPageableSchema.validate(documents, {
    stripUnknown: true,
  }).value;
  ctx.status = 200;
});

documentsController.get('/sources/:sourceId/documents', async (ctx) => {
  const { sourceId } = ctx.params;
  if (!(await sourcesService.existsById(Number(sourceId)))) {
    ctx.body = 'Source not found';
    ctx.status = 404;
    return;
  }

  const { offset, limit } = ctx.query;

  const documents = await documentsService.getAllBySourceId(
    Number(sourceId),
    offset && Number(offset),
    limit && Number(limit),
  );

  ctx.body = documentPageableSchema.validate(documents, {
    stripUnknown: true,
  }).value;
  ctx.status = 200;
});
