import { Pageable } from '../../shared/types/pageable';
import { DocumentDto, documentSchema } from './document.dto';
import Joi from 'joi';

export type DocumentPageableDto = Pageable<DocumentDto>;

export const documentPageableSchema = Joi.object<DocumentPageableDto>().keys({
  offset: Joi.number().optional(),
  limit: Joi.number().optional(),
  total: Joi.number().required(),
  data: Joi.array().items(documentSchema),
});
