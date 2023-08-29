import Joi from 'joi';

export interface SourceDto {
  id: number;
  url: string;
  total?: number;
  refreshing: boolean;
}

export const sourceSchema = Joi.object<SourceDto>().keys({
  id: Joi.number().required(),
  url: Joi.string().uri().required(),
  total: Joi.number().optional().allow(null),
  refreshing: Joi.boolean().required(),
});
