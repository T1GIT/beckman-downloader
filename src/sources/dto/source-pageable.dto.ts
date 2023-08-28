import { Pageable } from '../../shared/types/pageable';
import { SourceDto, sourceSchema } from './source.dto';
import Joi from 'joi';

export type SourcePageableDto = Pageable<SourceDto>;

export const sourcePageableSchema = Joi.object<SourcePageableDto>().keys({
  offset: Joi.number().optional(),
  limit: Joi.number().optional(),
  total: Joi.number().required(),
  data: Joi.array().items(sourceSchema),
});
