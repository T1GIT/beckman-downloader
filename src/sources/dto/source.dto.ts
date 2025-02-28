import Joi from 'joi';

export interface SourceDto {
  id: number;
  path: string;
  total: number;
  refreshing: boolean;
}

export const sourceSchema = Joi.object<SourceDto>().keys({
  id: Joi.number().required(),
  path: Joi.string()
    .uri({ allowRelative: true, relativeOnly: true })
    .required(),
  total: Joi.number().required(),
  refreshing: Joi.boolean().required(),
});
