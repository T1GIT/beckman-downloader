import { documentsController } from './controllers/documents.controller';
import { DocumentModel } from './models/document.model';
import { Module } from '../core/types/module';

export const documentsModule: Module = {
  controllers: [documentsController],
  models: [DocumentModel],
};
