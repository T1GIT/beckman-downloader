import Joi from 'joi';

export interface SourceUpdateDto {
  url: string;
}

export const sourceUpdateSchema = Joi.object<SourceUpdateDto>().keys({
  url: Joi.string().uri().required(),
});
