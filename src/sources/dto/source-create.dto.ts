import Joi from 'joi';

export interface SourceCreateDto {
  path: string;
}

export const sourceCreateSchema = Joi.object<SourceCreateDto>().keys({
  path: Joi.string()
    .uri({ allowRelative: true, relativeOnly: true })
    .required(),
});
