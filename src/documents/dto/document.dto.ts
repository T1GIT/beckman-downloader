import Joi from 'joi';

export interface DocumentDto {
  id: number;
  title: string;
  external_id: string;
  description?: string;
  page_type?: string;
  access_type?: string;
  category?: string;
  class_name?: string;
  document_number?: string;
  released_date?: Date;
  url: string;
  source_id: number;
}

export const documentSchema = Joi.object<DocumentDto>().keys({
  id: Joi.number().required(),
  title: Joi.string().required(),
  external_id: Joi.string().required(),
  description: Joi.string().optional().allow(null),
  page_type: Joi.string().optional().allow(null),
  access_type: Joi.string().optional().allow(null),
  category: Joi.string().optional().allow(null),
  class_name: Joi.string().optional().allow(null),
  document_number: Joi.string().optional().allow(null),
  released_date: Joi.date().optional().allow(null),
  url: Joi.string().required(),
  source_id: Joi.number().required(),
});
