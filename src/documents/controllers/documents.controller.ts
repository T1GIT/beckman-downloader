import Router from 'koa-router';
import { documentsService } from '../services/documents.service';
import { documentSchema } from '../dto/document.dto';
import { documentPageableSchema } from '../dto/document-pageable.dto';
import { sourcesService } from '../../sources/services/sources.service';
import { Readable } from 'stream';

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

documentsController.get('/documents/:documentId', async (ctx) => {
  const { documentId } = ctx.params;
  if (!(await documentsService.existsById(Number(documentId)))) {
    ctx.body = 'Document not found';
    ctx.status = 404;
    return;
  }

  const document = await documentsService.getById(Number(documentId));

  ctx.body = documentSchema.validate(document, { stripUnknown: true }).value;
  ctx.status = 200;
});

documentsController.get('/documents/:documentId/file', async (ctx) => {
  const { documentId } = ctx.params;
  if (!(await documentsService.existsById(Number(documentId)))) {
    ctx.body = 'Document not found';
    ctx.status = 404;
    return;
  }

  const document = await documentsService.getById(Number(documentId));
  const file = await documentsService.getFileById(Number(documentId));

  ctx.attachment(`${document.document_number}.pdf`);
  ctx.body = file;
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
