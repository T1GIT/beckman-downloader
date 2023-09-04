import Joi from 'joi';

export interface SourceUpdateDto {
  path: string;
}

export const sourceUpdateSchema = Joi.object<SourceUpdateDto>().keys({
  path: Joi.string()
    .uri({ allowRelative: true, relativeOnly: true })
    .required(),
});
