import Joi from 'joi';

export interface SourceCreateDto {
  url: string;
}

export const sourceCreateSchema = Joi.object<SourceCreateDto>().keys({
  url: Joi.string().uri().required(),
});
