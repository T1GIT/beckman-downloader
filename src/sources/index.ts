import { sourcesController } from './controllers/sources.controller';
import { Module } from '../core/types/module';
import { SourceModel } from './models/source.model';

export const sourcesModule: Module = {
  controllers: [sourcesController],
  models: [SourceModel],
};
