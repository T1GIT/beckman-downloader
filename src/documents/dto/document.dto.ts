import Joi from 'joi';

export interface DocumentDto {
  id: number;
  title: string;
  external_id: string;
  description: string;
  page_type: string;
  access_type: string;
  category: string;
  class_name: string;
  document_number: string;
  released_date: Date;
  url: string;
  source_id: number;
}

export const documentSchema = Joi.object<DocumentDto>().keys({
  id: Joi.number().required(),
  title: Joi.string().required(),
  external_id: Joi.string().required(),
  description: Joi.string().required(),
  page_type: Joi.string().required(),
  access_type: Joi.string().required(),
  category: Joi.string().required(),
  class_name: Joi.string().required(),
  document_number: Joi.string().required(),
  released_date: Joi.date().required(),
  url: Joi.string().required(),
  source_id: Joi.number().required(),
});
